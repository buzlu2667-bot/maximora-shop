"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/useStore';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const router = useRouter();
  const { syncUserData } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (googleLoading) return;
    setGoogleLoading(true);
    
    // Auth lock'a takılmaması için küçük bir bekleme ekliyoruz
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: credentialResponse.credential,
      });

      if (error) {
        if (error.message.includes('Lock')) {
          // Kilit hatası varsa bir kez daha dene
          const retry = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: credentialResponse.credential,
          });
          if (retry.error) throw retry.error;
          if (retry.data.user) {
            await syncUserData(retry.data.user.id);
            toast.success('Google ile giriş başarılı!');
            router.push('/');
          }
        } else {
          throw error;
        }
      }

      if (data.user) {
        await syncUserData(data.user.id);
        toast.success('Google ile giriş başarılı!');
        router.push('/');
      }
    } catch (err: any) {
      console.error('Google login error:', err);
      toast.error('Google ile giriş yapılırken bir uyuşmazlık oluştu. Lütfen sayfayı yenileyip tekrar deneyin.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        await syncUserData(data.user.id);
        toast.success('Hoş geldiniz!');
        router.push('/');
      }
    } catch (err: any) {
      let errorMessage = err.message;
      if (err.message === 'Invalid login credentials') {
        errorMessage = 'E-posta veya şifre hatalı.';
      } else if (err.message === 'Email not confirmed') {
        errorMessage = 'Lütfen e-posta adresinizi doğrulayın.';
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', backgroundColor: '#f8f9fa' }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '440px', 
        backgroundColor: 'white', 
        padding: '3rem 2.5rem', 
        borderRadius: '24px', 
        boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
        border: '1px solid #eee'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img src="/logo-gold.png" alt="Maximora" style={{ height: '50px', marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '0.5rem', color: '#111' }}>Yeniden Hoş Geldin</h1>
          <p style={{ color: '#666', fontSize: '0.95rem' }}>Lütfen hesap bilgilerini kullanarak giriş yap.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: '#333', textTransform: 'uppercase', letterSpacing: '0.02em' }}>E-posta</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              required
              style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box', backgroundColor: '#fafafa' }}
              onFocus={e => {
                e.target.style.borderColor = '#d4af37';
                e.target.style.backgroundColor = 'white';
                e.target.style.boxShadow = '0 0 0 4px rgba(212, 175, 55, 0.1)';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#ddd';
                e.target.style.backgroundColor = '#fafafa';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Şifre</label>
              <Link href="/sifremi-unuttum" style={{ fontSize: '0.8rem', color: '#d4af37', textDecoration: 'none', fontWeight: 600 }}>
                Şifremi Unuttum
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '1rem 3.5rem 1rem 1rem', border: '1px solid #ddd', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box', backgroundColor: '#fafafa' }}
                onFocus={e => {
                  e.target.style.borderColor = '#d4af37';
                  e.target.style.backgroundColor = 'white';
                  e.target.style.boxShadow = '0 0 0 4px rgba(212, 175, 55, 0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = '#ddd';
                  e.target.style.backgroundColor = '#fafafa';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#999', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '1.1rem', 
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
            onMouseOver={e => !loading && (e.currentTarget.style.backgroundColor = '#000')}
            onMouseOut={e => !loading && (e.currentTarget.style.backgroundColor = '#111')}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0', gap: '1rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
          <span style={{ fontSize: '0.8rem', color: '#999', fontWeight: 600, textTransform: 'uppercase' }}>veya</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              toast.error('Google ile giriş iptal edildi.');
            }}
            shape="pill"
            theme="outline"
            text="signin_with"
            width="250"
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem', color: '#666' }}>
          Henüz hesabın yok mu?{' '}
          <Link href="/register" style={{ color: '#d4af37', fontWeight: 700, textDecoration: 'none' }}>
            Hemen Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}
