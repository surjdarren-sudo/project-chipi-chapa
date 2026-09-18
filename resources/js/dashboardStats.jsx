import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';

function DashboardStats() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [itemsRes, categoriesRes] = await Promise.all([
        fetch('/api/items'),
        fetch('/api/categories'),
      ]);
      const itemsData = await itemsRes.json();
      const categoriesData = await categoriesRes.json();
      setItems(itemsData.data || []);
      setCategories(categoriesData.data || []);
    } catch (error) {
      console.error('Gagal memuat data dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // auto-refresh tiap 10 detik, supaya data terbaru selalu tampil
    const interval = setInterval(fetchData, 10000);

    // refresh juga saat tab dibuka lagi (misal habis nambah barang di tab lain)
    const onFocus = () => fetchData();
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const totalStok = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalNilai = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

  if (loading) {
    return <p style={{ color: '#64748b' }}>Memuat data dashboard...</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
      <div style={{ background: '#2563eb', color: 'white', padding: '20px', borderRadius: '12px' }}>
        <div style={{ fontSize: '13px', opacity: 0.85 }}>Total Barang</div>
        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{items.length}</div>
      </div>
      <div style={{ background: '#059669', color: 'white', padding: '20px', borderRadius: '12px' }}>
        <div style={{ fontSize: '13px', opacity: 0.85 }}>Total Kategori</div>
        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{categories.length}</div>
      </div>
      <div style={{ background: '#7c3aed', color: 'white', padding: '20px', borderRadius: '12px' }}>
        <div style={{ fontSize: '13px', opacity: 0.85 }}>Total Stok</div>
        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{totalStok}</div>
      </div>
      <div style={{ background: '#1e293b', color: 'white', padding: '20px', borderRadius: '12px' }}>
        <div style={{ fontSize: '13px', opacity: 0.85 }}>Total Nilai Stok</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Rp{totalNilai.toLocaleString('id-ID')}</div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('dashboard-stats-root');
if (rootElement) {
  createRoot(rootElement).render(<DashboardStats />);
}