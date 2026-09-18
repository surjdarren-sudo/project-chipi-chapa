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
    <div style={{ maxWidth: '500px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '1rem' }}>
        Tambah Barang Baru - Admin
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Nama Barang</label>
          <input
            type="text" minLength={5} maxLength={80}
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Bakmi Ayam Spesial" required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Harga Barang</label>
          <input
            type="number" value={price} onChange={(e) => setPrice(e.target.value)}
            placeholder="Contoh: 25000" required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Jumlah Barang</label>
          <input
            type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}
            placeholder="Jumlah stok" required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Foto Barang</label>
          <input
            type="file" accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} required
            style={{ width: '100%' }}
          />
        </div>

        <button
          type="submit"
          style={{ background: '#2563eb', color: 'white', padding: '8px 24px', borderRadius: '6px', border: 'none' }}
        >
          Simpan ke Database
        </button>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

const rootElement = document.getElementById('admin-create-item-root');
if (rootElement) {
  createRoot(rootElement).render(<AdminCreateItem />);
}