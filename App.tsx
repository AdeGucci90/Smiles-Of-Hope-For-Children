
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Programs from './components/Programs';
import TheoryOfChange from './components/TheoryOfChange';
import BlogSection from './components/BlogSection';
import CTA from './components/CTA';
import Founder from './components/Founder';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Preloader from './components/Preloader';
import { BLOG_POSTS } from './constants';
import { BlogPost } from './types';
import { initializeEmailJS } from './services/emailService';

// Page Components
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import BlogPage from './pages/BlogPage';
import MissionDetailPage from './pages/MissionDetailPage';
import DonatePage from './pages/DonatePage';
import JoinPage from './pages/JoinPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

export type View = 'home' | 'about' | 'programs' | 'missions' | 'mission-detail' | 'donate' | 'join' | 'contact' | 'admin';

// IndexedDB Constants
const DB_NAME = 'SmilesOfHope_DB_v3';
const STORE_NAME = 'blog_posts';
const DB_VERSION = 1;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [isDbReady, setIsDbReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and Load from IndexedDB
  useEffect(() => {
    // Initialize EmailJS on app startup
    initializeEmailJS();

    if (typeof window === 'undefined' || !window.indexedDB) {
      console.warn("IndexedDB not supported in this environment.");
      setIsDbReady(true);
      return;
    }

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        try {
          const transaction = db.transaction(STORE_NAME, 'readonly');
          const store = transaction.objectStore(STORE_NAME);
          const getRequest = store.get('current_posts');

          getRequest.onsuccess = () => {
            if (getRequest.result && Array.isArray(getRequest.result) && getRequest.result.length > 0) {
              setPosts(getRequest.result);
            }
            setIsDbReady(true);
          };

          getRequest.onerror = () => {
            console.error("Failed to read from database");
            setIsDbReady(true);
          };
        } catch (e) {
          console.error("Transaction error:", e);
          setIsDbReady(true);
        }
      };

      request.onerror = (err) => {
        console.error("IndexedDB failed to open:", err);
        setIsDbReady(true);
      };
    } catch (e) {
      console.error("IndexedDB init error:", e);
      setIsDbReady(true);
    }
  }, []);

  // Sync state to IndexedDB whenever posts change
  useEffect(() => {
    if (!isDbReady || typeof window === 'undefined' || !window.indexedDB) return;

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        try {
          const transaction = db.transaction(STORE_NAME, 'readwrite');
          const store = transaction.objectStore(STORE_NAME);
          store.put(JSON.parse(JSON.stringify(posts)), 'current_posts');
          
          transaction.oncomplete = () => db.close();
        } catch (e) {
          console.error("Write transaction error:", e);
        }
      };
    } catch (e) {
      console.error("Database sync error:", e);
    }
  }, [posts, isDbReady]);

  // Handle direct URL access via hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews: View[] = ['home', 'about', 'programs', 'missions', 'mission-detail', 'donate', 'join', 'contact', 'admin'];
      if (validViews.includes(hash as View)) {
        setCurrentView(hash as View);
      } else if (hash === '' || hash === 'home') {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = useCallback((view: View, missionId?: string) => {
    if (missionId) setSelectedMissionId(missionId);
    setCurrentView(view);
    
    if (view === 'admin') {
      window.location.hash = 'admin';
    } else if (view === 'home') {
      window.location.hash = 'home';
    } else if (view !== 'mission-detail') {
      window.location.hash = view;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'programs':
        return <ProgramsPage onNavigate={navigateTo} />;
      case 'missions':
        return <BlogPage onNavigate={navigateTo} posts={posts} />;
      case 'mission-detail':
        return <MissionDetailPage missionId={selectedMissionId} onNavigate={navigateTo} posts={posts} />;
      case 'donate':
        return <DonatePage onNavigate={navigateTo} />;
      case 'join':
        return <JoinPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      case 'admin':
        return <AdminPage posts={posts} setPosts={setPosts} onNavigate={navigateTo} />;
      case 'home':
      default:
        return (
          <>
            <section id="home">
              <Hero onNavigate={navigateTo} />
            </section>
            <Testimonials />
            <section id="about-preview">
              <About onNavigate={navigateTo} />
            </section>
            <section id="programs-preview">
              <Programs onNavigate={navigateTo} />
            </section>
            <section id="missions-preview">
              <BlogSection onNavigate={navigateTo} posts={posts} />
            </section>
            <TheoryOfChange />
            <section id="founder">
              <Founder />
            </section>
            <CTA onNavigate={navigateTo} />
          </>
        );
    }
  };

  return (
    <>
      {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}
      <div className={`flex flex-col min-h-screen ${isLoading ? 'hidden' : ''}`}>
        {currentView !== 'admin' && (
          <Header isScrolled={isScrolled} currentView={currentView} onNavigate={navigateTo} />
        )}
        <main className={`flex-grow ${currentView !== 'admin' ? 'pt-16 md:pt-0' : ''}`}>
          {renderView()}
        </main>
        {currentView !== 'admin' && <Footer onNavigate={navigateTo} />}
        
        {currentView !== 'admin' && (
          <>
            <BackToTop />
          </>
        )}
      </div>
    </>
  );
};

export default App;
