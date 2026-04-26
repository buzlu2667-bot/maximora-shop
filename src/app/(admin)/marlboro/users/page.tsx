"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newCredit, setNewCredit] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleBanUser = async (user: any) => {
    const confirmText = user.is_banned 
      ? `${user.email} kullanıcısının yasağını kaldırmak istiyor musunuz?`
      : `${user.email} kullanıcısını yasaklamak istiyor musunuz? Kullanıcı siteye giriş yapamayacaktır.`;
    
    if (!confirm(confirmText)) return;

    setActionLoading(`ban-${user.id}`);
    try {
      const res = await fetch('/api/marlboro/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, isBanned: !user.is_banned })
      });

      if (res.ok) {
        setUsers(users.map(u => u.id === user.id ? { ...u, is_banned: !user.is_banned } : u));
        toast.success(user.is_banned ? "Yasak kaldırıldı." : "Kullanıcı yasaklandı.");
      } else {
        const errData = await res.json();
        toast.error(`İşlem başarısız: ${errData.error || 'Bilinmeyen hata'}`);
      }
    } catch (err) {
      toast.error("Bir hata oluştu.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (user: any) => {
    if (!confirm(`${user.email} kullanıcısını tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz!`)) return;

    setActionLoading(`delete-${user.id}`);
    try {
      const res = await fetch('/api/marlboro/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });

      if (res.ok) {
        setUsers(users.filter(u => u.id !== user.id));
        toast.success("Kullanıcı başarıyla silindi.");
      } else {
        const errData = await res.json();
        toast.error(`Kullanıcı silinemedi: ${errData.error || 'Bilinmeyen hata'}`);
      }
    } catch (err) {
      toast.error("Bir hata oluştu.");
    } finally {
      setActionLoading(null);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    (user.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/marlboro/users?t=' + Date.now());
      if (res.ok) {
        const data = await res.json();
        setUsers(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openCreditModal = (user: any) => {
    setSelectedUser(user);
    setNewCredit(user.credit_balance?.toString() || "0");
    setModalOpen(true);
  };

  const handleUpdateCredit = async () => {
    if (!selectedUser || isNaN(Number(newCredit))) return;
    
    setIsUpdating(true);
    try {
      const res = await fetch('/api/marlboro/users/credit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser.id, balance: Number(newCredit) })
      });

      if (res.ok) {
        setUsers(users.map(u => u.id === selectedUser.id ? { ...u, credit_balance: Number(newCredit) } : u));
        toast.success("Kredi başarıyla güncellendi.");
        setModalOpen(false);
      } else {
        toast.error("Hata oluştu.");
      }
    } catch (err) {
      toast.error("Bir hata meydana geldi.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '0.5rem', fontWeight: 800 }}>Kayıtlı Kullanıcılar</h1>
          <p style={{ color: '#666' }}>Müşterilerinize Mağaza Kredisi tanımlayabilir ve yönetebilirsiniz.</p>
        </div>
        <div style={{ position: 'relative', minWidth: '300px' }}>
          <input 
            type="text" 
            placeholder="İsim veya e-posta ile ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.875rem 1rem', 
              borderRadius: '12px', 
              border: '1px solid #ddd', 
              fontSize: '0.95rem',
              outline: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          />
        </div>
      </div>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <>
          <style>{`
            .users-table { display: block; }
            .users-cards { display: none; }
            @media (max-width: 1024px) {
              .users-table { display: none; }
              .users-cards { display: flex; flex-direction: column; gap: 0.875rem; }
            }
          `}</style>

          {/* MASAÜSTÜ: Tablo */}
          <div className="users-table" style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #eee' }}>
                  <th style={{ padding: '1.25rem', fontWeight: 600, color: '#333' }}>Kullanıcı</th>
                  <th style={{ padding: '1.25rem', fontWeight: 600, color: '#333' }}>E-posta</th>
                  <th style={{ padding: '1.25rem', fontWeight: 600, color: '#333' }}>Kayıt Tarihi</th>
                  <th style={{ padding: '1.25rem', fontWeight: 600, color: '#333' }}>Kredi</th>
                  <th style={{ padding: '1.25rem', fontWeight: 600, color: '#333' }}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                    <td style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '0.9rem', flexShrink: 0 }}>
                          {(user.full_name || user.email || '?')[0].toUpperCase()}
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 600, color: '#111' }}>{user.full_name || 'İsimsiz Müşteri'}</p>
                          <span style={{ fontSize: '0.75rem', color: '#999', backgroundColor: '#f3f4f6', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{user.role}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem', color: '#555' }}>{user.email}</td>
                    <td style={{ padding: '1.25rem', color: '#777', fontSize: '0.85rem' }}>{formatDate(user.created_at)}</td>
                    <td style={{ padding: '1.25rem' }}>
                      <span style={{ fontWeight: 800, color: user.credit_balance > 0 ? '#10b981' : '#333', fontSize: '1.1rem' }}>
                        {Number(user.credit_balance || 0).toFixed(2)} TL
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button onClick={() => openCreditModal(user)}
                          title="Kredi Düzenle"
                          style={{ padding: '0.5rem 0.7rem', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}>
                          Kredi
                        </button>
                        <button 
                          onClick={() => handleBanUser(user)}
                          disabled={actionLoading === `ban-${user.id}`}
                          style={{ 
                            padding: '0.5rem 0.7rem', 
                            backgroundColor: user.is_banned ? '#10b981' : '#f59e0b', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '6px', 
                            cursor: 'pointer', 
                            fontSize: '0.75rem', 
                            fontWeight: 600,
                            opacity: actionLoading === `ban-${user.id}` ? 0.7 : 1
                          }}
                        >
                          {user.is_banned ? 'Kaldır' : 'Ban'}
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user)}
                          disabled={actionLoading === `delete-${user.id}`}
                          style={{ 
                            padding: '0.5rem 0.7rem', 
                            backgroundColor: '#ef4444', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '6px', 
                            cursor: 'pointer', 
                            fontSize: '0.75rem', 
                            fontWeight: 600,
                            opacity: actionLoading === `delete-${user.id}` ? 0.7 : 1
                          }}
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>Kullanıcı bulunamadı.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBİL: Kartlar */}
          <div className="users-cards">
            {filteredUsers.map((user) => (
              <div key={user.id} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1rem', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '1rem', flexShrink: 0 }}>
                    {(user.full_name || user.email || '?')[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#111' }}>{user.full_name || 'İsimsiz Müşteri'}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#999', backgroundColor: '#f3f4f6', padding: '0.2rem 0.5rem', borderRadius: '4px', flexShrink: 0 }}>{user.role}</span>
                </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f1f1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>Kayıt: {formatDate(user.created_at)}</p>
                      <span style={{ fontWeight: 800, color: user.credit_balance > 0 ? '#10b981' : '#333', fontSize: '1rem' }}>
                        {Number(user.credit_balance || 0).toFixed(2)} TL
                      </span>
                    </div>
                    <button onClick={() => openCreditModal(user)}
                      style={{ padding: '0.5rem 1rem', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                      Kredi
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => handleBanUser(user)}
                      disabled={actionLoading === `ban-${user.id}`}
                      style={{ flex: 1, padding: '0.6rem', backgroundColor: user.is_banned ? '#10b981' : '#f59e0b', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      {user.is_banned ? 'Yasağı Kaldır' : 'Banla'}
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user)}
                      disabled={actionLoading === `delete-${user.id}`}
                      style={{ flex: 1, padding: '0.6rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>Kullanıcı bulunamadı.</div>
            )}
          </div>
        </>
      )}

      {/* Modern Credit Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Kredi Tanımla</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem' }}>
              <strong>{selectedUser?.full_name || selectedUser?.email}</strong> kullanıcısı için yeni bakiye miktarını girin.
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#333' }}>Yeni Bakiye (TL)</label>
              <input 
                type="number" 
                value={newCredit}
                onChange={(e) => setNewCredit(e.target.value)}
                autoFocus
                style={{ width: '100%', padding: '1rem', fontSize: '1.25rem', fontWeight: 700, borderRadius: '12px', border: '2px solid #eee', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = '#111'}
                onBlur={(e) => e.target.style.borderColor = '#eee'}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setModalOpen(false)}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '1rem', borderRadius: '12px', fontWeight: 600 }}
              >
                İptal
              </button>
              <button 
                onClick={handleUpdateCredit}
                disabled={isUpdating}
                className="btn btn-primary"
                style={{ flex: 2, padding: '1rem', borderRadius: '12px', fontWeight: 600 }}
              >
                {isUpdating ? 'Güncelleniyor...' : 'Bakiyeyi Güncelle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
