
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Users, X, Calendar, ClipboardList } from 'lucide-react';
import { CommunityGroup } from '../types';

const CommunitySection: React.FC = () => {
  const { communityGroups } = useData();
  const [selectedGroup, setSelectedGroup] = useState<CommunityGroup | null>(null);

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
            Bertumbuh bersama dalam iman melalui persekutuan yang hangat. Klik pada kartu untuk melihat program kerja dan info terkini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {communityGroups.map((group) => (
            <div 
              key={group.id} 
              onClick={() => setSelectedGroup(group)}
              className="group bg-white rounded-sm shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                 <div className="absolute inset-0 bg-gkps-blue/20 group-hover:bg-transparent transition-colors z-10"></div>
                 <img 
                  src={group.imageUrl} 
                  alt={group.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-sm text-xs font-bold text-gkps-blue opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    Lihat Detail
                 </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3 text-gkps-gold">
                   <Users size={18} />
                   <span className="text-xs font-bold uppercase tracking-wider">Komunitas</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-800 mb-3 group-hover:text-gkps-blue transition-colors">
                  {group.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                  {group.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail */}
      {selectedGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col">
            <button 
              onClick={() => setSelectedGroup(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
            >
              <X size={20} className="text-gray-600" />
            </button>

            {/* Modal Header Image */}
            <div className="h-48 sm:h-64 w-full relative shrink-0">
               <img src={selectedGroup.imageUrl} alt={selectedGroup.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
               <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-2">{selectedGroup.name}</h3>
                  <p className="text-white/80 text-sm">{selectedGroup.description}</p>
               </div>
            </div>

            {/* Modal Content - Activities */}
            <div className="p-6 sm:p-8 bg-white grow">
               <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <ClipboardList className="text-gkps-blue" size={20} />
                  <h4 className="text-lg font-bold text-slate-800 uppercase tracking-wide">Info & Program Kerja</h4>
               </div>

               {selectedGroup.activities && selectedGroup.activities.length > 0 ? (
                 <div className="space-y-4">
                   {selectedGroup.activities.map((activity) => (
                     <div key={activity.id} className="border-l-4 border-gkps-gold bg-stone-50 p-4 rounded-r-sm hover:bg-stone-100 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                           <h5 className="font-bold text-slate-800 text-lg">{activity.title}</h5>
                           <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm w-fit 
                             ${activity.category === 'Program Kerja' ? 'bg-blue-100 text-blue-800' : 
                               activity.category === 'Jadwal' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                              {activity.category}
                           </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 font-bold uppercase mb-2">
                           <Calendar size={12} className="mr-1.5" /> {activity.date}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {activity.description}
                        </p>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-100 rounded-sm">
                   <p className="mb-1">Belum ada informasi program kerja atau berita.</p>
                   <p className="text-xs">Hubungi pengurus untuk informasi lebih lanjut.</p>
                 </div>
               )}
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
               <button 
                onClick={() => setSelectedGroup(null)}
                className="px-6 py-2 bg-gkps-blue text-white font-bold text-sm rounded-sm hover:bg-blue-900 transition-colors"
               >
                 Tutup
               </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default CommunitySection;
