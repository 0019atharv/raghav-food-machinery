import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const defaultSettings = {
  companyName: "Raghav Food Machinery Company",
  websiteUrl: "https://raghavfoodprocessingmachines.com",
  tagline: "Precision Engineering for Food Processing, Canning & Snacks Machinery",
  phone: "+91 98734 56789",
  secondaryPhone: "+91 98112 34567",
  whatsappNumber: "+919873456789",
  email: "sales@raghavfoodprocessingmachines.com",
  supportEmail: "info@raghavfoodprocessingmachines.com",
  gstin: "07AAACR1234F1Z8",
  factoryAddress: "Plot No. 48, Industrial Area Phase II, Kundli, Sonipat, Delhi NCR, Haryana - 131028",
  corporateOffice: "Office No. 302, Industrial Complex, Wazirpur, Delhi - 110052",
  workingHours: "Mon – Sat: 9:00 AM – 7:00 PM IST",
  bannerNotice: {
    active: true,
    text: "⭐ Factory Direct Supply: Avail special commercial discounts on Retort & Snacks Lines!",
    link: "/machines"
  },
  socialLinks: {
    indiamart: "https://www.indiamart.com/raghavfoodmachinery/",
    youtube: "https://youtube.com/@raghavfoodmachinery",
    linkedin: "https://linkedin.com/company/raghav-food-machinery",
    facebook: "https://facebook.com/raghavfoodmachinery"
  }
};

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const refreshSettings = async () => {
    try {
      const res = await api.getSettings();
      if (res.success && res.settings) {
        setSettings(res.settings);
      }
    } catch (e) {
      console.warn('Using default settings fallback', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

