
import React from 'react';
import { BlogPost } from '../types';
import { View } from '../App';

interface BlogSectionProps {
  onNavigate: (view: View, missionId?: string) => void;
  posts: BlogPost[];
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const BlogSection: React.FC<BlogSectionProps> = ({ onNavigate, posts }) => {
  // Show only first 3 posts on home page
  const displayPosts = posts.slice(0, 3);

  return (
    <section id="missions" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-4">
            <span className="text-[#4FA3D1] font-bold uppercase tracking-widest text-sm">Missions & Updates</span>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">
              Latest from <span className="text-[#F6C453]">Our Field Missions</span>
            </h2>
            <p className="text-slate-600 max-w-xl">
              Stay updated with our recent field activities, success stories, and expert oral health missions in underserved communities.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('missions')}
            className="text-[#4FA3D1] font-bold border-b-2 border-[#4FA3D1] hover:text-[#F6C453] hover:border-[#F6C453] transition-all"
          >
            View All Missions
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group cursor-pointer"
              onClick={() => onNavigate('mission-detail', post.id)}
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#4FA3D1]/70 via-[#4FA3D1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                   </div>
                </div>

                <div className="absolute top-4 left-4 bg-[#F6C453] text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col space-y-4">
                <div className="flex items-center text-slate-400 text-xs font-medium uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-[#4FA3D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {formatDate(post.date)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#4FA3D1] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <div className="pt-4 border-t border-slate-50">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNavigate('mission-detail', post.id); }}
                    className="inline-flex items-center gap-2 text-[#4FA3D1] font-bold text-lg font-playful group-hover:text-[#F6C453] group-hover:gap-3 transition-all tracking-wide"
                  >
                    Read More <span>→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
