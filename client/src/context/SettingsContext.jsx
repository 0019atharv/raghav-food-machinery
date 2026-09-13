import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const defaultSettings = {
  companyName: "Raghav Food Processing Machines",
  proprietor: "Naresh",
  websiteUrl: "https://raghavfoodprocessingmachines.com",
  tagline: "Precision Engineering for Food Processing, Canning & Snacks Machinery",
  phone: "+91 92207 06381",
  secondaryPhone: "+91 92207 06381",
  whatsappNumber: "+919220706381",
  email: "raghavfoodprocessingmachinee@gmail.com",
  supportEmail: "raghavfoodprocessingmachinee@gmail.com",
  gstin: "07AREPN9294Q1ZQ",
  factoryAddress: "House No. 388, 1st Floor, JJ Colony Block-1, Near Gurudwara, Mangol Puri, North West Delhi, New Delhi, Delhi - 110083",
  corporateOffice: "House No. 388, 1st Floor, JJ Colony Block-1, Near Gurudwara, Mangol Puri, North West Delhi, New Delhi, Delhi - 110083",
  workingHours: "Mon – Sat: 9:00 AM – 7:00 PM IST (Sunday Closed)",
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
    showcaseTag: "Flagship: Continuous Band Sealing Machine",
    showcaseImage: "https://res.cloudinary.com/vgmmtb5k/image/upload/v1789208820/raghav-food-processing-machines/raghav-continuous-band-sealer-hero-branded.jpg",
    showcaseModel: "RFPM-CBS-900",
    showcaseStockStatus: "In Stock / Ready Dispatch",
    showcaseSpec1Label: "Sealing Speed",
    showcaseSpec1Value: "0 - 12 Mtr/Min",
    showcaseSpec2Label: "Temperature",
    showcaseSpec2Value: "PID 0 - 300°C",
    showcaseSpec3Label: "Automation",
    showcaseSpec3Value: "Conveyor Driven",
    showcaseButtonText: "View Machine Specs",
    showcaseButtonLink: "/product/raghav-horizontal-continuous-band-sealing-machine"
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

