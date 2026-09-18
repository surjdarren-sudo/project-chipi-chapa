import { useState, useEffect } from 'react';

export default function AppComponents() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [editingId, setEditingId] = useState(null); // null = mode tambah, ada isi = mode edit
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('/api/items');
    const result = await response.json();
    setItems(result.data);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    const result = await response.json();
    setCategories(result.data);
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setQuantity('');
    setCategoryId('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      category_id: parseInt(categoryId),
      name,
      price: parseInt(price),
      quantity: parseInt(quantity),
    };

    const url = editingId ? `/api/items/${editingId}` : '/api/items';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      resetForm();
      fetchItems();
    } else {
      const result = await response.json();
      alert('Gagal: ' + JSON.stringify(result.errors || result.message));
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setQuantity(item.quantity);
    setCategoryId(item.category_id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin mau hapus barang ini?')) return;

    const response = await fetch(`/api/items/${id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchItems();
    } else {
      alert('Gagal menghapus barang');
    }
  };

  return (
    <div style={{
      maxWidth: '640px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      border: '1px solid #e2e8f0',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        fontWeight: '700',
        fontSize: '1.35rem',
        marginBottom: '1.5rem',
        color: '#0f172a',
        letterSpacing: '-0.025em'
      }}>
        {editingId ? 'Edit Barang' : 'Tambah Barang'}
      </h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          style={{
            display: 'block',
            marginBottom: '0.875rem',
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
        >
          <option value="">-- Pilih Kategori --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input
          type="text" placeholder="Nama barang" value={name}
          onChange={(e) => setName(e.target.value)} required
          style={{
            display: 'block',
            marginBottom: '0.875rem',
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
        <input
          type="number" placeholder="Harga" value={price}
          onChange={(e) => setPrice(e.target.value)} required
          style={{
            display: 'block',
            marginBottom: '0.875rem',
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
        <input
          type="number" placeholder="Jumlah" value={quantity}
          onChange={(e) => setQuantity(e.target.value)} required
          style={{
            display: 'block',
            marginBottom: '1.25rem',
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

        <button type="submit" style={{
          padding: '10px 18px',
          marginRight: '8px',
          backgroundColor: editingId ? '#eab308' : '#2563eb',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '0.875rem',
          cursor: 'pointer',
          boxShadow: editingId ? '0 4px 12px rgba(234, 179, 8, 0.2)' : '0 4px 12px rgba(37, 99, 235, 0.2)',
          transition: 'all 0.2s ease'
        }}>
          {editingId ? 'Update' : 'Tambah'} Barang
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} style={{
            padding: '10px 18px',
            backgroundColor: '#f1f5f9',
            color: '#475569',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            Batal
          </button>
        )}
      </form>

      {loading ? (
        <p style={{ color: '#64748b', fontSize: '0.875rem', textAlign: 'center', padding: '1rem 0' }}>
          Memuat data...
        </p>
      ) : items.length === 0 ? (
        <p style={{ color: '#64748b', fontSize: '0.875rem', textAlign: 'center', padding: '1rem 0' }}>
          Belum ada barang.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ textAlign: 'left', padding: '12px 14px', fontSize: '0.75rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #e2e8f0', borderRadius: '8px 0 0 0' }}>Nama</th>
                <th style={{ textAlign: 'left', padding: '12px 14px', fontSize: '0.75rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #e2e8f0' }}>Harga</th>
                <th style={{ textAlign: 'left', padding: '12px 14px', fontSize: '0.75rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #e2e8f0' }}>Stok</th>
                <th style={{ textAlign: 'right', padding: '12px 14px', fontSize: '0.75rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #e2e8f0', borderRadius: '0 8px 0 0' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ transition: 'background-color 0.15s ease' }}>
                  <td style={{ padding: '12px 14px', fontSize: '0.875rem', fontWeight: '500', color: '#0f172a', borderBottom: '1px solid #f1f5f9' }}>{item.name}</td>
                  <td style={{ padding: '12px 14px', fontSize: '0.875rem', color: '#334155', borderBottom: '1px solid #f1f5f9' }}>Rp{item.price?.toLocaleString()}</td>
                  <td style={{ padding: '12px 14px', fontSize: '0.875rem', color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{item.quantity}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', borderBottom: '1px solid #f1f5f9' }}>
                    <button onClick={() => handleEdit(item)} style={{
                      marginRight: '6px',
                      padding: '6px 12px',
                      backgroundColor: '#3b82f6',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} style={{
                      padding: '6px 12px',
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}