const rawApiUrl = import.meta.env.VITE_API_URL;
const API_BASE = rawApiUrl 
  ? (rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`)
  : '/api';

const getHeaders = (isMultipart = false) => {
  const headers = {};
  const token = localStorage.getItem('rfpm_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

async function handleResponse(res) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Products
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/products?${query}`, {
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  getProductBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/products/${slug}`, {
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  createProduct: async (productData) => {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(productData)
    });
    return handleResponse(res);
  },

  updateProduct: async (id, productData) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(productData)
    });
    return handleResponse(res);
  },

  togglePublishProduct: async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}/toggle-publish`, {
      method: 'PATCH',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  // Categories
  getCategories: async () => {
    const res = await fetch(`${API_BASE}/categories`, { headers: getHeaders() });
    return handleResponse(res);
  },

  createCategory: async (categoryData) => {
    const res = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(categoryData)
    });
    return handleResponse(res);
  },

  updateCategory: async (id, categoryData) => {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(categoryData)
    });
    return handleResponse(res);
  },

  deleteCategory: async (id) => {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  // Enquiries / RFQ
  submitEnquiry: async (enquiryData) => {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(enquiryData)
    });
    return handleResponse(res);
  },

  getEnquiries: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/enquiries?${query}`, {
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  getUserEnquiries: async () => {
    const res = await fetch(`${API_BASE}/enquiries/my`, {
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  updateEnquiryStatus: async (id, status, adminNotes) => {
    const res = await fetch(`${API_BASE}/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status, adminNotes })
    });
    return handleResponse(res);
  },

  getExportCsvUrl: () => `${API_BASE}/enquiries/export`,

  // Blogs
  getBlogs: async () => {
    const res = await fetch(`${API_BASE}/blogs`, { headers: getHeaders() });
    return handleResponse(res);
  },

  getBlogBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/blogs/${slug}`, { headers: getHeaders() });
    return handleResponse(res);
  },

  createBlog: async (data) => {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  updateBlog: async (id, data) => {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  deleteBlog: async (id) => {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  // Gallery
  getGallery: async (category = '') => {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    const res = await fetch(`${API_BASE}/gallery${query}`, { headers: getHeaders() });
    return handleResponse(res);
  },

  createGalleryItem: async (data) => {
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  deleteGalleryItem: async (id) => {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  // Testimonials
  getTestimonials: async () => {
    const res = await fetch(`${API_BASE}/testimonials`, { headers: getHeaders() });
    return handleResponse(res);
  },

  createTestimonial: async (data) => {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  deleteTestimonial: async (id) => {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  // Settings
  getSettings: async () => {
    const res = await fetch(`${API_BASE}/settings`, { headers: getHeaders() });
    return handleResponse(res);
  },

  updateSettings: async (settings) => {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(settings)
    });
    return handleResponse(res);
  },

  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(res);
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(res);
  },

  requestOTP: async (contact) => {
    const res = await fetch(`${API_BASE}/auth/otp/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact })
    });
    return handleResponse(res);
  },

  verifyOTP: async (data) => {
    const res = await fetch(`${API_BASE}/auth/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  // Stats
  getStats: async () => {
    const res = await fetch(`${API_BASE}/stats`, { headers: getHeaders() });
    return handleResponse(res);
  },

  // Upload
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData
    });
    return handleResponse(res);
  }
};

