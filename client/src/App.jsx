import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Background & Shell Components
import DynamicIndustrialBackground from './components/background/DynamicIndustrialBackground';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MobileBottomBar from './components/common/MobileBottomBar';
import WhatsAppFAB from './components/common/WhatsAppFAB';
import AuthModal from './components/common/AuthModal';
import RfqDrawer from './components/cart/RfqDrawer';

// Public Pages
import Home from './pages/Home';
import Machines from './pages/Machines';
import ProductDetail from './pages/ProductDetail';
import Catalog from './pages/Catalog';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

// Admin Pages & Layout
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageCategories from './pages/admin/ManageCategories';
import ManageEnquiries from './pages/admin/ManageEnquiries';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageGallery from './pages/admin/ManageGallery';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import SiteSettings from './pages/admin/SiteSettings';

// Public Layout Wrapper
function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomBar />
      <WhatsAppFAB />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              {/* Dynamic Background with scroll and mouse physics */}
              <DynamicIndustrialBackground />

              {/* Application Modals and Drawers */}
              <AuthModal />
              <RfqDrawer />

              {/* Routes */}
              <Routes>
                {/* Public Storefront Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Home />} />
                  <Route path="machines" element={<Machines />} />
                  <Route path="product/:slug" element={<ProductDetail />} />
                  <Route path="catalog" element={<Catalog />} />
                  <Route path="services" element={<Services />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="blog/:slug" element={<BlogDetail />} />
                  <Route path="about" element={<About />} />
                  <Route path="gallery" element={<Gallery />} />
                  <Route path="testimonials" element={<Testimonials />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>

                {/* Dedicated Admin CMS Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<ManageProducts />} />
                  <Route path="categories" element={<ManageCategories />} />
                  <Route path="enquiries" element={<ManageEnquiries />} />
                  <Route path="blogs" element={<ManageBlogs />} />
                  <Route path="gallery" element={<ManageGallery />} />
                  <Route path="testimonials" element={<ManageTestimonials />} />
                  <Route path="settings" element={<SiteSettings />} />
                </Route>
              </Routes>
            </Router>
          </CartProvider>
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

