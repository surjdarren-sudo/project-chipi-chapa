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
    <div style={{
      maxWidth: '480px',
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
        Kelola Kategori
      </h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
        <input
          type="text" placeholder="Nama kategori"
          value={name} onChange={(e) => setName(e.target.value)} required
          style={{
            display: 'block',
            marginBottom: '0.75rem',
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
          {editingId ? 'Update' : 'Tambah'} Kategori
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

      <input
        type="text" placeholder="🔍 Cari kategori..."
        value={search} onChange={(e) => setSearch(e.target.value)}
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

      {loading ? (
        <p style={{ color: '#64748b', fontSize: '0.875rem', textAlign: 'center', padding: '1rem 0' }}>
          Memuat data...
        </p>
      ) : categories.length === 0 ? (
        <p style={{ color: '#64748b', fontSize: '0.875rem', textAlign: 'center', padding: '1rem 0' }}>
          Tidak ada kategori ditemukan.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {categories.map((cat) => (
            <li key={cat.id} style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              padding: '12px 14px',
              marginBottom: '8px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #f1f5f9'
            }}>
              <span style={{ fontWeight: '500', fontSize: '0.875rem', color: '#1e293b' }}>
                {cat.name}
              </span>
              <div>
                <button onClick={() => handleEdit(cat)} style={{
                  marginRight: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(cat.id)} style={{
                  padding: '6px 12px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Hapus
                </button>
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