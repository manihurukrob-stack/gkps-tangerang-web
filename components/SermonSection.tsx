import React from 'react';
import { useData } from '../contexts/DataContext';
import { BookOpen, ArrowRight } from 'lucide-react';

const SermonSection: React.FC = () => {
  const { sermons } = useData();

  return (
    <section id="sermons" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-4">
          <div>
            <span className="text-gkps-blue font-bold tracking-widest text-xs uppercase mb-2 block">
              Renungan & Khotbah
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              Santapan Rohani
            </h2>
          </div>
          <a href="#all-sermons" className="hidden md:flex items-center text-gkps-red font-medium hover:text-red-900 transition-colors mt-4 md:mt-0">
            Lihat Arsip Khotbah <ArrowRight size={16} className="ml-2" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {sermons.map((sermon) => (
            <div key={sermon.id} className="flex flex-col group h-full">
              <div className="relative overflow-hidden mb-6 rounded-sm">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-800 z-10">
                  {sermon.date}
                </div>
                <img 
                  src={sermon.imageUrl} 
                  alt={sermon.title} 
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gkps-gold font-bold uppercase tracking-wider mb-2">
                  <BookOpen size={14} className="mr-2" />
                  {sermon.bibleVerse}
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-gkps-blue transition-colors">
                  {sermon.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4 flex-1 leading-relaxed line-clamp-3">
                  {sermon.summary}
                </p>
                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <p className="text-sm font-medium text-slate-800 italic">
                    {sermon.preacher}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden text-center">
          <a href="#all-sermons" className="inline-flex items-center text-gkps-red font-medium hover:text-red-900 transition-colors">
            Lihat Arsip Khotbah <ArrowRight size={16} className="ml-2" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default SermonSection;