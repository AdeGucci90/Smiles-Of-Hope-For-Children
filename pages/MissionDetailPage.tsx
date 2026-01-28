
import React, { useState } from 'react';
import { View } from '../App';
import { BlogPost } from '../types';

interface MissionDetailPageProps {
  missionId: string | null;
  onNavigate: (view: View, missionId?: string) => void;
  posts: BlogPost[];
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const MissionDetailPage: React.FC<MissionDetailPageProps> = ({ missionId, onNavigate, posts }) => {
  const post = posts.find(p => p.id === missionId);
  const [activeSlide, setActiveSlide] = useState(0);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">Mission Not Found</h2>
          <button 
            onClick={() => onNavigate('missions')}
            className="text-[#4FA3D1] font-bold border-b-2 border-[#4FA3D1]"
          >
            Back to Missions
          </button>
        </div>
      </div>
    );
  }

  const gallery = post.gallery && post.gallery.length > 0 ? post.gallery : [post.image];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % gallery.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + gallery.length) % gallery.length);

  // Helper to determine if the video is an external link or local upload
  const isExternalVideo = post.video && (
    post.video.includes('youtube') || 
    post.video.includes('vimeo') || 
    post.video.includes('embed') || 
    post.video.includes('youtu.be')
  );
  
  const isLocalVideo = post.video && post.video.startsWith('data:video');

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-[#4FA3D1] text-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
          style={{ backgroundImage: `url(${post.image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="flex justify-center mb-6">
            <span className="bg-[#F6C453] text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black font-playful mb-6 drop-shadow-xl max-w-4xl mx-auto leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/90 font-medium">
             <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {formatDate(post.date)}
             </span>
             <span className="w-2 h-2 rounded-full bg-white/30"></span>
             <span>Mission Story</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-12">
            
            {/* Video or Gallery Slider */}
            {isExternalVideo ? (
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-black border-8 border-white relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={post.video!.includes('embed') ? post.video : post.video!.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : isLocalVideo ? (
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-black border-8 border-white relative">
                <video 
                  src={post.video} 
                  controls 
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="relative group">
                <div className="aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100 border-8 border-white relative">
                    {gallery.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
                        alt={`Gallery ${idx}`}
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Controls */}
                {gallery.length > 1 && (
                  <>
                    <button 
                      onClick={prevSlide}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white hover:text-[#4FA3D1] transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                    >
                      ←
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white hover:text-[#4FA3D1] transition-all opacity-0 group-hover:opacity-100 shadow-xl"
                    >
                      →
                    </button>
                    
                    {/* Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                        {gallery.map((_, idx) => (
                          <button 
                            key={idx}
                            onClick={() => setActiveSlide(idx)}
                            className={`h-2 rounded-full transition-all ${idx === activeSlide ? 'w-8 bg-[#F6C453]' : 'w-2 bg-white/50'}`}
                          />
                        ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Article Text */}
            <div className="prose prose-xl max-w-none font-sans text-slate-700 leading-relaxed whitespace-pre-wrap">
               {post.content || post.excerpt}
            </div>

            <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
               <button 
                onClick={() => onNavigate('missions')}
                className="flex items-center gap-2 text-[#4FA3D1] font-bold text-lg hover:text-slate-900 transition-colors"
               >
                 <span>←</span> Back to all Missions
               </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-10">
             <div className="bg-[#EBF6FC] p-10 rounded-[3rem] space-y-6 shadow-sm sticky top-32">
                <h4 className="text-2xl font-bold font-playful text-[#4FA3D1]">Make a Difference</h4>
                <p className="text-slate-600 font-sans leading-relaxed">
                  Every mission is possible because of supporters like you. Help us fund our next outreach.
                </p>
                <button 
                  onClick={() => onNavigate('donate')}
                  className="w-full bg-[#F6C453] text-slate-900 font-bold py-4 rounded-2xl text-lg hover:bg-[#4FA3D1] hover:text-white transition-all shadow-xl"
                >
                  Donate to this Cause
                </button>
                <div className="pt-6 border-t border-[#4FA3D1]/10">
                  <p className="text-xs text-[#4FA3D1] font-bold uppercase tracking-widest mb-4">Other Recent Missions</p>
                  <div className="space-y-4">
                    {posts.filter(p => p.id !== post.id).slice(0, 2).map(other => (
                      <button 
                        key={other.id}
                        onClick={() => onNavigate('mission-detail', other.id)}
                        className="flex items-center gap-4 group text-left w-full"
                      >
                        <img src={other.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                        <div>
                          <h5 className="font-bold text-slate-900 line-clamp-1 group-hover:text-[#4FA3D1] transition-colors">{other.title}</h5>
                          <span className="text-xs text-slate-400">{formatDate(other.date)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionDetailPage;
