
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { User, UserRole } from '../../types';
import { Plus, Trash2, Edit2, RotateCcw, Power, Shield, User as UserIcon, Layout } from 'lucide-react';

const UserManager: React.FC = () => {
  const { users, communityGroups, addUser, updateUser, deleteUser } = useData();
  
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    username: '', password: '', fullName: '', role: 'community_admin', isActive: true, assignedCommunityId: undefined
  });

  const resetForm = () => {
    setFormData({ username: '', password: '', fullName: '', role: 'community_admin', isActive: true, assignedCommunityId: undefined });
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ ...user, password: '' }); // Don't show existing password
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.fullName) return;

    if (editingUser) {
      // Update
      const updatedData: User = {
        ...editingUser,
        username: formData.username,
        fullName: formData.fullName,
        role: formData.role as UserRole,
        assignedCommunityId: formData.role === 'community_admin' ? (Number(formData.assignedCommunityId) || undefined) : undefined,
        isActive: formData.isActive || false
      };
      
      // Only update password if provided
      if (formData.password) {
        updatedData.password = formData.password;
      }

      updateUser(updatedData);
      alert('User berhasil diperbarui.');
    } else {
      // Create
      if (!formData.password) {
        alert('Password wajib diisi untuk user baru.');
        return;
      }
      
      const newUser: User = {
        id: Date.now(),
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role as UserRole,
        isActive: true,
        assignedCommunityId: formData.role === 'community_admin' ? (Number(formData.assignedCommunityId) || undefined) : undefined
      };

      addUser(newUser);
      alert('User berhasil dibuat.');
    }
    resetForm();
  };

  const handleResetPassword = (user: User) => {
    const newPass = prompt("Masukkan password baru untuk " + user.username + ":", "gkps123");
    if (newPass) {
      updateUser({ ...user, password: newPass });
      alert('Password berhasil direset.');
    }
  };

  const handleToggleStatus = (user: User) => {
    updateUser({ ...user, isActive: !user.isActive });
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Pengguna</h1>
          <p className="text-slate-500 mt-1">Buat user, atur peran, dan batasi akses ke komunitas spesifik.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Section */}
        <div className="lg:col-span-1 bg-white p-6 rounded-sm shadow-sm border border-gray-200 h-fit">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            {editingUser ? <Edit2 size={20} className="mr-2 text-gkps-gold" /> : <Plus size={20} className="mr-2 text-gkps-gold" />}
            {editingUser ? 'Edit User' : 'Tambah User Baru'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Username</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Lengkap</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required />
            </div>
            
            {(!editingUser || (editingUser && formData.password)) && (
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    {editingUser ? 'Ganti Password (Opsional)' : 'Password'}
                  </label>
                  <input type="password" className="w-full p-2 border border-gray-300 rounded-sm focus:border-gkps-blue outline-none"
                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder={editingUser ? "Biarkan kosong jika tidak diganti" : ""} />
               </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Peran (Role)</label>
              <select className="w-full p-2 border border-gray-300 rounded-sm bg-white focus:border-gkps-blue outline-none"
                value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as UserRole})}>
                <option value="community_admin">Community Manager (Hanya 1 Komunitas)</option>
                <option value="content_manager">Content Manager (Pengelola Konten)</option>
                <option value="super_admin">Super Admin (Akses Penuh)</option>
              </select>
            </div>

            {formData.role === 'community_admin' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Akses Komunitas (Seksi)</label>
                <select className="w-full p-2 border border-gray-300 rounded-sm bg-white focus:border-gkps-blue outline-none"
                  value={formData.assignedCommunityId || ''} onChange={e => setFormData({...formData, assignedCommunityId: Number(e.target.value)})}>
                  <option value="">-- Pilih Komunitas --</option>
                  {communityGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-500 mt-1">User hanya bisa mengedit komunitas yang dipilih.</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {editingUser && (
                <button type="button" onClick={resetForm} className="flex-1 py-2 text-gray-500 bg-gray-100 rounded-sm hover:bg-gray-200">Batal</button>
              )}
              <button type="submit" className="flex-1 bg-gkps-blue text-white py-2 rounded-sm font-bold hover:bg-blue-900 transition-colors shadow-sm">
                {editingUser ? 'Update User' : 'Buat User'}
              </button>
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role & Akses</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map(user => {
                  const assignedGroup = communityGroups.find(g => g.id === user.assignedCommunityId);
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-700"><UserIcon size={16} /></div>
                          <div>
                            <p className="font-bold text-slate-800">{user.username}</p>
                            <p className="text-xs text-gray-500">{user.fullName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.role === 'super_admin' ? (
                          <span className="flex items-center text-purple-700 font-bold text-xs bg-purple-100 px-2 py-1 rounded-sm w-fit">
                            <Shield size={12} className="mr-1" /> Super Admin
                          </span>
                        ) : user.role === 'content_manager' ? (
                          <span className="flex items-center text-blue-700 font-bold text-xs bg-blue-100 px-2 py-1 rounded-sm w-fit">
                            <Layout size={12} className="mr-1" /> Content Manager
                          </span>
                        ) : (
                          <div>
                            <span className="block text-xs font-bold text-slate-700 mb-1">Community Manager</span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-sm">
                              {assignedGroup ? assignedGroup.name : 'Belum di-assign'}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleToggleStatus(user)}
                          className={`text-xs font-bold px-2 py-1 rounded-sm border transition-colors flex items-center gap-1
                            ${user.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                          title={user.isActive ? "Klik untuk Disable" : "Klik untuk Enable"}
                        >
                          <Power size={12} /> {user.isActive ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => handleEdit(user)} className="text-gray-400 hover:text-gkps-blue" title="Edit User"><Edit2 size={16} /></button>
                        <button onClick={() => handleResetPassword(user)} className="text-gray-400 hover:text-orange-500" title="Reset Password"><RotateCcw size={16} /></button>
                        {user.username !== 'admin' && ( // Prevent deleting main admin
                          <button onClick={() => { if(window.confirm('Hapus user ini?')) deleteUser(user.id) }} className="text-gray-400 hover:text-red-500" title="Hapus User"><Trash2 size={16} /></button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserManager;
