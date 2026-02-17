import React from 'react';
import { useData } from '../contexts/DataContext';

const About: React.FC = () => {
  const { aboutData } = useData();

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="text-gkps-blue text-sm font-bold tracking-widest uppercase mb-2">
              Tentang GKPS Tangerang
            </h2>
            <h3 className="text-4xl font-serif font-bold text-slate-900 leading-tight">
              {aboutData.title}
            </h3>
            <p className="text-slate-600 leading-relaxed font-light text-lg whitespace-pre-wrap">
              {aboutData.description}
            </p>
            
            <div className="pt-6 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-serif font-bold text-gkps-gold">{aboutData.foundedYear}</h4>
                <p className="text-sm text-slate-500 mt-1">Tahun Berdiri</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-bold text-gkps-gold">{aboutData.familyCount}</h4>
                <p className="text-sm text-slate-500 mt-1">Kepala Keluarga</p>
              </div>
            </div>
          </div>

          {/* Image Composition */}
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-4 -right-4 w-2/3 h-full border-2 border-gkps-gold/30 rounded-sm z-0"></div>
            <div className="relative z-10 overflow-hidden rounded-sm shadow-2xl">
              <img 
                src={aboutData.imageUrl} 
                alt="Community Gathering" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gkps-blue text-white p-6 shadow-xl max-w-xs z-20 hidden md:block">
              <p className="font-serif italic text-lg">
                "Hita do saksi ni Kristus i tongah-tongah ni dunia on."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;