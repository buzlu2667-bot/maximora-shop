"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Şifreler eşleşmiyor.');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.name }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast.success('Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.', { duration: 6000 });
        router.push('/login');
      }
    } catch (err: any) {
      if (err.message?.includes('already registered')) {
        toast.error('Bu e-posta adresi zaten kayıtlı.');
      } else {
        toast.error(err.message || 'Kayıt başarısız.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: 'var(--color-background)' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>Maximora</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Yeni bir hesap oluşturun</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem' }}>Ad Soyad</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Adınız Soyadınız"
              required
              style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem' }}>E-posta</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="ornek@email.com"
              required
              style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem' }}>Şifre</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="En az 6 karakter"
                required
                style={{ width: '100%', padding: '0.875rem 3rem 0.875rem 1rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem' }}>Şifre Tekrar</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.confirm}
              onChange={e => setForm({ ...form, confirm: e.target.value })}
              placeholder="Şifreyi tekrar girin"
              required
              style={{ width: '100%', padding: '0.875rem 1rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: 600, marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Zaten hesabınız var mı?{' '}
          <Link href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
            Giriş Yap
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <Link href="/" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            ← Alışverişe Devam Et
          </Link>
        </div>
      </div>
    </div>
  );
}
