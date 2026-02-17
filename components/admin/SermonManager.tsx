import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Sermon } from '../../types';
import { Plus, Trash2, Upload, X } from 'lucide-react';

const SermonManager: React.FC = () => {
  const { sermons, addSermon, deleteSermon } = useData();
  
  const [sermonForm, setSermonForm] = useState<Partial<Sermon>>({
    title: '', preacher: '', date: '', bibleVerse: '', summary: '', imageUrl: ''
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
      setSermonForm({ ...sermonForm, imageUrl });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setSermonForm({ ...sermonForm, imageUrl });
    }
  };

  const handleSubmitSermon = (e: React.FormEvent) => {
    e.preventDefault();
    if (sermonForm.title && sermonForm.preacher) {
      addSermon({
        id: Date.now(),
        title: sermonForm.title!,
        preacher: sermonForm.preacher!,
        date: sermonForm.date || new Date().toLocaleDateString('id-ID'),
        bibleVerse: sermonForm.bibleVerse || '',
        summary: sermonForm.summary || '',
        imageUrl: sermonForm.imageUrl || 'https://picsum.photos/800/600'
      } as Sermon);
      setSermonForm({ title: '', preacher: '', date: '', bibleVerse: '', summary: '', imageUrl: '' });
      alert('Renungan berhasil ditambahkan!');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Khotbah & Renungan</h1>
          <p className="text-slate-500">Upload materi renungan baru atau kelola arsip lama.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Input */}
        <div className="lg:col-span-1 bg-white p-6 rounded-sm shadow-sm border border-gray-200 h-fit">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <Plus size={20} className="mr-2 text-gkps-gold" /> Tambah Renungan
          </h3>
          <form onSubmit={handleSubmitSermon} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue focus:ring-1 focus:ring-gkps-blue outline-none"
                value={sermonForm.title}
                onChange={e => setSermonForm({...sermonForm, title: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Pengkhotbah</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                value={sermonForm.preacher}
                onChange={e => setSermonForm({...sermonForm, preacher: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 12 Nov 2023"
                  className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                  value={sermonForm.date}
                  onChange={e => setSermonForm({...sermonForm, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ayat Alkitab</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                  value={sermonForm.bibleVerse}
                  onChange={e => setSermonForm({...sermonForm, bibleVerse: e.target.value})}
                />
              </div>
            </div>
            
            {/* Drag and Drop Area */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cover Image</label>
              <div 
                className={`border-2 border-dashed rounded-sm p-6 text-center transition-all cursor-pointer relative
                  ${isDragOver ? 'border-gkps-blue bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                  ${sermonForm.imageUrl ? 'bg-gray-50' : ''}
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
                
                {sermonForm.imageUrl ? (
                  <div className="relative">
                    <img src={sermonForm.imageUrl} alt="Preview" className="h-32 mx-auto object-cover rounded-sm shadow-sm" />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setSermonForm({...sermonForm, imageUrl: ''});
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
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ringkasan</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none h-24"
                value={sermonForm.summary}
                onChange={e => setSermonForm({...sermonForm, summary: e.target.value})}
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-gkps-blue text-white py-2 rounded-sm font-bold hover:bg-blue-900 transition-colors">
              Publikasikan
            </button>
          </form>
        </div>

        {/* List Content */}
        <div className="lg:col-span-2 space-y-4">
          {sermons.map(sermon => (
            <div key={sermon.id} className="bg-white p-4 rounded-sm shadow-sm border border-gray-100 flex gap-4 items-start">
              <img src={sermon.imageUrl} alt={sermon.title} className="w-24 h-24 object-cover rounded-sm bg-gray-200" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-800 text-lg">{sermon.title}</h4>
                  <button 
                    onClick={() => { if(window.confirm('Hapus renungan ini?')) deleteSermon(sermon.id) }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-sm text-gkps-blue font-medium mb-1">{sermon.preacher} • {sermon.date}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{sermon.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SermonManager;