import React, { useState } from 'react';
import { BookOpen, Newspaper, LogOut, Menu as MenuIcon, Layout, Calendar, ChevronRight } from 'lucide-react';
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

  const menuItems = [
    { id: 'sermons', label: 'Manajemen Khotbah', icon: BookOpen },
    { id: 'news', label: 'Warta Jemaat', icon: Newspaper },
    { id: 'content', label: 'Halaman Utama', icon: Layout },
    { id: 'schedule', label: 'Jadwal Ibadah', icon: Calendar },
    { id: 'navigation', label: 'Navigasi Menu', icon: MenuIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a8a] text-white flex flex-col fixed h-full z-20 shadow-xl">
        <div className="h-20 flex flex-col justify-center px-6 border-b border-blue-800 bg-blue-900/20">
          <h2 className="text-xl font-serif font-bold tracking-wide text-white">Admin Panel</h2>
          <p className="text-[10px] uppercase tracking-widest text-blue-200 mt-1">GKPS Tangerang</p>
        </div>
        
        <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center px-6 py-3.5 transition-all duration-200 relative group
                ${activeTab === item.id 
                  ? 'bg-blue-800/50 text-white' 
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'}`}
            >
              {activeTab === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              )}
              <item.icon size={18} className={`mr-3 ${activeTab === item.id ? 'text-amber-400' : 'text-blue-300'}`} />
              <span className={`text-sm font-medium ${activeTab === item.id ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {activeTab === item.id && (
                <ChevronRight size={14} className="ml-auto text-amber-400 opacity-50" />
              )}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-blue-800 bg-blue-900/30">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center p-2.5 text-red-200 hover:bg-red-900/30 hover:text-white rounded-sm transition-colors text-sm font-bold"
          >
            <LogOut size={16} className="mr-2" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
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