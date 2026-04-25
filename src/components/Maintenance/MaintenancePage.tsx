"use client";

import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';

interface MaintenancePageProps {
  until?: string;
  message?: string;
}

export default function MaintenancePage({ until, message }: MaintenancePageProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

  useEffect(() => {
    if (!until) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(until).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft(null);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [until]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      backgroundColor: '#050505', 
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Background Glows */}
      <div style={{ 
        position: 'absolute', 
        top: '-10%', 
        left: '20%', 
        width: '40vw', 
        height: '40vw', 
        background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
        filter: 'blur(100px)',
        zIndex: 0
      }} />
      <div style={{ 
        position: 'absolute', 
        bottom: '-10%', 
        right: '10%', 
        width: '50vw', 
        height: '50vw', 
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
        filter: 'blur(120px)',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem' }}>
        <img 
          src="/logo-gold.png" 
          alt="Maximora" 
          style={{ height: '80px', marginBottom: '3rem', filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.3))' }} 
        />
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
          fontWeight: 800, 
          letterSpacing: '-0.05em',
          marginBottom: '1rem',
          background: 'linear-gradient(to bottom, #fff 0%, #aaa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Güzellik İçin <br /> Kısa Bir Mola
        </h1>

        <p style={{ 
          color: '#888', 
          fontSize: '1.2rem', 
          maxWidth: '600px', 
          margin: '0 auto 3rem auto',
          lineHeight: '1.6'
        }}>
          {message || "Sitemizi sizin için yeniliyoruz. En kısa sürede en yeni koleksiyonlarımızla tekrar burada olacağız."}
        </p>

        {timeLeft ? (
          <div className="countdown-container" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '4rem' }}>
            {[
              { label: 'GÜN', value: timeLeft.days },
              { label: 'SAAT', value: timeLeft.hours },
              { label: 'DAKİKA', value: timeLeft.minutes },
              { label: 'SANİYE', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div className="countdown-box" style={{ 
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                  fontWeight: 700, 
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '1rem',
                  minWidth: '100px',
                  marginBottom: '0.8rem',
                  color: '#d4af37',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                }}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <span style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '0.2em', fontWeight: 600 }}>{item.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginBottom: '4rem' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.8rem 1.5rem', 
              borderRadius: '50px', 
              backgroundColor: 'rgba(212,175,55,0.1)', 
              color: '#d4af37',
              border: '1px solid rgba(212,175,55,0.2)',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d4af37', display: 'inline-block', boxShadow: '0 0 10px #d4af37' }} />
              YAKINDA BURADAYIZ
            </span>
          </div>
        )}

      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body { margin: 0; overflow-x: hidden; }
        
        @media (max-width: 768px) {
          .countdown-container {
            gap: 0.8rem !important;
          }
          .countdown-box {
            min-width: 70px !important;
            padding: 0.8rem !important;
            font-size: 1.8rem !important;
            border-radius: 12px !important;
          }
          h1 {
            font-size: 2.2rem !important;
          }
          p {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .countdown-container {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 1rem !important;
          }
          .countdown-box {
            min-width: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
