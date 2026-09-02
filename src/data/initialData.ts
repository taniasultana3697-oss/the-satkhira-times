import { NewsArticle, BreakingNewsItem, AdConfiguration, WebsiteSettings, PollQuestion, PhotoStory, VideoNews, ReporterAccount } from '../types';

export const INITIAL_SETTINGS: WebsiteSettings = {
  siteName: 'THE SATKHIRA TIMES',
  tagline: 'সত্য ও নিরপেক্ষ সংবাদ',
  editorName: 'আব্দুর রহমান',
  publisherName: 'সাতক্ষীরা মিডিয়া পাবলিকেশন্স লিমিটেড',
  contactEmail: 'editor@satkhiratimes.com',
  contactPhone: '+880 1711-234567',
  mainOfficeAddress: 'প্রেস ক্লাব ভবন (৩য় তলা), নিউ মার্কেট মোড়, সাতক্ষীরা সদর, সাতক্ষীরা-৯৪০০',
  dhakaOfficeAddress: 'বাড়ি-১২, রোড-০৫, বিজয়নগর, ঢাকা-১০০০',
  facebookUrl: 'https://facebook.com/TheSatkhiraTimes',
  twitterUrl: 'https://twitter.com/SatkhiraTimes',
  telegramUrl: 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2',
  whatsappNumber: '+8801711234567',
  youtubeUrl: 'https://youtube.com/@TheSatkhiraTimes',
  googleNewsUrl: 'https://news.google.com',
  logoText: 'THE SATKHIRA TIMES',
  metaDescriptionDefault: 'THE SATKHIRA TIMES - সাতক্ষীরা, জাতীয়, আন্তর্জাতিক, রাজনীতি ও খেলাধুলার বস্তুনিষ্ঠ ও নিরপেক্ষ সংবাদ মাধ্যম।',
  footerNotice: '© ২০২৬ দ্য সাতক্ষীরা টাইমস কর্তৃক সর্বস্বত্ব সংরক্ষিত। অনুমতি ছাড়া এই ওয়েবসাইটের যেকোনো কনটেন্ট বা ছবি পুনঃপ্রকাশ সম্পূর্ণ বেআইনি।',
  ePaperUrl: '#epaper',
  liveStreamUrl: 'https://www.youtube.com',
  seoSettings: {
    siteTitle: 'THE SATKHIRA TIMES | সত্য ও নিরপেক্ষ সংবাদ - দ্য সাতক্ষীরা টাইমস',
    metaDescription: 'THE SATKHIRA TIMES - সত্য ও নিরপেক্ষ সংবাদ। সাতক্ষীরা, জাতীয়, আন্তর্জাতিক, রাজনীতি, অর্থনীতি ও খেলাধুলার সর্বশেষ তাজা খবর।',
    metaKeywords: 'সাতক্ষীরা নিউজ, দ্য সাতক্ষীরা টাইমস, Satkhira Times, বাংলা সংবাদ, সুন্দরবন খবর, ভোমরা স্থলবন্দর, জাতীয় খবর',
    ogImageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&auto=format&fit=crop&q=80',
    canonicalUrl: 'https://satkhiratimes.com',
    googleAnalyticsId: '',
    googleSearchConsoleCode: ''
  }
};

