"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Siparişim ne zaman kargoya verilir?",
    answer: "Siparişleriniz 1-2 iş günü içinde hazırlanarak kargoya teslim edilir."
  },
  {
    question: "Kargo kaç günde gelir?",
    answer: "Kargoya verilen siparişleriniz bulunduğunuz ile göre genellikle 2-4 iş günü içinde teslim edilir."
  },
  {
    question: "Kapıda ödeme var mı?",
    answer: "Şu an için yalnızca Havale/EFT ve kredi/banka kartı ile ödeme alınmaktadır."
  },
  {
    question: "İade ve değişim yapabilir miyim?",
    answer: "Teslim aldığınız ürünü 14 gün içinde iade veya değişim talebi oluşturarak gönderebilirsiniz."
  },
  {
    question: "Ürünler orijinal mi?",
    answer: "Maximora’da satışa sunulan tüm ürünler kalite kontrolünden geçirilerek gönderilmektedir."
  },
  {
    question: "Siparişimi nasıl takip edebilirim?",
    answer: "Siparişiniz kargoya verildiğinde tarafınıza takip numarası SMS/E-posta ile iletilir."
  },
  {
    question: "Size nasıl ulaşabilirim?",
    answer: "Bize, İletişim sayfamız üzerinden veya sağ alt kısımda bulunan canlı destek hattımızdan ulaşabilirsiniz."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="container" style={{ 
      maxWidth: '800px', 
      marginTop: '3rem', 
      marginBottom: '5rem',
      padding: '0 1rem'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 400, color: '#000', marginBottom: '1rem' }}>
          Sık Sorulan Sorular
        </h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>
          Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            style={{ 
              border: '1px solid #eee', 
              borderRadius: '12px', 
              overflow: 'hidden',
              backgroundColor: openIndex === index ? '#fcfcfc' : '#fff',
              transition: 'all 0.3s ease',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 1.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                gap: '1rem'
              }}
            >
              <span style={{ 
                fontSize: 'clamp(1rem, 4vw, 1.1rem)', 
                fontWeight: 500, 
                color: openIndex === index ? '#000' : '#333' 
              }}>
                {faq.question}
              </span>
              <div style={{ flexShrink: 0 }}>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>
            
            {openIndex === index && (
              <div style={{ 
                padding: '0 1.5rem 1.25rem 1.5rem', 
                color: '#555', 
                lineHeight: '1.6',
                fontSize: '0.95rem' 
              }}>
                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '4rem', 
        textAlign: 'center', 
        padding: '2.5rem 1.5rem', 
        backgroundColor: '#f9f9f9', 
        borderRadius: '16px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <HelpCircle size={32} style={{ marginBottom: '1rem', color: '#000' }} />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Hala sorunuz mu var?</h3>
        <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Size yardımcı olmaktan mutluluk duyarız.
        </p>
        <a 
          href="/contact" 
          style={{ 
            display: 'inline-block',
            backgroundColor: '#000', 
            color: '#fff', 
            padding: '0.8rem 2rem', 
            borderRadius: '8px', 
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}
        >
          Bize Ulaşın
        </a>
      </div>
    </div>
  );
}
