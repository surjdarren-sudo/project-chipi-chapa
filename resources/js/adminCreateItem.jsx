import { createRoot } from 'react-dom/client';
import { useState } from 'react';

function AdminCreateItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('1');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = new FormData();
    formData.append('category_id', categoryId);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('✅ Barang berhasil disimpan: ' + result.data.name);
        setName('');
        setPrice('');
        setQuantity('');
        setImage(null);
        e.target.reset();
      } else {
        setMessage('❌ Gagal: ' + JSON.stringify(result.errors || result.message));
      }
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    }
  };

  return (
    <div style={{
      maxWidth: '480px',
      margin: '3rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      border: '1px solid #f1f5f9',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>
      <h2 style={{
        fontWeight: '700',
        fontSize: '1.35rem',
        marginBottom: '1.5rem',
        color: '#0f172a',
        letterSpacing: '-0.025em'
      }}>
        Tambah Barang Baru - Admin
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            display: 'block',
            fontWeight: '600',
            fontSize: '0.875rem',
            marginBottom: '0.375rem',
            color: '#334155'
          }}>
            Nama Barang
          </label>
          <input
            type="text" minLength={5} maxLength={80}
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Bakmi Ayam Spesial" required
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '0.875rem',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#f8fafc',
              color: '#0f172a'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            display: 'block',
            fontWeight: '600',
            fontSize: '0.875rem',
            marginBottom: '0.375rem',
            color: '#334155'
          }}>
            Harga Barang
          </label>
          <input
            type="number" value={price} onChange={(e) => setPrice(e.target.value)}
            placeholder="Contoh: 25000" required
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '0.875rem',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#f8fafc',
              color: '#0f172a'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            display: 'block',
            fontWeight: '600',
            fontSize: '0.875rem',
            marginBottom: '0.375rem',
            color: '#334155'
          }}>
            Jumlah Barang
          </label>
          <input
            type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}
            placeholder="Jumlah stok" required
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '0.875rem',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#f8fafc',
              color: '#0f172a'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontWeight: '600',
            fontSize: '0.875rem',
            marginBottom: '0.375rem',
            color: '#334155'
          }}>
            Foto Barang
          </label>
          <input
            type="file" accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} required
            style={{
              width: '100%',
              fontSize: '0.875rem',
              color: '#64748b'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            background: '#2563eb',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            fontSize: '0.875rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
            transition: 'background-color 0.2s ease'
          }}
        >
          Simpan ke Database
        </button>
      </form>

      {message && (
        <p style={{
          marginTop: '1.25rem',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '0.875rem',
          fontWeight: '500',
          backgroundColor: message.startsWith('✅') ? '#ecfdf5' : '#fef2f2',
          color: message.startsWith('✅') ? '#065f46' : '#991b1b',
          border: `1px solid ${message.startsWith('✅') ? '#a7f3d0' : '#fecaca'}`
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

const rootElement = document.getElementById('admin-create-item-root');
if (rootElement) {
  createRoot(rootElement).render(<AdminCreateItem />);
}