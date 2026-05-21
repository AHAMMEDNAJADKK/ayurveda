import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Stethoscope } from 'lucide-react';
import toast from 'react-hot-toast';

const DEFAULT_TREATMENTS = [
  {
    id: 1,
    title: "Rejuvenation Therapy",
    tagline: "Rasayana Chikitsa",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    desc: "Revitalize body cells, boost immunity, and slow down biological aging through customized herbal steam baths, traditional oil massages, and nutrient-dense formulations.",
    benefits: ["Restores cellular energy", "Purifies blood circulation", "Calms the nervous system"]
  },
  {
    id: 2,
    title: "Postnatal Care",
    tagline: "Sutika Paricharya",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600",
    desc: "Gentle restorative therapies, customized firming herbal wraps, and specialized tonics to restore pelvic health, tone abdominal muscles, and aid recovery for new mothers.",
    benefits: ["Accelerates tissue healing", "Relieves postpartum fatigue", "Enhances breastmilk quality"]
  },
  {
    id: 3,
    title: "Ayurvedic Skin Treatment",
    tagline: "Mukha Lepa & Soundarya",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    desc: "Therapeutic custom face packs (Lepa) and herbal oil treatments targeted at hormonal acne, melasma, and hyperpigmentation, restoring your natural radiant glow from deep within.",
    benefits: ["Balances skin sebum", "Reduces deep pigmentation", "100% chemicals-free glow"]
  },
  {
    id: 4,
    title: "Stress Management",
    tagline: "Manovaha Shanti",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    desc: "Harmonize the mind-body connection with Shirodhara (warm oil stream over head), soothing massages, and herbal adaptogens designed to combat burnout, anxiety, and insomnia.",
    benefits: ["Regulates cortisol levels", "Soothes chronic anxiety", "Improves sleep cycles"]
  }
];

const EMPTY_FORM = {
  title: '', tagline: '', image: '', desc: '',
  benefits: ['', '', '']
};

export default function TreatmentsManager() {
  const [treatments, setTreatments] = useState(() => {
    try {
      const saved = localStorage.getItem('admin_treatments');
      return saved ? JSON.parse(saved) : DEFAULT_TREATMENTS;
    } catch { return DEFAULT_TREATMENTS; }
  });
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const save = (updated) => {
    setTreatments(updated);
    localStorage.setItem('admin_treatments', JSON.stringify(updated));
  };

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (t) => {
    setEditId(t.id);
    setForm({
      title: t.title, tagline: t.tagline, image: t.image,
      desc: t.desc,
      benefits: [...(t.benefits || ['', '', ''])]
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = treatments.filter(t => t.id !== id);
    save(updated);
    setDeleteConfirm(null);
    toast.success('Treatment deleted.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Treatment title is required.');
      return;
    }
    const entry = {
      ...form,
      benefits: form.benefits.filter(b => b.trim()),
    };
    if (editId) {
      const updated = treatments.map(t => t.id === editId ? { ...t, ...entry } : t);
      save(updated);
      toast.success('Treatment updated!');
    } else {
      save([...treatments, { id: Date.now(), ...entry }]);
      toast.success('Treatment added!');
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-textDark flex items-center gap-2">
            <Stethoscope size={24} className="text-primary" />
            Treatments Management
          </h2>
          <p className="text-xs text-textMuted mt-1">{treatments.length} treatments · Changes saved locally</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md transition-all hover:-translate-y-0.5"
        >
          <Plus size={16} /> Add Treatment
        </button>
      </div>

      {/* Treatment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {treatments.map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-primary/5 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex">
            <img src={t.image} alt={t.title} className="w-32 h-full object-cover shrink-0" />
            <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
              <div>
                <p className="font-semibold text-textDark text-sm">{t.title}</p>
                <p className="text-xs text-gold italic mt-0.5">{t.tagline}</p>
                <p className="text-xs text-textMuted mt-2 line-clamp-2 leading-relaxed">{t.desc}</p>
                {t.benefits?.length > 0 && (
                  <ul className="mt-2 space-y-0.5">
                    {t.benefits.map((b, i) => (
                      <li key={i} className="text-[10px] text-primary flex items-center gap-1">
                        <span className="w-1 h-1 bg-primary rounded-full shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openEdit(t)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-primary border border-primary/20 hover:bg-cream rounded-full py-1.5 transition-colors"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  onClick={() => setDeleteConfirm(t.id)}
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
            <h3 className="font-display text-lg font-bold text-textDark mb-2">Delete Treatment?</h3>
            <p className="text-sm text-textMuted mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-full border border-cream text-sm font-semibold text-textMuted hover:bg-cream transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl my-8">
            <div className="flex items-center justify-between p-5 border-b border-cream">
              <h3 className="font-display text-lg font-bold text-textDark">{editId ? 'Edit Treatment' : 'Add New Treatment'}</h3>
              <button onClick={() => setShowForm(false)} className="text-textMuted hover:text-textDark transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-textDark mb-1">Treatment Title *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full border border-cream rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="e.g. Rejuvenation Therapy" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-textDark mb-1">Sanskrit Tagline</label>
                <input value={form.tagline} onChange={e => setForm({...form, tagline: e.target.value})}
                  className="w-full border border-cream rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="e.g. Rasayana Chikitsa" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-textDark mb-1">Image URL</label>
                <input value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                  className="w-full border border-cream rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="https://images.unsplash.com/..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-textDark mb-1">Description</label>
                <textarea value={form.desc} onChange={e => setForm({...form, desc: e.target.value})}
                  rows={4} className="w-full border border-cream rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary/40 transition-colors resize-none"
                  placeholder="Describe the treatment in detail..." />
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
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-full border border-cream text-sm font-semibold text-textMuted hover:bg-cream transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-primary hover:bg-primary-light text-white text-sm font-semibold shadow-md transition-all">
                  <Save size={15} /> {editId ? 'Save Changes' : 'Add Treatment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
