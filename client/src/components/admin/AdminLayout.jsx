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
  Sparkles
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
      <div className="min-h-screen flex items-center justify-center p-4 bg-industrial-950">
        <div className="max-w-md w-full p-8 rounded-3xl bg-industrial-900 border border-industrial-800 text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 mx-auto rounded-2xl bg-industrial-950 p-2 flex items-center justify-center border border-amber-500/30 shadow-glow-amber">
            <img src="/raghav-emblem-transparent.png" alt="Raghav Logo" className="w-full h-full object-contain" />
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-white">Administrator Portal</h2>
            <p className="text-xs text-industrial-400 mt-1">
              Secure authentication required to manage products, enquiries, and site settings.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs text-left animate-fade-in">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminSignIn} className="space-y-3.5 text-left">
            <div>
              <label className="block text-[11px] font-medium text-industrial-300 mb-1">
                Admin Email ID
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@raghavfoodprocessingmachines.com"
                className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-industrial-500 focus:border-amber-brand focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-industrial-300 mb-1">
                Security Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-industrial-950 border border-industrial-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-industrial-500 focus:border-amber-brand focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-industrial-950 font-bold py-3 rounded-xl text-xs transition-all shadow-glow-amber flex items-center justify-center gap-2 mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loginLoading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            </button>
          </form>

          {isDev && (
            <div className="pt-2 border-t border-industrial-800/80">
              <button
                type="button"
                onClick={() => enableAdminDemo()}
                className="w-full bg-industrial-800/70 hover:bg-industrial-800 text-amber-brand hover:text-amber-glow text-[11px] font-semibold py-2 rounded-xl transition-all border border-amber-500/20 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Development Demo Quick-Unlock</span>
              </button>
            </div>
          )}

          <div className="pt-1 text-center">
            <Link
              to="/"
              className="text-xs text-industrial-400 hover:text-white transition-colors"
            >
              &larr; Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col lg:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-industrial-900 border-r border-industrial-800/80 flex flex-col flex-shrink-0">
        
        {/* Admin Brand Header */}
        <div className="p-6 border-b border-industrial-800/80 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-industrial-950 border border-amber-500/40 p-1 flex items-center justify-center shadow-glow-amber flex-shrink-0">
              <img src="/raghav-emblem-transparent.png" alt="Raghav Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-display font-bold text-sm tracking-tight text-white">
                RFPM <span className="text-amber-brand">ADMIN</span>
              </div>
              <div className="text-[10px] text-industrial-400">Content Management</div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="text-[10px] font-bold text-industrial-400 uppercase tracking-wider px-3 mb-2">
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
                    ? 'bg-amber-brand text-industrial-950 shadow-glow-amber'
                    : 'text-industrial-300 hover:bg-industrial-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-industrial-950' : 'text-industrial-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & Public switch */}
        <div className="p-4 border-t border-industrial-800/80 space-y-2 bg-industrial-950/40">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-industrial-300 hover:text-white hover:bg-industrial-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-amber-brand" />
              View Public Website
            </span>
            <span className="text-[10px] bg-industrial-800 px-1.5 py-0.5 rounded text-industrial-400">Live</span>
          </Link>

          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-industrial-950 min-h-screen flex flex-col">
        {/* Admin Top Utility Bar */}
        <div className="bg-industrial-900/90 border-b border-industrial-800/80 px-6 py-2.5 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-industrial-300 font-mono text-[11px] hidden sm:inline">
              Admin CMS &bull; <strong className="text-white">{user?.name || 'Administrator'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-industrial-300 hover:text-white bg-industrial-800 hover:bg-industrial-750 px-3 py-1.5 rounded-xl border border-industrial-700/60 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-brand" />
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

