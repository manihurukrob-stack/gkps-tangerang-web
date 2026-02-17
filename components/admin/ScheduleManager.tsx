import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { ServiceSchedule } from '../../types';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

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
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Jadwal Ibadah</h1>
          <p className="text-slate-500">Atur waktu dan deskripsi ibadah mingguan.</p>
        </div>
      </header>

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
            {editingId === schedule.id && editForm ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="col-span-2 flex justify-end gap-2 mt-2">
                        <button onClick={() => setEditingId(null)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Batal</button>
                        <button onClick={handleUpdate} className="px-4 py-2 bg-gkps-blue text-white rounded-sm flex items-center gap-2"><Check size={16}/> Simpan</button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg text-slate-800">{schedule.name}</h3>
                            <span className="bg-blue-50 text-gkps-blue text-xs font-bold px-2 py-1 rounded-sm uppercase">{schedule.category}</span>
                        </div>
                        <p className="text-gkps-gold font-bold font-sans mt-1">{schedule.time}</p>
                        <p className="text-gray-500 text-sm mt-1">{schedule.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleEditClick(schedule)} className="p-2 text-gray-400 hover:text-gkps-blue hover:bg-blue-50 rounded-sm transition-all"><Edit2 size={18} /></button>
                        <button onClick={() => { if(window.confirm('Hapus jadwal ini?')) deleteSchedule(schedule.id) }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all"><Trash2 size={18} /></button>
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>

      {isAdding ? (
          <div className="bg-white p-6 rounded-sm shadow-sm border-2 border-dashed border-gkps-blue mt-6">
               <h3 className="font-bold text-gkps-blue mb-4">Tambah Jadwal Baru</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Nama Ibadah" className="p-2 border border-gray-300 rounded-sm"
                        value={newSchedule.name} onChange={e => setNewSchedule({...newSchedule, name: e.target.value})} />
                    <input type="text" placeholder="Waktu (e.g. 09:00 WIB)" className="p-2 border border-gray-300 rounded-sm"
                        value={newSchedule.time} onChange={e => setNewSchedule({...newSchedule, time: e.target.value})} />
                    <input type="text" placeholder="Deskripsi Singkat" className="p-2 border border-gray-300 rounded-sm col-span-2"
                        value={newSchedule.description} onChange={e => setNewSchedule({...newSchedule, description: e.target.value})} />
                     <select className="p-2 border border-gray-300 rounded-sm bg-white"
                             value={newSchedule.category} onChange={e => setNewSchedule({...newSchedule, category: e.target.value as any})}>
                                 <option value="Umum">Umum</option>
                                 <option value="Sekolah Minggu">Sekolah Minggu</option>
                                 <option value="Pemuda">Pemuda</option>
                                 <option value="Wanita">Wanita</option>
                                 <option value="Bapak">Bapak</option>
                        </select>
               </div>
               <div className="flex justify-end gap-2 mt-4">
                   <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-500">Batal</button>
                   <button onClick={handleAdd} className="px-4 py-2 bg-gkps-blue text-white rounded-sm font-bold">Tambah Jadwal</button>
               </div>
          </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-sm text-gray-500 font-bold hover:border-gkps-blue hover:text-gkps-blue hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
            <Plus size={20} /> Tambah Jadwal Baru
        </button>
      )}

    </div>
  );
};

export default ScheduleManager;