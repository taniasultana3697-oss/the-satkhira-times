import React, { useState } from 'react';
import { useNews } from '../../context/NewsContext';
import { Camera, Video, Play, X, MapPin, Eye, ChevronRight } from 'lucide-react';
import { PhotoStory, VideoNews } from '../../types';
import { toBengaliDigits } from '../../utils/helpers';

export const MediaGallerySection: React.FC = () => {
  const { photoStories, videoNews } = useNews();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoStory | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoNews | null>(null);

  return (
    <section className="my-8 bg-slate-950 text-white rounded-2xl p-5 md:p-8 shadow-xl">
      
      {/* 1. PHOTO STORIES */}
      <div className="mb-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-600 rounded-lg text-white">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-bangla text-white">
                ছবিতে সাতক্ষীরা ও সুন্দরবন
              </h3>
              <p className="text-xs text-slate-400">ক্যামেরার লেন্সে উপকূলীয় প্রকৃতি, নদী ও মানুষের জীবনগাথা</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photoStories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedPhoto(story)}
              className="group cursor-pointer bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md hover:border-red-500 transition duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <span className="absolute bottom-2 left-2 text-[11px] text-amber-300 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {story.location}
                </span>
              </div>

              <div className="p-3">
                <h4 className="font-semibold text-xs sm:text-sm text-slate-200 line-clamp-2 group-hover:text-red-400 transition font-serif-bangla leading-snug">
                  {story.title}
                </h4>
                <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>ছবি: {story.photographer}</span>
                  <span>{story.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. VIDEO NEWS */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-600 rounded-lg text-white">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-bangla text-white">
                ভিডিও সংবাদ ও স্পেশাল রিপোর্ট
              </h3>
              <p className="text-xs text-slate-400">মাঠপর্যায়ের নির্ভরযোগ্য ভিডিও প্রতিবেদন</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {videoNews.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md hover:border-red-500 transition duration-300"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-800">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-sm text-slate-200 line-clamp-2 group-hover:text-red-400 transition font-serif-bangla leading-snug mb-2">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{video.publishedAt}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {toBengaliDigits(video.viewCount)} ভিউ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PHOTO LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 relative">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 text-slate-200">
              <div className="flex items-center gap-2 text-xs text-amber-400 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedPhoto.location}</span>
                <span>•</span>
                <span>ছবি: {selectedPhoto.photographer}</span>
                <span>•</span>
                <span>{selectedPhoto.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white font-serif-bangla mb-2">{selectedPhoto.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO PLAYER MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video bg-black">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white font-serif-bangla mb-1">{selectedVideo.title}</h3>
              <div className="text-xs text-slate-400 flex items-center gap-3">
                <span>{selectedVideo.publishedAt}</span>
                <span>•</span>
                <span>{toBengaliDigits(selectedVideo.viewCount)} ভিউ</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
