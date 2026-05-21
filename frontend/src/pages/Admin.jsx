import { useState, useContext } from 'react';
import AppointmentList from '../components/admin/AppointmentList';
import ProductsManager from '../components/admin/ProductsManager';
import TreatmentsManager from '../components/admin/TreatmentsManager';
import { AuthContext } from '../context/AuthContext';
import { Calendar, PackageOpen, Stethoscope } from 'lucide-react';

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
    <div className="min-h-screen bg-cream/20 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Tab Bar */}
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

        {/* Tab Panels */}
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
    </div>
  );
};

export default Admin;
