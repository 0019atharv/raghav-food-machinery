import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  CheckCircle2, 
  X, 
  Play, 
  Sparkles, 
  Film,
  Eye,
  EyeOff
} from 'lucide-react';
import { api, defaultMachineryVideos } from '../../services/api';

export default function ManageVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [machineName, setMachineName] = useState('');
  const [category, setCategory] = useState('Pouch Packaging');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [duration, setDuration] = useState('0:45');
  const [badge, setBadge] = useState('Live Demo');
  const [specsSummary, setSpecsSummary] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [order, setOrder] = useState(0);

  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const loadVideos = async () => {
    try {
      setLoading(true);
      const res = await api.getVideos();
      if (res.success) {
        setVideos(res.videos || defaultMachineryVideos);
      }
    } catch (err) {
      console.error('Failed to load videos:', err);
      setVideos(defaultMachineryVideos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitle('');
    setMachineName('');
    setCategory('Pouch Packaging');
    setVideoUrl('');
    setThumbnailUrl('');
    setDuration('0:45');
    setBadge('Live Demo');
    setSpecsSummary('');
    setIsPublished(true);
    setOrder(videos.length + 1);
    setError('');
    setSuccessMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (v) => {
    setEditingId(v._id);
    setTitle(v.title || '');
    setMachineName(v.machineName || '');
    setCategory(v.category || 'Pouch Packaging');
    setVideoUrl(v.videoUrl || '');
    setThumbnailUrl(v.thumbnailUrl || '');
    setDuration(v.duration || '0:45');
    setBadge(v.badge || 'Live Demo');
    setSpecsSummary(v.specsSummary || '');
    setIsPublished(v.isPublished !== false);
    setOrder(v.order || 0);
    setError('');
    setSuccessMsg('');
    setIsModalOpen(true);
  };

  const handleVideoFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    setError('');
    try {
      const res = await api.uploadVideo(file);
      if (res.success && res.videoUrl) {
        setVideoUrl(res.videoUrl);
        setSuccessMsg('Video uploaded successfully!');
      } else {
        throw new Error(res.message || 'Upload failed');
      }
    } catch (err) {
      setError('Video upload failed: ' + err.message);
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumb(true);
    try {
      const res = await api.uploadImage(file);
      if (res.success && res.imageUrl) {
        setThumbnailUrl(res.imageUrl);
      }
    } catch (err) {
      setError('Thumbnail upload failed: ' + err.message);
    } finally {
      setUploadingThumb(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim() || !videoUrl.trim()) {
      setError('Video title and Video URL are required.');
      return;
    }

    const payload = {
      title,
      machineName: machineName || title,
      category,
      videoUrl,
      thumbnailUrl,
      duration,
      badge,
      specsSummary,
      isPublished,
      order: Number(order) || 0
    };

    try {
      if (editingId) {
        await api.updateVideo(editingId, payload);
      } else {
        await api.createVideo(payload);
      }
      setIsModalOpen(false);
      loadVideos();
    } catch (err) {
      setError(err.message || 'Failed to save video');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this machinery demonstration video?')) return;
    try {
      await api.deleteVideo(id);
      loadVideos();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const togglePublish = async (v) => {
    try {
      await api.updateVideo(v._id, { isPublished: !v.isPublished });
      loadVideos();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#3D9B28] uppercase tracking-wider flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5" />
            <span>Machinery In Action</span>
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900">
            Manage Video Demonstrations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Uploaded videos automatically loop continuously with no play button on the public homepage.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold px-5 py-3 rounded-xl text-xs shadow-sm transition-all whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Video</span>
        </button>
      </div>

      {/* Videos List Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#3D9B28] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : videos.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <Film className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No Machinery Videos Added Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Upload demonstration videos of your food processing machines to showcase on the homepage.
          </p>
          <button
            onClick={openAddModal}
            className="bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm"
          >
            + Add First Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v) => (
            <div
              key={v._id}
              className={`rounded-2xl overflow-hidden bg-white border transition-all flex flex-col justify-between shadow-sm ${
                v.isPublished ? 'border-slate-200' : 'border-slate-200/60 opacity-70'
              }`}
            >
              <div>
                {/* Live Looping Video Preview (NO PLAY BUTTON - Auto replays endlessly) */}
                <div className="relative h-48 bg-black overflow-hidden flex items-center justify-center">
                  <video
                    src={v.videoUrl}
                    poster={v.thumbnailUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={(e) => {
                      e.target.currentTime = 0;
                      e.target.play();
                    }}
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-bold text-white bg-black/75 px-2 py-0.5 rounded backdrop-blur-sm">
                    {v.category}
                  </span>
                  <span className="absolute top-2 right-2 text-[9px] font-bold text-emerald-300 bg-emerald-950/85 border border-emerald-800/60 px-2 py-0.5 rounded">
                    {v.badge || 'Live Demo'}
                  </span>
                  <span className="absolute bottom-2 left-2 text-[9px] font-mono text-white/90 bg-black/60 px-1.5 py-0.5 rounded">
                    ⏱ {v.duration || '0:45'}
                  </span>
                </div>

                {/* Video Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-slate-900 line-clamp-2">
                      {v.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#3D9B28] font-semibold">
                    {v.machineName}
                  </p>
                  {v.specsSummary && (
                    <p className="text-[11px] text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                      {v.specsSummary}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                <button
                  onClick={() => togglePublish(v)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                    v.isPublished
                      ? 'bg-emerald-50 text-[#3D9B28] border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-500 border-slate-200 hover:text-slate-700'
                  }`}
                  title={v.isPublished ? 'Video is Active' : 'Video is Hidden'}
                >
                  {v.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{v.isPublished ? 'Published' : 'Draft'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(v)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition-colors"
                    title="Edit Video"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(v._id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs transition-colors"
                    title="Delete Video"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-5 my-8 shadow-2xl animate-fade-in relative">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-[#3D9B28]" />
                <span>{editingId ? 'Edit Machinery Video' : 'Add Machinery Video'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[#3D9B28] text-xs font-semibold">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-left">
              
              {/* Video Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Video Demonstration Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Continuous Band Sealer with Nitrogen Flushing"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  required
                />
              </div>

              {/* Machine Model / Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Machine Name / Model
                  </label>
                  <input
                    type="text"
                    value={machineName}
                    onChange={(e) => setMachineName(e.target.value)}
                    placeholder="e.g. Raghav Band Sealer RFPM-CBS-900"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Machinery Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  >
                    <option value="Pouch Packaging">Pouch Packaging</option>
                    <option value="Thermal Canning">Thermal Canning</option>
                    <option value="Cooking Vessel">Cooking Vessel</option>
                    <option value="Spice Grinding">Spice Grinding</option>
                    <option value="Vegetable & Fruit">Vegetable & Fruit</option>
                    <option value="Extruder Line">Extruder Line</option>
                    <option value="Custom Plant">Custom Plant</option>
                  </select>
                </div>
              </div>

              {/* Video Source: Upload File OR Direct URL */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-[#3D9B28]" />
                    <span>Video Media (MP4 / WebM / Mov) *</span>
                  </label>
                  {uploadingVideo && (
                    <span className="text-[11px] text-[#3D9B28] animate-pulse font-semibold">Uploading video...</span>
                  )}
                </div>

                {/* Upload File button */}
                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime,video/*"
                      onChange={handleVideoFileUpload}
                      className="hidden"
                      disabled={uploadingVideo}
                    />
                    <div className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#3D9B28]/50 hover:border-[#3D9B28] bg-white hover:bg-emerald-50/50 text-center text-xs text-slate-800 font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
                      <Upload className="w-4 h-4 text-[#3D9B28]" />
                      <span>{uploadingVideo ? 'Uploading...' : 'Upload Video File from Computer (MP4, WebM)'}</span>
                    </div>
                  </label>
                </div>

                {/* Or Direct Video URL */}
                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">
                    Or paste direct MP4 / Cloudinary video URL:
                  </span>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://assets.mixkit.co/videos/preview/...mp4"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 font-mono focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                    required
                  />
                </div>

                {/* Video Live Preview inside modal */}
                {videoUrl && (
                  <div className="pt-2">
                    <span className="text-[10px] text-slate-500 block mb-1">Live Video Loop Preview (Auto Replay):</span>
                    <div className="h-36 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                      <video
                        src={videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        onEnded={(e) => {
                          e.target.currentTime = 0;
                          e.target.play();
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Specs & Highlights */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Specifications Summary Line
                </label>
                <input
                  type="text"
                  value={specsSummary}
                  onChange={(e) => setSpecsSummary(e.target.value)}
                  placeholder="e.g. 0-12 M/min Speed | PID Digital Temp 300°C | Solid Stainless Steel Stand"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                />
              </div>

              {/* Badge & Duration & Order */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Live Demo"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="0:45"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-[#3D9B28] focus:ring-1 focus:ring-[#3D9B28] focus:outline-none"
                  />
                </div>
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheckbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-[#3D9B28] focus:ring-[#3D9B28]"
                />
                <label htmlFor="publishedCheckbox" className="text-xs text-slate-700 font-medium cursor-pointer">
                  Publish to website immediately (Machinery in Action showcase)
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-4 py-2 rounded-xl text-xs shadow-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#3D9B28] hover:bg-[#2E7D1E] text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-sm transition-all"
                >
                  {editingId ? 'Save Changes' : 'Publish Video'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

