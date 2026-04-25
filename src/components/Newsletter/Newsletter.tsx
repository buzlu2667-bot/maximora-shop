"use client";

import React, { useState } from 'react';
import { Send, Rocket } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Abonelik başarılı!');
        setEmail('');
      } else {
        toast.error(data.error || 'Bir hata oluştu.');
      }
    } catch (error) {
      toast.error('Bağlantı hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.newsletterSection}>
      <div className="container">
        <div className={styles.content}>
          <h2 className={styles.title}>
            Özel İndirimleri Kaçırma! E-postana Gelsin <Rocket size={24} className={styles.rocket} />
          </h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="E-posta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className={styles.input}
              />
              <button type="submit" disabled={loading} className={styles.submitBtn}>
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
