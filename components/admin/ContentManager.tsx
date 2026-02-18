
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Save, Upload, Layout, Info, Phone } from 'lucide-react';

const ContentManager: React.FC = () => {
  const { heroData, aboutData, contactData, updateHeroData, updateAboutData, updateContactData } = useData();
  const [activeTab, setActiveTab] = useState<'beranda' | 'tentang' | 'kontak'>('beranda');

  // Local state for forms
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
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Halaman Utama</h1>
          <p className="text-slate-500 mt-1">Sesuaikan konten teks dan gambar yang tampil di halaman depan.</p>
        </div>
      </header>

      <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
        {/* Custom Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/50">
          <button 
            onClick={() => setActiveTab('beranda')}
            className={`flex items-center px-6 py-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'beranda' ? 'border-gkps-blue text-gkps-blue bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          >
            <Layout size={16} className="mr-2" /> Beranda (Hero)
          </button>
          <button 
            onClick={() => setActiveTab('tentang')}
            className={`flex items-center px-6 py-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'tentang' ? 'border-gkps-blue text-gkps-blue bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          >
            <Info size={16} className="mr-2" /> Tentang Kami
          </button>
          <button 
            onClick={() => setActiveTab('kontak')}
            className={`flex items-center px-6 py-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'kontak' ? 'border-gkps-blue text-gkps-blue bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          >
            <Phone size={16} className="mr-2" /> Kontak & Footer
          </button>
        </div>

        <div className="p-8">
          {/* BERANDA FORM */}
          {activeTab === 'beranda' && (
            <form onSubmit={handleHeroSubmit} className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-2">
                   <h3 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-gkps-gold pl-3">Teks Utama</h3>
                </div>
                 <div className="col-span-2 md:col-span-1">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Teks Sambutan Kecil</label>
                   <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none transition-colors" 
                     value={localHero.welcomeText} onChange={e => setLocalHero({...localHero, welcomeText: e.target.value})} />
                 </div>
                 <div className="col-span-2 md:col-span-1">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul Besar</label>
                   <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none transition-colors" 
                     value={localHero.title} onChange={e => setLocalHero({...localHero, title: e.target.value})} />
                 </div>
                 <div className="col-span-2">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Sub-Judul (Italic)</label>
                   <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none transition-colors" 
                     value={localHero.subtitle} onChange={e => setLocalHero({...localHero, subtitle: e.target.value})} />
                 </div>

                 <div className="col-span-2 mt-4">
                   <h3 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-gkps-gold pl-3">Ayat & Gambar</h3>
                </div>

                 <div className="col-span-2">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Isi Ayat Alkitab</label>
                   <textarea className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none h-24" 
                     value={localHero.verseText} onChange={e => setLocalHero({...localHero, verseText: e.target.value})} />
                 </div>
                 <div className="col-span-2 md:col-span-1">
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Referensi Ayat</label>
                   <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none transition-colors" 
                     value={localHero.verseReference} onChange={e => setLocalHero({...localHero, verseReference: e.target.value})} />
                 </div>
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Background Image</label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-14 rounded-sm overflow-hidden bg-gray-100 border border-gray-200">
                        <img src={localHero.bgImageUrl} alt="Bg" className="w-full h-full object-cover" />
                      </div>
                      <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 px-4 py-2 rounded-sm text-sm font-bold text-gray-600 transition-all shadow-sm">
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setLocalHero, 'bgImageUrl', localHero)} />
                        <span className="flex items-center gap-2"><Upload size={16} /> Upload Baru</span>
                      </label>
                    </div>
                 </div>
              </div>
              <div className="pt-6 border-t border-gray-100 flex justify-end">
                 <button type="submit" className="flex items-center gap-2 bg-gkps-blue text-white px-8 py-3 rounded-sm font-bold hover:bg-blue-900 transition-colors shadow-lg">
                   <Save size={18} /> Simpan Perubahan
                 </button>
              </div>
            </form>
          )}

          {/* TENTANG FORM */}
          {activeTab === 'tentang' && (
             <form onSubmit={handleAboutSubmit} className="space-y-6 max-w-4xl">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul Bagian</label>
                    <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none" 
                      value={localAbout.title} onChange={e => setLocalAbout({...localAbout, title: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deskripsi</label>
                    <textarea className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none h-40" 
                      value={localAbout.description} onChange={e => setLocalAbout({...localAbout, description: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tahun Berdiri</label>
                    <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none" 
                      value={localAbout.foundedYear} onChange={e => setLocalAbout({...localAbout, foundedYear: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Jumlah Keluarga</label>
                    <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none" 
                      value={localAbout.familyCount} onChange={e => setLocalAbout({...localAbout, familyCount: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Foto Kegiatan/Jemaat</label>
                     <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-sm overflow-hidden bg-gray-100 border border-gray-200">
                           <img src={localAbout.imageUrl} alt="About" className="w-full h-full object-cover" />
                        </div>
                       <label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 px-4 py-2 rounded-sm text-sm font-bold text-gray-600 transition-all shadow-sm">
                         <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setLocalAbout, 'imageUrl', localAbout)} />
                         <span className="flex items-center gap-2"><Upload size={16} /> Upload Baru</span>
                       </label>
                     </div>
                  </div>
               </div>
               <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <button type="submit" className="flex items-center gap-2 bg-gkps-blue text-white px-8 py-3 rounded-sm font-bold hover:bg-blue-900 transition-colors shadow-lg">
                    <Save size={18} /> Simpan Perubahan
                  </button>
               </div>
             </form>
          )}

          {/* KONTAK FORM */}
          {activeTab === 'kontak' && (
             <form onSubmit={handleContactSubmit} className="space-y-6 max-w-4xl">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Alamat Gereja</label>
                    <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none" 
                      value={localContact.address} onChange={e => setLocalContact({...localContact, address: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nomor Telepon</label>
                    <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none" 
                      value={localContact.phone} onChange={e => setLocalContact({...localContact, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Sekretariat</label>
                    <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none" 
                      value={localContact.email} onChange={e => setLocalContact({...localContact, email: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <div className="bg-blue-50/50 p-6 rounded-sm border border-blue-100">
                      <h4 className="text-sm font-bold text-blue-900 mb-4 flex items-center"><Info size={16} className="mr-2"/> Pengaturan Footer</h4>
                      
                      <div className="grid gap-4 mb-6 border-b border-blue-200 pb-6">
                           <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul Footer (Brand)</label>
                              <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm bg-white focus:border-gkps-blue outline-none" 
                                  value={localContact.footerTitle || ''} onChange={e => setLocalContact({...localContact, footerTitle: e.target.value})} placeholder="Contoh: GKPS Tangerang" />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi Singkat</label>
                              <textarea className="w-full p-2.5 border border-gray-300 rounded-sm bg-white focus:border-gkps-blue outline-none h-24" 
                                  value={localContact.footerDescription || ''} onChange={e => setLocalContact({...localContact, footerDescription: e.target.value})} placeholder="Deskripsi singkat gereja..." />
                          </div>
                      </div>

                      <div className="grid gap-4">
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ayat Harian</label>
                              <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm bg-white focus:border-gkps-blue outline-none" 
                                  value={localContact.dailyVerse} onChange={e => setLocalContact({...localContact, dailyVerse: e.target.value})} />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Referensi Ayat</label>
                              <input type="text" className="w-full p-2.5 border border-gray-300 rounded-sm bg-white focus:border-gkps-blue outline-none" 
                                  value={localContact.dailyVerseRef} onChange={e => setLocalContact({...localContact, dailyVerseRef: e.target.value})} />
                          </div>
                      </div>
                    </div>
                  </div>
               </div>
               <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <button type="submit" className="flex items-center gap-2 bg-gkps-blue text-white px-8 py-3 rounded-sm font-bold hover:bg-blue-900 transition-colors shadow-lg">
                    <Save size={18} /> Simpan Perubahan
                  </button>
               </div>
             </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
