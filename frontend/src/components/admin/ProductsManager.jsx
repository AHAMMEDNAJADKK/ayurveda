import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, PackageOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ["General Wellness", "Mental Wellness", "Postnatal Care", "Skin Care", "Immunity", "Digestive Health", "Joint & Bone", "Other"];

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Hormone Balance Syrup",
    category: "General Wellness",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Supports hormonal balance, regulates metabolism, and relieves symptoms of hormonal imbalance naturally.",
    benefits: ["Regulates hormone levels", "Relieves bloating & fatigue", "100% ashoka & lodhra extract"],
    price: 380,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Stress Relief Herbal Capsules",
    category: "Mental Wellness",
    image: "https://images.unsplash.com/photo-1611070973770-b1a60b268471?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Potent blend of adaptogenic herbs like Ashwagandha and Brahmi to combat mental fatigue, stress, and anxiety.",
    benefits: ["Lowers stress hormone (cortisol)", "Improves mental clarity", "Promotes restful sleep"],
    price: 450,
    badge: "New"
  },
  {
    id: 3,
    name: "Postnatal Recovery Oil",
    category: "Postnatal Care",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Traditional oil blend specifically curated for postpartum moms to restore muscle tone, firm skin, and relieve joint pain.",
    benefits: ["Restores core muscle tone", "Soothes back & pelvic pain", "Enriched with Bala & Ashwagandha"],
    price: 620,
    badge: "Bestseller"
  },
  {
    id: 4,
    name: "Radiance Ubtan Face Pack",
    category: "Skin Care",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Traditional recipe containing turmeric, saffron, and sandalwood to gently exfoliate, remove tan, and brighten tired skin.",
    benefits: ["Evens skin tone", "Exfoliates dead skin cells", "Deep herbal brightness & radiance"],
    price: 290,
    badge: "Bestseller"
  },
  {
    id: 5,
    name: "Ashwagandha Vitality Tonic",
    category: "Immunity",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Daily tonic to boost stamina, build immune response, and supply essential botanical micro-nutrients for everyone.",
    benefits: ["Enhances immune defense", "Clears respiratory tract", "Rich in Vitamin C & antioxidants"],
    price: 220,
    badge: ""
  },
  {
    id: 6,
    name: "Arthritis Relief Joint Oil",
    category: "Joint & Bone",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=600",
    shortDesc: "Medicated Ayurvedic oil enriched with Mahanarayana and Dhanvantaram herbs for deep joint lubrication and pain reduction.",
    benefits: ["Relieves chronic joint pain", "Improves joint flexibility", "Anti-inflammatory compounds"],
    price: 540,
    badge: "Popular"
  },
];

const EMPTY_FORM = {
  name: '', category: "General Wellness", image: '', shortDesc: '',
  benefits: ['', '', ''], price: '', badge: ''
};

export default function ProductsManager() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('admin_products');
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch { return DEFAULT_PRODUCTS; }
  });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const save = (updated) => {
    setProducts(updated);
    localStorage.setItem('admin_products', JSON.stringify(updated));
  };

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditId(p.id);
    setForm({
      name: p.name, category: p.category, image: p.image,
      shortDesc: p.shortDesc,
      benefits: [...(p.benefits || ['', '', ''])],
      price: p.price, badge: p.badge || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    save(updated);
    setDeleteConfirm(null);
    toast.success('Product deleted.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) {
      toast.error('Name and price are required.');
      return;
    }
    const entry = {
      ...form,
      price: Number(form.price),
      benefits: form.benefits.filter(b => b.trim()),
    };
    if (editId) {
      const updated = products.map(p => p.id === editId ? { ...p, ...entry } : p);
      save(updated);
      toast.success('Product updated!');
    } else {
      const newId = Date.now();
      save([...products, { id: newId, ...entry }]);
      toast.success('Product added!');
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-textDark flex items-center gap-2">
            <PackageOpen size={24} className="text-primary" />
            Products Management
          </h2>
          <p className="text-xs text-textMuted mt-1">{products.length} products · Changes saved locally</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md transition-all hover:-translate-y-0.5"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-primary/5 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-44">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              {p.badge && (
                <span className="absolute top-3 left-3 bg-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {p.badge}
                </span>
              )}
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-textDark text-sm leading-tight">{p.name}</p>
                  <p className="text-xs text-primary mt-0.5">{p.category}</p>
                </div>
                <p className="text-primary font-bold text-sm shrink-0">₹{p.price}</p>
              </div>
              <p className="text-xs text-textMuted leading-relaxed line-clamp-2">{p.shortDesc}</p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => openEdit(p)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-primary border border-primary/20 hover:bg-cream rounded-full py-1.5 transition-colors"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(p.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-red-500 border border-red-100 hover:bg-red-50 rounded-full py-1.5 transition-colors"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-display text-lg font-bold text-textDark mb-2">Delete Product?</h3>
            <p className="text-sm text-textMuted mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-full border border-cream text-sm font-semibold text-textMuted hover:bg-cream transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl my-8">
            <div className="flex items-center justify-between p-5 border-b border-cream">
              <h3 className="font-display text-lg font-bold text-textDark">{editId ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowForm(false)} className="text-textMuted hover:text-textDark transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-textDark mb-1">Product Name *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full border border-cream rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="e.g. Hormone Balance Syrup" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textDark mb-1">Category *</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full border border-cream rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40 bg-white transition-colors">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-textDark mb-1">Price (₹) *</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                    className="w-full border border-cream rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                    placeholder="e.g. 380" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-textDark mb-1">Image URL</label>
                <input value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                  className="w-full border border-cream rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="https://images.unsplash.com/..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-textDark mb-1">Short Description</label>
                <textarea value={form.shortDesc} onChange={e => setForm({...form, shortDesc: e.target.value})}
                  rows={3} className="w-full border border-cream rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40 transition-colors resize-none"
                  placeholder="Briefly describe the product..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-textDark mb-1">Benefits (up to 3)</label>
                <div className="space-y-2">
                  {form.benefits.map((b, i) => (
                    <input key={i} value={b} onChange={e => {
                      const arr = [...form.benefits];
                      arr[i] = e.target.value;
                      setForm({...form, benefits: arr});
                    }}
                    className="w-full border border-cream rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                    placeholder={`Benefit ${i+1}`} />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-textDark mb-1">Badge (optional)</label>
                <input value={form.badge} onChange={e => setForm({...form, badge: e.target.value})}
                  className="w-full border border-cream rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="e.g. Bestseller, New, Popular" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-full border border-cream text-sm font-semibold text-textMuted hover:bg-cream transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-primary hover:bg-primary-light text-white text-sm font-semibold shadow-md transition-all">
                  <Save size={15} /> {editId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
