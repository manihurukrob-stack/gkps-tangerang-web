import React from 'react';
import { useData } from '../contexts/DataContext';
import { Bell } from 'lucide-react';

const NewsSection: React.FC = () => {
  const { news } = useData();

  return (
    <section id="news" className="py-24 bg-gkps-dark text-white relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gkps-blue/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Warta Jemaat</h2>
          <div className="h-1 w-16 bg-gkps-red mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-gkps-blue text-xs font-bold uppercase tracking-wider rounded-sm text-white">
                  {item.category}
                </span>
                <span className="text-sm text-gray-400 font-mono">
                  {item.date}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-100 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {item.content}
              </p>
              <a href="#read-more" className="text-gkps-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center">
                Selengkapnya <span className="ml-2">&rarr;</span>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gkps-red/90 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-full text-white">
              <Bell size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold font-serif">Langganan Warta Digital</h4>
              <p className="text-sm text-red-100">Dapatkan informasi pelayanan terbaru melalui WhatsApp.</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-white text-gkps-red font-bold uppercase text-sm tracking-wide rounded-sm hover:bg-gray-100 transition-colors w-full md:w-auto">
            Gabung WhatsApp Group
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;