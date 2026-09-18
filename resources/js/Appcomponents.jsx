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
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{editingId ? 'Edit Barang' : 'Tambah Barang'}</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '8px', width: '100%', padding: '8px' }}
        >
          <option value="">-- Pilih Kategori --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input
          type="text" placeholder="Nama barang" value={name}
          onChange={(e) => setName(e.target.value)} required
          style={{ display: 'block', marginBottom: '8px', width: '100%', padding: '8px' }}
        />
        <input
          type="number" placeholder="Harga" value={price}
          onChange={(e) => setPrice(e.target.value)} required
          style={{ display: 'block', marginBottom: '8px', width: '100%', padding: '8px' }}
        />
        <input
          type="number" placeholder="Jumlah" value={quantity}
          onChange={(e) => setQuantity(e.target.value)} required
          style={{ display: 'block', marginBottom: '8px', width: '100%', padding: '8px' }}
        />

        <button type="submit" style={{ padding: '8px 16px', marginRight: '8px' }}>
          {editingId ? 'Update' : 'Tambah'} Barang
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} style={{ padding: '8px 16px' }}>
            Batal
          </button>
        )}
      </form>

      {loading ? (
        <p>Memuat data...</p>
      ) : items.length === 0 ? (
        <p>Belum ada barang.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Nama</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Harga</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Stok</th>
              <th style={{ padding: '8px' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{item.name}</td>
                <td style={{ padding: '8px' }}>Rp{item.price}</td>
                <td style={{ padding: '8px' }}>{item.quantity}</td>
                <td style={{ padding: '8px' }}>
                  <button onClick={() => handleEdit(item)} style={{ marginRight: '8px' }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}