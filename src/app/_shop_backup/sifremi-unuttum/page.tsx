"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/sifre-guncelle`,
      });
      if (error) throw error;
      setSent(true);
      toast.success('Sıfırlama bağlantısı e-posta adresinize gönderildi.');
    } catch (err: any) {
      toast.error(err.message || 'Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: 'var(--color-background)' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>Şifremi Unuttum</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            {sent 
              ? 'E-posta adresinizi kontrol edin.' 
              : 'Şifrenizi sıfırlamak için kayıtlı e-posta adresinizi girin.'}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--color-text-main)' }}>E-posta</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                required
                style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#111'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: 600, marginTop: '0.5rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bcf0da' }}>
            <p style={{ color: '#166534', margin: 0, fontSize: '0.95rem' }}>
              Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi. Lütfen gelen kutunuzu (ve spam klasörünü) kontrol edin.
            </p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <Link href="/login" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            ← Giriş Sayfasına Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
