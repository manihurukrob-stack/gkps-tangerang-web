import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Save, Upload } from 'lucide-react';

const ContentManager: React.FC = () => {
  const { heroData, aboutData, contactData, updateHeroData, updateAboutData, updateContactData } = useData();
  const [activeTab, setActiveTab] = useState<'beranda' | 'tentang' | 'kontak'>('beranda');

  // Local state for forms (to avoid constant re-renders on every keystroke, although direct connection is fine for this scale)
  const [localHero, setLocalHero] = useState(heroData);
  const [localAbout, setLocalAbout] = useState(aboutData);
  const [localContact, setLocalContact] = useState(contactData);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroData(localHero);
    alert('Konten Beranda diperbarui!');
  };

  const handleAboutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutData(localAbout);
    alert('Konten Tentang Kami diperbarui!');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactData(localContact);
    alert('Informasi Kontak diperbarui!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<any>, field: string, currentData: any) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setter({ ...currentData, [field]: url });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Halaman Utama</h1>
          <p className="text-slate-500">Edit teks dan gambar pada halaman depan website.</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab('beranda')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'beranda' ? 'border-gkps-blue text-gkps-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Beranda (Hero)
        </button>
        <button 
          onClick={() => setActiveTab('tentang')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'tentang' ? 'border-gkps-blue text-gkps-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Tentang Kami
        </button>
        <button 
          onClick={() => setActiveTab('kontak')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'kontak' ? 'border-gkps-blue text-gkps-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Kontak & Footer
        </button>
      </div>

      <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-200">
        
        {/* BERANDA FORM */}
        {activeTab === 'beranda' && (
          <form onSubmit={handleHeroSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="col-span-2">
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Teks Sambutan Kecil (Atas)</label>
                 <input type="text" className="w-full p-2 border border-gray-300 rounded-sm" 
                   value={localHero.welcomeText} onChange={e => setLocalHero({...localHero, welcomeText: e.target.value})} />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul Besar (Baris 1)</label>
                 <input type="text" className="w-full p-2 border border-gray-300 rounded-sm" 
                   value={localHero.title} onChange={e => setLocalHero({...localHero, title: e.target.value})} />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Sub-Judul (Baris 2 - Italic)</label>
                 <input type="text" className="w-full p-2 border border-gray-300 rounded-sm" 
                   value={localHero.subtitle} onChange={e => setLocalHero({...localHero, subtitle: e.target.value})} />
               </div>
               <div className="col-span-2">
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Isi Ayat Alkitab</label>
                 <textarea className="w-full p-2 border border-gray-300 rounded-sm h-20" 
                   value={localHero.verseText} onChange={e => setLocalHero({...localHero, verseText: e.target.value})} />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Referensi Ayat</label>
                 <input type="text" className="w-full p-2 border border-gray-300 rounded-sm" 
                   value={localHero.verseReference} onChange={e => setLocalHero({...localHero, verseReference: e.target.value})} />
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Background Image</label>
                  <div className="flex items-center gap-4">
                    <img src={localHero.bgImageUrl} alt="Bg" className="w-20 h-12 object-cover rounded bg-gray-200" />
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-sm text-sm font-medium transition-colors">
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setLocalHero, 'bgImageUrl', localHero)} />
                      <span className="flex items-center gap-2"><Upload size={16} /> Ganti Gambar</span>
                    </label>
                  </div>
               </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
               <button type="submit" className="flex items-center gap-2 bg-gkps-blue text-white px-6 py-2 rounded-sm font-bold hover:bg-blue-900 transition-colors">
                 <Save size={18} /> Simpan Perubahan
               </button>
            </div>
          </form>
        )}

        {/* TENTANG FORM */}
        {activeTab === 'tentang' && (
           <form onSubmit={handleAboutSubmit} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul Bagian</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-sm" 
                    value={localAbout.title} onChange={e => setLocalAbout({...localAbout, title: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deskripsi</label>
                  <textarea className="w-full p-2 border border-gray-300 rounded-sm h-32" 
                    value={localAbout.description} onChange={e => setLocalAbout({...localAbout, description: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tahun Berdiri</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-sm" 
                    value={localAbout.foundedYear} onChange={e => setLocalAbout({...localAbout, foundedYear: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Jumlah Keluarga</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-sm" 
                    value={localAbout.familyCount} onChange={e => setLocalAbout({...localAbout, familyCount: e.target.value})} />
                </div>
                <div className="col-span-2">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Foto Kegiatan/Jemaat</label>
                   <div className="flex items-center gap-4">
                     <img src={localAbout.imageUrl} alt="About" className="w-16 h-20 object-cover rounded bg-gray-200" />
                     <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-sm text-sm font-medium transition-colors">
                       <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setLocalAbout, 'imageUrl', localAbout)} />
                       <span className="flex items-center gap-2"><Upload size={16} /> Ganti Gambar</span>
                     </label>
                   </div>
                </div>
             </div>
             <div className="pt-4 border-t border-gray-100">
                <button type="submit" className="flex items-center gap-2 bg-gkps-blue text-white px-6 py-2 rounded-sm font-bold hover:bg-blue-900 transition-colors">
                  <Save size={18} /> Simpan Perubahan
                </button>
             </div>
           </form>
        )}

        {/* KONTAK FORM */}
        {activeTab === 'kontak' && (
           <form onSubmit={handleContactSubmit} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Alamat Gereja</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-sm" 
                    value={localContact.address} onChange={e => setLocalContact({...localContact, address: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nomor Telepon</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-sm" 
                    value={localContact.phone} onChange={e => setLocalContact({...localContact, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Sekretariat</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-sm" 
                    value={localContact.email} onChange={e => setLocalContact({...localContact, email: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <div className="bg-blue-50 p-4 rounded-sm border border-blue-100">
                    <h4 className="text-sm font-bold text-blue-900 mb-3">Ayat Harian (di Footer)</h4>
                    <div className="grid gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Isi Ayat</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-sm bg-white" 
                                value={localContact.dailyVerse} onChange={e => setLocalContact({...localContact, dailyVerse: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Referensi</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-sm bg-white" 
                                value={localContact.dailyVerseRef} onChange={e => setLocalContact({...localContact, dailyVerseRef: e.target.value})} />
                        </div>
                    </div>
                  </div>
                </div>
             </div>
             <div className="pt-4 border-t border-gray-100">
                <button type="submit" className="flex items-center gap-2 bg-gkps-blue text-white px-6 py-2 rounded-sm font-bold hover:bg-blue-900 transition-colors">
                  <Save size={18} /> Simpan Perubahan
                </button>
             </div>
           </form>
        )}

      </div>
    </div>
  );
};

export default ContentManager;