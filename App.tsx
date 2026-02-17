import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ServiceSchedule from './components/ServiceSchedule';
import SermonSection from './components/SermonSection';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import Dashboard from './components/admin/Dashboard';
import { DataProvider } from './contexts/DataContext';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      setShowLogin(false);
      setPassword('');
    } else {
      alert('Password salah!');
    }
  };

  if (isAdmin) {
    return (
      <DataProvider>
        <Dashboard onLogout={() => setIsAdmin(false)} />
      </DataProvider>
    );
  }

  return (
    <DataProvider>
      <div className="min-h-screen font-sans selection:bg-gkps-red selection:text-white relative">
        <Navbar />
        <main>
          <Hero />
          <About />
          <ServiceSchedule />
          <SermonSection />
          <NewsSection />
        </main>
        <Footer onOpenLogin={() => setShowLogin(true)} />

        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-sm max-w-sm w-full relative animate-fade-in-up">
              <button 
                onClick={() => setShowLogin(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold font-serif mb-6 text-slate-800">Admin Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                    placeholder="Masukkan password admin"
                    autoFocus
                  />
                  <p className="text-xs text-gray-400 mt-2">Default: admin123</p>
                </div>
                <button className="w-full bg-gkps-blue text-white py-2 rounded-sm font-bold hover:bg-blue-900 transition-colors">
                  Masuk Dashboard
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </DataProvider>
  );
};

export default App;