
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ServiceSchedule from './components/ServiceSchedule';
import SermonSection from './components/SermonSection';
import NewsSection from './components/NewsSection';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';
import Dashboard from './components/admin/Dashboard';
import { DataProvider, useData } from './contexts/DataContext';
import { User } from './types';

// Split content to allow access to DataContext hooks
const MainApp: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { users } = useData();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      if (!user.isActive) {
        alert('Akun ini telah dinonaktifkan. Hubungi admin.');
        return;
      }
      setCurrentUser(user);
      setShowLogin(false);
      setUsername('');
      setPassword('');
    } else {
      alert('Username atau Password salah!');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (currentUser) {
    return <Dashboard onLogout={handleLogout} currentUser={currentUser} />;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-gkps-red selection:text-white relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <ServiceSchedule />
        <CommunitySection />
        <SermonSection />
        <NewsSection />
      </main>
      <Footer onOpenLogin={() => setShowLogin(true)} />

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-sm max-w-sm w-full relative animate-fade-in-up shadow-2xl">
            <button 
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold font-serif text-slate-800">Login Pengurus</h2>
              <p className="text-xs text-gray-500 mt-1">GKPS Tangerang Admin Panel</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                  placeholder="Username"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                  placeholder="Password"
                />
              </div>
              <button className="w-full bg-gkps-blue text-white py-2 rounded-sm font-bold hover:bg-blue-900 transition-colors shadow-sm mt-2">
                Masuk Dashboard
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-[10px] text-gray-400">Default: admin / admin123</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
};

export default App;
