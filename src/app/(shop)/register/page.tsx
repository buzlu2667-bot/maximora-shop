"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (googleLoading) return;
    setGoogleLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: credentialResponse.credential,
      });
      if (error) {
        if (error.message.includes('Lock')) {
          const retry = await supabase.auth.signInWithIdToken({ provider: 'google', token: credentialResponse.credential });
          if (retry.error) throw retry.error;
          if (retry.data.user) router.push('/');
        } else throw error;
      }
      if (data.user) {
        toast.success('Kayıt başarılı!');
        router.push('/');
      }
    } catch (err: any) {
      toast.error('Google kaydı başarısız.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (form.password !== form.confirm) return toast.error('Şifreler eşleşmiyor.');
    if (form.password.length < 6) return toast.error('Şifre en az 6 karakter olmalıdır.');

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.name } }
      });
      if (error) throw error;
      if (data.user) {
        toast.success('Kayıt başarılı! Lütfen e-postanızı doğrulayın.');
        router.push('/login');
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: '440px' }}>
          <div style={{ marginBottom: '40px' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', color: '#666', textDecoration: 'none', fontSize: '14px', marginBottom: '24px', fontWeight: 500 }}>
              <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Ana Sayfaya Dön
            </Link>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#111', marginBottom: '8px', letterSpacing: '-1px' }}>Kayıt Ol</h1>
            <p style={{ color: '#666', fontSize: '15px' }}>Maximora dünyasına katılmak için bilgilerinizi girin.</p>
          </div>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '8px', textTransform: 'uppercase' }}>Ad Soyad</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Adınız Soyadınız"
                required
                style={{ width: '100%', padding: '14px 16px', border: '1.5px solid #eee', borderRadius: '8px', fontSize: '15px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#111'}
                onBlur={e => e.target.style.borderColor = '#eee'}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '8px', textTransform: 'uppercase' }}>E-posta Adresi</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="ornek@mail.com"
                required
                style={{ width: '100%', padding: '14px 16px', border: '1.5px solid #eee', borderRadius: '8px', fontSize: '15px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#111'}
                onBlur={e => e.target.style.borderColor = '#eee'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '8px', textTransform: 'uppercase' }}>Şifre</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••"
                    required
                    style={{ width: '100%', padding: '14px 45px 14px 16px', border: '1.5px solid #eee', borderRadius: '8px', fontSize: '15px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#111'}
                    onBlur={e => e.target.style.borderColor = '#eee'}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '8px', textTransform: 'uppercase' }}>Şifre Tekrar</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={e => setForm({ ...form, confirm: e.target.value })}
                    placeholder="••••••"
                    required
                    style={{ width: '100%', padding: '14px 45px 14px 16px', border: '1.5px solid #eee', borderRadius: '8px', fontSize: '15px', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#111'}
                    onBlur={e => e.target.style.borderColor = '#eee'}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '-5px' }}>* Şifreniz en az 6 karakterden oluşmalıdır.</p>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '16px', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', transition: 'opacity 0.2s' }}
            >
              {loading ? 'Yükleniyor...' : 'Kayıt Ol'}
            </button>
          </form>

          <div style={{ margin: '30px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
            <span style={{ fontSize: '13px', color: '#999', fontWeight: 600 }}>VEYA</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Hata oluştu.')}
              shape="rectangular"
              theme="outline"
              width="320"
            />
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center', paddingTop: '30px', borderTop: '1px solid #eee' }}>
            <p style={{ fontSize: '15px', color: '#666' }}>
              Zaten hesabınız var mı? <Link href="/login" style={{ color: '#111', fontWeight: 700, textDecoration: 'none' }}>Giriş Yap</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
