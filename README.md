# Raghav Food Machinery Company — Web Platform & Industrial CMS

A modern, high-converting industrial food processing machinery catalog and enquiry website modeled on **Raghav Food Machinery Company** (`https://raghavfoodprocessingmachines.com`). Built with **React** (frontend) and **Node.js Express** (backend) with 2 separate modules.

---

## 🌟 Key Features

### 1. Exceptional Industrial UI & Animated Dynamic Background
- **Dynamic Industrial Canvas**: Features connected mechanical engineering nodes, blueprint gridlines, and rotating industrial gears that dynamically adjust rotation speed and parallax depth based on page scroll velocity and mouse position.
- **Modern Industrial Palette**: Obsidian dark slate (`#0B111E`, `#111A2E`), high-precision safety amber/gold accents (`#F59E0B`), stainless steel metallic gradients, and frosted glassmorphism panels.
- **Mobile-First Responsiveness**: Sticky bottom action bar (`Call Desk`, `WhatsApp Chat`, `Catalog`, `RFQ Cart`) tailored for Indian B2B machinery buyers who primarily operate via mobile.

### 2. Enquiry-Based Commercial Ordering & RFQ Basket
- **Specification Cart Drawer**: Customers can add multiple machines to their specification basket, select batch capacities, and submit an RFQ.
- **1-Click WhatsApp Integration**: Pre-fills exact machinery model names, capacities, and customer business details into a formatted WhatsApp message (`https://wa.me/919873456789?text=...`).
- **Celebration Feedback**: Confetti celebration upon enquiry submission and unique RFQ tracking number (e.g. `RFQ-2026-4197`).
- **Client Portal**: Track RFQ statuses (`Pending`, `Under Technical Review`, `Quotation Sent`, `Closed`).

### 3. Dedicated Admin CMS Panel (`/admin`)
- **Separate Route & Layout**: Isolated `/admin` route with dedicated dark sidebar navigation.
- **Manage Products & Direct Publishing**:
  - Add, edit, and delete machines with technical specifications matrix (working pressure, heat, power, SS grade, voltage, dimensions).
  - Upload machine photos or paste high-res URLs.
  - **1-Click "Live on Site" / "Draft" toggle** to instantly publish or hide machinery on the customer-facing storefront.
- **Manage Categories**: Add/edit machinery verticals (Canning Retorts, Snacks Extruders, Dryers, Kettles, etc.).
- **Manage Enquiries & 1-Click CSV Export**: View all incoming customer leads, update sales status, add internal remarks, and export leads to a downloadable CSV spreadsheet.
- **Manage Blogs, Gallery & Testimonials**: Full CRUD for technical articles, factory floor photos with lightbox preview, and client testimonials.
- **Site Settings**: Live updates for company phone, WhatsApp number, GSTIN, factory address, and top announcement banner notice.

---

## 📁 Project Architecture

```
RFPM/
├── client/                     # Frontend Module (React 18 + Vite + Tailwind CSS + Framer Motion)
│   ├── src/
│   │   ├── components/
│   │   │   ├── background/     # DynamicIndustrialBackground (Canvas scroll & mouse physics)
│   │   │   ├── common/         # Navbar, Footer, MobileBottomBar, WhatsAppFAB, AuthModal
│   │   │   ├── cart/           # RfqDrawer (Quote basket & WhatsApp prompt)
│   │   │   └── admin/          # AdminLayout (Dedicated CMS dashboard sidebar)
│   │   ├── context/            # AuthContext, CartContext, SettingsContext
│   │   ├── pages/              # Home, Machines, ProductDetail, Catalog, Services, Blog, About, Gallery, Testimonials, Contact, Dashboard
│   │   │   └── admin/          # AdminDashboard, ManageProducts, ManageCategories, ManageEnquiries, ManageBlogs, ManageGallery, ManageTestimonials, SiteSettings
│   │   ├── services/           # Centralized API service layer
│   │   ├── App.jsx             # React Router config
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Backend Module (Node.js + Express + MongoDB / Mongoose)
│   ├── src/
│   │   ├── config/             # db.js (MongoDB Mongoose + auto fallback) & cloudinary.js
│   │   ├── controllers/        # Products, Enquiries, Categories, Blogs, Gallery, Testimonials, Auth, Settings, Upload
│   │   ├── middleware/         # auth.js (JWT verifyToken & requireAdmin)
│   │   ├── models/             # Mongoose schemas for all entities
│   │   ├── routes/             # REST endpoints (/api/products, /api/enquiries, /api/auth, etc.)
│   │   ├── utils/              # Rich seedData.js with authentic Raghav Food Machinery models
│   │   └── server.js           # Server entry point on port 5000
│   ├── data/                   # Fallback database store (`db_fallback.json`)
│   ├── uploads/                # Local uploaded machine images directory
│   ├── package.json
│   └── .env
│
└── package.json                # Root project runners
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- (Optional) MongoDB local service or MongoDB Atlas connection string. If MongoDB is not running, the server automatically operates via its built-in local store with zero downtime!

### 2. Start Backend Server
```bash
cd server
npm install
npm start
```
*Backend runs at `http://localhost:5000`*

### 3. Start Frontend Client
```bash
cd client
npm install
npm run dev
```
*Frontend runs at `http://localhost:5173`*

---

## 🔑 Default Credentials & Quick Login

### Administrator Account
- **URL**: `http://localhost:5173/admin`
- **Email**: `admin@raghavfoodprocessingmachines.com`
- **Password**: `admin123`
- *(Tip: Clicking "Client Sign In" in the navbar features a **"1-Click Admin Demo"** button to log straight into the CMS!)*

### Client OTP Login (Passwordless)
- Enter any mobile number or email
- Enter test OTP: `123456`

---

## ☁️ Cloudinary Configuration (Dual-Mode Image Storage)

As requested, Cloudinary code is included and structured with a simple local mode active by default for instant testing, ready to be switched to Cloudinary for production:

1. Open `server/.env` and uncomment your Cloudinary credentials:
```env
USE_CLOUDINARY=true
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

2. In `server/src/config/cloudinary.js`:
- Uncomment the `cloudinaryStorage` block.
- Set `return uploadCloudinary;` in `getUploadMiddleware()`.

3. In `server/src/controllers/uploadController.js`:
- Uncomment the Cloudinary response handler block.

---

## 🗄️ MongoDB Database Configuration

In `server/.env`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/raghav_food_machinery
# Or your Atlas cluster:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/raghav_food_machinery
```
Upon connecting, the database automatically seeds with Raghav Food Machinery categories, flagship products (Canning Retorts, Snacks Extruders, Dryers, Kettles), blogs, testimonials, and default site settings.

