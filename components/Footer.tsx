
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Lock } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface FooterProps {
  onOpenLogin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLogin }) => {
  const { contactData } = useData();

  return (
    <footer id="contact" className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-white">{contactData.footerTitle || "GKPS Tangerang"}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {contactData.footerDescription || "Gereja yang hidup, bertumbuh, dan berbuah bagi kemuliaan Tuhan. Melayani di tengah kota Tangerang dengan semangat kekeluargaan."}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold text-gkps-gold mb-6">Tautan Cepat</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">Jadwal Ibadah</a></li>
              <li><a href="#sermons" className="hover:text-white transition-colors">Renungan Harian</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Layanan Doa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Formulir Jemaat Baru</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-bold text-gkps-gold mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-0.5 text-gkps-red" />
                <span>{contactData.address}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-gkps-red" />
                <span>{contactData.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-gkps-red" />
                <span>{contactData.email}</span>
              </li>
            </ul>
          </div>

          {/* Verse */}
          <div className="bg-slate-800 p-6 rounded-sm">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Ayat Harian</h4>
            <blockquote className="text-slate-400 italic font-serif leading-relaxed text-sm">
              {contactData.dailyVerse}
            </blockquote>
            <p className="text-gkps-gold mt-4 text-xs font-bold text-right">— {contactData.dailyVerseRef}</p>
          </div>

        </div>
      </div>
      
      <div className="bg-black py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {contactData.footerTitle || "GKPS Tangerang"}. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
             <p>Design inspired by GRII Pusat & GKPS Org</p>
             <span className="text-slate-700">|</span>
             <button 
                onClick={onOpenLogin}
                className="flex items-center hover:text-gkps-gold transition-colors"
             >
               <Lock size={12} className="mr-1" /> Login Pengurus
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
