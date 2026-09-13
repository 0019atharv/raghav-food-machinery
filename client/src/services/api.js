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
  },

  // Upload Video (MP4 / WebM / Mov)
  uploadVideo: async (file) => {
    try {
      const formData = new FormData();
      formData.append('video', file);
      const res = await fetch(`${API_BASE}/upload/video`, {
        method: 'POST',
        headers: getHeaders(true),
        body: formData
      });
      return await handleResponse(res);
    } catch (e) {
      console.warn('Backend video upload failed, creating local preview object URL:', e.message);
      const blobUrl = URL.createObjectURL(file);
      return {
        success: true,
        videoUrl: blobUrl,
        message: 'Video loaded for preview'
      };
    }
  },

  // Machinery In Action Videos
  getVideos: async () => {
    try {
      const res = await fetch(`${API_BASE}/videos`, { headers: getHeaders() });
      const data = await handleResponse(res);
      if (data && data.success && Array.isArray(data.videos) && data.videos.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Backend videos fetch failed, checking local storage:', e.message);
    }
    const stored = localStorage.getItem('rfpm_machinery_videos');
    if (stored) {
      try {
        return { success: true, videos: JSON.parse(stored) };
      } catch (err) {}
    }
    return { success: true, videos: defaultMachineryVideos };
  },

  createVideo: async (videoData) => {
    try {
      const res = await fetch(`${API_BASE}/videos`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(videoData)
      });
      return await handleResponse(res);
    } catch (e) {
      const stored = JSON.parse(localStorage.getItem('rfpm_machinery_videos') || JSON.stringify(defaultMachineryVideos));
      const newVid = {
        ...videoData,
        _id: 'vid_' + Date.now(),
        createdAt: new Date()
      };
      stored.unshift(newVid);
      localStorage.setItem('rfpm_machinery_videos', JSON.stringify(stored));
      return { success: true, video: newVid, message: 'Video added successfully!' };
    }
  },

  updateVideo: async (id, videoData) => {
    try {
      const res = await fetch(`${API_BASE}/videos/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(videoData)
      });
      return await handleResponse(res);
    } catch (e) {
      const stored = JSON.parse(localStorage.getItem('rfpm_machinery_videos') || JSON.stringify(defaultMachineryVideos));
      const idx = stored.findIndex(v => v._id === id);
      if (idx !== -1) {
        stored[idx] = { ...stored[idx], ...videoData, updatedAt: new Date() };
        localStorage.setItem('rfpm_machinery_videos', JSON.stringify(stored));
        return { success: true, video: stored[idx], message: 'Video updated successfully!' };
      }
      throw new Error('Video not found');
    }
  },

  deleteVideo: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/videos/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return await handleResponse(res);
    } catch (e) {
      let stored = JSON.parse(localStorage.getItem('rfpm_machinery_videos') || JSON.stringify(defaultMachineryVideos));
      stored = stored.filter(v => v._id !== id);
      localStorage.setItem('rfpm_machinery_videos', JSON.stringify(stored));
      return { success: true, message: 'Video deleted successfully!' };
    }
  }
};

export const defaultMachineryVideos = [
  {
    _id: "vid_1",
    title: "Continuous Band Sealer with Nitrogen Flushing",
    machineName: "Raghav Industrial Band Sealer RFPM-CBS-900",
    category: "Pouch Packaging",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-factory-conveyor-belt-in-operation-40890-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    duration: "0:45",
    badge: "Conveyor Sealing",
    specsSummary: "0-12 M/min Speed | PID Digital Temp 300°C | Solid Stainless Steel Stand",
    isPublished: true,
    order: 1
  },
  {
    _id: "vid_2",
    title: "Commercial Retort Autoclave Sterilizer",
    machineName: "500L Canning Autoclave RFPM-RET-500",
    category: "Thermal Canning",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-machinery-parts-in-a-factory-40892-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    duration: "1:15",
    badge: "Thermal Sterilizer",
    specsSummary: "121-134°C Sterilization | 30 PSI Hydro Tested | SS-304/SS-316 Food Grade",
    isPublished: true,
    order: 2
  },
  {
    _id: "vid_3",
    title: "Steam Jacketed Tilting Mixing Kettle",
    machineName: "200L Motorized Scraper Kettle RFPM-SJK-200",
    category: "Cooking Vessel",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-industrial-robot-in-a-modern-automated-factory-40888-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    duration: "0:55",
    badge: "Motorized Scraper",
    specsSummary: "Teflon Scraping Blades | 90° Tilting Gearbox | Dual Heating Jackets",
    isPublished: true,
    order: 3
  },
  {
    _id: "vid_4",
    title: "Cyclone Stainless Steel Pulverizer System",
    machineName: "Blower Cyclone Grinder RFPM-BCP-100",
    category: "Spice Grinding",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-metal-pieces-coming-out-of-a-laser-cutting-machine-40889-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    duration: "1:10",
    badge: "Cyclone Grinding",
    specsSummary: "150-250 Kg/hr Output | 10 HP Motor | Air-Cooled Cyclone Filter",
    isPublished: true,
    order: 4
  }
];


