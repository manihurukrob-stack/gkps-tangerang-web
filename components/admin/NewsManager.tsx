import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { NewsItem } from '../../types';
import { Plus, Trash2, Upload, X } from 'lucide-react';

const NewsManager: React.FC = () => {
  const { news, addNews, deleteNews } = useData();
  
  const [newsForm, setNewsForm] = useState<Partial<NewsItem>>({
    title: '', date: '', category: 'Pengumuman', content: '', imageUrl: ''
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
      setNewsForm({ ...newsForm, imageUrl });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setNewsForm({ ...newsForm, imageUrl });
    }
  };

  const handleSubmitNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsForm.title && newsForm.content) {
      addNews({
        id: Date.now(),
        title: newsForm.title!,
        date: newsForm.date || new Date().toLocaleDateString('id-ID'),
        category: newsForm.category || 'Pengumuman',
        content: newsForm.content!,
        imageUrl: newsForm.imageUrl
      } as NewsItem);
      setNewsForm({ title: '', date: '', category: 'Pengumuman', content: '', imageUrl: '' });
      alert('Berita berhasil diterbitkan!');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Warta Jemaat</h1>
          <p className="text-slate-500 mt-1">Kelola pengumuman, kegiatan, dan berita duka/sukacita.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-sm shadow-sm border border-gray-200 h-fit">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <Plus size={20} className="mr-2 text-gkps-gold" /> Tambah Warta
          </h3>
          <form onSubmit={handleSubmitNews} className="space-y-4">
              <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul Warta</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none transition-colors"
                value={newsForm.title}
                onChange={e => setNewsForm({...newsForm, title: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none bg-white transition-colors"
                value={newsForm.category}
                onChange={e => setNewsForm({...newsForm, category: e.target.value})}
              >
                <option value="Pengumuman">Pengumuman</option>
                <option value="Kegiatan">Kegiatan</option>
                <option value="Pelayanan">Pelayanan</option>
                <option value="Duka Cita">Duka Cita</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal</label>
              <input 
                type="text" 
                placeholder="Contoh: 15 Nov 2023"
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none transition-colors"
                value={newsForm.date}
                onChange={e => setNewsForm({...newsForm, date: e.target.value})}
              />
            </div>

            {/* Drag and Drop Image Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Gambar Pendukung (Opsional)</label>
              <div 
                className={`border-2 border-dashed rounded-sm p-6 text-center transition-all cursor-pointer relative
                  ${isDragOver ? 'border-gkps-blue bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
                  ${newsForm.imageUrl ? 'bg-gray-50' : ''}
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
                
                {newsForm.imageUrl ? (
                  <div className="relative">
                    <img src={newsForm.imageUrl} alt="Preview" className="h-32 w-full object-cover rounded-sm shadow-sm" />
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setNewsForm({...newsForm, imageUrl: ''});
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
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Isi Berita</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none h-32 transition-colors"
                value={newsForm.content}
                onChange={e => setNewsForm({...newsForm, content: e.target.value})}
                required
              ></textarea>
            </div>
              <button type="submit" className="w-full bg-gkps-blue text-white py-2.5 rounded-sm font-bold hover:bg-blue-900 transition-colors shadow-sm">
              Terbitkan Berita
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
            {news.map(item => (
            <div key={item.id} className="bg-white p-5 rounded-sm shadow-sm border border-gray-100 relative hover:border-gkps-blue/30 transition-colors">
              <button 
                onClick={() => { if(window.confirm('Hapus berita ini?')) deleteNews(item.id) }}
                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors z-10 p-1"
              >
                <Trash2 size={18} />
              </button>
              
              <div className="flex gap-4">
                {item.imageUrl && (
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover rounded-sm bg-gray-200" 
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-gkps-blue/10 text-gkps-blue text-xs font-bold uppercase tracking-wider rounded-sm">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsManager;