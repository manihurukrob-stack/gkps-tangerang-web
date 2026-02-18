
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { CommunityGroup, CommunityActivity, User } from '../../types';
import { Plus, Trash2, Upload, Users, ClipboardList, Calendar, Edit2, Save } from 'lucide-react';

interface CommunityManagerProps {
  currentUser?: User;
}

const CommunityManager: React.FC<CommunityManagerProps> = ({ currentUser }) => {
  const { communityGroups, addCommunityGroup, updateCommunityGroup, deleteCommunityGroup } = useData();
  
  // --- PERMISSION CHECK ---
  // content_manager and super_admin see ALL. community_admin sees only assigned.
  const filteredGroups = currentUser?.role === 'community_admin' && currentUser.assignedCommunityId
    ? communityGroups.filter(g => g.id === currentUser.assignedCommunityId)
    : communityGroups;

  // Content Manager can also manage groups (Add/Delete/Edit All) as per request
  const canManageGroups = currentUser?.role === 'super_admin' || currentUser?.role === 'content_manager';

  // --- STATE FOR MAIN GROUP FORM ---
  const [form, setForm] = useState<Partial<CommunityGroup>>({
    name: '', description: '', imageUrl: ''
  });
  const [isDragOver, setIsDragOver] = useState(false);

  // --- STATE FOR ACTIVITY FORM ---
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [editingActivityId, setEditingActivityId] = useState<number | null>(null);
  const [activityForm, setActivityForm] = useState<Partial<CommunityActivity>>({
    title: '', date: '', category: 'Program Kerja', description: ''
  });

  // --- HANDLERS FOR GROUP ---
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setForm({ ...form, imageUrl: URL.createObjectURL(file) });
    }
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, imageUrl: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmitGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.description) {
      addCommunityGroup({
        id: Date.now(),
        name: form.name!,
        description: form.description!,
        imageUrl: form.imageUrl || 'https://picsum.photos/800/600',
        activities: []
      } as CommunityGroup);
      setForm({ name: '', description: '', imageUrl: '' });
      alert('Komunitas berhasil ditambahkan!');
    }
  };

  // --- HANDLERS FOR ACTIVITY ---
  
  const handleEditActivityClick = (activity: CommunityActivity, groupId: number) => {
    setSelectedGroupId(groupId);
    setEditingActivityId(activity.id);
    setActivityForm({
      title: activity.title,
      date: activity.date,
      category: activity.category,
      description: activity.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelActivityEdit = () => {
    setEditingActivityId(null);
    setActivityForm({ title: '', date: '', category: 'Program Kerja', description: '' });
  };

  const handleSubmitActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGroupId && activityForm.title) {
      const groupToUpdate = communityGroups.find(g => g.id === selectedGroupId);
      if (groupToUpdate) {
        let updatedActivities;

        if (editingActivityId) {
          updatedActivities = groupToUpdate.activities?.map(act => 
            act.id === editingActivityId 
              ? { 
                  ...act, 
                  title: activityForm.title!,
                  date: activityForm.date || '-',
                  category: (activityForm.category as any),
                  description: activityForm.description || ''
                } 
              : act
          );
        } else {
          const newActivity: CommunityActivity = {
            id: Date.now(),
            title: activityForm.title!,
            date: activityForm.date || '-',
            category: (activityForm.category as any) || 'Program Kerja',
            description: activityForm.description || ''
          };
          updatedActivities = [newActivity, ...(groupToUpdate.activities || [])];
        }
        
        const updatedGroup = {
          ...groupToUpdate,
          activities: updatedActivities || []
        };
        
        updateCommunityGroup(updatedGroup);
        
        setActivityForm({ title: '', date: '', category: 'Program Kerja', description: '' });
        setEditingActivityId(null);
        alert(editingActivityId ? 'Kegiatan berhasil diperbarui!' : 'Info/Program berhasil ditambahkan!');
      }
    }
  };

  const handleDeleteActivity = (groupId: number, activityId: number) => {
    if (window.confirm('Hapus kegiatan ini?')) {
      const group = communityGroups.find(g => g.id === groupId);
      if (group) {
        const updatedGroup = {
          ...group,
          activities: group.activities?.filter(a => a.id !== activityId) || []
        };
        updateCommunityGroup(updatedGroup);
        if (editingActivityId === activityId) {
          handleCancelActivityEdit();
        }
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Sahabat & Komunitas</h1>
          <p className="text-slate-500 mt-1">
            {currentUser?.role === 'community_admin' 
              ? `Kelola program kerja dan berita untuk ${filteredGroups[0]?.name || 'komunitas anda'}.`
              : 'Kelola seluruh sektor, kategorial, serta update program kerja dan berita.'}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-1 bg-white p-6 rounded-sm shadow-sm border border-gray-200 h-fit sticky top-4">
          
          {selectedGroupId === null ? (
            // --- FORM TAMBAH KOMUNITAS BARU ---
            <>
              {canManageGroups ? (
                <>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <Plus size={20} className="mr-2 text-gkps-gold" /> Tambah Komunitas
                  </h3>
                  <form onSubmit={handleSubmitGroup} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Komunitas</label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                        value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Contoh: Sektor 1" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Foto Sampul</label>
                      <div className={`border-2 border-dashed rounded-sm p-4 text-center cursor-pointer relative ${isDragOver ? 'border-gkps-blue bg-blue-50' : 'border-gray-300'}`}
                        onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                        <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileSelect} />
                        {form.imageUrl ? (
                          <div className="relative h-24"><img src={form.imageUrl} className="h-full w-full object-cover rounded-sm" /></div>
                        ) : (
                          <div className="text-gray-400"><Upload className="mx-auto mb-1" size={20} /><span className="text-xs">Upload Foto</span></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi Singkat</label>
                      <textarea className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none h-24"
                        value={form.description} onChange={e => setForm({...form, description: e.target.value})} required placeholder="Penjelasan singkat..." />
                    </div>
                    <button type="submit" className="w-full bg-gkps-blue text-white py-2.5 rounded-sm font-bold hover:bg-blue-900 transition-colors shadow-sm">Simpan Data</button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">Silakan pilih komunitas di sebelah kanan untuk mengelola kegiatan.</p>
                </div>
              )}
            </>
          ) : (
            // --- FORM TAMBAH / EDIT KEGIATAN (ACTIVITIES) ---
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center">
                   {editingActivityId ? (
                     <><Edit2 size={20} className="mr-2 text-gkps-gold" /> Edit Kegiatan</>
                   ) : (
                     <><ClipboardList size={20} className="mr-2 text-gkps-gold" /> Tambah Info</>
                   )}
                </h3>
                <button onClick={() => { setSelectedGroupId(null); handleCancelActivityEdit(); }} className="text-xs text-red-500 hover:underline">Tutup</button>
              </div>
              
              <div className="bg-blue-50 p-3 mb-4 rounded-sm border-l-4 border-gkps-blue">
                 <p className="text-xs text-blue-800 font-bold uppercase">Mengelola:</p>
                 <p className="text-sm font-serif font-bold text-slate-800">
                    {communityGroups.find(g => g.id === selectedGroupId)?.name}
                 </p>
              </div>

              <form onSubmit={handleSubmitActivity} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul Kegiatan/Info</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                    value={activityForm.title} onChange={e => setActivityForm({...activityForm, title: e.target.value})} required />
                </div>
                <div className="grid grid-cols-2 gap-2">
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori</label>
                      <select className="w-full p-2 border border-gray-300 rounded-sm bg-white outline-none"
                         value={activityForm.category} onChange={e => setActivityForm({...activityForm, category: e.target.value as any})}>
                         <option value="Program Kerja">Program Kerja</option>
                         <option value="Berita">Berita</option>
                         <option value="Jadwal">Jadwal</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Waktu</label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                         value={activityForm.date} onChange={e => setActivityForm({...activityForm, date: e.target.value})} placeholder="20 Nov 2023" />
                   </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi Detail</label>
                  <textarea className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none h-24"
                    value={activityForm.description} onChange={e => setActivityForm({...activityForm, description: e.target.value})} required />
                </div>
                
                <div className="flex gap-2">
                   {editingActivityId && (
                      <button 
                        type="button"
                        onClick={handleCancelActivityEdit}
                        className="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-sm font-bold hover:bg-gray-200 transition-colors"
                      >
                        Batal
                      </button>
                   )}
                   <button 
                    type="submit" 
                    className={`flex-1 text-white py-2.5 rounded-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-2
                      ${editingActivityId ? 'bg-gkps-blue hover:bg-blue-900' : 'bg-green-600 hover:bg-green-700'}`}
                   >
                     {editingActivityId ? <><Save size={16}/> Simpan Perubahan</> : <><Plus size={16}/> Tambahkan Info</>}
                   </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* RIGHT COLUMN: LIST */}
        <div className="lg:col-span-2 space-y-6">
            {filteredGroups.map(group => (
            <div key={group.id} className={`bg-white rounded-sm shadow-sm border transition-all duration-200 
                ${selectedGroupId === group.id ? 'border-gkps-blue ring-1 ring-gkps-blue' : 'border-gray-100 hover:border-gkps-blue/30'}`}>
              
              {/* Header Card */}
              <div className="p-5 flex gap-4 relative">
                 {canManageGroups && (
                    <button 
                      onClick={() => { if(window.confirm('Hapus komunitas ini beserta seluruh kegiatannya?')) deleteCommunityGroup(group.id) }}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors z-10 p-1"
                      title="Hapus Komunitas"
                    >
                      <Trash2 size={18} />
                    </button>
                 )}

                <div className="w-20 h-20 flex-shrink-0">
                  <img src={group.imageUrl} alt={group.name} className="w-full h-full object-cover rounded-sm bg-gray-200" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 text-gkps-blue">
                     <Users size={16} />
                     <h4 className="font-bold text-slate-800 text-lg">{group.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{group.description}</p>
                  
                  <button 
                    onClick={() => {
                        setSelectedGroupId(group.id);
                        if(selectedGroupId !== group.id) handleCancelActivityEdit(); 
                    }}
                    className={`text-xs font-bold px-4 py-2 rounded-sm border transition-colors flex items-center gap-2
                    ${selectedGroupId === group.id ? 'bg-gkps-blue text-white border-gkps-blue' : 'bg-white text-gkps-blue border-gkps-blue hover:bg-blue-50'}`}
                  >
                     <ClipboardList size={14} /> 
                     {selectedGroupId === group.id ? 'Sedang Mengelola...' : 'Kelola Info & Program'}
                  </button>
                </div>
              </div>

              {/* Activities List */}
              {group.activities && group.activities.length > 0 && (
                 <div className="bg-stone-50 border-t border-gray-100 p-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Daftar Kegiatan:</p>
                    <div className="space-y-2">
                       {group.activities.map(act => (
                          <div 
                            key={act.id} 
                            className={`flex items-center justify-between bg-white p-3 border rounded-sm transition-colors
                              ${editingActivityId === act.id ? 'border-gkps-gold ring-1 ring-gkps-gold bg-amber-50' : 'border-gray-200 hover:border-gkps-blue'}`}
                          >
                             <div>
                                <div className="flex items-center gap-2 mb-1">
                                   <span className={`w-2 h-2 rounded-full 
                                     ${act.category === 'Program Kerja' ? 'bg-blue-500' : 
                                       act.category === 'Jadwal' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                   <span className="font-bold text-sm text-slate-800">{act.title}</span>
                                </div>
                                <p className="text-xs text-gray-500 flex items-center gap-2">
                                   <Calendar size={10} /> {act.date}
                                   <span className="text-gray-300">|</span>
                                   {act.category}
                                </p>
                             </div>
                             
                             <div className="flex items-center gap-1">
                               <button 
                                 onClick={() => handleEditActivityClick(act, group.id)}
                                 className={`p-1.5 rounded-sm transition-colors ${editingActivityId === act.id ? 'text-gkps-gold bg-amber-100' : 'text-gray-400 hover:text-gkps-blue hover:bg-blue-50'}`}
                                 title="Edit Kegiatan"
                               >
                                  <Edit2 size={16} />
                               </button>
                               <button 
                                 onClick={() => handleDeleteActivity(group.id, act.id)} 
                                 className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                                 title="Hapus Kegiatan"
                               >
                                  <Trash2 size={16} />
                               </button>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              )}
            </div>
          ))}
          
          {filteredGroups.length === 0 && (
             <div className="p-12 text-center bg-gray-50 border border-dashed border-gray-300 rounded-sm">
                <p className="text-gray-400">
                  {currentUser?.role === 'community_admin' 
                    ? 'Anda belum ditugaskan ke komunitas manapun. Hubungi Super Admin.'
                    : 'Belum ada data komunitas.'}
                </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityManager;