export const INITIAL_BREAKING_NEWS: BreakingNewsItem[] = [
  {
    id: 'b-tala-land',
    title: 'তালায় উপজেলা ভূমি অফিসে এসিল্যান্ড না থাকায় স্থবির ভূমি সেবা, চরম ভোগান্তিতে সাধারণ মানুষ',
    linkArticleId: 'art-tala-land-office',
    isActive: true,
    createdAt: new Date().toISOString(),
    priority: 1
  },
  {
    id: 'b1',
    title: 'সুন্দরবনের সাতক্ষীরা রেঞ্জে হরিণ শিকারী চক্রের ৩ সদস্য আটক, অস্ত্র উদ্ধার',
    linkArticleId: 'art-1',
    isActive: true,
    createdAt: new Date().toISOString(),
    priority: 2
  },
  {
    id: 'b2',
    title: 'সাতক্ষীরার ভোমরা স্থলবন্দরে রাজস্ব আদায়ে নতুন রেকর্ড, বাণিজ্যে নতুন গতি',
    linkArticleId: 'art-2',
    isActive: true,
    createdAt: new Date().toISOString(),
    priority: 3
  },
  {
    id: 'b3',
    title: 'জাতীয় নির্বাচনে আধুনিক প্রযুক্তি ব্যবহারের সুপারিশ নির্বাচন সংস্কার কমিশনের',
    linkArticleId: 'art-4',
    isActive: true,
    createdAt: new Date().toISOString(),
    priority: 4
  },
  {
    id: 'b4',
    title: 'আইসিসি চ্যাম্পিয়ন্স ট্রফির সেমিফাইনালে পাকিস্তানের বিপক্ষে টসে জিতে ব্যাটিংয়ে বাংলাদেশ',
    linkArticleId: 'art-7',
    isActive: true,
    createdAt: new Date().toISOString(),
    priority: 5
  }
];

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: 'art-tala-land-office',
    slug: 'tala-upazila-land-office-ac-land-crisis-public-suffering',
    title: 'তালায় উপজেলা ভূমি অফিসে এসিল্যান্ড না থাকায় স্থবির ভূমি সেবা, চরম ভোগান্তিতে সাধারণ মানুষ',
    subtitle: 'দীর্ঘদিন ধরে স্থায়ী কর্মকর্তা না থাকায় নামজারি ও ভূমি কর সেবায় দীর্ঘসূত্রতা, দ্রুত পদায়নের দাবি',
    excerpt: 'সাতক্ষীরার তালা উপজেলা ভূমি অফিসে দীর্ঘদিন ধরে সহকারী কমিশনার (ভূমি) বা এসিল্যান্ড পদে স্থায়ী কর্মকর্তা না থাকায় ভূমি সংক্রান্ত বিভিন্ন সেবা কার্যক্রমে স্থবিরতা দেখা দিয়েছে। এতে নামজারি, ভূমি উন্নয়ন কর, খাসজমি সংক্রান্ত আবেদন, শুনানি ও অন্যান্য প্রশাসনিক কার্যক্রমে চরম ভোগান্তিতে পড়েছেন সাধারণ সেবাগ্রহীতারা।',
    content: `তালা (সাতক্ষীরা) প্রতিনিধি | THE SATKHIRA TIMES:\nসাতক্ষীরার তালা উপজেলা ভূমি অফিসে দীর্ঘদিন ধরে সহকারী কমিশনার (ভূমি) বা এসিল্যান্ড পদে স্থায়ী কর্মকর্তা না থাকায় ভূমি সংক্রান্ত বিভিন্ন সেবা কার্যক্রমে স্থবিরতা দেখা দিয়েছে। এতে নামজারি, ভূমি উন্নয়ন কর, খাসজমি সংক্রান্ত আবেদন, শুনানি ও অন্যান্য প্রশাসনিক কার্যক্রমে চরম ভোগান্তিতে পড়েছেন সাধারণ সেবাগ্রহীতারা。\n\nভুক্তভোগীদের অভিযোগ, গুরুত্বপূর্ণ ফাইল ও আবেদনপত্র নিষ্পত্তিতে দীর্ঘসূত্রতা সৃষ্টি হয়েছে। অনেকেই দিনের পর দিন ভূমি অফিসে ঘুরেও কাঙ্ক্ষিত সেবা পাচ্ছেন না। বিশেষ করে কৃষক, ক্ষুদ্র ব্যবসায়ী ও সাধারণ ভূমি মালিকরা সবচেয়ে বেশি দুর্ভোগের শিকার হচ্ছেন。\n\nস্থানীয় বাসিন্দারা জানান, ভূমি অফিসে স্থায়ী এসিল্যান্ড না থাকায় প্রশাসনিক সিদ্ধান্ত গ্রহণে বিলম্ব হচ্ছে। ফলে জমি সংক্রান্ত বিভিন্ন জটিলতা নিরসনেও বাধার সৃষ্টি হচ্ছে। এতে সরকারি সেবা কার্যক্রমের প্রতি সাধারণ মানুষের আস্থাও ক্ষতিগ্রস্ত হচ্ছে বলে তারা মনে করেন。\n\nসচেতন মহল মনে করছে, তালা উপজেলার মতো গুরুত্বপূর্ণ এলাকায় দ্রুত একজন স্থায়ী সহকারী কমিশনার (ভূমি) পদায়ন করা প্রয়োজন। এতে ভূমি সেবার গতি বৃদ্ধি পাবে এবং সাধারণ মানুষের দুর্ভোগ অনেকাংশে কমবে。\n\nএ বিষয়ে স্থানীয় জনগণ ও সেবাগ্রহীতারা সংশ্লিষ্ট ঊর্ধ্বতন কর্তৃপক্ষের দৃষ্টি আকর্ষণ করে দ্রুত স্থায়ী কর্মকর্তা নিয়োগের দাবি জানিয়েছেন।`,
    category: 'সাতক্ষীরা',
    upazila: 'তালা',
    featuredImage: '/assets/images/tala_land_office.jpg',
    imageCaption: 'তালা উপজেলা ভূমি অফিসে স্থায়ী এসিল্যান্ড না থাকায় ভূমি সংক্রান্ত বিভিন্ন সেবা পেতে ভোগান্তিতে পড়ছেন সাধারণ মানুষ।',
    author: {
      name: 'তালা (সাতক্ষীরা) প্রতিনিধি',
      role: 'উপজেলা প্রতিনিধি',
      location: 'তালা, সাতক্ষীরা'
    },
    publishedAt: new Date().toISOString(),
    isBreaking: true,
    isTopHeadline: true,
    isFeatured: true,
    isTrending: true,
    viewCount: 19450,
    tags: ['তালা', 'সাতক্ষীরা', 'উপজেলা ভূমি অফিস', 'এসিল্যান্ড', 'ভূমি সেবা', 'নামজারি', 'ভূমি উন্নয়ন কর', 'সাতক্ষীরা সংবাদ', 'তালা সংবাদ', 'বাংলাদেশ ভূমি প্রশাসন'],
    status: 'published',
    seo: {
      metaTitle: 'তালায় এসিল্যান্ড না থাকায় স্থবির ভূমি সেবা, ভোগান্তিতে সাধারণ মানুষ',
      metaDescription: 'সাতক্ষীরার তালা উপজেলা ভূমি অফিসে স্থায়ী এসিল্যান্ড না থাকায় নামজারি, ভূমি উন্নয়ন করসহ বিভিন্ন সেবা কার্যক্রমে স্থবিরতা দেখা দিয়েছে। দ্রুত কর্মকর্তা পদায়নের দাবি জানিয়েছেন স্থানীয়রা।',
      keywords: ['তালা', 'সাতক্ষীরা', 'উপজেলা ভূমি অফিস', 'এসিল্যান্ড', 'ভূমি সেবা', 'নামজারি', 'ভূমি উন্নয়ন কর', 'সাতক্ষীরা সংবাদ', 'তালা সংবাদ', 'বাংলাদেশ ভূমি প্রশাসন']
    }
  },
  {
    id: 'art-1',
    slug: 'sundarbans-satkhira-range-wildlife-protection-operation',
    title: 'সুন্দরবনের সাতক্ষীরা রেঞ্জে বনদস্যু ও হরিণ শিকারী চক্রের ৩ সদস্য আটক',
    subtitle: 'শ্যামনগর ও বুড়িগোয়ালিনী সীমান্তে যৌথ অভিযানে আগ্নেয়াস্ত্র ও হরিণের মাংস জব্দ',
    excerpt: 'সুন্দরবন পশ্চিম বনবিভাগের সাতক্ষীরা রেঞ্জের বুড়িগোয়ালিনী ফরেস্ট স্টেশনের আওতাধীন গভীর বন থেকে চোরা শিকারী চক্রের ৩ সক্রিয় সদস্যকে আটক করেছে বনবিভাগ ও কোস্টগার্ডের যৌথ দল।',
    content: `সাতক্ষীরা প্রতিনিধি:\nসুন্দরবন পশ্চিম বনবিভাগের সাতক্ষীরা রেঞ্জে কোস্টগার্ড ও বনবিভাগের এক বিশেষ যৌথ অভিযানে হরিণ শিকারী চক্রের ৩ সক্রিয় সদস্যকে আটক করা হয়েছে। এ সময় তাদের কাছ থেকে ৩টি দেশীয় একনলা বন্দুক, ১৫ রাউন্ড তাজা গুলি, ২০০ মিটার বিশেষ ফাঁদ এবং প্রায় ৪০ কেজি হরিণের মাংস জব্দ করা হয়।\n\nমঙ্গলবার ভোররাতে শ্যামনগর উপজেলার বুড়িগোয়ালিনী ফরেস্ট স্টেশনের পায়রাটুনি খাল সংলগ্ন গহীন বনে এ অভিযান পরিচালনা করা হয়। আটককৃতরা হলো— শ্যামনগর উপজেলার গাবুরা ইউনিয়নের বাসিন্দা সোবহান গাজী (৩৮), হরিনগর গ্রামের রফিকুল ইসলাম (৩২) এবং দাতিনাখালী গ্রামের কামরুল হাসান (৪৫)।\n\nসাতক্ষীরা রেঞ্জের সহকারী বন সংরক্ষক (এসিএফ) জানান, গোপন সংবাদের ভিত্তিতে জানা যায় একটি সংঘবদ্ধ চোরাশিকারী দল সুন্দরবনের ভেতরে হরিণ নিধনে লিপ্ত রয়েছে। খবর পেয়ে কোস্টগার্ডের একটি টহল টিম এবং বনরক্ষীদের যৌথ দল ওই এলাকায় অভিযান চালিয়ে তাদের হাতেনাতে আটক করে।\n\nতিনি আরও জানান, আটককৃতদের বিরুদ্ধে বন্যপ্রাণী সংরক্ষণ ও নিরাপত্তা আইনে নিয়মিত মামলা দায়ের করে সাতক্ষীরা আদালতে প্রেরণের প্রস্তুতি চলছে। সুন্দরবনের জীববৈচিত্র্য রক্ষায় বনবিভাগের এ ধরনের কঠোর নজরদারি অব্যাহত থাকবে।`,
    category: 'সাতক্ষীরা',
    upazila: 'শ্যামনগর',
    featuredImage: 'https://images.unsplash.com/photo-1544985361-b552945d8b88?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'সুন্দরবনের সাতক্ষীরা রেঞ্জের ম্যানগ্রোভ বনাঞ্চল ও সংরক্ষিত জীববৈচিত্র্য। ছবি: দ্য সাতক্ষীরা টাইমস',
    author: {
      name: 'আসাদুজ্জামান সরদার',
      role: 'বিশেষ প্রতিনিধি',
      location: 'শ্যামনগর, সাতক্ষীরা'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    isBreaking: true,
    isTopHeadline: true,
    isFeatured: true,
    isTrending: true,
    viewCount: 14250,
    tags: ['সাতক্ষীরা', 'সুন্দরবন', 'শ্যামনগর', 'বন্যপ্রাণী', 'কোস্টগার্ড'],
    status: 'published',
    seo: {
      metaTitle: 'সুন্দরবনের সাতক্ষীরা রেঞ্জে হরিণ শিকারী চক্র আটক | The Satkhira Times',
      metaDescription: 'সুন্দরবনের সাতক্ষীরা রেঞ্জে কোস্টগার্ড ও বনবিভাগের বিশেষ অভিযানে অস্ত্র ও মাংসসহ ৩ শিকারী আটক।',
      keywords: ['সাতক্ষীরা', 'সুন্দরবন', 'শ্যামনগর']
    }
  },
  {
    id: 'art-2',
    slug: 'bhomra-land-port-revenue-growth-export-import-record',
    title: 'ভোমরা স্থলবন্দরে রাজস্ব আদায়ের লক্ষ্যমাত্রা ছাড়িয়ে নতুন মাইলফলক',
    subtitle: 'ভারত-বাংলাদেশ বাণিজ্য সম্প্রসারণে ডিজিটাল অটোমেশন চালুর সুফল মিলছে',
    excerpt: 'চলতি অর্থবছরে সাতক্ষীরার ভোমরা স্থলবন্দর দিয়ে ভারত থেকে পাথর, ফল ও নিত্যপ্রয়োজনীয় পণ্য আমদানি এবং বাংলাদেশি পাটজাত পণ্য রফতানিতে লক্ষ্যমাত্রা অতিক্রম করেছে কাস্টমস কর্তৃপক্ষ।',
    content: `সাতক্ষীরা সদর:\nসাতক্ষীরার ঐতিহ্যবাহী ভোমরা স্থলবন্দরে চলতি অর্থবছরের প্রথম আট মাসেই রাজস্ব আদায়ে অভাবনীয় সাফল্য অর্জিত হয়েছে। জাতীয় রাজস্ব বোর্ডের (এনবিআর) নির্ধারিত লক্ষ্যমাত্রার চেয়েও প্রায় ১৮ শতাংশ বেশি রাজস্ব জমা হয়েছে সরকারি কোষাগারে।\n\nভোমরা শুল্ক স্টেশন সূত্রে জানা গেছে, ডিজিটাল এসাইকুডা ওয়ার্ল্ড সিস্টেমের কার্যকর ব্যবহার, শতভাগ ওজন স্কেল অটোমেশন এবং পণ্য খালাসে গতিশীলতা বৃদ্ধির ফলে রাজস্ব ফাঁকি শূন্যের কোঠায় নেমে এসেছে। বিশেষ করে ভারতীয় কাঁচামাল, শিল্প কলকারখানার যন্ত্রাংশ এবং সুগন্ধি চাল আমদানির পাশাপাশি বাংলাদেশি হোসিয়ারি ও শুকনা মাছ রফতানি বেড়েছে।\n\nভোমরা স্থলবন্দর সিঅ্যান্ডএফ এজেন্টস অ্যাসোসিয়েশনের সাধারণ সম্পাদক জানান, ভোমরা বন্দর আধুনিকায়নে ৪ লেন সড়ক নির্মাণ ও পূর্ণাঙ্গ কাস্টমস হাউস প্রতিষ্ঠার দাবি দ্রুত বাস্তবায়িত হলে খুলনা ও দক্ষিণ-পশ্চিমাঞ্চলের অর্থনৈতিক চেহারা বদলে যাবে।`,
    category: 'ব্যবসা-বাণিজ্য',
    upazila: 'সাতক্ষীরা সদর',
    featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'ভোমরা স্থলবন্দরে পণ্যবাহী ট্রাকের দীর্ঘ সারি ও কাস্টমস কার্যক্রম।',
    author: {
      name: 'মো. রফিকুল ইসলাম',
      role: 'বাণিজ্য প্রতিবেদক',
      location: 'সাতক্ষীরা সদর'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    isTopHeadline: true,
    isFeatured: true,
    isTrending: true,
    viewCount: 11820,
    tags: ['ভোমরা', 'স্থলবন্দর', 'সাতক্ষীরা', 'রাজস্ব', 'বাণিজ্য'],
    status: 'published',
    seo: {
      metaTitle: 'ভোমরা স্থলবন্দরে রাজস্ব আদায়ের নতুন রেকর্ড | দ্য সাতক্ষীরা টাইমস',
      metaDescription: 'সাতক্ষীরার ভোমরা স্থলবন্দরে রাজস্ব আদায়ে এনবিআরের লক্ষ্যমাত্রা ছাড়িয়ে নতুন মাইলফলক।'
    }
  },
  {
    id: 'art-3',
    slug: 'satkhira-himsagar-langra-mango-harvest-export-preparation',
    title: 'স্বাদে গন্ধে অতুলনীয় সাতক্ষীরার হিমসাগর আম ইউরোপে রফতানির তোড়জোড়',
    subtitle: 'কৃষি বিভাগের ফ্রুটব্যাগিং ও আধুনিক নিরাপদ চাষাবাদে এবার রেকর্ড ফলনের আশা',
    excerpt: 'সাতক্ষীরার ভৌগোলিক নির্দেশক (জিআই) স্বীকৃত বিশ্ববিখ্যাত হিমসাগর, ল্যাংড়া ও গোবিন্দভোগ আম এ বছর ইউরোপের বাজারে রেকর্ড পরিমাণে রফতানির লক্ষ্যে প্রস্তুত হচ্ছে স্থানীয় বাগান মালিকরা।',
    content: `তালা ও কলারোয়া সংবাদদাতা:\nসাতক্ষীরার আবহাওয়া ও মাটির বিশেষ গুণাগুণের কারণে দেশের অন্যান্য অঞ্চলের চেয়ে প্রায় ২০ দিন আগেই বাজারে আসে এখানকার রসালো আম। এ বছর কোনো প্রকার প্রাকৃতিক দুর্যোগ না হওয়ায় জেলার কলারোয়া, তালা, দেবহাটা ও সদরের আম বাগানগুলোতে বাম্পার ফলনের সম্ভাবনা দেখা দিয়েছে।\n\nজেলা কৃষি সম্প্রসারণ অধিদপ্তরের উপ-পরিচালক জানান, জেলা প্রশাসন কর্তৃক প্রণীত 'ম্যাংগো ক্যালেন্ডার' অনুসারে আগামী মে মাসের শুরু থেকেই নিরাপদ ও বিষমুক্ত আম পাড়া শুরু হবে। এবার প্রায় সাড়ে চার হাজার হেক্টর জমিতে উন্নত ফ্রুটব্যাগিং প্রযুক্তিতে বিষমুক্ত আম উৎপাদিত হচ্ছে যা সরাসরি ইতালি, যুক্তরাজ্য ও মধ্যপ্রাচ্যের দেশসমূহে রফতানি করা হবে।`,
    category: 'সাতক্ষীরা',
    upazila: 'তালা',
    featuredImage: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'সাতক্ষীরার তালায় ফ্রুটব্যাগিং পদ্ধতিতে উৎপাদিত হিমসাগর আম বাগান।',
    author: {
      name: 'শেখ শফিকুল ইসলাম',
      role: 'কৃষি ও উন্নয়ন প্রতিবেদক',
      location: 'তালা, সাতক্ষীরা'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    isFeatured: true,
    isTrending: false,
    viewCount: 9450,
    tags: ['সাতক্ষীরা আম', 'হিমসাগর', 'তালা', 'কলারোয়া', 'কৃষি'],
    status: 'published',
    seo: {
      metaTitle: 'সাতক্ষীরার হিমসাগর আম ইউরোপে রফতানির প্রস্তুতি | The Satkhira Times',
      metaDescription: 'সাতক্ষীরার হিমসাগর ও ল্যাংড়া আম এবার ইউরোপের বাজারে রফতানির বিশাল প্রস্তুতি।'
    }
  },
  {
    id: 'art-4',
    slug: 'national-electoral-reform-commission-technology-recommendation',
    title: 'জাতীয় নির্বাচনে স্বচ্ছতা নিশ্চিতে ব্লকচেইন ও ভোটার অডিট ব্যবস্থার সুপারিশ',
    subtitle: 'নির্বাচন ব্যবস্থা সংস্কার কমিশনের খসড়া প্রতিবেদনে সুদূরপ্রসারী সংস্কারের প্রস্তাব',
    excerpt: 'ভবিষ্যতের জাতীয় ও স্থানীয় সরকার নির্বাচনে জনমতের নিখুঁত প্রতিফলন ঘটাতে নির্বাচন কমিশনের প্রশাসনিক কাঠামোর পরিবর্তন ও প্রযুক্তিনির্ভর অডিট ব্যবস্থার সুপারিশ করা হয়েছে।',
    content: `ঢাকা অফিস:\nনির্বাচন ব্যবস্থা সংস্কার কমিশন তাদের অন্তর্বর্তীকালীন প্রতিবেদনে দেশের গণতান্ত্রিক রূপান্তরে একাধিক মৌলিক সংস্কারের রূপরেখা প্রণয়ন করেছে। এতে প্রধান নির্বাচন কমিশনার ও অন্যান্য কমিশনার নিয়োগে সর্বদলীয় যাচাই কমিটি এবং জেলা ও উপজেলা পর্যায়ে নির্বাচন কর্মকর্তাদের নিরপেক্ষ বদলি নীতিমালা প্রণয়নের কথা বলা হয়েছে।\n\nকমিশনের প্রধান জানান, শুধু ব্যালট বা প্রযুক্তির ওপর নির্ভর না করে প্রতিটি ভোটকেন্দ্রে ভোটার ভেরিফায়েবল পেপার অডিট ট্রেইল (VVPAT) এবং বিকেন্দ্রীভূত ডিজিটাল মনিটরিং নিশ্চিত করার ওপর গুরুত্ব দেওয়া হয়েছে।`,
    category: 'রাজনীতি',
    featuredImage: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'রাজধানীতে নির্বাচন সংস্কার কমিশনের পরামর্শ সভা অনুষ্ঠিত।',
    author: {
      name: 'ফারহানা আহমেদ',
      role: 'রাজনৈতিক বিশ্লেষক',
      location: 'ঢাকা ব্যুরো'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    isTopHeadline: true,
    isFeatured: true,
    isTrending: true,
    viewCount: 16700,
    tags: ['রাজনীতি', 'নির্বাচন', 'সংস্কার', 'বাংলাদেশ', 'গণতন্ত্র'],
    status: 'published',
    seo: {
      metaTitle: 'নির্বাচন সংস্কার কমিশনের ঐতিহাসিক সুপারিশমালা | দ্য সাতক্ষীরা টাইমস',
      metaDescription: 'নির্বাচন স্বচ্ছ ও নিরপেক্ষ করতে প্রযুক্তি ও কাঠামোগত সংস্কারের প্রস্তাব।'
    }
  },
  {
    id: 'art-5',
    slug: 'coastal-embankment-sustainable-climate-resilience-assasuni',
    title: 'আশাশুনি ও শ্যামনগরে টেকসই বেড়িবাঁধ নির্মাণে মেগা প্রকল্প একনেকে অনুমোদন',
    subtitle: 'কপোতাক্ষ ও খোলপেটুয়া নদীর ভাঙন রোধে রিভারভিউ রিভেডমেন্ট ও জিও-টিউব প্রযুক্তি',
    excerpt: 'জলবায়ু পরিবর্তনের ক্ষতিকর প্রভাব ও সামুদ্রিক জলোচ্ছ্বাস থেকে সাতক্ষীরার উপকূলীয় জনপদকে রক্ষায় ৩ হাজার কোটি টাকার স্থায়ী বেড়িবাঁধ প্রকল্পের চূড়ান্ত অনুমোদন দিয়েছে সরকার।',
    content: `আশাশুনি প্রতিনিধি:\nঘূর্ণিঝড় রেমাল, আম্পান ও আইলার ক্ষত বয়ে বেড়ানো সাতক্ষীরার উপকূলবাসীর দীর্ঘদিনের প্রাণের দাবি ছিল টেকসই ও স্থায়ী কংক্রিট ব্লক দ্বারা বাঁধ নির্মাণ। জাতীয় অর্থনৈতিক পরিষদের নির্বাহী কমিটি (একনেক) আজ উপকূলীয় সুরক্ষা প্রকল্পের অনুমোদন দিয়েছে।\n\nপ্রকল্পের আওতায় আশাশুনির প্রতাপনগর, শ্রীউলা এবং শ্যামনগরের পদ্মপুকুর ও গাবুরা ইউনিয়নের ১২৭ কিলোমিটার ঝুঁকিপূর্ণ অংশে আধুনিক রিভেডমেন্ট, হাইড্রোলিক স্লুইসগেট এবং সাইক্লোন ড্রেনেজ সিস্টেম নির্মাণ করা হবে। স্থানীয় জনপ্রতিনিধিরা সরকারের এ পদক্ষেপকে স্বাগত জানিয়েছেন।`,
    category: 'সাতক্ষীরা',
    upazila: 'আশাশুনি',
    featuredImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'খোলপেটুয়া নদীর তীরে ভাঙন কবলিত আশাশুনির উপকূলীয় এলাকা।',
    author: {
      name: 'জিয়াউর রহমান',
      role: 'উপকূল ও পরিবেশ বার্তা',
      location: 'আশাশুনি, সাতক্ষীরা'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    isFeatured: true,
    isTrending: false,
    viewCount: 8890,
    tags: ['আশাশুনি', 'বেড়িবাঁধ', 'জলবায়ু', 'সাতক্ষীরা', 'একনেক'],
    status: 'published',
    seo: {
      metaTitle: 'আশাশুনি-শ্যামনগরে টেকসই বেড়িবাঁধ প্রকল্প অনুমোদন | The Satkhira Times',
      metaDescription: 'উপকূলবাসীর দীর্ঘদিনের দাবি পূরণে ৩ হাজার কোটি টাকার প্রকল্প অনুমোদন।'
    }
  },
  {
    id: 'art-6',
    slug: 'global-green-energy-summit-climate-action-treaty',
    title: 'জাতিসংঘ জলবায়ু সম্মেলনে জীবাশ্ম জ্বালানি পর্যায়ক্রমে বন্ধের ঐতিহাসিক চুক্তি',
    subtitle: 'ক্ষতিগ্রস্ত উপকূলীয় দেশগুলোর জন্য ১০০ বিলিয়ন ডলারের জলবায়ু ক্ষতিপূরণ তহবিল কার্যকর',
    excerpt: 'বিশ্বের ১৯০টিরও বেশি দেশের ঐকমত্যে নবায়নযোগ্য জ্বালানির ব্যবহার তিনগুণ বৃদ্ধি এবং ২০৫০ সালের মধ্যে কার্বন নিঃসরণ শূন্যে নামিয়ে আনার যুগান্তকারী চুক্তি স্বাক্ষরিত হয়েছে।',
    content: `আন্তর্জাতিক ডেস্ক:\nসুইজারল্যান্ডের জেনেভায় সমাপ্ত হওয়া বিশ্ব জলবায়ু শীর্ষ সম্মেলনে বিশ্বের উন্নয়নশীল ও ঝুঁকিপূর্ণ দেশগুলোর দীর্ঘদিনের দাবির প্রতি সম্মান জানিয়ে ঐতিহাসিক আর্থিক ঘোষণা দেওয়া হয়েছে। বাংলাদেশসহ জলবায়ু ঝুঁকিপূর্ণ দেশের তালিকাভুক্ত ৫০টি দেশকে পুনর্বাসন ও অবকাঠামো সুরক্ষায় অগ্রাধিকার দেওয়া হবে।`,
    category: 'আন্তর্জাতিক',
    featuredImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'জেনেভায় জাতিসংঘ জলবায়ু সম্মেলনের সমাপনী অধিবেশন।',
    author: {
      name: 'নাদিম হোসেন',
      role: 'আন্তর্জাতিক বিষয়ক সম্পাদক',
      location: 'লন্ডন ব্যুরো'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    isFeatured: false,
    isTrending: true,
    viewCount: 7650,
    tags: ['আন্তর্জাতিক', 'জলবায়ু', 'জাতিসংঘ', 'গ্রিন এনার্জি'],
    status: 'published',
    seo: {
      metaTitle: 'জলবায়ু সম্মেলনে ঐতিহাসিক চুক্তি | দ্য সাতক্ষীরা টাইমস',
      metaDescription: 'জাতিসংঘ জলবায়ু সম্মেলনে উপকূলীয় ক্ষতিগ্রস্ত দেশগুলোর জন্য বিশাল তহবিলের ঘোষণা।'
    }
  },
  {
    id: 'art-7',
    slug: 'champions-trophy-cricket-bangladesh-pakistan-thriller',
    title: 'মুস্তাফিজের বিধ্বংসী বোলিংয়ে পাকিস্তানকে হারিয়ে ফাইনালে বাংলাদেশ',
    subtitle: 'সাতক্ষীরার কৃতি সন্তান কাটার মাস্টার মুস্তাফিজের ৬ উইকেট শিকারের ম্যাজিক',
    excerpt: 'আইসিসি চ্যাম্পিয়ন্স ট্রফির শ্বাসরুদ্ধকর দ্বিতীয় সেমিফাইনালে পাকিস্তানের শক্তিশালী ব্যাটিং লাইনআপকে একাই গুড়িয়ে দিয়ে বাংলাদেশকে স্বপ্নের ফাইনালে তুলেছেন সাতক্ষীরার ছেলে মুস্তাফিজুর রহমান।',
    content: `ক্রীড়া ডেস্ক:\nদুবাই আন্তর্জাতিক স্টেডিয়ামে আজ এক রূপকথার জন্ম দিলেন বাংলাদেশের বাঁহাতি পেসার মুস্তাফিজুর রহমান। তার নিখুঁত কাটার ও রিভার্স সুইংয়ের কোনো জবাবই খুঁজে পাননি পাকিস্তানি ব্যাটাররা। নির্ধারিত ৯.৩ ওভারে মাত্র ২৮ রান দিয়ে ৬টি মহামূল্যবান উইকেট শিকার করেন তিনি।\n\nমুস্তাফিজের এই অবিশ্বাস্য নৈপুণ্যের পর তাঁর জন্মভূমি সাতক্ষীরার কালিগঞ্জ উপজেলার তারালী গ্রামে বইছে আনন্দের বন্যা। মিষ্টি বিতরণ ও উল্লাসে মেতে উঠেছে সাতক্ষীরাবাসী। ম্যাচসেরার পুরস্কার নেওয়ার সময় মুস্তাফিজ বলেন, "এই অর্জন আমার দেশের ১৬ কোটি মানুষের এবং আমার জন্মভূমি সাতক্ষীরাবাসীর জন্য।"`,
    category: 'খেলাধুলা',
    upazila: 'কালীগঞ্জ',
    featuredImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'মুস্তাফিজুর রহমানের স্মরণীয় বোলিং ফিগারে উল্লাসে ভাসল বাংলাদেশ দল।',
    author: {
      name: 'তানভীর আহমেদ',
      role: 'ক্রীড়া প্রতিবেদক',
      location: 'দুবাই থেকে'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    isTopHeadline: true,
    isFeatured: true,
    isTrending: true,
    viewCount: 28400,
    tags: ['ক্রিকেট', 'মুস্তাফিজুর রহমান', 'সাতক্ষীরা', 'কালীগঞ্জ', 'খেলাধুলা'],
    status: 'published',
    seo: {
      metaTitle: 'মুস্তাফিজের ম্যাজিকে ফাইনালে বাংলাদেশ | দ্য সাতক্ষীরা টাইমস',
      metaDescription: 'মুস্তাফিজুর রহমানের ৬ উইকেটে পাকিস্তানকে হারিয়ে স্বপ্নের ফাইনালে বাংলাদেশ।'
    }
  },
  {
    id: 'art-8',
    slug: 'ai-revolution-bangla-language-processing-bangladesh-tech',
    title: 'কৃত্রিম বুদ্ধিমত্তায় বাংলা ভাষার নির্ভুল অনুবাদের নতুন দেশীয় এআই মডেল উন্মোচন',
    subtitle: 'চিকিৎসা, আইনি নথি ও শিক্ষাক্ষেত্রে যুগান্তকারী পরিবর্তন আনবে নতুন অ্যালগরিদম',
    excerpt: 'বাংলাদেশের শীর্ষ প্রকৌশলী ও গবেষকদের যৌথ প্রচেষ্টায় বাংলা ভাষা ও আঞ্চলিক কথ্য ভাষার জটিল ব্যাকরণ নিখুঁতভাবে বুঝতে সক্ষম বিশেষায়িত লার্জ ল্যাঙ্গুয়েজ মডেল (LLM) প্রকাশ্যে এলো।',
    content: `বিজ্ঞান ও প্রযুক্তি প্রতিবেদক:\nবাংলা ভাষার আঞ্চলিক বৈচিত্র্য, বানানরীতি ও সাংস্কৃতিক প্রেক্ষাপট অনুধাবনে বিদেশি এআই মডেলগুলোর দুর্বলতা কাটিয়ে উঠতে প্রস্তুত করা হয়েছে শতভাগ দেশীয় এআই ইঞ্জিন 'মাতৃভাষা-১'।\n\nপ্রকল্পটির প্রধান গবেষক জানান, এই মডেলে সাতক্ষীরা, চট্টগ্রাম, সিলেট ও বরিশালের স্থানীয় উপভাষার শব্দকোষও যুক্ত করা হয়েছে। ফলে সরকারি দফতর, আদালত এবং প্রত্যন্ত অঞ্চলের শিক্ষার্থীরা সহজেই নির্ভুল অনুবাদ ও সারাংশ তৈরি করতে পারবে।`,
    category: 'প্রযুক্তি',
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'বাংলা এআই প্রযুক্তির উন্মোচনী অনুষ্ঠান।',
    author: {
      name: 'প্রকৌশলী সুজন মাহমুদ',
      role: 'আইটি ও টেকনোলজি বিশ্লেষক',
      location: 'সাতক্ষীরা'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
    isFeatured: true,
    isTrending: false,
    viewCount: 6520,
    tags: ['প্রযুক্তি', 'এআই', 'বাংলা', 'উদ্ভাবন', 'সফটওয়্যার'],
    status: 'published',
    seo: {
      metaTitle: 'বাংলা ভাষার বিশেষায়িত এআই মডেল উন্মোচিত | The Satkhira Times',
      metaDescription: 'বাংলা ভাষা ও উপভাষায় নির্ভুল অনুবাদের জন্য তৈরি হলো দেশীয় এআই মডেল।'
    }
  },
  {
    id: 'art-9',
    slug: 'editorial-opinion-satkhira-development-potentials-challenges',
    title: 'মতামত: সম্ভাবনা ও চ্যালেঞ্জের মুখোমুখি সম্ভাবনাময় সাতক্ষীরা জেলা',
    subtitle: 'সুন্দরবন পর্যটন, সাদা সোনা চিংড়ি ও আম রফতানিতে পরিকল্পিত মহাপরিকল্পনা প্রয়োজন',
    excerpt: 'দক্ষিণ-পশ্চিম সীমান্তের উপকূলীয় জেলা সাতক্ষীরা দেশের অর্থনীতিতে প্রতি বছর হাজার হাজার কোটি টাকার বৈদেশিক মুদ্রা যোগান দেয়। তবে অবকাঠামোগত ঘাটতি ও যোগাযোগ ব্যবস্থার সংকট দূর করা জরুরি।',
    content: `সম্পাদকীয় ও উপ-সম্পাদকীয়:\nপ্রাকৃতিক সম্পদে সমৃদ্ধ আমাদের সাতক্ষীরা। একদিকে সুন্দরবনের অপার মায়াবী বনানী, অন্যদিকে হাজার একর চিংড়ি ঘের আর সুস্বাদু আমের প্রাচুর্য। ভোমরা স্থলবন্দর আজ দেশের অন্যতম প্রধান বাণিজ্য গেটওয়ে। অথচ জেলাবাসীর উন্নত স্বাস্থ্যসেবা, রেল যোগাযোগ এবং নদীভাঙ্গন প্রতিরোধের জন্য যে স্থায়ী অবকাঠামো দরকার ছিল, তা দীর্ঘদিন অবহেলিত থেকে গেছে।\n\nপদ্মা সেতু চালুর পর ঢাকার সাথে সড়ক দূরত্ব কমলেও নাভারণ থেকে সাতক্ষীরা হয়ে মুন্সীগঞ্জ পর্যন্ত আধুনিক রেললাইন স্থাপন এখন সময়ের দাবি। এছাড়া স্থানীয় কৃষক ও মৎস্যচাষীদের জন্য আধুনিক হিমাগার ও প্রক্রিয়াজাতকরণ প্ল্যান্ট স্থাপন করা হলে এ অঞ্চলের দারিদ্র্য বিমোচনে তা মাইলফলক হবে।`,
    category: 'মতামত',
    featuredImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'সাতক্ষীরার সার্বিক উন্নয়ন ভাবনা। ছবি: দ্য সাতক্ষীরা টাইমস',
    author: {
      name: 'মো: আল ইমরান হোসেন',
      role: 'কলামিস্ট ও লেখক',
      location: 'সাতক্ষীরা সরকারি কলেজ',
      avatar: ''
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 620).toISOString(),
    isFeatured: true,
    isTrending: false,
    viewCount: 5240,
    tags: ['মতামত', 'সাতক্ষীরা উন্নয়ন', 'সম্পাদকীয়', 'অর্থনীতি'],
    status: 'published',
    seo: {
      metaTitle: 'সম্ভাবনা ও চ্যালেঞ্জের মুখে সাতক্ষীরা | মতামত',
      metaDescription: 'সাতক্ষীরার পর্যটন, বাণিজ্য ও সামগ্রিক টেকসই উন্নয়ন নিয়ে বিশেষ কলাম।'
    }
  },
  {
    id: 'art-10',
    slug: 'satkhira-bagda-shrimp-hatchery-virus-free-post-larvae-success',
    title: 'দেবহাটা ও কালিগঞ্জে ভাইরাস-মুক্ত এসপিএফ বাগদা পোনা উৎপাদনে বিপ্লব',
    subtitle: 'চিংড়ি রফতানিতে ফিরছে সুদিন, ঘের মালিকদের মুখে সন্তুষ্টির হাসি',
    excerpt: 'আধুনিক বায়োসিকিউরড হ্যাচারিতে উৎপাদিত বিশেষ রোগ প্রতিরোধী এসপিএফ বাগদা পিএল চাষ করে সাতক্ষীরার খামারিরা পাচ্ছেন অভূতপূর্ব সাফল্য। রফতানি আয় বৃদ্ধির উজ্জ্বল সম্ভাবনা।',
    content: `দেবহাটা সংবাদদাতা:\nসাতক্ষীরার অর্থনীতির মূল চালিকাশক্তি 'সাদা সোনা' খ্যাত বাগদা চিংড়ি। গত কয়েক বছর ধরে নানা ভাইরাসের কারণে লোকসানে পড়া খামারিরা এবার আধুনিক বৈজ্ঞানিক পদ্ধতিতে এসপিএফ (Specific Pathogen Free) পোনা মজুত করে বাম্পার ফলন পেয়েছেন।\n\nমৎস্য গবেষণা ইনস্টিটিউটের কারিগরি সহায়তায় দেবহাটা ও কালিগঞ্জ উপজেলার প্রায় দুই শতাধিক প্রদর্শনী ঘেরে এ পোনা ছাড়া হয়েছিল। গড় উৎপাদন সনাতন পদ্ধতির চেয়ে প্রায় আড়াই গুণ বৃদ্ধি পেয়েছে।`,
    category: 'সাতক্ষীরা',
    upazila: 'দেবহাটা',
    featuredImage: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'দেবহাটার আধুনিক বায়োসিকিউরড বাগদা চিংড়ি খামারে পরিচর্যা।',
    author: {
      name: 'মাহবুবুর রহমান',
      role: 'মৎস্য ও উপকূল বার্তা',
      location: 'দেবহাটা'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 750).toISOString(),
    isFeatured: false,
    isTrending: false,
    viewCount: 4980,
    tags: ['দেবহাটা', 'চিংড়ি', 'সাদা সোনা', 'মৎস্য', 'সাতক্ষীরা'],
    status: 'published',
    seo: {
      metaTitle: 'দেবহাটা ও কালিগঞ্জে বাগদা চিংড়িতে বিপ্লব | দ্য সাতক্ষীরা টাইমস',
      metaDescription: 'এসপিএফ বাগদা পোনা উৎপাদনে সাতক্ষীরায় চিংড়ি চাষে নতুন দিগন্ত।'
    }
  }
];

export const INITIAL_PHOTO_STORIES: PhotoStory[] = [
  {
    id: 'ps-1',
    title: 'কুয়াশাভেজা ভোরে কপোতাক্ষ নদে জেলেদের মাছ ধরার মনোমুগ্ধকর দৃশ্য',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    photographer: 'কাজী আরিফুল হক',
    location: 'তালা, সাতক্ষীরা',
    caption: 'মহাকবি মাইকেল মধুসূদন দত্তের স্মৃতিবিজড়িত কপোতাক্ষ নদের শান্ত বুকে জালে রূপালি মাছের ঝলক।',
    date: '১ সেপ্টেম্বর ২০২৬'
  },
  {
    id: 'ps-2',
    title: 'মুন্সীগঞ্জের সুন্দরবন পয়েন্টে সূর্যাস্তের রক্তিম আভা',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&auto=format&fit=crop&q=80',
    photographer: 'আরিফ জামান',
    location: 'শ্যামনগর, সাতক্ষীরা',
    caption: 'পর্যটকদের অন্যতম প্রিয় স্থান শ্যামনগরের সুন্দরবন ইকোপার্ক থেকে ক্যামেরাবন্দী শেষ বিকেলের সুর্য।',
    date: '৩১ আগস্ট ২০২৬'
  },
  {
    id: 'ps-3',
    title: 'সাতক্ষীরার রসালো হিমসাগর ও আম্রপালি আহরণ ও প্যাকিং উৎসব',
    imageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=1200&auto=format&fit=crop&q=80',
    photographer: 'রকিবুল ইসলাম',
    location: 'কলারোয়া, সাতক্ষীরা',
    caption: 'রফতানিযোগ্য আম সুবিন্যস্তভাবে গ্রেডিং ও ক্যারেটে সাজাচ্ছেন স্থানীয় কৃষিশ্রমিকরা।',
    date: '৩০ আগস্ট ২০২৬'
  },
  {
    id: 'ps-4',
    title: 'ঐতিহাসিক ঈশ্বরীপুর হাম্মামখানা ও যশোরেশ্বরী মন্দির প্রাঙ্গণ',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop&q=80',
    photographer: 'সুজন চৌধুরী',
    location: 'ঈশ্বরীপুর, শ্যামনগর',
    caption: 'সাতক্ষীরার প্রাচীন প্রত্নতাত্ত্বিক ঐতিহ্যের সাক্ষী রাজা প্রতাপাদিত্যের রাজধানী ঈশ্বরীপুর।',
    date: '২৯ আগস্ট ২০২৬'
  }
];

export const INITIAL_VIDEO_NEWS: VideoNews[] = [
  {
    id: 'vn-1',
    title: 'ভিডিও প্রতিবেদন: সুন্দরবনের খাঁড়ি বেয়ে মধু আহরণে মৌয়ালদের রোমাঞ্চকর যাত্রা',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1544985361-b552945d8b88?w=800&auto=format&fit=crop&q=80',
    duration: '০৫:২৪',
    publishedAt: '২ ঘণ্টা আগে',
    viewCount: 24500
  },
  {
    id: 'vn-2',
    title: 'সাতক্ষীরার ভোমরা স্থলবন্দরে আধুনিক ওয়্যারহাউস ও অটোমেশনের বিশেষ রিপোর্ট',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    duration: '০৩:৪৫',
    publishedAt: '৬ ঘণ্টা আগে',
    viewCount: 18200
  },
  {
    id: 'vn-3',
    title: 'মুস্তাফিজের গ্রাম তারালীতে উৎসবের আমেজ: এলাকাবাসী ও পরিবারের উচ্ছ্বাস',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80',
    duration: '০৪:১২',
    publishedAt: '১ দিন আগে',
    viewCount: 42100
  }
];

export const INITIAL_POLL: PollQuestion = {
  id: 'poll-1',
  question: 'আপনি কি মনে করেন সাতক্ষীরা থেকে দ্রুত রাজধানী পর্যন্ত রেললাইন সংযোগ স্থাপন করা উচিত?',
  totalVotes: 3840,
  options: [
    { id: 'opt-1', text: 'হ্যাঁ, এটি অতি জরুরি', votes: 3420 },
    { id: 'opt-2', text: 'না, সড়কের উন্নয়নই যথেষ্ট', votes: 280 },
    { id: 'opt-3', text: 'মন্তব্য নেই', votes: 140 }
  ],
  isActive: true,
  createdAt: new Date().toISOString()
};

export const INITIAL_ADS: AdConfiguration[] = [
  {
    id: 'ad-header',
    slot: 'header_banner',
    name: 'টপ হেডার ব্যানার (728x90 Banner)',
    enabled: true,
    bannerType: 'script',
    dimensions: '728x90',
    bannerImageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=80',
    targetUrl: 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2',
    codeSnippet: `<script type="text/javascript">
  atOptions = {
    'key' : '6899df43cee03e4cbbb606088858f40c',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script type="text/javascript" src="https://www.highrevenueformat.com/6899df43cee03e4cbbb606088858f40c/invoke.js"></script>`,
    note: 'Adsterra 728x90 হেডার ব্যানার বিজ্ঞাপন (কী: 6899df43cee03e4cbbb606088858f40c)।'
  },
  {
    id: 'ad-sidebar',
    slot: 'sidebar_banner',
    name: 'সাইডবার ব্যানার বিজ্ঞাপন (300x250 Banner)',
    enabled: true,
    bannerType: 'script',
    dimensions: '300x250',
    bannerImageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    targetUrl: 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2',
    codeSnippet: `<script type="text/javascript">
  atOptions = {
    'key' : '1b7a4aa64f6c8149c78e46f70b159fc8',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script type="text/javascript" src="https://www.highrevenueformat.com/1b7a4aa64f6c8149c78e46f70b159fc8/invoke.js"></script>`,
    note: 'Adsterra 300x250 সাইডবার বিজ্ঞাপন (কী: 1b7a4aa64f6c8149c78e46f70b159fc8)।'
  },
  {
    id: 'ad-in-article',
    slot: 'in_article',
    name: 'নেটিভ ব্যানার বিজ্ঞাপন (Native Banner)',
    enabled: true,
    bannerType: 'script',
    dimensions: 'Native',
    bannerImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
    targetUrl: 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2',
    codeSnippet: `<script async="async" data-cfasync="false" src="https://pl31125550.profitableratecpmnetwork.com/9d9df04b79418e31830e5386e0057871/invoke.js"></script>
<div id="container-9d9df04b79418e31830e5386e0057871"></div>`,
    note: 'Adsterra নেটিভ ব্যানার বিজ্ঞাপন (সংবাদের ভেতরে ও হোমপেজে স্বয়ংক্রিয়ভাবে উপস্থাপিত)।'
  },
  {
    id: 'ad-footer',
    slot: 'footer_banner',
    name: 'স্টিকি ফুটার ব্যানার (Sticky Footer 728x90)',
    enabled: true,
    bannerType: 'script',
    dimensions: '728x90',
    bannerImageUrl: 'https://images.unsplash.com/photo-1508873696983-2df570464756?w=1200&auto=format&fit=crop&q=80',
    targetUrl: 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2',
    codeSnippet: `<script type="text/javascript">
  atOptions = {
    'key' : '6899df43cee03e4cbbb606088858f40c',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script type="text/javascript" src="https://www.highrevenueformat.com/6899df43cee03e4cbbb606088858f40c/invoke.js"></script>`,
    note: 'স্ক্রিনের নিচে ভাসমান Adsterra স্টিকি ব্যানার 728x90।'
  },
  {
    id: 'ad-popunder',
    slot: 'popunder',
    name: 'Adsterra Popunder Ads',
    enabled: true,
    bannerType: 'script',
    targetUrl: 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2',
    codeSnippet: `<script type="text/javascript" src="https://pl31125455.profitableratecpmnetwork.com/d5/dd/ec/d5ddec2a1a03f6d7d8e6be14f9a193e5.js"></script>`,
    note: 'Adsterra পপআন্ডার স্ক্রিপ্ট (ব্যবহারকারীর ক্লিকে ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে সক্রিয়)।'
  },
  {
    id: 'ad-popup',
    slot: 'popup',
    name: 'পপ-আপ বিজ্ঞাপন উইন্ডো (Pop-up Modal Banner)',
    enabled: true,
    bannerType: 'image',
    dimensions: '600x400',
    bannerImageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80',
    targetUrl: 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2',
    codeSnippet: `<div style="text-align:center;"><a href="https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2" target="_blank"><img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80" style="max-width:100%; border-radius:12px;" /></a></div>`,
    note: 'সাইটে প্রবেশের ২-৩ সেকেন্ড পর ভাসমান পপ-আপ অ্যাড উইন্ডো (ক্রস দিয়ে বন্ধ ও অফার দেখার ব্যবস্থা)।'
  },
  {
    id: 'ad-socialbar',
    slot: 'socialbar',
    name: 'Adsterra Social Bar Ads',
    enabled: true,
    bannerType: 'script',
    codeSnippet: `<script src="https://pl31125456.profitableratecpmnetwork.com/9b/98/69/9b986949090d2888ce3569ade4c3f2b2.js"></script>`,
    note: 'Adsterra সোশ্যাল বার নোটিফিকেশন ও ইন্টারেক্টিভ বিজ্ঞাপন স্ক্রিপ্ট।'
  },
  {
    id: 'ad-direct-link',
    slot: 'direct_link',
    name: 'Adsterra Direct Link (High CPM)',
    enabled: true,
    bannerType: 'direct_link',
    targetUrl: 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2',
    codeSnippet: 'https://www.profitableratecpmnetwork.com/nvag1ssim?key=e38ebb997da56e359a48ee9f605736e2',
    note: 'Adsterra ডাইরেক্ট স্মার্ট আর্নিং লিঙ্ক।'
  }
];

export const INITIAL_CATEGORIES: { name: string; slug: string; color: string; iconName: string }[] = [
  { name: 'সাতক্ষীরা', slug: 'সাতক্ষীরা', color: '#b91c1c', iconName: 'MapPin' },
  { name: 'জাতীয়', slug: 'জাতীয়', color: '#047857', iconName: 'Flag' },
  { name: 'রাজনীতি', slug: 'রাজনীতি', color: '#1d4ed8', iconName: 'Landmark' },
  { name: 'আন্তর্জাতিক', slug: 'আন্তর্জাতিক', color: '#4338ca', iconName: 'Globe' },
  { name: 'খেলাধুলা', slug: 'খেলাধুলা', color: '#ea580c', iconName: 'Trophy' },
  { name: 'বিনোদন', slug: 'বিনোদন', color: '#db2777', iconName: 'Film' },
  { name: 'ব্যবসা-বাণিজ্য', slug: 'ব্যবসা-বাণিজ্য', color: '#0f766e', iconName: 'TrendingUp' },
  { name: 'প্রযুক্তি', slug: 'প্রযুক্তি', color: '#7c3aed', iconName: 'Cpu' },
  { name: 'মতামত', slug: 'মতামত', color: '#374151', iconName: 'PenTool' },
  { name: 'জীবনযাপন', slug: 'জীবনযাপন', color: '#ca8a04', iconName: 'Smile' },
  { name: 'পরিবেশ ও সুন্দরবন', slug: 'পরিবেশ ও সুন্দরবন', color: '#15803d', iconName: 'Trees' }
];

export const SATKHIRA_UPAZILAS = [
  'সকল',
  'সাতক্ষীরা সদর',
  'শ্যামনগর',
  'কালীগঞ্জ',
  'তালা',
  'আশাশুনি',
  'দেবহাটা',
  'কলারোয়া'
] as const;

export const INITIAL_REPORTERS: ReporterAccount[] = [
  {
    id: 'rep-1',
    name: 'মো: মনিরুল ইসলাম',
    email: 'monirul@satkhiratimes.com',
    phone: '01712345001',
    password: '1234',
    designation: 'উপকূল ও সুন্দরবন প্রতিনিধি',
    upazila: 'শ্যামনগর',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    canAutoPublish: true,
    joinedDate: '২০২৫-০১-১০',
    pressCardNumber: 'ST-REP-2025-01',
    bio: 'উপকূলীয় জলবায়ু পরিবর্তন, সুন্দরবনের পরিবেশ ও জেলে-বাওয়ালী সম্প্রদায়ের জীবন নিয়ে নিয়মিত অনুসন্ধানী প্রতিবেদন তৈরি করেন।'
  },
  {
    id: 'rep-2',
    name: 'এস এম হাবিবুর রহমান',
    email: 'habib@satkhiratimes.com',
    phone: '01712345002',
    password: '1234',
    designation: 'কালীগঞ্জ ও দেবহাটা প্রতিনিধি',
    upazila: 'কালীগঞ্জ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    canAutoPublish: true,
    joinedDate: '২০২৫-০২-১৫',
    pressCardNumber: 'ST-REP-2025-02',
    bio: 'সীমান্ত বাণিজ্য, কৃষি অর্থনীতি ও স্থানীয় উন্নয়ন কর্মকাণ্ড নিয়ে কাজ করেন।'
  },
  {
    id: 'rep-3',
    name: 'কাজী শামীম আহমেদ',
    email: 'shamim@satkhiratimes.com',
    phone: '01712345003',
    password: '1234',
    designation: 'তালা ও আশাশুনি প্রতিনিধি',
    upazila: 'তালা',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    canAutoPublish: false,
    joinedDate: '২০২৫-০৪-০১',
    pressCardNumber: 'ST-REP-2025-03',
    bio: 'কপোতাক্ষ নদের খনন, জলাবদ্ধতা ও গ্রামীণ জনজীবনের বিভিন্ন সমস্যা তুলে ধরেন।'
  },
  {
    id: 'rep-4',
    name: 'মোছা: সাবরিনা সুলতানা',
    email: 'sabrina@satkhiratimes.com',
    phone: '01712345004',
    password: '1234',
    designation: 'স্টাফ রিপোর্টার (সাতক্ষীরা সদর)',
    upazila: 'সাতক্ষীরা সদর',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    canAutoPublish: true,
    joinedDate: '২০২৫-০৩-২০',
    pressCardNumber: 'ST-REP-2025-04',
    bio: 'আইন-আদালত, জেলা প্রশাসন ও নাগরিক সেবা সংক্রান্ত খবরাখবর কভার করেন।'
  },
  {
    id: 'rep-5',
    name: 'আব্দুল কাদের চৌধুরী',
    email: 'kader@satkhiratimes.com',
    phone: '01712345005',
    password: '1234',
    designation: 'কলারোয়া প্রতিনিধি (আবেদন প্রক্রিয়াধীন)',
    upazila: 'কলারোয়া',
    status: 'pending',
    canAutoPublish: false,
    joinedDate: '২০২৬-০২-২৮',
    pressCardNumber: 'ST-REP-PENDING',
    bio: 'সীমান্ত এলাকার চোরাচালান প্রতিরোধ ও স্থানীয় শিক্ষা খাতের খবর সংগ্রহ করেন।'
  }
];

