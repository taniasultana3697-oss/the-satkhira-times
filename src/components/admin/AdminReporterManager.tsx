import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { ReporterAccount, SatkhiraUpazila } from '../../types';
import { SATKHIRA_UPAZILAS } from '../../data/initialData';
import { toBengaliDigits, formatBengaliDate } from '../../utils/helpers';
import { 
  Users, 
  UserPlus, 
  KeyRound, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Check, 
  X,
  FileText,
  AlertTriangle,
  Lock,
  Sparkles
} from 'lucide-react';

export const AdminReporterManager: React.FC = () => {
  const { reporters, addReporter, updateReporter, deleteReporter, articles } = useNews();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('সকল');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingReporter, setEditingReporter] = useState<ReporterAccount | null>(null);
  const [passwordChangeTarget, setPasswordChangeTarget] = useState<ReporterAccount | null>(null);
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [showPasswordIds, setShowPasswordIds] = useState<Record<string, boolean>>({});

  // Form State for Adding / Editing
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formDesignation, setFormDesignation] = useState('');
  const [formUpazila, setFormUpazila] = useState<SatkhiraUpazila>('সাতক্ষীরা সদর');
  const [formAvatar, setFormAvatar] = useState('');
  const [formAutoPublish, setFormAutoPublish] = useState(true);
  const [formBio, setFormBio] = useState('');

  // Password Visibility Toggle
  const togglePasswordVisibility = (id: string) => {
    setShowPasswordIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Reset form
  const resetForm = () => {
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormPassword('');
    setFormDesignation('');
    setFormUpazila('সাতক্ষীরা সদর');
    setFormAvatar('');
    setFormAutoPublish(true);
    setFormBio('');
    setEditingReporter(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (rep: ReporterAccount) => {
    setEditingReporter(rep);
    setFormName(rep.name);
    setFormEmail(rep.email);
    setFormPhone(rep.phone);
    setFormPassword(rep.password);
    setFormDesignation(rep.designation);
    setFormUpazila(rep.upazila);
    setFormAvatar(rep.avatar || '');
    setFormAutoPublish(rep.canAutoPublish);
    setFormBio(rep.bio || '');
    setIsAddModalOpen(true);
  };

  const handleSaveReporter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim() || !formPassword.trim()) {
      alert('অনুগ্রহ করে নাম, ফোন নম্বর এবং পাসওয়ার্ড পূরণ করুন।');
      return;
    }

    if (editingReporter) {
      updateReporter(editingReporter.id, {
        name: formName.trim(),
        email: formEmail.trim() || `${formPhone.replace(/[^0-9]/g, '')}@satkhiratimes.com`,
        phone: formPhone.trim(),
        password: formPassword.trim(),
        designation: formDesignation.trim() || `${formUpazila} প্রতিনিধি`,
        upazila: formUpazila,
        avatar: formAvatar.trim(),
        canAutoPublish: formAutoPublish,
        bio: formBio.trim()
      });
    } else {
      addReporter({
        name: formName.trim(),
        email: formEmail.trim() || `${formPhone.replace(/[^0-9]/g, '')}@satkhiratimes.com`,
        phone: formPhone.trim(),
        password: formPassword.trim(),
        designation: formDesignation.trim() || `${formUpazila} প্রতিনিধি`,
        upazila: formUpazila,
        avatar: formAvatar.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        status: 'active',
        canAutoPublish: formAutoPublish,
        bio: formBio.trim()
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const handleSaveQuickPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordChangeTarget && newPasswordValue.trim()) {
      updateReporter(passwordChangeTarget.id, { password: newPasswordValue.trim() });
      setPasswordChangeTarget(null);
      setNewPasswordValue('');
      alert('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!');
    }
  };

  // Filter reporters
  const filteredReporters = reporters.filter(rep => {
    const matchesSearch = 
      rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.phone.includes(searchQuery) ||
      rep.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.pressCardNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUpazila = selectedUpazila === 'সকল' || rep.upazila === selectedUpazila;
    const matchesStatus = statusFilter === 'all' || rep.status === statusFilter;

    return matchesSearch && matchesUpazila && matchesStatus;
  });

  const pendingCount = reporters.filter(r => r.status === 'pending').length;
  const activeCount = reporters.filter(r => r.status === 'active').length;

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-100 dark:bg-red-950/80 text-red-600 rounded-xl">
                <Users className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-bangla text-slate-900 dark:text-white">
                সাংবাদিক ও প্রতিনিধি ব্যবস্থাপনা
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-serif-bangla">
              সাতক্ষীরার ৭টি উপজেলা ও স্টাফ সাংবাদিকদের নিজস্ব গোপন পাসওয়ার্ড ও অনুমতি কন্ট্রোল প্যানেল
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleOpenAddModal}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>নতুন সাংবাদিক যুক্ত করুন</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
            <span className="text-[10px] text-slate-400 block">মোট সাংবাদিক</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white font-brand">
              {toBengaliDigits(reporters.length)} জন
            </span>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/20">
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">সক্রিয় প্রতিনিধি</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-brand">
              {toBengaliDigits(activeCount)} জন
            </span>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-500/20">
            <span className="text-[10px] text-amber-600 dark:text-amber-400 block">পেন্ডিং আবেদন</span>
            <span className="text-lg font-bold text-amber-600 dark:text-amber-400 font-brand">
              {toBengaliDigits(pendingCount)} টি
            </span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-500/20">
            <span className="text-[10px] text-blue-600 dark:text-blue-400 block">মোট প্রকাশিত প্রতিবেদন</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400 font-brand">
              {toBengaliDigits(articles.length)} টি
            </span>
          </div>
        </div>
      </div>

      {/* Pending Applications Alert Banner if any */}
      {pendingCount > 0 && (
        <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white font-serif-bangla">
                {toBengaliDigits(pendingCount)} টি নতুন সাংবাদিক যুক্ত হওয়ার আবেদন পর্যালোচনার অপেক্ষায় আছে!
              </h4>
              <p className="text-xs text-slate-500">
                নিচে পেন্ডিং আবেদন ফিল্টার করে অনুমোদন (Approve) বা বাতিল করতে পারেন।
              </p>
            </div>
          </div>
          <button
            onClick={() => setStatusFilter('pending')}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition whitespace-nowrap shadow-sm"
          >
            আবেদনগুলো দেখুন
          </button>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="সাংবাদিকের নাম, ফোন, আইডি..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
          />
        </div>

        {/* Upazila Filter & Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <select
            value={selectedUpazila}
            onChange={(e) => setSelectedUpazila(e.target.value)}
            className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
          >
            {SATKHIRA_UPAZILAS.map((up) => (
              <option key={up} value={up}>{up}</option>
            ))}
          </select>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg font-bold transition ${statusFilter === 'all' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'}`}
            >
              সকল ({reporters.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 rounded-lg font-bold transition ${statusFilter === 'active' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500'}`}
            >
              সক্রিয় ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1 rounded-lg font-bold transition ${statusFilter === 'pending' ? 'bg-amber-600 text-white shadow' : 'text-slate-500'}`}
            >
              পেন্ডিং ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter('suspended')}
              className={`px-3 py-1 rounded-lg font-bold transition ${statusFilter === 'suspended' ? 'bg-red-600 text-white shadow' : 'text-slate-500'}`}
            >
              স্থগিত
            </button>
          </div>
        </div>

      </div>

      {/* Reporters Card Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReporters.map((rep) => {
          const reporterArticlesCount = articles.filter(a => 
            a.author.name === rep.name || a.author.name.includes(rep.name)
          ).length;

          const isPasswordVisible = showPasswordIds[rep.id] || false;

          return (
            <div
              key={rep.id}
              className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-sm space-y-4 relative transition hover:border-red-500/50 ${
                rep.status === 'pending' 
                  ? 'border-amber-400 dark:border-amber-500/40 bg-amber-500/5'
                  : rep.status === 'suspended'
                  ? 'border-red-400 dark:border-red-500/40 opacity-75'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Header Info */}
              <div className="flex items-start gap-3.5">
                <img
                  src={rep.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt={rep.name}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate font-serif-bangla">
                      {rep.name}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rep.status === 'active' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' 
                        : rep.status === 'pending'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                    }`}>
                      {rep.status === 'active' ? 'সক্রিয়' : rep.status === 'pending' ? 'পেন্ডিং আবেদন' : 'স্থগিত'}
                    </span>
                  </div>

                  <p className="text-xs text-red-600 dark:text-red-400 font-semibold mt-0.5 truncate">
                    {rep.designation}
                  </p>
                  
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{rep.upazila}</span>
                    <span>•</span>
                    <span className="font-mono text-[10px]">{rep.pressCardNumber}</span>
                  </div>
                </div>
              </div>

              {/* Password & Credentials Box */}
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 p-3 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3 text-red-500" /> নিজস্ব পাসওয়ার্ড:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                      {isPasswordVisible ? rep.password : '••••••••'}
                    </span>
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(rep.id)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                      title={isPasswordVisible ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখুন'}
                    >
                      {isPasswordVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPasswordChangeTarget(rep);
                        setNewPasswordValue(rep.password);
                      }}
                      className="text-[10px] bg-red-50 dark:bg-red-950 text-red-600 px-1.5 py-0.5 rounded font-bold hover:bg-red-100 transition"
                      title="পাসওয়ার্ড পরিবর্তন করুন"
                    >
                      রিসেট
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/50">
                  <div className="flex items-center gap-2 truncate">
                    <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="font-mono">{rep.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{rep.email}</span>
                  </div>
                </div>
              </div>

              {/* Status & Stats info */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-slate-500">সংবাদ পাঠিয়েছেন:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-brand">
                    {toBengaliDigits(reporterArticlesCount)} টি
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${rep.canAutoPublish ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-[10px] text-slate-500">
                    {rep.canAutoPublish ? 'সরাসরি প্রকাশ' : 'রিভিউ প্রয়োজন'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1.5">
                
                {rep.status === 'pending' ? (
                  <div className="flex items-center gap-2 w-full">
                    <button
                      onClick={() => updateReporter(rep.id, { status: 'active', canAutoPublish: true })}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-1.5 rounded-lg transition flex items-center justify-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>অনুমোদন করুন</span>
                    </button>
                    <button
                      onClick={() => deleteReporter(rep.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-950 dark:text-red-400 font-bold text-xs px-2.5 py-1.5 rounded-lg transition"
                      title="আবেদন বাতিল করুন"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleOpenEditModal(rep)}
                      className="text-xs text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 font-semibold p-1.5 rounded flex items-center gap-1"
                      title="তথ্য পরিবর্তন"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>এডিট</span>
                    </button>

                    <button
                      onClick={() => {
                        updateReporter(rep.id, { 
                          status: rep.status === 'active' ? 'suspended' : 'active' 
                        });
                      }}
                      className={`text-xs font-semibold p-1.5 rounded flex items-center gap-1 ${
                        rep.status === 'active' 
                          ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40' 
                          : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                      }`}
                      title={rep.status === 'active' ? 'সাময়িক স্থগিত করুন' : 'পুনরায় সক্রিয় করুন'}
                    >
                      {rep.status === 'active' ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      <span>{rep.status === 'active' ? 'স্থগিত' : 'সক্রিয়'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`আপনি কি সত্যিই ${rep.name}-কে সাংবাদিক তালিকা থেকে বাদ দিতে চান?`)) {
                          deleteReporter(rep.id);
                        }
                      }}
                      className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 p-1.5 rounded"
                      title="অ্যাকাউন্ট ডিলিট করুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}

              </div>

            </div>
          );
        })}
      </div>

      {filteredReporters.length === 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-bold text-slate-700 dark:text-slate-300 font-serif-bangla">কোনো সাংবাদিক অ্যাকাউন্ট পাওয়া যায়নি!</h3>
          <p className="text-xs text-slate-400">ফিল্টার পরিবর্তন করে দেখুন অথবা নতুন সাংবাদিক যুক্ত করুন।</p>
        </div>
      )}

      {/* Add / Edit Reporter Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold font-serif-bangla text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-red-600" />
                <span>{editingReporter ? 'সাংবাদিকের তথ্য আপডেট' : 'নতুন সাংবাদিক অ্যাকাউন্ট তৈরি'}</span>
              </h3>
              <button
                onClick={() => { setIsAddModalOpen(false); resetForm(); }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReporter} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  সাংবাদিকের পূর্ণ নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মো: কামরুল হাসান"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600 font-serif-bangla"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    মোবাইল / ফোন নম্বর (লগইন আইডি) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="017XXXXXXXX"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    গোপন পাসওয়ার্ড <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: 1234 বা গোপন কোড"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    উপজেলা নির্বাচন <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formUpazila}
                    onChange={(e) => setFormUpazila(e.target.value as SatkhiraUpazila)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
                  >
                    {SATKHIRA_UPAZILAS.filter(u => u !== 'সকল').map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    পদবি / ডেজিগনেশন
                  </label>
                  <input
                    type="text"
                    placeholder={`যেমন: ${formUpazila} প্রতিনিধি`}
                    value={formDesignation}
                    onChange={(e) => setFormDesignation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ইমেইল অ্যাড্রেস (ঐচ্ছিক)
                </label>
                <input
                  type="email"
                  placeholder="reporter@satkhiratimes.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  প্রোফাইল ছবি লিংক (URL)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formAvatar}
                  onChange={(e) => setFormAvatar(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600 font-mono"
                />
              </div>

              {/* Auto Publish Toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">সরাসরি পাবলিশ পারমিশন (Auto-Publish)</span>
                  <span className="text-[11px] text-slate-500">অন থাকলে সাংবাদিক নিউজ সাবমিট করার সাথে সাথে মূল সাইটে লাইভ হয়ে যাবে।</span>
                </div>
                <input
                  type="checkbox"
                  checked={formAutoPublish}
                  onChange={(e) => setFormAutoPublish(e.target.checked)}
                  className="w-5 h-5 text-red-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setIsAddModalOpen(false); resetForm(); }}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingReporter ? 'তথ্য সংরক্ষণ করুন' : 'অ্যাকাউন্ট যুক্ত করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Password Reset Modal */}
      {passwordChangeTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-bold font-serif-bangla text-slate-900 dark:text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-red-600" />
                <span>পাসওয়ার্ড রিসেট</span>
              </h3>
              <button
                onClick={() => setPasswordChangeTarget(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              <strong className="text-slate-900 dark:text-white">{passwordChangeTarget.name}</strong> ({passwordChangeTarget.designation})-এর জন্য নতুন পাসওয়ার্ড নির্ধারণ করুন:
            </p>

            <form onSubmit={handleSaveQuickPassword} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="নতুন গোপন পাসওয়ার্ড দিন"
                  value={newPasswordValue}
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                  className="w-full text-center tracking-widest text-base font-bold p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-red-600 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPasswordChangeTarget(null)}
                  className="text-xs px-3 py-2 rounded-lg text-slate-500 font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="text-xs px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow"
                >
                  পাসওয়ার্ড সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
