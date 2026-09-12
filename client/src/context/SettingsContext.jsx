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
  hero: {
    badge: "India's Leading Industrial Food Machinery Engineering",
    titleLine1: "Industrial Food",
    titleHighlight: "Processing, Canning",
    titleLine3: "& Snacks Machinery",
    description: "Engineered with certified Food-Grade SS-304/SS-316. From high-pressure Canning Retorts and Snacks Extruders to turnkey automated plants — delivered with factory direct warranty and on-site commissioning across India.",
    stat1Number: "500+",
    stat1Label: "Installed Plants Across India",
    stat2Number: "30+",
    stat2Label: "Years Food Tech Expertise",
    stat3Number: "100%",
    stat3Label: "Food-Grade SS-304/SS-316",
    stat4Number: "24/7",
    stat4Label: "Engineer AMC Support",
    showcaseTag: "Flagship: Automatic Canning Retort 500L",
    showcaseImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    showcaseModel: "RFPM-RET-500",
    showcaseStockStatus: "In Stock / Ready Dispatch",
    showcaseSpec1Label: "Batch Capacity",
    showcaseSpec1Value: "500 Liters",
    showcaseSpec2Label: "Temperature",
    showcaseSpec2Value: "Up to 135°C",
    showcaseSpec3Label: "Automation",
    showcaseSpec3Value: "PLC + HMI",
    showcaseButtonText: "View Machine Specs",
    showcaseButtonLink: "/product/automatic-canning-retort-500l"
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

