import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppointmentList from '../components/admin/AppointmentList';
import ProductsManager from '../components/admin/ProductsManager';
import TreatmentsManager from '../components/admin/TreatmentsManager';
import { AuthContext } from '../context/AuthContext';
import { Calendar, PackageOpen, Stethoscope, LogOut, ArrowLeft, Leaf } from 'lucide-react';

const TABS = [
  { id: 'appointments', label: 'Appointments', Icon: Calendar },
  { id: 'products',     label: 'Products',     Icon: PackageOpen },
  { id: 'treatments',   label: 'Treatments',   Icon: Stethoscope },
];

const Admin = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('appointments');

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream/20 font-body">
      {/* Unified Premium Admin Header */}
      <header className="bg-white border-b border-primary/5 shadow-sm py-4 px-6 sm:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Logo Brand Signature */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg md:text-xl text-textDark leading-tight">
                Health Care Ayurveda
              </h1>
              <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">
                Administrative Control Panel
              </span>
            </div>
          </div>
          
          {/* Navigation Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-textMuted hover:text-primary font-semibold px-3 py-2 rounded-xl hover:bg-cream/40 transition-all"
            >
              <ArrowLeft size={14} />
              <span>Back to Site</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-xl transition-all shadow-sm"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Views Container */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Unified Tab Bar Selector */}
        <div className="flex items-center gap-2 bg-white border border-primary/5 rounded-2xl p-1.5 w-fit shadow-sm">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-textMuted hover:text-primary hover:bg-cream'
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Selected Dashboard Panel */}
        <div className="transition-opacity duration-200">
          {activeTab === 'appointments' && (
            <AppointmentList token={user.token} onLogout={logout} />
          )}
          {activeTab === 'products' && (
            <ProductsManager />
          )}
          {activeTab === 'treatments' && (
            <TreatmentsManager />
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
