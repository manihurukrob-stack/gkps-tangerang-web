import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/1920/1080?grayscale&blur=2"
          alt="Church Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-gkps-blue/60 to-slate-900/80 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 animate-fade-in-up">
          <p className="text-gkps-gold font-sans font-medium tracking-[0.2em] uppercase text-sm md:text-base">
            Syalom, Selamat Datang di Website Resmi
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
            Gereja Kristen Protestan <br />
            <span className="italic font-light">Simalungun</span> Tangerang
          </h1>
          <div className="h-1 w-24 bg-gkps-gold mx-auto my-6"></div>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            "Sebab di mana dua atau tiga orang berkumpul dalam nama-Ku, di situ Aku ada di tengah-tengah mereka."
            <br />
            <span className="text-sm mt-2 block font-medium opacity-75">— Matius 18:20</span>
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <a 
            href="#schedule" 
            className="px-8 py-3 bg-gkps-red hover:bg-red-900 text-white font-sans font-medium tracking-wide transition-colors duration-300 rounded-sm uppercase text-sm shadow-lg"
          >
            Jadwal Ibadah
          </a>
          <a 
            href="#about" 
            className="px-8 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-gkps-blue font-sans font-medium tracking-wide transition-all duration-300 rounded-sm uppercase text-sm"
          >
            Tentang Kami
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;