
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { CommunityGroup } from '../../types';
import { Plus, Trash2, Upload, X, Users } from 'lucide-react';

const CommunityManager: React.FC = () => {
  const { communityGroups, addCommunityGroup, deleteCommunityGroup } = useData();
  
  const [form, setForm] = useState<Partial<CommunityGroup>>({
    name: '', description: '', imageUrl: ''
  });

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, imageUrl });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setForm({ ...form, imageUrl });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.description) {
      addCommunityGroup({
        id: Date.now(),
        name: form.name!,
        description: form.description!,
        imageUrl: form.imageUrl || 'https://picsum.photos/800/600'
      } as CommunityGroup);
      setForm({ name: '', description: '', imageUrl: '' });
      alert('Komunitas berhasil ditambahkan!');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Sahabat & Komunitas</h1>
          <p className="text-slate-500 mt-1">Kelola daftar sektor, kategorial, dan kelompok persekutuan.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-sm shadow-sm border border-gray-200 h-fit">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <Plus size={20} className="mr-2 text-gkps-gold" /> Tambah Komunitas
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
              <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Komunitas/Sektor</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none transition-colors"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
                placeholder="Contoh: Sektor 1, Seksi Bapa"
              />
            </div>
            
            {/* Drag and Drop Image Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Foto Kegiatan (Opsional)</label>
              <div 
                className={`border-2 border-dashed rounded-sm p-6 text-center transition-all cursor-pointer relative
                  ${isDragOver ? 'border-gkps-blue bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                  ${form.imageUrl ? 'bg-gray-50' : ''}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileSelect}
                />
                
                {form.imageUrl ? (
                  <div className="relative">
                    <img src={form.imageUrl} alt="Preview" className="h-32 w-full object-cover rounded-sm shadow-sm" />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setForm({...form, imageUrl: ''});
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pointer-events-none">
                    <Upload className="mx-auto text-gray-400" size={24} />
                    <p className="text-sm text-gray-500">
                      <span className="font-bold text-gkps-blue">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">SVG, PNG, JPG (max. 800x400px)</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi Singkat</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none h-32 transition-colors"
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                required
                placeholder="Jelaskan tentang kegiatan atau jadwal latihan..."
              ></textarea>
            </div>
              <button type="submit" className="w-full bg-gkps-blue text-white py-2.5 rounded-sm font-bold hover:bg-blue-900 transition-colors shadow-sm">
              Simpan Data
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
            {communityGroups.map(item => (
            <div key={item.id} className="bg-white p-5 rounded-sm shadow-sm border border-gray-100 relative hover:border-gkps-blue/30 transition-colors flex gap-4">
              <button 
                onClick={() => { if(window.confirm('Hapus komunitas ini?')) deleteCommunityGroup(item.id) }}
                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors z-10 p-1"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-sm bg-gray-200" 
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 text-gkps-blue">
                   <Users size={16} />
                   <span className="text-xs font-bold uppercase tracking-wider">Komunitas</span>
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-2">{item.name}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
          {communityGroups.length === 0 && (
             <div className="p-12 text-center bg-gray-50 border border-dashed border-gray-300 rounded-sm">
                <p className="text-gray-400">Belum ada data komunitas/sahabat.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityManager;
