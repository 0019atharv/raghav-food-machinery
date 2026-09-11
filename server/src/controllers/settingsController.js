import { SiteSetting } from '../models/index.js';
import { isUsingMongoDB, getFallbackDb, saveFallbackDb } from '../config/db.js';
import { initialSettings } from '../utils/seedData.js';

export const getSettings = async (req, res) => {
  try {
    if (isUsingMongoDB()) {
      let settings = await SiteSetting.findOne();
      if (!settings) {
        settings = await SiteSetting.create(initialSettings);
      }
      return res.json({ success: true, settings });
    } else {
      const store = getFallbackDb();
      if (!store.settings) {
        store.settings = { ...initialSettings, _id: 'settings_1' };
        saveFallbackDb(store);
      }
      return res.json({ success: true, settings: store.settings });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch site settings.' });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = new Date();

    if (isUsingMongoDB()) {
      let settings = await SiteSetting.findOne();
      if (!settings) {
        settings = await SiteSetting.create({ ...initialSettings, ...updates });
      } else {
        Object.assign(settings, updates);
        await settings.save();
      }
      return res.json({ success: true, message: 'Site settings updated successfully!', settings });
    } else {
      const store = getFallbackDb();
      store.settings = { ...(store.settings || initialSettings), ...updates };
      saveFallbackDb(store);
      return res.json({ success: true, message: 'Site settings updated successfully!', settings: store.settings });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update settings.' });
  }
};

