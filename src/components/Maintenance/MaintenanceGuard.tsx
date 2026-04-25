"use client";

import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import MaintenancePage from './MaintenancePage';

export default function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const { user } = useStore();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        setSettings(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  // Admin kullanıcıları bakım modundan etkilenmez
  const isAdmin = user?.role === 'admin';

  // Ayarlar yüklenene kadar içeriği gösterme (opsiyonel, boş bir state beklenebilir)
  if (loading) {
     return <div style={{ backgroundColor: '#000', height: '100vh', width: '100vw' }} />;
  }

  // Eğer bakım modu aktifse ve kullanıcı admin değilse bakım sayfasını göster
  if (settings?.maintenance_mode && !isAdmin) {
    return <MaintenancePage until={settings.maintenance_until} message={settings.maintenance_message} />;
  }

  return <>{children}</>;
}
