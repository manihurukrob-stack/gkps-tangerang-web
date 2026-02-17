import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Sermon, NewsItem } from '../../types';
import { BookOpen, Newspaper, LogOut, Plus, Trash2, Upload, X } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { sermons, news, addSermon, deleteSermon, addNews, deleteNews } = useData();
  const [activeTab, setActiveTab] = useState<'sermons' | 'news'>('sermons');
  
  // Sermon Form State
  const [sermonForm, setSermonForm] = useState<Partial<Sermon>>({
    title: '', preacher: '', date: '', bibleVerse: '', summary: '', imageUrl: ''
  });
  
  // News Form State
  const [newsForm, setNewsForm] = useState<Partial<NewsItem>>({
    title: '', date: '', category: 'Pengumuman', content: ''
  });

  const [isDragOver, setIsDragOver] = useState(false);

  // Drag and Drop Handlers
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

  const handleSubmitNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsForm.title && newsForm.content) {
      addNews({
        id: Date.now(),
        title: newsForm.title!,
        date: newsForm.date || new Date().toLocaleDateString('id-ID'),
        category: newsForm.category || 'Pengumuman',
        content: newsForm.content!
      } as NewsItem);
      setNewsForm({ title: '', date: '', category: 'Pengumuman', content: '' });
      alert('Berita berhasil diterbitkan!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gkps-blue text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-blue-800">
          <h2 className="text-xl font-serif font-bold">Admin Panel</h2>
          <p className="text-xs text-blue-200 mt-1">GKPS Tangerang</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('sermons')}
            className={`w-full flex items-center p-3 rounded-sm transition-colors ${activeTab === 'sermons' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-900'}`}
          >
            <BookOpen size={20} className="mr-3" />
            Manajemen Khotbah
          </button>
          <button 
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center p-3 rounded-sm transition-colors ${activeTab === 'news' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-900'}`}
          >
            <Newspaper size={20} className="mr-3" />
            Warta Jemaat
          </button>
        </nav>
        <div className="p-4 border-t border-blue-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center p-3 text-red-300 hover:bg-red-900/20 hover:text-red-200 rounded-sm transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        
        {/* Sermon Management Tab */}
        {activeTab === 'sermons' && (
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
        )}

        {/* News Management Tab */}
        {activeTab === 'news' && (
          <div className="space-y-8 animate-fade-in-up">
            <header className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Manajemen Warta Jemaat</h1>
                <p className="text-slate-500">Kelola pengumuman, kegiatan, dan berita duka/sukacita.</p>
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
                      className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                      value={newsForm.title}
                      onChange={e => setNewsForm({...newsForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none bg-white"
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
                      className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                      value={newsForm.date}
                      onChange={e => setNewsForm({...newsForm, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Isi Berita</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none h-32"
                      value={newsForm.content}
                      onChange={e => setNewsForm({...newsForm, content: e.target.value})}
                      required
                    ></textarea>
                  </div>
                   <button type="submit" className="w-full bg-gkps-blue text-white py-2 rounded-sm font-bold hover:bg-blue-900 transition-colors">
                    Terbitkan Berita
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 space-y-4">
                 {news.map(item => (
                  <div key={item.id} className="bg-white p-5 rounded-sm shadow-sm border border-gray-100 relative">
                    <button 
                      onClick={() => { if(window.confirm('Hapus berita ini?')) deleteNews(item.id) }}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="px-2 py-1 bg-gkps-blue/10 text-gkps-blue text-xs font-bold uppercase tracking-wider rounded-sm">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{item.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;