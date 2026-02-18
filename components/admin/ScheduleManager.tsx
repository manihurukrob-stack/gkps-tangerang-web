import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { ServiceSchedule } from '../../types';
import { Plus, Trash2, Edit2, Check, X, Clock, Calendar } from 'lucide-react';

const ScheduleManager: React.FC = () => {
  const { schedules, addSchedule, deleteSchedule, updateSchedule } = useData();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ServiceSchedule | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Partial<ServiceSchedule>>({
      name: '', time: '', description: '', category: 'Umum'
  });

  const handleEditClick = (schedule: ServiceSchedule) => {
    setEditingId(schedule.id);
    setEditForm({ ...schedule });
  };

  const handleUpdate = () => {
    if (editForm) {
      updateSchedule(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleAdd = () => {
      if (newSchedule.name && newSchedule.time) {
          addSchedule({
              id: Date.now(),
              name: newSchedule.name!,
              time: newSchedule.time!,
              description: newSchedule.description || '',
              category: (newSchedule.category as any) || 'Umum'
          });
          setIsAdding(false);
          setNewSchedule({ name: '', time: '', description: '', category: 'Umum' });
      }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Jadwal Ibadah</h1>
          <p className="text-slate-500 mt-1">Atur waktu dan deskripsi ibadah mingguan gereja.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          {isAdding ? (
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                  <Plus size={20} className="mr-2 text-gkps-gold" /> Input Jadwal Baru
                </h3>
                <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Ibadah</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                            value={newSchedule.name} onChange={e => setNewSchedule({...newSchedule, name: e.target.value})} placeholder="Contoh: Ibadah Umum I" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori</label>
                        <select className="w-full p-2 border border-gray-300 rounded-sm bg-white focus:border-gkps-blue outline-none"
                                value={newSchedule.category} onChange={e => setNewSchedule({...newSchedule, category: e.target.value as any})}>
                                    <option value="Umum">Umum</option>
                                    <option value="Sekolah Minggu">Sekolah Minggu</option>
                                    <option value="Pemuda">Pemuda</option>
                                    <option value="Wanita">Wanita</option>
                                    <option value="Bapak">Bapak</option>
                          </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Waktu</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                            value={newSchedule.time} onChange={e => setNewSchedule({...newSchedule, time: e.target.value})} placeholder="09:00 WIB" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi</label>
                        <textarea className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none h-24"
                            value={newSchedule.description} onChange={e => setNewSchedule({...newSchedule, description: e.target.value})} />
                      </div>
                </div>
                <div className="flex gap-2 mt-6">
                    <button onClick={() => setIsAdding(false)} className="flex-1 py-2 text-gray-500 border border-gray-300 rounded-sm hover:bg-gray-50">Batal</button>
                    <button onClick={handleAdd} className="flex-1 py-2 bg-gkps-blue text-white rounded-sm font-bold hover:bg-blue-900">Simpan</button>
                </div>
            </div>
          ) : (
            <button 
              onClick={() => setIsAdding(true)} 
              className="w-full py-8 border-2 border-dashed border-gray-300 rounded-sm text-gray-500 font-bold hover:border-gkps-blue hover:text-gkps-blue hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2"
            >
                <div className="bg-gray-100 p-3 rounded-full"><Plus size={24} /></div>
                <span>Tambah Jadwal Baru</span>
            </button>
          )}
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 hover:border-gkps-blue/30 transition-colors">
              {editingId === schedule.id && editForm ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Editing Mode */}
                      <div className="col-span-2 md:col-span-1">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Ibadah</label>
                          <input type="text" className="w-full p-2 border border-gkps-blue rounded-sm" 
                              value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Waktu</label>
                          <input type="text" className="w-full p-2 border border-gkps-blue rounded-sm" 
                              value={editForm.time} onChange={e => setEditForm({...editForm, time: e.target.value})} />
                      </div>
                      <div className="col-span-2">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi</label>
                          <input type="text" className="w-full p-2 border border-gkps-blue rounded-sm" 
                              value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori</label>
                          <select className="w-full p-2 border border-gkps-blue rounded-sm bg-white"
                               value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value as any})}>
                                   <option value="Umum">Umum</option>
                                   <option value="Sekolah Minggu">Sekolah Minggu</option>
                                   <option value="Pemuda">Pemuda</option>
                                   <option value="Wanita">Wanita</option>
                                   <option value="Bapak">Bapak</option>
                          </select>
                      </div>
                      <div className="col-span-2 flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                          <button onClick={() => setEditingId(null)} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">Batal</button>
                          <button onClick={handleUpdate} className="px-6 py-2 bg-gkps-blue text-white rounded-sm flex items-center gap-2 font-bold shadow-sm hover:bg-blue-900 transition-colors"><Check size={16}/> Simpan Perubahan</button>
                      </div>
                  </div>
              ) : (
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                              <span className="bg-blue-50 text-gkps-blue text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">{schedule.category}</span>
                              <div className="flex items-center text-xs text-gray-400 font-bold uppercase">
                                <Clock size={12} className="mr-1" /> {schedule.time}
                              </div>
                          </div>
                          <h3 className="font-bold text-lg text-slate-800 mb-1">{schedule.name}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed">{schedule.description}</p>
                      </div>
                      <div className="flex items-center gap-2 self-start md:self-center">
                          <button onClick={() => handleEditClick(schedule)} className="p-2 text-gray-400 hover:text-gkps-blue hover:bg-blue-50 rounded-sm transition-all" title="Edit">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => { if(window.confirm('Hapus jadwal ini?')) deleteSchedule(schedule.id) }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all" title="Hapus">
                            <Trash2 size={18} />
                          </button>
                      </div>
                  </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleManager;