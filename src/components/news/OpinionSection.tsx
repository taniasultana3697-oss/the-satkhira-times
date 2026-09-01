import React from 'react';
import { useNews } from '../../context/NewsContext';
import { PenTool, Quote, User, ChevronRight, CheckCircle2 } from 'lucide-react';
import { toBengaliDigits } from '../../utils/helpers';

export const OpinionSection: React.FC = () => {
  const { 
    articles, 
    setSelectedArticleId, 
    setCurrentView, 
    poll, 
    votePoll, 
    hasVotedPoll 
  } = useNews();

  const opinionArticles = articles.filter(
    a => a.status === 'published' && a.category === 'মতামত'
  );

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setCurrentView('article');
  };

  return (
    <section className="my-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT 8 cols: Editorial & Columnists */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          
          <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-5">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2 font-serif-bangla">
              <PenTool className="w-5 h-5 text-red-600" />
              সম্পাদকীয় ও কলাম
            </h3>
            <span className="text-xs text-slate-500">বিশেষজ্ঞ ও কলামিস্টদের বিশ্লেষণ</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {opinionArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => handleArticleClick(art.id)}
                className="group cursor-pointer bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-red-500 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {art.author.avatar ? (
                      <img
                        src={art.author.avatar}
                        alt={art.author.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-red-600 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 border border-gray-200 dark:border-zinc-700 flex items-center justify-center font-bold flex-shrink-0">
                        <User className="w-6 h-6 text-gray-400 dark:text-zinc-500" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-red-600 transition">
                        {art.author.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {art.author.role}
                      </p>
                    </div>
                  </div>

                  <h5 className="font-bold text-base text-slate-800 dark:text-slate-100 font-serif-bangla line-clamp-2 mb-2 leading-snug group-hover:text-red-600 transition">
                    {art.title}
                  </h5>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed relative pl-4 border-l-2 border-red-500">
                    <Quote className="w-3 h-3 text-red-500 absolute -top-1 left-0 opacity-50" />
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-red-600 font-semibold">
                  <span>পূর্ণাঙ্গ মতামত পড়ুন</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT 4 cols: Reader Poll (পাঠক জরিপ) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-red-600 pb-2 mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5 font-serif-bangla">
                <span>পাঠক জরিপ</span>
              </h3>
              <span className="text-[10px] bg-red-100 dark:bg-red-950 text-red-600 px-2 py-0.5 rounded font-bold">
                ভোট দিন
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4 leading-snug">
              {poll.question}
            </p>

            <div className="space-y-2.5">
              {poll.options.map((opt) => {
                const percentage = poll.totalVotes > 0 
                  ? Math.round((opt.votes / poll.totalVotes) * 100) 
                  : 0;

                return (
                  <div key={opt.id} className="relative">
                    {hasVotedPoll ? (
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                          <span>{opt.text}</span>
                          <span className="text-red-600">{toBengaliDigits(percentage)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-red-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => votePoll(opt.id)}
                        className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 transition flex items-center justify-between group"
                      >
                        <span>{opt.text}</span>
                        <CheckCircle2 className="w-4 h-4 text-slate-300 group-hover:text-red-600" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
            <span>মোট প্রদত্ত ভোট: {toBengaliDigits(poll.totalVotes)}</span>
            {hasVotedPoll && <span className="text-green-600 font-bold">আপনার মতামত গৃহীত হয়েছে</span>}
          </div>
        </div>

      </div>
    </section>
  );
};
