"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
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
          const retry = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: credentialResponse.credential,
          });
          if (retry.error) throw retry.error;
          if (retry.data.user) {
            toast.success('Google ile kayıt başarılı!');
            router.push('/');
          }
        } else {
          throw error;
        }
      }

      if (data.user) {
        toast.success('Google ile kayıt başarılı!');
        router.push('/');
      }
    } catch (err: any) {
      console.error('Google register error:', err);
      toast.error('İşlem yapılırken bir uyuşmazlık oluştu. Lütfen tekrar deneyin.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
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
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', backgroundColor: '#f8f9fa' }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '480px', 
        backgroundColor: 'white', 
        padding: '2.5rem 1.5rem', 
        borderRadius: '24px', 
        boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
        border: '1px solid #eee'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logo-gold.png" alt="Maximora" style={{ height: '45px', marginBottom: '1.25rem' }} />
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '0.5rem', color: '#111' }}>Aramıza Katıl</h1>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Ayrıcalıklı alışveriş deneyimi için hemen kayıt ol.</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem', color: '#333', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Ad Soyad</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Adınız Soyadınız"
              required
              style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #ddd', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box', backgroundColor: '#fafafa' }}
              onFocus={e => e.target.style.borderColor = '#d4af37'}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem', color: '#333', textTransform: 'uppercase', letterSpacing: '0.02em' }}>E-posta</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="ornek@email.com"
              required
              style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid #ddd', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box', backgroundColor: '#fafafa' }}
              onFocus={e => e.target.style.borderColor = '#d4af37'}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem', color: '#333', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Şifre</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="En az 6 karakter"
                required
                style={{ width: '100%', padding: '0.85rem 3rem 0.85rem 1rem', border: '1px solid #ddd', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box', backgroundColor: '#fafafa' }}
                onFocus={e => e.target.style.borderColor = '#d4af37'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem', color: '#333', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Şifre Tekrar</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                placeholder="Şifreyi tekrar girin"
                required
                style={{ width: '100%', padding: '0.85rem 3rem 0.85rem 1rem', border: '1px solid #ddd', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box', backgroundColor: '#fafafa' }}
                onFocus={e => e.target.style.borderColor = '#d4af37'}
                onBlur={e => e.target.style.borderColor = '#ddd'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <p style={{ fontSize: '0.7rem', color: '#999', marginTop: '-0.5rem', lineHeight: '1.4' }}>
            * Güvenliğiniz için şifreniz en az 6 karakter olmalıdır.
          </p>

          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              fontSize: '1rem', 
              fontWeight: 700, 
              marginTop: '0.5rem', 
              backgroundColor: '#111', 
              color: 'white', 
              border: 'none', 
              borderRadius: '14px', 
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', gap: '1rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
          <span style={{ fontSize: '0.75rem', color: '#999', fontWeight: 600, textTransform: 'uppercase' }}>veya</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              toast.error('Google ile kayıt iptal edildi.');
            }}
            shape="pill"
            theme="outline"
            text="signup_with"
            width="250"
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
          Zaten hesabın var mı?{' '}
          <Link href="/login" style={{ color: '#d4af37', fontWeight: 700, textDecoration: 'none' }}>
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}
