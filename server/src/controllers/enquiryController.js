import { Enquiry, SiteSetting } from '../models/index.js';
import { isUsingMongoDB, getFallbackDb, saveFallbackDb } from '../config/db.js';

export const createEnquiry = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      email,
      businessName,
      state,
      city,
      requirements,
      targetCapacity,
      machines
    } = req.body;

    if (!customerName || !phone) {
      return res.status(400).json({ success: false, message: 'Customer name and phone number are required.' });
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const enquiryNumber = `RFQ-${new Date().getFullYear()}-${randomDigits}`;

    const newEnquiryData = {
      enquiryNumber,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: (email || '').trim(),
      businessName: (businessName || '').trim(),
      state: (state || '').trim(),
      city: (city || '').trim(),
      requirements: requirements || '',
      targetCapacity: targetCapacity || '',
      machines: Array.isArray(machines) ? machines : [],
      status: 'Pending',
      adminNotes: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let savedEnquiry = null;

    if (isUsingMongoDB()) {
      savedEnquiry = await Enquiry.create(newEnquiryData);
    } else {
      const store = getFallbackDb();
      savedEnquiry = {
        _id: 'enq_' + Date.now(),
        ...newEnquiryData
      };
      store.enquiries.unshift(savedEnquiry);
      saveFallbackDb(store);
    }

    // Build pre-filled WhatsApp message URL
    const machineListText = (newEnquiryData.machines || [])
      .map((m, i) => `${i + 1}. ${m.name || m.slug} (Qty: ${m.quantity || 1})`)
      .join('%0A');

    const whatsappText = `Hello Raghav Food Machinery Team,%0A%0AI have submitted a Request for Quote on your website.%0A*RFQ No:* ${enquiryNumber}%0A*Name:* ${customerName}%0A*Company:* ${businessName || 'N/A'}%0A*Phone:* ${phone}%0A*State:* ${state || 'N/A'}%0A%0A*Interested Machinery:*%0A${machineListText || 'Custom Turnkey Food Plant Enquiry'}%0A%0A*Requirements:* ${encodeURIComponent(requirements || 'Please provide quotation and catalog.')}%0A%0APlease share technical brochure, pricing & delivery schedule.`;

    const whatsappUrl = `https://wa.me/919873456789?text=${whatsappText}`;

    console.log(`[Enquiry] New RFQ received: ${enquiryNumber} from ${customerName} (${phone})`);

    res.status(201).json({
      success: true,
      message: 'Your Request for Quote has been registered successfully! Our engineering team will contact you shortly.',
      enquiry: savedEnquiry,
      whatsappUrl
    });
  } catch (error) {
    console.error('createEnquiry error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit enquiry.' });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const { status, search } = req.query;

    if (isUsingMongoDB()) {
      let query = {};
      if (status && status !== 'All') {
        query.status = status;
      }
      if (search) {
        query.$or = [
          { customerName: { $regex: search, $options: 'i' } },
          { businessName: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { enquiryNumber: { $regex: search, $options: 'i' } }
        ];
      }

      const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: enquiries.length, enquiries });
    } else {
      const store = getFallbackDb();
      let list = [...(store.enquiries || [])];

      if (status && status !== 'All') {
        list = list.filter(e => e.status === status);
      }
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(e =>
          (e.customerName && e.customerName.toLowerCase().includes(s)) ||
          (e.businessName && e.businessName.toLowerCase().includes(s)) ||
          (e.phone && e.phone.includes(s)) ||
          (e.enquiryNumber && e.enquiryNumber.toLowerCase().includes(s))
        );
      }

      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.json({ success: true, count: list.length, enquiries: list });
    }
  } catch (error) {
    console.error('getEnquiries error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch enquiries.' });
  }
};

export const getUserEnquiries = async (req, res) => {
  try {
    const { email, phone } = req.user;

    if (isUsingMongoDB()) {
      const query = { $or: [] };
      if (email) query.$or.push({ email: email.toLowerCase() });
      if (phone) query.$or.push({ phone });

      if (query.$or.length === 0) return res.json({ success: true, enquiries: [] });

      const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, enquiries });
    } else {
      const store = getFallbackDb();
      const list = (store.enquiries || []).filter(e =>
        (email && e.email && e.email.toLowerCase() === email.toLowerCase()) ||
        (phone && e.phone === phone)
      );
      return res.json({ success: true, enquiries: list });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user enquiries.' });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (isUsingMongoDB()) {
      const updated = await Enquiry.findByIdAndUpdate(
        id,
        { status, adminNotes, updatedAt: new Date() },
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, message: 'Enquiry not found.' });
      return res.json({ success: true, enquiry: updated });
    } else {
      const store = getFallbackDb();
      const idx = store.enquiries.findIndex(e => e._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Enquiry not found.' });
      store.enquiries[idx] = {
        ...store.enquiries[idx],
        status: status || store.enquiries[idx].status,
        adminNotes: adminNotes !== undefined ? adminNotes : store.enquiries[idx].adminNotes,
        updatedAt: new Date()
      };
      saveFallbackDb(store);
      return res.json({ success: true, enquiry: store.enquiries[idx] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update enquiry status.' });
  }
};

export const exportEnquiriesCSV = async (req, res) => {
  try {
    let enquiries = [];
    if (isUsingMongoDB()) {
      enquiries = await Enquiry.find().sort({ createdAt: -1 });
    } else {
      const store = getFallbackDb();
      enquiries = store.enquiries || [];
    }

    // Build CSV content
    const headers = ['Enquiry No', 'Date', 'Customer Name', 'Phone', 'Email', 'Company', 'State', 'City', 'Status', 'Machines Requested', 'Requirements'];
    
    const rows = enquiries.map(e => {
      const machineNames = (e.machines || []).map(m => `${m.name || m.slug} (x${m.quantity || 1})`).join('; ');
      return [
        `"${e.enquiryNumber || ''}"`,
        `"${new Date(e.createdAt).toISOString().split('T')[0]}"`,
        `"${(e.customerName || '').replace(/"/g, '""')}"`,
        `"${e.phone || ''}"`,
        `"${e.email || ''}"`,
        `"${(e.businessName || '').replace(/"/g, '""')}"`,
        `"${(e.state || '').replace(/"/g, '""')}"`,
        `"${(e.city || '').replace(/"/g, '""')}"`,
        `"${e.status || ''}"`,
        `"${machineNames.replace(/"/g, '""')}"`,
        `"${(e.requirements || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="Raghav_Food_Machinery_Enquiries_${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csvContent);
  } catch (error) {
    console.error('CSV Export error:', error);
    res.status(500).json({ success: false, message: 'Failed to export CSV.' });
  }
};

