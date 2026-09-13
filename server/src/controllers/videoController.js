import { MachineryVideo } from '../models/index.js';
import { isUsingMongoDB, getFallbackDb, saveFallbackDb } from '../config/db.js';

export const getVideos = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === 'admin';
    const filter = isAdmin ? {} : { isPublished: true };

    if (isUsingMongoDB()) {
      const videos = await MachineryVideo.find(filter).sort({ order: 1, createdAt: -1 });
      return res.json({ success: true, videos });
    }

    const store = getFallbackDb();
    let videos = store.videos || [];
    if (!isAdmin) {
      videos = videos.filter(v => v.isPublished !== false);
    }
    videos.sort((a, b) => (a.order || 0) - (b.order || 0));
    return res.json({ success: true, videos });
  } catch (error) {
    console.error('Error fetching machinery videos:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch videos' });
  }
};

export const createVideo = async (req, res) => {
  try {
    const { 
      title, 
      machineName, 
      category, 
      videoUrl, 
      thumbnailUrl, 
      duration, 
      badge, 
      specsSummary, 
      isPublished,
      order 
    } = req.body;

    if (!title || !videoUrl) {
      return res.status(400).json({ success: false, message: 'Video title and Video URL are required.' });
    }

    if (isUsingMongoDB()) {
      const video = await MachineryVideo.create({
        title,
        machineName: machineName || title,
        category: category || 'Demonstration',
        videoUrl,
        thumbnailUrl: thumbnailUrl || '',
        duration: duration || '0:45',
        badge: badge || 'Live Demo',
        specsSummary: specsSummary || '',
        isPublished: isPublished !== false,
        order: Number(order) || 0
      });
      return res.status(201).json({ success: true, video, message: 'Video added successfully!' });
    }

    const store = getFallbackDb();
    const newVideo = {
      _id: 'vid_' + Date.now(),
      title,
      machineName: machineName || title,
      category: category || 'Demonstration',
      videoUrl,
      thumbnailUrl: thumbnailUrl || '',
      duration: duration || '0:45',
      badge: badge || 'Live Demo',
      specsSummary: specsSummary || '',
      isPublished: isPublished !== false,
      order: Number(order) || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    store.videos = store.videos || [];
    store.videos.push(newVideo);
    saveFallbackDb(store);

    return res.status(201).json({ success: true, video: newVideo, message: 'Video added successfully!' });
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to create video.' });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    updateData.updatedAt = new Date();

    if (isUsingMongoDB()) {
      const updated = await MachineryVideo.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Video not found.' });
      }
      return res.json({ success: true, video: updated, message: 'Video updated successfully!' });
    }

    const store = getFallbackDb();
    const idx = (store.videos || []).findIndex(v => v._id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Video not found.' });
    }

    store.videos[idx] = { ...store.videos[idx], ...updateData };
    saveFallbackDb(store);

    return res.json({ success: true, video: store.videos[idx], message: 'Video updated successfully!' });
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to update video.' });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingMongoDB()) {
      const deleted = await MachineryVideo.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Video not found.' });
      }
      return res.json({ success: true, message: 'Video deleted successfully!' });
    }

    const store = getFallbackDb();
    const prevCount = (store.videos || []).length;
    store.videos = (store.videos || []).filter(v => v._id !== id);
    if (store.videos.length === prevCount) {
      return res.status(404).json({ success: false, message: 'Video not found.' });
    }

    saveFallbackDb(store);
    return res.json({ success: true, message: 'Video deleted successfully!' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to delete video.' });
  }
};

