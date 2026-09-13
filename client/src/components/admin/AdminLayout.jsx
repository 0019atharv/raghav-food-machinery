import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Inbox, 
  FileText, 
  Image as ImageIcon, 
  MessageSquareQuote, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Wrench, 
  ShieldCheck,
  Plus,
  Sparkles,
  Video
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeSwitcher from '../common/ThemeSwitcher';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, login, enableAdminDemo, logout } = useAuth();

  const [adminEmail, setAdminEmail] = React.useState('admin@raghavfoodprocessingmachines.com');
  const [adminPassword, setAdminPassword] = React.useState('');
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Products', path: '/admin/products', icon: Package },
    { name: 'Manage Categories', path: '/admin/categories', icon: Layers },
    { name: 'Machinery Videos', path: '/admin/videos', icon: Video },
    { name: 'Enquiries / RFQs', path: '/admin/enquiries', icon: Inbox },
    { name: 'Manage Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Manage Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleAdminSignIn = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await login(adminEmail, adminPassword);
    } catch (err) {
      setLoginError(err.message || 'Invalid administrator email or password.');
    } finally {
      setLoginLoading(false);
    }
  };

  // If not logged in as admin, show dedicated secure admin login portal
  if (!isAdmin) {
    const isDev = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_ADMIN === 'true';

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-5 shadow-xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-50 p-2 flex items-center justify-center border border-slate-200 shadow-sm">
            <img src="/raghav-emblem-transparent.png" alt="Raghav Logo" className="w-full h-full object-contain" />
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-slate-900">Administrator Portal</h2>
            <p className="text-xs text-slate-500 mt-1">
              Secure authentication required to manage products, enquiries, and site settings.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-left animate-fade-in">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminSignIn} className="space-y-3.5 text-left">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Admin Email ID
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@raghavfoodprocessingmachines.com"
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Security Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold py-3 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loginLoading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            </button>
          </form>

          {isDev && (
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => enableAdminDemo()}
                className="w-full bg-slate-100 hover:bg-slate-200 text-[#3D9B28] hover:text-[#2E7D1E] text-[11px] font-bold py-2 rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Development Demo Quick-Unlock</span>
              </button>
            </div>
          )}

          <div className="pt-1 text-center">
            <Link
              to="/"
              className="text-xs text-slate-500 hover:text-slate-900 transition-colors"
            >
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col lg:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 shadow-sm">
        
        {/* Admin Brand Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm flex-shrink-0">
              <img src="/raghav-emblem-transparent.png" alt="Raghav Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-display font-bold text-sm tracking-tight text-slate-900">
                RFPM <span className="text-[#3D9B28]">ADMIN</span>
              </div>
              <div className="text-[10px] text-slate-500">Content Management</div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            CMS Navigation
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#3D9B28] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & Public switch */}
        <div className="p-4 border-t border-slate-200 space-y-2 bg-slate-50/60">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#3D9B28]" />
              View Public Website
            </span>
            <span className="text-[10px] bg-emerald-50 text-[#3D9B28] border border-emerald-200 px-1.5 py-0.5 rounded font-bold">Live</span>
          </Link>

          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#F8FAFC] min-h-screen flex flex-col">
        {/* Admin Top Utility Bar */}
        <div className="bg-white/90 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#3D9B28] animate-pulse" />
            <span className="text-slate-600 font-mono text-[11px] hidden sm:inline">
              Admin CMS &bull; <strong className="text-slate-900">{user?.name || 'Administrator'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#3D9B28]" />
              <span className="hidden sm:inline">View Public Site</span>
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </main>

    </div>
  );
}

