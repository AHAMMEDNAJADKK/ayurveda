import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Search, Filter, Calendar, LogOut, Download, ChevronLeft, ChevronRight, UserCheck, CheckCircle2, Clock } from 'lucide-react';

const AppointmentList = ({ token, onLogout }) => {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, today: 0, pending: 0, confirmed: 0 });
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          limit: 10,
          search,
          status: statusFilter,
          startDate,
          endDate
        }
      };

      const response = await axios.get(`${apiUrl}/admin/appointments`, config);

      if (response.data.success) {
        setAppointments(response.data.data);
        setPages(response.data.pagination.pages);
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please log in again.');
        onLogout();
      } else {
        toast.error('Failed to load appointments.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [page, statusFilter, startDate, endDate]);

  // Debounced search trigger (on enter or button press, or simple manual trigger)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchAppointments();
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const toastId = toast.loading('Updating status...');
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const response = await axios.patch(
        `${apiUrl}/admin/appointments/${id}`,
        { status: newStatus },
        config
      );

      if (response.data.success) {
        toast.success(`Marked as ${newStatus}`, { id: toastId });
        fetchAppointments(); // Reload data
      }
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Failed to update status', { id: toastId });
    }
  };

  const handleCSVExport = async () => {
    toast.loading('Preparing CSV export...');
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          search,
          status: statusFilter,
          startDate,
          endDate
        },
        responseType: 'blob' // Important to handle stream/file file
      };

      const response = await axios.get(`${apiUrl}/admin/appointments/export`, config);
      
      // Create direct file download trigger
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'samedha_appointments.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.dismiss();
      toast.success('Appointments exported successfully!');
    } catch (error) {
      console.error('CSV export failed:', error);
      toast.dismiss();
      toast.error('Failed to export CSV file.');
    }
  };

  return (
    <div className="space-y-8 font-body">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-primary/5 shadow-sm">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-textDark">
            Samedha Dashboard
          </h1>
          <p className="text-xs text-textMuted mt-1">
            Secure administrative control portal for patient bookings
          </p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 bg-cream hover:bg-red-50 hover:text-red-600 text-textDark px-4 py-2 rounded-xl text-sm font-semibold transition-all"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Statistics Panels Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Bookings */}
        <div className="bg-white p-5 rounded-2xl border border-primary/5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-cream text-primary rounded-xl shrink-0">
            <Calendar size={22} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-textMuted uppercase block">Total</span>
            <span className="text-2xl font-bold text-textDark mt-0.5 block">{stats.total}</span>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white p-5 rounded-2xl border border-primary/5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-700 rounded-xl shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-textMuted uppercase block">Today</span>
            <span className="text-2xl font-bold text-textDark mt-0.5 block">{stats.today}</span>
          </div>
        </div>

        {/* Pending Slots */}
        <div className="bg-white p-5 rounded-2xl border border-primary/5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-textMuted uppercase block">Pending</span>
            <span className="text-2xl font-bold text-textDark mt-0.5 block">{stats.pending}</span>
          </div>
        </div>

        {/* Confirmed Slots */}
        <div className="bg-white p-5 rounded-2xl border border-primary/5 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
            <UserCheck size={22} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-textMuted uppercase block">Confirmed</span>
            <span className="text-2xl font-bold text-textDark mt-0.5 block">{stats.confirmed}</span>
          </div>
        </div>
      </div>

      {/* Filter & Operations Bar */}
      <div className="bg-white p-5 rounded-2xl border border-primary/5 shadow-sm space-y-4">
        
        {/* Form elements row */}
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-stretch xl:items-center">
          
          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 xl:max-w-md w-full">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search patient name / phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-cream focus:outline-none focus:border-primary text-xs bg-cream/10"
              />
              <Search size={14} className="absolute left-3 top-3 text-textMuted" />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-light text-white text-xs px-4 py-2 rounded-xl font-semibold transition"
            >
              Search
            </button>
          </form>

          {/* Filters items */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Selector */}
            <div className="flex items-center gap-1.5 bg-cream/20 px-3 py-1.5 rounded-xl border border-cream">
              <Filter size={12} className="text-primary" />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Date selectors */}
            <div className="flex items-center gap-1.5 bg-cream/20 px-3 py-1.5 rounded-xl border border-cream text-xs">
              <Calendar size={12} className="text-primary" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
                className="bg-transparent focus:outline-none cursor-pointer"
                title="Start Date"
              />
              <span className="text-textMuted">-</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
                className="bg-transparent focus:outline-none cursor-pointer"
                title="End Date"
              />
            </div>

            {/* Reset buttons */}
            {(search || statusFilter || startDate || endDate) && (
              <button
                onClick={() => {
                  setSearch(''); setStatusFilter(''); setStartDate(''); setEndDate(''); setPage(1);
                }}
                className="text-xs text-red-500 font-bold hover:underline"
              >
                Reset Filters
              </button>
            )}

            {/* Export CSV button */}
            <button
              onClick={handleCSVExport}
              className="flex items-center space-x-1.5 bg-accent hover:bg-accent/80 text-textDark text-xs px-3.5 py-2 rounded-xl font-bold transition ml-auto"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>

          </div>

        </div>

      </div>

      {/* Appointments List Table */}
      <div className="bg-white rounded-2xl border border-primary/5 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-sm text-textMuted">Loading records...</div>
        ) : appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-cream/40 border-b border-cream font-semibold text-textDark">
                  <th className="p-4">Code / Patient</th>
                  <th className="p-4">Phone / Age</th>
                  <th className="p-4">Date / Slot</th>
                  <th className="p-4 w-1/3">Health Details</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream/50 text-textDark/90">
                {appointments.map((app) => (
                  <tr key={app._id} className="hover:bg-cream/10 transition-colors">
                    {/* Confirmation ID & Patient Name */}
                    <td className="p-4">
                      <span className="font-mono font-bold text-primary block leading-none">
                        {app.confirmationId || 'N/A'}
                      </span>
                      <span className="font-semibold text-sm block mt-1 leading-none">{app.name}</span>
                    </td>

                    {/* Phone & Age */}
                    <td className="p-4">
                      <span className="block">{app.phone}</span>
                      <span className="text-[10px] text-textMuted mt-0.5 block">{app.age} yrs</span>
                    </td>

                    {/* Date & Time Slot */}
                    <td className="p-4">
                      <span className="font-medium block">
                        {new Date(app.date).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </span>
                      <span className="text-[10px] text-primary mt-0.5 block">{app.timeSlot}</span>
                    </td>

                    {/* Cause / Health Details */}
                    <td className="p-4 text-textMuted leading-relaxed max-w-xs truncate" title={app.healthDetails}>
                      {app.healthDetails}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                          app.status === 'completed'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : app.status === 'confirmed'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* Status Action triggers */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        {app.status === 'pending' && (
                          <button
                            onClick={() => handleStatusUpdate(app._id, 'confirmed')}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 p-1.5 rounded-lg transition"
                            title="Confirm Appointment"
                          >
                            <UserCheck size={14} />
                          </button>
                        )}
                        {app.status !== 'completed' && (
                          <button
                            onClick={() => handleStatusUpdate(app._id, 'completed')}
                            className="bg-green-50 hover:bg-green-100 text-green-700 border border-green-100 p-1.5 rounded-lg transition"
                            title="Mark Completed"
                          >
                            <CheckCircle2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center text-sm text-textMuted">No appointments found.</div>
        )}

        {/* Pagination Controls */}
        {pages > 1 && (
          <div className="p-4 bg-cream/20 border-t border-cream flex items-center justify-between">
            <span className="text-xs text-textMuted">
              Page {page} of {pages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                className="p-1.5 rounded-lg border border-cream hover:bg-cream/40 transition disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={page === pages}
                onClick={() => setPage(p => Math.min(p + 1, pages))}
                className="p-1.5 rounded-lg border border-cream hover:bg-cream/40 transition disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default AppointmentList;
