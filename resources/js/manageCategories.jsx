import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, [search]);

  const fetchCategories = async () => {
    setLoading(true);
    const url = search
      ? `/api/categories?search=${encodeURIComponent(search)}`
      : '/api/categories';
    const response = await fetch(url);
    const result = await response.json();
    setCategories(result.data);
    setLoading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId ? `/api/categories/${editingId}` : '/api/categories';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      resetForm();
      fetchCategories();
    } else {
      const result = await response.json();
      alert('Gagal: ' + JSON.stringify(result.errors || result.message));
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin mau hapus kategori ini?')) return;
    const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchCategories();
    } else {
      alert('Gagal menghapus kategori');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Kelola Kategori</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text" placeholder="Nama kategori"
          value={name} onChange={(e) => setName(e.target.value)} required
          style={{ display: 'block', marginBottom: '8px', width: '100%', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', marginRight: '8px' }}>
          {editingId ? 'Update' : 'Tambah'} Kategori
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} style={{ padding: '8px 16px' }}>
            Batal
          </button>
        )}
      </form>

      <input
        type="text" placeholder="🔍 Cari kategori..."
        value={search} onChange={(e) => setSearch(e.target.value)}
        style={{ display: 'block', marginBottom: '16px', width: '100%', padding: '8px' }}
      />

      {loading ? (
        <p>Memuat data...</p>
      ) : categories.length === 0 ? (
        <p>Tidak ada kategori ditemukan.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categories.map((cat) => (
            <li key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid #eee' }}>
              <span>{cat.name}</span>
              <div>
                <button onClick={() => handleEdit(cat)} style={{ marginRight: '8px' }}>Edit</button>
                <button onClick={() => handleDelete(cat.id)}>Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const rootElement = document.getElementById('manage-categories-root');
if (rootElement) {
  createRoot(rootElement).render(<ManageCategories />);
}