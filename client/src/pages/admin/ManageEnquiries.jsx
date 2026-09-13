import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  Download, 
  Phone, 
  Mail, 
  Building, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  FileText,
  X
} from 'lucide-react';
import { api } from '../../services/api';

export default function ManageEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Selected enquiry for detail / notes modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editStatus, setEditStatus] = useState('Pending');
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const res = await api.getEnquiries({ status: statusFilter, search });
      if (res.success) setEnquiries(res.enquiries || []);
    } catch (err) {
      console.error('Failed to load enquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadEnquiries();
  };

  const openDetailModal = (enq) => {
    setSelectedEnquiry(enq);
    setEditStatus(enq.status || 'Pending');
    setAdminNotes(enq.adminNotes || '');
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    setUpdating(true);
    try {
      const res = await api.updateEnquiryStatus(selectedEnquiry._id, editStatus, adminNotes);
      if (res.success) {
        setEnquiries(prev => prev.map(e => e._id === selectedEnquiry._id ? res.enquiry : e));
        setSelectedEnquiry(null);
      }
    } catch (err) {
      alert('Failed to update: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#3D9B28] uppercase tracking-wider">
            Lead Capture & Sales Pipeline
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900">
            Customer Quotation Enquiries (RFQs)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track inquiries, update sales statuses, log custom engineering notes, and export to CSV.
          </p>
        </div>

        {/* CSV Export Button */}
        <a
          href={api.getExportCsvUrl()}
          download
          className="inline-flex items-center gap-2 bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold px-5 py-3 rounded-xl text-xs transition-all shadow-sm whitespace-nowrap"
        >
          <Download className="w-4 h-4" />
          <span>Export All Enquiries (CSV)</span>
        </a>
      </div>

      {/* Toolbar: Search & Status Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
        
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, phone, RFQ #..."
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
          />
        </form>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {['All', 'Pending', 'Contacted', 'Quotation Sent', 'Closed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-[#3D9B28] text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Enquiries List */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-[#3D9B28] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : enquiries.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 text-slate-500 text-xs shadow-sm">
          No customer enquiries found for the selected status.
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div
              key={enq._id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#3D9B28]/50 transition-colors space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#3D9B28] border border-emerald-200 flex items-center justify-center font-mono font-bold text-xs">
                    RFQ
                  </div>
                  <div>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {enq.enquiryNumber}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Received {new Date(enq.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    enq.status === 'Quotation Sent'
                      ? 'bg-emerald-50 text-[#3D9B28] border border-emerald-200'
                      : enq.status === 'Contacted'
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : enq.status === 'Closed'
                      ? 'bg-slate-100 text-slate-700 border border-slate-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {enq.status}
                  </span>

                  <button
                    onClick={() => openDetailModal(enq)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 shadow-sm transition-colors"
                  >
                    Update Status & Notes
                  </button>
                </div>
              </div>

              {/* Customer Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Customer Name</span>
                  <strong className="text-slate-900 text-xs">{enq.customerName}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Phone / WhatsApp</span>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs">{enq.phone}</strong>
                    <a
                      href={`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(enq.customerName)},%20this%20is%20Raghav%20Food%20Machinery%20regarding%20your%20inquiry%20${enq.enquiryNumber}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3D9B28] hover:text-[#2E7D1E]"
                      title="Open WhatsApp chat with lead"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-emerald-500/20" />
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Company & Location</span>
                  <strong className="text-slate-900 text-xs">
                    {enq.businessName || 'Individual / Startup'}
                    {enq.state ? ` (${enq.state})` : ''}
                  </strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Email</span>
                  <span className="text-slate-600 text-xs">{enq.email || 'N/A'}</span>
                </div>
              </div>

              {/* Machines Requested */}
              {enq.machines && enq.machines.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Machines in Quote Request:
                  </span>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {enq.machines.map((m, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 text-[#3D9B28] text-xs px-2.5 py-1 rounded-lg font-semibold shadow-xs">
                        <strong>{m.name || m.slug}</strong> &bull; {m.capacity} (x{m.quantity || 1})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements text */}
              {enq.requirements && (
                <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-bold block text-[10px] uppercase mb-1 tracking-wider">
                    Customer Requirements / Production Goal:
                  </span>
                  {enq.requirements}
                </div>
              )}

              {/* Admin notes */}
              {enq.adminNotes && (
                <div className="text-xs text-amber-900 bg-amber-50/80 p-3 rounded-xl border border-amber-200">
                  <span className="text-amber-800 font-bold block text-[10px] uppercase mb-1 tracking-wider">
                    Internal Sales Remark:
                  </span>
                  {enq.adminNotes}
                </div>
              )}

            </div>
          ))}
        </div>
      )}

      {/* Status Update & Notes Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">Update RFQ Status</h3>
                <span className="text-xs font-mono font-bold text-[#3D9B28]">{selectedEnquiry.enquiryNumber}</span>
              </div>
              <button onClick={() => setSelectedEnquiry(null)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Change Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none font-semibold"
                >
                  <option value="Pending">Pending Review</option>
                  <option value="Contacted">Contacted / Discussion in Progress</option>
                  <option value="Quotation Sent">Quotation Sent (Pro-forma Shared)</option>
                  <option value="Under Discussion">Negotiation / Factory Visit Scheduled</option>
                  <option value="Closed">Closed / Order Finalized</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Internal Sales Remarks & Notes</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  placeholder="e.g. Quoted 500L Retort with steam boiler connection at ₹4.2 Lakhs on 10 Sept..."
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-4 py-2 rounded-xl text-xs shadow-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold px-5 py-2 rounded-xl text-xs shadow-sm transition-all"
                >
                  {updating ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

