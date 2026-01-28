
import React, { useState, useRef, useEffect } from 'react';
import { BlogPost } from '../types';
import { View } from '../App';

interface AdminPageProps {
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  onNavigate: (view: View) => void;
}

const DRAFT_KEY = 'smiles_of_hope_draft_v3';

// Utility to ensure date strings are in YYYY-MM-DD for the date input
const formatDateForInput = (dateStr: string | undefined): string => {
  if (!dateStr) return '';
  // Check if already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  
  // Attempt to parse other formats
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  return '';
};

const AdminPage: React.FC<AdminPageProps> = ({ posts, setPosts, onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Editor states
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Restore draft if exists on mount
  useEffect(() => {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed && typeof parsed === 'object') {
          setEditingPost({
            id: parsed.id || Date.now().toString(),
            title: parsed.title || '',
            date: formatDateForInput(parsed.date) || new Date().toISOString().split('T')[0],
            category: parsed.category || 'Upcoming',
            excerpt: parsed.excerpt || '',
            image: parsed.image || '',
            content: parsed.content || '',
            gallery: parsed.gallery || [],
            ...parsed
          });
          setIsEditing(true);
        }
      }
    } catch (e) {
      console.warn("Draft recovery failed or storage corrupted.");
    }
  }, []);

  // Persist draft to survive refreshes
  useEffect(() => {
    if (isEditing && editingPost) {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(editingPost));
      } catch (e) {
        if (e instanceof Error && e.name === 'QuotaExceededError') {
          console.warn("Local storage quota exceeded. Draft might not be saved.");
        }
      }
    } else {
      localStorage.removeItem(DRAFT_KEY);
    }
  }, [editingPost, isEditing]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password.trim() === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please use admin / admin');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'gallery') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      if (file.size > 15 * 1024 * 1024) {
        alert("File is too large (>15MB). Please use a smaller file to avoid browser storage issues.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === 'gallery') {
          setEditingPost(prev => {
            if (!prev) return null;
            return { ...prev, gallery: [...(prev.gallery || []), base64String] };
          });
        } else {
          setEditingPost(prev => {
            if (!prev) return null;
            return { ...prev, [type]: base64String };
          });
        }
      };
      reader.readAsDataURL(file);
    });
    
    e.target.value = '';
  };

  const removeGalleryImage = (index: number) => {
    setEditingPost(prev => {
      if (!prev) return null;
      return {
        ...prev,
        gallery: (prev.gallery || []).filter((_, i) => i !== index)
      };
    });
  };

  const startNewPost = () => {
    setEditingPost({
      id: Date.now().toString(),
      title: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Upcoming',
      excerpt: '',
      image: '',
      video: '',
      content: '',
      gallery: []
    });
    setIsEditing(true);
  };

  const startEdit = (post: BlogPost) => {
    const postCopy = JSON.parse(JSON.stringify(post));
    postCopy.date = formatDateForInput(postCopy.date);
    setEditingPost(postCopy);
    setIsEditing(true);
  };

  const deletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this mission story? This cannot be undone.')) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const savePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    setIsSaving(true);

    try {
      const postToSave = {
        ...editingPost,
        id: editingPost.id || Date.now().toString(),
        title: editingPost.title || 'Untitled Story',
        date: editingPost.date || new Date().toISOString().split('T')[0],
        category: editingPost.category || 'Upcoming',
        excerpt: editingPost.excerpt || '',
        image: editingPost.image || '',
        content: editingPost.content || '',
        gallery: editingPost.gallery || [],
      } as BlogPost;

      await new Promise(r => setTimeout(r, 600));

      setPosts(prev => {
        const index = prev.findIndex(p => p.id === postToSave.id);
        if (index !== -1) {
          const newPosts = [...prev];
          newPosts[index] = postToSave;
          return newPosts;
        }
        return [postToSave, ...prev];
      });

      setIsSaving(false);
      setShowSuccess(true);
      localStorage.removeItem(DRAFT_KEY);
      
      setTimeout(() => {
        setIsEditing(false);
        setEditingPost(null);
        setShowSuccess(false);
      }, 1200);
    } catch (err) {
      console.error("Save failed:", err);
      setIsSaving(false);
      alert("Failed to save post. Your storage might be full.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 md:p-12 border border-slate-200">
          <div className="text-center mb-10">
            <h1 className="font-playful text-4xl font-bold text-[#4FA3D1] mb-2">Admin Panel</h1>
            <p className="text-slate-500 text-sm">Access the Foundation CMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Username</label>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#4FA3D1] text-[#4FA3D1] outline-none transition-all font-bold"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 pr-12 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#4FA3D1] text-[#4FA3D1] outline-none transition-all font-bold"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4FA3D1] hover:text-slate-900 transition-colors p-1"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            {loginError && <p className="text-red-500 text-sm text-center font-bold animate-shake">{loginError}</p>}
            <button className="w-full bg-[#4FA3D1] text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-slate-900 transition-all transform active:scale-95">
              Login to Dashboard
            </button>
            <button 
              type="button" 
              onClick={() => onNavigate('home')}
              className="w-full text-slate-400 text-sm font-bold hover:text-[#4FA3D1] transition-colors"
            >
              ← Back to Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <div className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col flex-shrink-0">
        <div className="mb-10">
          <h2 className="font-playful text-2xl font-bold text-[#F6C453]">Smiles Admin</h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Management Console</p>
        </div>
        
        <nav className="flex-grow space-y-2">
          <button 
            className={`w-full text-left p-4 rounded-xl font-bold transition-all ${!isEditing ? 'bg-[#4FA3D1] shadow-lg' : 'hover:bg-white/10 text-slate-400'}`}
            onClick={() => { setIsEditing(false); setEditingPost(null); }}
          >
            Mission Stories
          </button>
          <button className="w-full text-left p-4 rounded-xl hover:bg-white/10 text-slate-400 transition-all" onClick={() => onNavigate('home')}>View Live Site</button>
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="p-4 rounded-xl text-red-400 font-bold hover:bg-red-400/10 transition-all text-left mt-10"
        >
          Logout Session
        </button>
      </div>

      <div className="flex-grow p-6 md:p-12 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          {!isEditing ? (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 mb-2 font-playful tracking-wide">Missions & Outreach Blog</h1>
                  <p className="text-slate-500 font-sans">Create and manage your foundation's impact stories.</p>
                </div>
                <button 
                  onClick={startNewPost}
                  className="bg-[#F6C453] text-slate-900 px-8 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all w-full md:w-auto"
                >
                  + Add New Story
                </button>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="text-left p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Story</th>
                        <th className="text-left p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                        <th className="text-left p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="text-right p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <img src={post.image} className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0" alt="" />
                              <div>
                                <h3 className="font-bold text-slate-900 line-clamp-1">{post.title}</h3>
                                <p className="text-xs text-slate-400 line-clamp-1">{post.excerpt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                              post.category === 'Upcoming' ? 'bg-orange-100 text-orange-600' : 
                              post.category === 'Health Tip' ? 'bg-green-100 text-green-600' : 
                              'bg-[#EBF6FC] text-[#4FA3D1]'
                            }`}>
                              {post.category}
                            </span>
                          </td>
                          <td className="p-6 text-sm text-slate-500 font-medium whitespace-nowrap">{post.date}</td>
                          <td className="p-6 text-right space-x-2">
                            <button onClick={() => startEdit(post)} className="px-4 py-2 text-[#4FA3D1] hover:bg-[#EBF6FC] rounded-lg transition-all font-bold">Edit</button>
                            <button onClick={() => deletePost(post.id)} className="px-4 py-2 text-red-400 hover:bg-red-50 rounded-lg transition-all font-bold">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-slide-up pb-32">
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => { setIsEditing(false); setEditingPost(null); localStorage.removeItem(DRAFT_KEY); }} 
                  className="text-slate-400 hover:text-[#4FA3D1] font-bold flex items-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Discard Draft & Back
                </button>
                <div className="h-6 w-px bg-slate-200"></div>
                <h1 className="text-2xl font-bold text-slate-900 font-playful tracking-wide">
                  {editingPost?.id ? 'Editing Impact Story' : 'New Mission Story'}
                </h1>
              </div>

              {showSuccess && (
                <div className="mb-8 bg-green-500 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg animate-bounce">
                  ✓ Story Saved Successfully!
                </div>
              )}

              <form onSubmit={savePost} className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 border border-slate-100 space-y-10">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
                    <input 
                      required
                      type="text" 
                      value={editingPost?.title || ''}
                      onChange={e => setEditingPost(prev => prev ? ({ ...prev, title: e.target.value }) : null)}
                      className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#4FA3D1] focus:bg-white text-slate-900 font-bold outline-none transition-all" 
                      placeholder="Story Title" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                    <select 
                      value={editingPost?.category || 'Upcoming'}
                      onChange={e => setEditingPost(prev => prev ? ({ ...prev, category: e.target.value as any }) : null)}
                      className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#4FA3D1] focus:bg-white text-slate-900 font-bold outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Outreach">Outreach</option>
                      <option value="Health Tip">Health Tip</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mission Date</label>
                    <input 
                      required
                      type="date" 
                      value={formatDateForInput(editingPost?.date)}
                      onChange={e => setEditingPost(prev => prev ? ({ ...prev, date: e.target.value }) : null)}
                      className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#4FA3D1] focus:bg-white text-slate-900 font-bold outline-none transition-all" 
                    />
                  </div>
                </div>

                {/* Primary Thumbnail Section */}
                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Main Cover Thumbnail</label>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div 
                      onClick={() => imageInputRef.current?.click()}
                      className="group relative h-56 rounded-[2.5rem] border-4 border-dashed border-slate-100 hover:border-[#4FA3D1] bg-slate-50 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden"
                    >
                      {editingPost?.image ? (
                        <>
                          <img src={editingPost.image} className="w-full h-full object-cover" alt="Preview" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                            <span className="text-white font-bold bg-[#4FA3D1] px-6 py-2 rounded-xl shadow-lg">Change Cover Photo</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-6 text-slate-300">
                          <p className="font-bold text-sm uppercase tracking-widest">Select Cover Image</p>
                          <p className="text-[10px] mt-1">(Appears on Homepage Cards)</p>
                        </div>
                      )}
                      <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Or Paste Image URL</label>
                        <input 
                          type="text" 
                          value={editingPost?.image || ''}
                          onChange={e => setEditingPost(prev => prev ? ({ ...prev, image: e.target.value }) : null)}
                          className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4FA3D1] text-slate-900 font-bold text-sm" 
                          placeholder="https://images.unsplash.com/..." 
                        />
                      </div>
                      <div className="p-4 bg-[#EBF6FC] rounded-2xl border border-[#4FA3D1]/10">
                        <p className="text-[10px] text-[#4FA3D1] font-bold leading-relaxed uppercase tracking-wide">
                          💡 Tip: The cover image is what users see first on the home and missions pages.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Story Gallery Section */}
                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Story Image Gallery</label>
                    <button 
                      type="button" 
                      onClick={() => galleryInputRef.current?.click()}
                      className="bg-[#4FA3D1] text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-slate-900 transition-all shadow-md"
                    >
                      + Add Photos to Gallery
                    </button>
                    <input 
                      type="file" 
                      multiple 
                      ref={galleryInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, 'gallery')} 
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">These images will appear in the photo slider on the full story page.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                    {editingPost?.gallery?.map((img, idx) => (
                      <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
                        <img src={img} className="w-full h-full object-cover" alt={`Gallery item ${idx}`} />
                        <button 
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-xs uppercase"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div 
                      onClick={() => galleryInputRef.current?.click()}
                      className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#4FA3D1] hover:bg-[#EBF6FC] transition-all group"
                    >
                      <span className="text-3xl text-slate-300 group-hover:text-[#4FA3D1] transition-colors">+</span>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest group-hover:text-[#4FA3D1]">Add More</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 pt-4 border-t border-slate-50">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Short Excerpt (Grid View)</label>
                    <input 
                      required
                      type="text" 
                      value={editingPost?.excerpt || ''}
                      onChange={e => setEditingPost(prev => prev ? ({ ...prev, excerpt: e.target.value }) : null)}
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4FA3D1] focus:bg-white text-slate-900 font-bold outline-none transition-all" 
                      placeholder="A short summary of the mission..." 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Detailed Narrative (Full Story)</label>
                    <textarea 
                      required
                      rows={12}
                      value={editingPost?.content || ''}
                      onChange={e => setEditingPost(prev => prev ? ({ ...prev, content: e.target.value }) : null)}
                      className="w-full p-8 rounded-[2.5rem] bg-slate-50 border-none focus:ring-2 focus:ring-[#4FA3D1] focus:bg-white text-slate-900 font-sans leading-relaxed outline-none transition-all whitespace-pre-wrap" 
                      placeholder="Write the full details here..."
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-6 pt-10 border-t border-slate-50">
                  <button 
                    type="button" 
                    onClick={() => { setIsEditing(false); setEditingPost(null); localStorage.removeItem(DRAFT_KEY); }}
                    className="px-10 py-5 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest text-sm"
                  >
                    Cancel Edit
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className={`bg-[#4FA3D1] text-white px-12 py-5 rounded-2xl font-bold shadow-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest ${isSaving ? 'opacity-60 cursor-not-allowed' : 'hover:bg-slate-900 hover:-translate-y-1'}`}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving Story...
                      </>
                    ) : 'Publish Impact Story'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
