import React from 'react';
import { useData } from '../contexts/DataContext';
import { Clock, CalendarCheck } from 'lucide-react';

const ServiceSchedule: React.FC = () => {
  const { schedules } = useData();

  return (
    <section id="schedule" className="py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-gkps-red font-bold tracking-widest text-xs uppercase mb-2 block">
            Jadwal Mingguan
          </span>
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            Mari Beribadah Bersama
          </h2>
          <p className="text-slate-600 font-light">
            Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam persekutuan memuji dan mendengarkan Firman Tuhan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schedules.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-gkps-blue group"
            >
              <div className="mb-6 bg-blue-50 w-12 h-12 flex items-center justify-center rounded-full text-gkps-blue group-hover:bg-gkps-blue group-hover:text-white transition-colors">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 group-hover:text-gkps-blue transition-colors">
                {service.name}
              </h3>
              <p className="text-2xl font-bold text-gkps-gold mb-4 font-sans">
                {service.time}
              </p>
              <div className="h-px w-full bg-gray-100 my-4"></div>
              <p className="text-sm text-slate-500 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex items-center text-xs font-bold text-slate-400 uppercase tracking-wide">
                <CalendarCheck size={14} className="mr-2" />
                {service.category}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-white border border-gray-200 shadow-sm rounded-sm">
            <p className="text-slate-700">
              <span className="font-bold text-gkps-red mr-2">Catatan:</span>
              Untuk pelayanan Sakramen Baptisan Kudus dan Perjamuan Kudus, silakan hubungi Sekretariat Gereja.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServiceSchedule;