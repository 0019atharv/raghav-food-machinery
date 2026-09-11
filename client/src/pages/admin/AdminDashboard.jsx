import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Layers, 
  Inbox, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Download,
  Plus
} from 'lucide-react';
import { api } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalEnquiries: 0,
    pendingEnquiries: 0,
    totalBlogs: 0,
    database: 'MongoDB'
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [statsRes, enqRes] = await Promise.all([
          api.getStats(),
          api.getEnquiries({ limit: 5 })
        ]);
        if (statsRes.success) setStats(statsRes.stats);
        if (enqRes.success) setRecentEnquiries((enqRes.enquiries || []).slice(0, 5));
      } catch (err) {
        console.error('Failed to load admin stats', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-brand uppercase tracking-wider">
            Admin CMS Panel &bull; {stats.database}
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white">
            Manufacturing & Content Operations
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="flex items-center gap-2 bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-glow-amber"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Machine</span>
          </Link>
          <a
            href={api.getExportCsvUrl()}
            download
            className="flex items-center gap-2 bg-industrial-900 hover:bg-industrial-800 text-industrial-200 hover:text-white px-4 py-2.5 rounded-xl text-xs border border-industrial-700 transition-colors"
          >
            <Download className="w-4 h-4 text-amber-brand" />
            <span>Export RFQs (CSV)</span>
          </a>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-6 rounded-2xl bg-industrial-900/90 border border-industrial-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-industrial-400 font-semibold">
            <span>Total Enquiries / RFQs</span>
            <Inbox className="w-4 h-4 text-amber-brand" />
          </div>
          <div className="font-display font-black text-3xl text-white">{stats.totalEnquiries}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <span>Commercial buyer inquiries logged</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-industrial-900/90 border border-amber-500/30 space-y-2 shadow-glow-amber">
          <div className="flex items-center justify-between text-xs text-amber-brand font-semibold">
            <span>Pending Quotations</span>
            <AlertCircle className="w-4 h-4 text-amber-brand" />
          </div>
          <div className="font-display font-black text-3xl text-amber-brand">{stats.pendingEnquiries}</div>
          <div className="text-[11px] text-industrial-400">
            Awaiting sales quotation response
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-industrial-900/90 border border-industrial-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-industrial-400 font-semibold">
            <span>Active Machines</span>
            <Package className="w-4 h-4 text-sky-400" />
          </div>
          <div className="font-display font-black text-3xl text-white">{stats.totalProducts}</div>
          <div className="text-[11px] text-industrial-400">
            Catalog models in database
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-industrial-900/90 border border-industrial-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-industrial-400 font-semibold">
            <span>Machinery Categories</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <div className="font-display font-black text-3xl text-white">{stats.totalCategories}</div>
          <div className="text-[11px] text-industrial-400">
            Retorts, Extruders, Dryers, etc.
          </div>
        </div>

      </div>

      {/* Recent RFQs / Inquiries Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-white">
            Recent Client Quotation Requests
          </h2>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold text-amber-brand hover:underline flex items-center gap-1"
          >
            <span>Manage All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="rounded-2xl bg-industrial-900/90 border border-industrial-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-industrial-950 text-industrial-400 uppercase font-mono text-[10px] tracking-wider border-b border-industrial-800">
                <tr>
                  <th className="px-6 py-3.5">RFQ Number</th>
                  <th className="px-6 py-3.5">Client & Company</th>
                  <th className="px-6 py-3.5">Contact</th>
                  <th className="px-6 py-3.5">Interested Machinery</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-800">
                {recentEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-industrial-500">
                      No customer enquiries logged yet.
                    </td>
                  </tr>
                ) : (
                  recentEnquiries.map((enq) => (
                    <tr key={enq._id} className="hover:bg-industrial-850/50">
                      <td className="px-6 py-3.5 font-mono font-bold text-amber-brand">
                        {enq.enquiryNumber}
                      </td>
                      <td className="px-6 py-3.5 font-semibold text-white">
                        {enq.customerName}
                        {enq.businessName && (
                          <span className="text-[11px] text-industrial-400 block font-normal">
                            {enq.businessName} ({enq.state || 'India'})
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-industrial-300">
                        <div>{enq.phone}</div>
                        {enq.email && <div className="text-[10px] text-industrial-500">{enq.email}</div>}
                      </td>
                      <td className="px-6 py-3.5 text-industrial-300">
                        {enq.machines && enq.machines.length > 0 ? (
                          enq.machines.map((m, idx) => (
                            <span key={idx} className="inline-block bg-industrial-950 px-2 py-0.5 rounded text-[10px] text-industrial-300 mr-1 mb-1">
                              {m.name || m.slug} (x{m.quantity || 1})
                            </span>
                          ))
                        ) : (
                          <span className="text-industrial-500 italic">Custom Plant Inquiry</span>
                        )}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          enq.status === 'Quotation Sent'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : enq.status === 'Contacted'
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                            : 'bg-amber-500/20 text-amber-brand border border-amber-500/30'
                        }`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-industrial-500">
                        {new Date(enq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

