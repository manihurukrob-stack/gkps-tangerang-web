import React, { useState } from 'react';
import { BookOpen, Newspaper, LogOut, Menu as MenuIcon, Layout, Calendar } from 'lucide-react';
import SermonManager from './SermonManager';
import NewsManager from './NewsManager';
import NavigationManager from './NavigationManager';
import ContentManager from './ContentManager';
import ScheduleManager from './ScheduleManager';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'sermons' | 'news' | 'navigation' | 'content' | 'schedule'>('sermons');

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gkps-blue text-white flex flex-col fixed h-full z-10 shadow-lg overflow-y-auto">
        <div className="p-6 border-b border-blue-800">
          <h2 className="text-xl font-serif font-bold">Admin Panel</h2>
          <p className="text-xs text-blue-200 mt-1">GKPS Tangerang</p>
        </div>
        <nav className="flex-1 py-4 space-y-1">
          <button 
            onClick={() => setActiveTab('sermons')}
            className={`w-full flex items-center px-6 py-4 transition-all duration-200 relative group
              ${activeTab === 'sermons' ? 'bg-blue-900 text-white shadow-inner' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}
          >
            {activeTab === 'sermons' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gkps-gold animate-pulse" />
            )}
            <BookOpen size={20} className={`mr-3 ${activeTab === 'sermons' ? 'text-gkps-gold' : ''}`} />
            <span className="font-medium">Manajemen Khotbah</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center px-6 py-4 transition-all duration-200 relative group
              ${activeTab === 'news' ? 'bg-blue-900 text-white shadow-inner' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}
          >
             {activeTab === 'news' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gkps-gold animate-pulse" />
            )}
            <Newspaper size={20} className={`mr-3 ${activeTab === 'news' ? 'text-gkps-gold' : ''}`} />
            <span className="font-medium">Warta Jemaat</span>
          </button>
          
          <div className="my-2 border-t border-blue-800/50 mx-4"></div>
          
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center px-6 py-4 transition-all duration-200 relative group
              ${activeTab === 'content' ? 'bg-blue-900 text-white shadow-inner' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}
          >
             {activeTab === 'content' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gkps-gold animate-pulse" />
            )}
            <Layout size={20} className={`mr-3 ${activeTab === 'content' ? 'text-gkps-gold' : ''}`} />
            <span className="font-medium">Halaman Utama</span>
          </button>

          <button 
            onClick={() => setActiveTab('schedule')}
            className={`w-full flex items-center px-6 py-4 transition-all duration-200 relative group
              ${activeTab === 'schedule' ? 'bg-blue-900 text-white shadow-inner' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}
          >
             {activeTab === 'schedule' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gkps-gold animate-pulse" />
            )}
            <Calendar size={20} className={`mr-3 ${activeTab === 'schedule' ? 'text-gkps-gold' : ''}`} />
            <span className="font-medium">Jadwal Ibadah</span>
          </button>

          <button 
            onClick={() => setActiveTab('navigation')}
            className={`w-full flex items-center px-6 py-4 transition-all duration-200 relative group
              ${activeTab === 'navigation' ? 'bg-blue-900 text-white shadow-inner' : 'text-blue-200 hover:bg-blue-800 hover:text-white'}`}
          >
             {activeTab === 'navigation' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gkps-gold animate-pulse" />
            )}
            <MenuIcon size={20} className={`mr-3 ${activeTab === 'navigation' ? 'text-gkps-gold' : ''}`} />
            <span className="font-medium">Navigasi Menu</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-blue-800 bg-blue-900/30">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center p-3 text-red-300 hover:bg-red-900/50 hover:text-red-100 rounded-sm transition-colors border border-transparent hover:border-red-900/50"
          >
            <LogOut size={18} className="mr-2" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'sermons' && <SermonManager />}
          {activeTab === 'news' && <NewsManager />}
          {activeTab === 'content' && <ContentManager />}
          {activeTab === 'schedule' && <ScheduleManager />}
          {activeTab === 'navigation' && <NavigationManager />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;