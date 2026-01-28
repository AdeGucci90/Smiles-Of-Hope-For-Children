
import React from 'react';
import { View } from '../App';
import { BlogPost } from '../types';

interface BlogPageProps {
  onNavigate: (view: View, missionId?: string) => void;
  posts: BlogPost[];
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, posts }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Integrated Blue Filter Page Header */}
      <div className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-[#4FA3D1] text-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black font-playful mb-6 drop-shadow-xl">Our Missions</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 font-medium font-sans">
            Stories of impact, field updates, and success stories from our missions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group border border-slate-100 cursor-pointer"
              onClick={() => onNavigate('mission-detail', post.id)}
            >
              <div className="relative overflow-hidden h-72">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4FA3D1]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-6 left-6 bg-[#F6C453] text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  {post.category}
                </div>
              </div>
              <div className="p-10 flex-grow space-y-4 font-sans">
                <span className="text-slate-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#4FA3D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {formatDate(post.date)}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#4FA3D1] transition-colors leading-tight font-playful">
                  {post.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{post.excerpt}</p>
                <div className="pt-6 border-t border-slate-50">
                   <button 
                     onClick={(e) => { e.stopPropagation(); onNavigate('mission-detail', post.id); }}
                     className="text-lg font-playful font-bold text-[#4FA3D1] flex items-center gap-2 hover:gap-4 transition-all"
                   >
                     Read Full Story <span>→</span>
                   </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
