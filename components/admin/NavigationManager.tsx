
import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Edit2, Check, Plus, Trash2 } from 'lucide-react';

const NavigationManager: React.FC = () => {
  const { navItems, updateNavItem, addNavItem, deleteNavItem } = useData();

  const handleAddItem = () => {
    addNavItem({ label: 'Menu Baru', href: '#' });
  };

  const handleDeleteItem = (index: number) => {
    if (window.confirm('Yakin ingin menghapus menu ini?')) {
      deleteNavItem(index);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Navigasi</h1>
          <p className="text-slate-500 mt-1">Ubah label, link, atau tambah menu baru pada website.</p>
        </div>
      </header>

      <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 pb-2 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
              <div className="col-span-1 text-center">No</div>
              <div className="col-span-4">Label Menu</div>
              <div className="col-span-6">Link Tujuan (ID Bagian)</div>
              <div className="col-span-1 text-center">Aksi</div>
            </div>
            {navItems.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center group">
                <div className="col-span-1 text-center font-bold text-gray-400 bg-gray-50 py-2 rounded-sm">{index + 1}</div>
                <div className="col-span-4 relative">
                  <Edit2 size={14} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                  <input 
                    type="text"
                    value={item.label}
                    onChange={(e) => updateNavItem(index, { ...item, label: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none transition-colors"
                  />
                </div>
                <div className="col-span-6 relative">
                  <input 
                    type="text"
                    value={item.href}
                    onChange={(e) => updateNavItem(index, { ...item, href: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none transition-colors font-mono text-sm text-gray-600"
                    placeholder="#section-id"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-green-600 flex items-center gap-1 text-xs font-bold">
                      <Check size={14} /> Tersimpan
                  </div>
                </div>
                <div className="col-span-1 text-center">
                  <button 
                    onClick={() => handleDeleteItem(index)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all"
                    title="Hapus Menu"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <button 
              onClick={handleAddItem}
              className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 hover:border-gkps-blue hover:text-gkps-blue hover:bg-blue-50 transition-all rounded-sm font-bold text-sm uppercase tracking-wide"
            >
              <Plus size={18} className="mr-2" /> Tambah Menu Baru
            </button>
          </div>

          <div className="mt-8 bg-blue-50 p-4 rounded-sm border border-blue-100 text-sm text-blue-800">
            <strong>Daftar ID Bagian yang Tersedia:</strong>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 mb-4 font-mono text-xs">
              <div className="bg-white px-2 py-1 rounded border border-blue-200">#home <span className="text-gray-400">(Beranda)</span></div>
              <div className="bg-white px-2 py-1 rounded border border-blue-200">#about <span className="text-gray-400">(Tentang)</span></div>
              <div className="bg-white px-2 py-1 rounded border border-blue-200">#schedule <span className="text-gray-400">(Jadwal)</span></div>
              <div className="bg-white px-2 py-1 rounded border border-blue-200 font-bold text-gkps-blue">#sahabat <span className="text-gray-400">(Komunitas)</span></div>
              <div className="bg-white px-2 py-1 rounded border border-blue-200">#sermons <span className="text-gray-400">(Renungan)</span></div>
              <div className="bg-white px-2 py-1 rounded border border-blue-200">#news <span className="text-gray-400">(Warta)</span></div>
              <div className="bg-white px-2 py-1 rounded border border-blue-200">#contact <span className="text-gray-400">(Kontak)</span></div>
            </div>
            <strong>Panduan:</strong> 
            <ul className="list-disc ml-5 mt-2 space-y-1">
               <li>Salin salah satu kode ID di atas (termasuk tanda pagar <code>#</code>) ke kolom "Link Tujuan".</li>
               <li>Contoh untuk menu Sahabat: Masukkan <code>#sahabat</code>.</li>
            </ul>
          </div>
      </div>
    </div>
  );
};

export default NavigationManager;
