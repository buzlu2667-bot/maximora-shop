"use client";

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Code2, Loader2 } from 'lucide-react';
import styles from './Teklif.module.css';

export default function TeklifAlPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectDesc: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/studio-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Bir hata oluştu. Lütfen tekrar deneyin.');
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Lead error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Form gönderilemedi.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>
      
      <div className={styles.contentWrapper}>
        <div className={styles.leftSide}>
          <div className={styles.badge}>HEMEN BAŞLAYALIM</div>
          <h1 className={styles.title}>
            Fikrinizi <br/>
            <span className={styles.goldText}>Gerçeğe Dönüştürelim.</span>
          </h1>
          <p className={styles.description}>
            Sıradan temalara ve yavaş altyapılara mecbur değilsiniz. Markanızı dijitalde bir adım öteye taşıyacak premium çözümler için bize projenizden bahsedin.
          </p>
          
          <ul className={styles.trustList}>
            <li>
              <Code2 size={20} className={styles.checkIcon} />
              <span>%100 Özel Tasarım ve Temiz Kod (Clean Code)</span>
            </li>
            <li>
              <Zap size={20} className={styles.checkIcon} />
              <span>Ultra Hızlı, SEO Uyumlu Altyapı</span>
            </li>
            <li>
              <ShieldCheck size={20} className={styles.checkIcon} />
              <span>7/24 Teknik Destek ve Güvenlik Garantisi</span>
            </li>
          </ul>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.formCard}>
            {status === 'success' ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <CheckCircle2 size={64} />
                </div>
                <h3>Talebiniz Alındı!</h3>
                <p>Uzman ekibimiz size en kısa sürede dönüş yapacaktır. Bizi tercih ettiğiniz için teşekkürler.</p>
              </div>
            ) : (
              <>
                <div className={styles.formHeader}>
                  <h3>Proje Detayları</h3>
                  <p>Lütfen size dönüş yapabilmemiz için bilgilerinizi girin.</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName">Adınız Soyadınız</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName" 
                      className={styles.formControl} 
                      placeholder="Ahmet Yılmaz"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Telefon Numaranız</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className={styles.formControl} 
                      placeholder="0530 123 45 67"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">E-posta Adresiniz</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className={styles.formControl} 
                      placeholder="ornek@sirketiniz.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="projectDesc">Kısaca Projeniz</label>
                    <textarea 
                      id="projectDesc" 
                      name="projectDesc" 
                      className={styles.formControl} 
                      placeholder="E-ticaret sitesi, kurumsal web sitesi, mobil uygulama vb..."
                      required
                      value={formData.projectDesc}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <><Loader2 className="animate-spin" size={20} /> Gönderiliyor...</>
                    ) : (
                      <>Talebi Gönder <ArrowRight size={20} /></>
                    )}
                  </button>

                  {status === 'error' && (
                    <div className={styles.errorText}>{errorMessage}</div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
