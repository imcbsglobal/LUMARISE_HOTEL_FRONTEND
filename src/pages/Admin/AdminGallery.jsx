// src/pages/AdminGallery.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit3 } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export default function AdminGallery() {
  const [mediaList, setMediaList] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [mediaType, setMediaType] = useState("image");

  const [editItem, setEditItem] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editFile, setEditFile] = useState(null);

  // fetchMedia must be top-level so other handlers call it
  async function fetchMedia() {
    try {
      const res = await axios.get(`${BASE_URL}/api/media/`);
      const list = Array.isArray(res.data) ? res.data : res.data.results || [];
      const normalized = list.map((it) => ({
        ...it,
        url: it.image
          ? (it.image.startsWith("http") ? it.image : `${BASE_URL}${it.image}`)
          : null,
        video_url: it.video
          ? (it.video.startsWith("http") ? it.video : `${BASE_URL}${it.video}`)
          : null,
      }));
      setMediaList(normalized);
    } catch (err) {
      console.error("fetchMedia error:", err);
      setMediaList([]);
    }
  }

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("media_type", mediaType);
    if (mediaType === "image") fd.append("image", file);
    else fd.append("video", file);

    try {
      await axios.post(`${BASE_URL}/api/media/`, fd, { headers: { "Content-Type": "multipart/form-data" }});
      setTitle("");
      setFile(null);
      setMediaType("image");
      fetchMedia();
      alert("Uploaded");
    } catch (err) {
      console.error("upload error:", err);
      alert("Upload failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/media/${id}/`);
      fetchMedia();
    } catch (err) {
      console.error("delete error:", err);
    }
  };

  const openEdit = (item) => {
    setEditItem(item);
    setEditTitle(item.title);
    setEditFile(null);
  };

  const saveEdit = async () => {
    if (!editItem) return;
    const fd = new FormData();
    fd.append("title", editTitle);
    fd.append("media_type", editItem.media_type);
    if (editFile) {
      if (editItem.media_type === "image") fd.append("image", editFile);
      else fd.append("video", editFile);
    }
    try {
      await axios.patch(`${BASE_URL}/api/media/${editItem.id}/`, fd);
      setEditItem(null);
      fetchMedia();
      alert("Updated");
    } catch (err) {
      console.error("edit error:", err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Gallery Manager</h1>

      <form onSubmit={handleUpload} className="bg-white p-4 sm:p-6 rounded shadow mb-6 sm:mb-8 grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter title" 
          required 
          className="border p-2 rounded text-sm sm:text-base" 
        />
        <select 
          value={mediaType} 
          onChange={(e) => setMediaType(e.target.value)} 
          className="border p-2 rounded text-sm sm:text-base"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          accept={mediaType === "image" ? "image/*" : "video/*"} 
          required 
          className="text-sm sm:text-base py-2"
        />
        <button 
          type="submit" 
          className="bg-black text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
        >
          Upload
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {mediaList.map((item) => (
          <div key={item.id} className="bg-white rounded shadow relative overflow-hidden group">
            {item.media_type === "image" ? (
              <img src={item.url} alt={item.title} className="w-full h-48 sm:h-52 md:h-56 object-cover" />
            ) : (
              <video src={item.video_url} controls className="w-full h-48 sm:h-52 md:h-56" />
            )}

            <div className="p-3 text-center font-medium text-sm sm:text-base">{item.title}</div>

            <div className="absolute top-2 right-2 flex gap-2">
              <button 
                onClick={() => openEdit(item)} 
                className="bg-white p-2 rounded shadow hover:bg-gray-100 transition-colors"
                aria-label="Edit"
              >
                <Edit3 size={16} />
              </button>
              <button 
                onClick={() => handleDelete(item.id)} 
                className="bg-red-600 p-2 rounded text-white hover:bg-red-700 transition-colors"
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {mediaList.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No media items yet. Upload your first image or video!
        </div>
      )}

      {editItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded w-full max-w-md">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Edit Media</h3>
            <input 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)} 
              placeholder="Title"
              className="w-full border p-2 rounded mb-3 text-sm sm:text-base" 
            />
            <input 
              type="file" 
              onChange={(e) => setEditFile(e.target.files[0])} 
              accept={editItem.media_type === "image" ? "image/*" : "video/*"} 
              className="mb-4 text-sm sm:text-base w-full"
            />
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              Leave file empty to keep current {editItem.media_type}
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button 
                onClick={() => setEditItem(null)} 
                className="w-full sm:w-auto px-4 py-2 rounded border text-sm sm:text-base hover:bg-gray-100 transition-colors order-2 sm:order-1"
              >
                Cancel
              </button>
              <button 
                onClick={saveEdit} 
                className="w-full sm:w-auto px-4 py-2 rounded bg-black text-white text-sm sm:text-base hover:bg-gray-800 transition-colors order-1 sm:order-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}