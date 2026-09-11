import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Building, 
  MapPin, 
  LogOut, 
  MessageSquare,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function Dashboard() {
  const { user, logout, setAuthModalOpen } = useAuth();
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    api.getUserEnquiries().then(res => {
      if (res.success) setEnquiries(res.enquiries || []);
    }).catch(err => {
      console.error('Failed to load user enquiries', err);
    }).finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-industrial-900 border border-industrial-800 text-center space-y-4 shadow-2xl">
          <User className="w-12 h-12 text-amber-brand mx-auto" />
          <h2 className="font-display font-bold text-2xl text-white">Client Portal Sign In</h2>
          <p className="text-xs text-industrial-400">
            Sign in with your mobile OTP or email account to view your equipment quote requests, pro-forma invoices, and plant layouts.
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="w-full bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold py-3 rounded-xl text-sm transition-all shadow-glow-amber"
          >
            Sign In with OTP / Email
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Quotation Sent':
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md text-[11px] font-bold">Quotation Ready</span>;
      case 'Contacted':
        return <span className="bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2.5 py-1 rounded-md text-[11px] font-bold">Under Technical Review</span>;
      case 'Closed':
        return <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded-md text-[11px] font-bold">Closed / Finalized</span>;
      default:
        return <span className="bg-amber-500/20 text-amber-brand border border-amber-500/30 px-2.5 py-1 rounded-md text-[11px] font-bold">Pending Review</span>;
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-10">
      
      {/* Top Welcome Card */}
      <div className="rounded-3xl bg-industrial-900/90 border border-industrial-800 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-brand flex items-center justify-center border border-amber-500/20">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs text-amber-brand font-semibold">Client Dashboard</div>
            <h1 className="font-display text-2xl font-bold text-white">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-industrial-400 mt-1">
              <span>{user.email}</span>
              {user.phone && <span>&bull; {user.phone}</span>}
              {user.businessName && <span>&bull; {user.businessName}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            to="/machines"
            className="flex-1 md:flex-initial text-center bg-amber-brand hover:bg-amber-400 text-industrial-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-glow-amber"
          >
            + Request New Quote
          </Link>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-industrial-800 hover:bg-red-950/40 text-industrial-300 hover:text-red-400 border border-industrial-700 text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Enquiries / RFQ History Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-xl text-white border-l-4 border-amber-brand pl-3">
            Your Request for Quotes (RFQs)
          </h2>
          <span className="text-xs text-industrial-400">
            {enquiries.length} {enquiries.length === 1 ? 'Enquiry' : 'Enquiries'} on file
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-amber-brand border-t-transparent rounded-full animate-spin" />
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-industrial-900/50 border border-industrial-800 space-y-4">
            <FileText className="w-10 h-10 text-industrial-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Quotation Requests Yet</h3>
            <p className="text-xs text-industrial-400 max-w-sm mx-auto">
              You haven't submitted any machinery quotation requests yet. Browse our catalog and click "Add to RFQ".
            </p>
            <Link
              to="/machines"
              className="inline-block bg-amber-brand text-industrial-950 font-bold px-5 py-2.5 rounded-xl text-xs"
            >
              Browse Machinery Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((rfq) => (
              <div
                key={rfq._id}
                className="p-6 rounded-2xl bg-industrial-900/80 border border-industrial-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-industrial-800 pb-4">
                  <div>
                    <span className="font-mono font-bold text-amber-brand text-sm block">
                      {rfq.enquiryNumber}
                    </span>
                    <span className="text-[11px] text-industrial-500">
                      Registered on {new Date(rfq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div>
                    {getStatusBadge(rfq.status)}
                  </div>
                </div>

                {/* Machines List */}
                {rfq.machines && rfq.machines.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-bold text-industrial-400 uppercase tracking-wider mb-2">
                      Requested Machinery Models:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {rfq.machines.map((m, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-industrial-950 border border-industrial-850 text-xs">
                          <span className="font-semibold text-white block truncate">{m.name || m.slug}</span>
                          <span className="text-[10px] text-amber-brand">{m.capacity} &bull; Qty: {m.quantity || 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes & Requirements */}
                {rfq.requirements && (
                  <div className="p-3 rounded-xl bg-industrial-950/60 text-xs text-industrial-300">
                    <strong className="text-industrial-400 block text-[10px] uppercase">Requirements:</strong>
                    {rfq.requirements}
                  </div>
                )}

                {/* Admin Notes (if any) */}
                {rfq.adminNotes && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-glow">
                    <strong className="text-amber-brand block text-[10px] uppercase">Raghav Engineering Note:</strong>
                    {rfq.adminNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

