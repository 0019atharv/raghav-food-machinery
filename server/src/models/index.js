import mongoose from 'mongoose';

// ============================================================================
// 1. PRODUCT SCHEMA
// ============================================================================
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  category: { type: String, required: true, trim: true },
  categorySlug: { type: String, trim: true },
  shortDescription: { type: String, default: '' },
  fullDescription: { type: String, default: '' },
  price: { type: String, default: 'Contact for Quote' },
  priceUnit: { type: String, default: 'Ex-Factory Price' },
  capacity: { type: String, default: 'Standard' },
  power: { type: String, default: 'Standard Electric/Steam' },
  materialGrade: { type: String, default: 'SS-304 Food Grade' },
  automationGrade: { type: String, default: 'Semi-Automatic' },
  voltage: { type: String, default: '415V, 3-Phase, 50Hz' },
  dimensions: { type: String, default: 'Custom' },
  weight: { type: String, default: 'Standard' },
  warranty: { type: String, default: '1 Year Warranty + Free Lifetime Tech Support' },
  images: [{ type: String }],
  specifications: [{
    label: { type: String, required: true },
    value: { type: String, required: true }
  }],
  applications: [{ type: String }],
  features: [{ type: String }],
  brochureUrl: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ============================================================================
// 2. CATEGORY SCHEMA
// ============================================================================
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  icon: { type: String, default: 'Cpu' },
  machineCount: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// ============================================================================
// 3. ENQUIRY / RFQ SCHEMA
// ============================================================================
const enquirySchema = new mongoose.Schema({
  enquiryNumber: { type: String, required: true, unique: true },
  customerName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: '' },
  businessName: { type: String, default: '' },
  state: { type: String, default: '' },
  city: { type: String, default: '' },
  requirements: { type: String, default: '' },
  targetCapacity: { type: String, default: '' },
  machines: [{
    productId: { type: String },
    name: { type: String },
    slug: { type: String },
    capacity: { type: String },
    quantity: { type: Number, default: 1 }
  }],
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Quotation Sent', 'Under Discussion', 'Closed'],
    default: 'Pending'
  },
  adminNotes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ============================================================================
// 4. BLOG SCHEMA
// ============================================================================
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  excerpt: { type: String, default: '' },
  content: { type: String, required: true },
  coverImage: { type: String, default: '' },
  author: { type: String, default: 'Raghav Food Machinery Technical Team' },
  category: { type: String, default: 'Industrial Guide' },
  tags: [{ type: String }],
  readingTime: { type: String, default: '5 min read' },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// ============================================================================
// 5. GALLERY SCHEMA
// ============================================================================
const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, default: 'Machinery' }, // 'Retort', 'Snacks Line', 'Factory', 'Installation'
  imageUrl: { type: String, required: true },
  caption: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// ============================================================================
// 6. TESTIMONIAL SCHEMA
// ============================================================================
const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, default: 'India' },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  review: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  machinePurchased: { type: String, default: 'Food Processing Plant' },
  isApproved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// ============================================================================
// 7. SITE SETTINGS SCHEMA
// ============================================================================
const siteSettingSchema = new mongoose.Schema({
  companyName: { type: String, default: 'Raghav Food Processing Machine' },
  proprietor: { type: String, default: 'Naresh' },
  websiteUrl: { type: String, default: 'https://raghavfoodprocessingmachines.com' },
  tagline: { type: String, default: 'Pioneering Industrial Food Processing & Canning Machinery' },
  phone: { type: String, default: '+91 92207 06381' },
  secondaryPhone: { type: String, default: '+91 92207 06381' },
  whatsappNumber: { type: String, default: '+919220706381' },
  email: { type: String, default: 'raghavfoodprocessingmachinee@gmail.com' },
  supportEmail: { type: String, default: 'raghavfoodprocessingmachinee@gmail.com' },
  gstin: { type: String, default: '07AREPN9294Q1ZQ' },
  factoryAddress: { type: String, default: 'House No. 388, 1st Floor, JJ Colony Block-1, Near Gurudwara, Mangol Puri, North West Delhi, New Delhi, Delhi - 110083' },
  corporateOffice: { type: String, default: 'House No. 388, 1st Floor, JJ Colony Block-1, Near Gurudwara, Mangol Puri, North West Delhi, New Delhi, Delhi - 110083' },
  workingHours: { type: String, default: 'Mon - Sat: 9:00 AM - 7:00 PM IST (Sunday Closed)' },
  bannerNotice: {
    active: { type: Boolean, default: true },
    text: { type: String, default: '⭐ Factory Direct Supply: Avail special festive commercial discounts on Automatic Retort & Extruder Lines!' },
    link: { type: String, default: '/machines' }
  },
  hero: {
    badge: { type: String, default: "India's Leading Industrial Food Machinery Engineering" },
    titleLine1: { type: String, default: "Industrial Food" },
    titleHighlight: { type: String, default: "Processing, Canning" },
    titleLine3: { type: String, default: "& Snacks Machinery" },
    description: { type: String, default: "Engineered with certified Food-Grade SS-304/SS-316. From high-pressure Canning Retorts and Snacks Extruders to turnkey automated plants — delivered with factory direct warranty and on-site commissioning across India." },
    stat1Number: { type: String, default: "500+" },
    stat1Label: { type: String, default: "Installed Plants Across India" },
    stat2Number: { type: String, default: "30+" },
    stat2Label: { type: String, default: "Years Food Tech Expertise" },
    stat3Number: { type: String, default: "100%" },
    stat3Label: { type: String, default: "Food-Grade SS-304/SS-316" },
    stat4Number: { type: String, default: "24/7" },
    stat4Label: { type: String, default: "Engineer AMC Support" },
    showcaseTag: { type: String, default: "Flagship: Continuous Band Sealing Machine" },
    showcaseImage: { type: String, default: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789208820/raghav-food-processing-machines/raghav-continuous-band-sealer-hero-branded.jpg" },
    showcaseModel: { type: String, default: "RFPM-CBS-900" },
    showcaseStockStatus: { type: String, default: "In Stock / Ready Dispatch" },
    showcaseSpec1Label: { type: String, default: "Sealing Speed" },
    showcaseSpec1Value: { type: String, default: "0 - 12 Mtr/Min" },
    showcaseSpec2Label: { type: String, default: "Temperature" },
    showcaseSpec2Value: { type: String, default: "PID 0 - 300°C" },
    showcaseSpec3Label: { type: String, default: "Automation" },
    showcaseSpec3Value: { type: String, default: "Conveyor Driven" },
    showcaseButtonText: { type: String, default: "View Machine Specs" },
    showcaseButtonLink: { type: String, default: "/product/raghav-horizontal-continuous-band-sealing-machine" }
  },
  socialLinks: {
    indiamart: { type: String, default: 'https://www.indiamart.com/raghavfoodmachinery/' },
    youtube: { type: String, default: 'https://youtube.com/@raghavfoodmachinery' },
    linkedin: { type: String, default: 'https://linkedin.com/company/raghav-food-machinery' },
    facebook: { type: String, default: 'https://facebook.com/raghavfoodmachinery' }
  },
  updatedAt: { type: Date, default: Date.now }
});

// ============================================================================
// 8. USER SCHEMA
// ============================================================================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  businessName: { type: String, default: '' },
  state: { type: String, default: '' },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
export const SiteSetting = mongoose.models.SiteSetting || mongoose.model('SiteSetting', siteSettingSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);

