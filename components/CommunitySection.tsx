
import React from 'react';
import { useData } from '../contexts/DataContext';
import { Users } from 'lucide-react';

const CommunitySection: React.FC = () => {
  const { communityGroups } = useData();

  return (
    <section id="sahabat" className="py-24 bg-stone-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-gkps-blue font-bold tracking-widest text-xs uppercase mb-2 block">
            Persekutuan Kategorial & Sektoral
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            Sahabat & Komunitas
          </h2>
          <div className="h-1 w-20 bg-gkps-gold mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            Bertumbuh bersama dalam iman melalui persekutuan yang hangat. Bergabunglah dengan sektor atau kategorial yang sesuai dengan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communityGroups.map((group) => (
            <div key={group.id} className="group bg-white rounded-sm shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="relative h-56 overflow-hidden">
                 <div className="absolute inset-0 bg-gkps-blue/20 group-hover:bg-transparent transition-colors z-10"></div>
                 <img 
                  src={group.imageUrl} 
                  alt={group.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                 />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3 text-gkps-gold">
                   <Users size={18} />
                   <span className="text-xs font-bold uppercase tracking-wider">Komunitas</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-800 mb-3 group-hover:text-gkps-blue transition-colors">
                  {group.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {group.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CommunitySection;
