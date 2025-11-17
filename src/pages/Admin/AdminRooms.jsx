// AdminRooms.jsx — Optimized single-file B2 version with mobile responsiveness
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useTransition,
  memo,
} from "react";
import axios from "axios";

const API = "https://lumarisehotel.com";

// ---------------- RoomCard ----------------
const RoomCard = memo(function RoomCard({ room, onEdit, onDelete }) {
  const imgSrc = useMemo(() => {
    if (room.main_image) return room.main_image;
    if (room.images && room.images.length > 0) return room.images[0].image;
    return "/no-image.png";
  }, [room]);

  return (
    <div className="bg-white rounded-xl border shadow p-2">
      <img
        src={imgSrc}
        className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-md"
        onError={(e) => (e.target.src = "/no-image.png")}
        alt={room.title || "room"}
      />

      <div className="p-3">
        <h3 className="font-semibold text-base sm:text-lg">{room.title}</h3>
        <p className="text-xs sm:text-sm text-gray-500">{(room.desc || "").slice(0, 60)}...</p>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onEdit(room)}
            className="flex-1 bg-blue-500 text-white py-2 rounded text-sm sm:text-base hover:bg-blue-600 transition-colors"
            type="button"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(room.id)}
            className="flex-1 bg-red-500 text-white py-2 rounded text-sm sm:text-base hover:bg-red-600 transition-colors"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

// ---------------- RoomsList ----------------
const RoomsList = memo(function RoomsList({ rooms, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      {rooms.length === 0 ? (
        <div className="col-span-full text-center py-12 text-gray-500">
          No rooms yet. Add your first room above!
        </div>
      ) : (
        rooms.map((room) => (
          <RoomCard key={room.id} room={room} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
});

// ---------------- RoomForm ----------------
const RoomForm = memo(function RoomForm({
  formData,
  setFormData,
  existingImages,
  setExistingImages,
  deletedImages,
  setDeletedImages,
  newImages,
  setNewImages,
  previewsRef,
  previewTick,
  setPreviewTick,
  editId,
  loading,
  onSubmit,
  onReset,
}) {
  // Local handlers memoized
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((p) => ({ ...p, [name]: value }));
    },
    [setFormData]
  );

  const handleImageSelect = useCallback(
    (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      // revoke previous previews
      previewsRef.current.forEach((url) => URL.revokeObjectURL(url));
      previewsRef.current = [];

      // set newFiles and object URLs
      setNewImages(files);
      previewsRef.current = files.map((f) => URL.createObjectURL(f));

      // force small re-render to show previews
      setPreviewTick((t) => t + 1);
    },
    [previewsRef, setNewImages, setPreviewTick]
  );

  const removeExistingImage = useCallback(
    (id) => {
      setExistingImages((prev) => prev.filter((img) => img.id !== id));
      setDeletedImages((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [setExistingImages, setDeletedImages]
  );

  const removeNewPreview = useCallback(
    (index) => {
      // revoke URL
      const url = previewsRef.current[index];
      if (url) {
        URL.revokeObjectURL(url);
      }
      // mutate previews ref
      previewsRef.current.splice(index, 1);

      // remove corresponding file from newImages
      setNewImages((prev) => prev.filter((_, i) => i !== index));

      // force re-render
      setPreviewTick((t) => t + 1);
    },
    [previewsRef, setNewImages, setPreviewTick]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl shadow p-4 sm:p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10"
      noValidate
    >
      {/* Title Dropdown */}
      <div>
        <label className="font-semibold capitalize block mb-1 text-sm sm:text-base">Title</label>
        <select
          name="title"
          className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base bg-white"
          value={formData.title}
          onChange={handleChange}
        >
          <option value="">Select Room Type</option>
          <option value="COUPLE SUITE">COUPLE SUITE</option>
          <option value="EXECUTIVE ROOM (P)">EXECUTIVE ROOM (P)</option>
          <option value="DULEX ROOM (P)">DULEX ROOM (P)</option>
          <option value="SUITE ROOM">SUITE ROOM</option>
          <option value="DORMITRY">DORMITRY</option>
          <option value="EXECUTIVE ROOM">EXECUTIVE ROOM</option>
          <option value="PREMIUM SUITE ROOM">PREMIUM SUITE ROOM</option>
          <option value="DULEX ROOM">DULEX ROOM</option>
        </select>
      </div>

      {/* Other Fields */}
      {["size", "guests", "bed", "view", "price"].map((f) => (
        <div key={f}>
          <label className="font-semibold capitalize block mb-1 text-sm sm:text-base">{f}</label>
          <input
            name={f}
            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
            value={formData[f]}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
      ))}

      <div className="md:col-span-2">
        <label className="font-semibold block mb-1 text-sm sm:text-base">Description</label>
        <textarea
          name="desc"
          className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
          rows="4"
          value={formData.desc}
          onChange={handleChange}
        />
      </div>

      <div className="md:col-span-2">
        <label className="font-semibold mb-2 block text-sm sm:text-base">Upload Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageSelect}
          className="border w-full p-2 sm:p-3 rounded bg-gray-50 text-sm sm:text-base"
        />

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-4">
            {existingImages.map((img) => (
              <div key={img.id} className="relative">
                <img src={img.url} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded border" alt="existing" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(img.id)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full hover:bg-red-700 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* New Previews (from ref) */}
        {previewsRef.current.length > 0 && (
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-4">
            {previewsRef.current.map((src, i) => (
              <div key={src + i} className="relative">
                <img src={src} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded border" alt={`preview-${i}`} />
                <button
                  type="button"
                  onClick={() => removeNewPreview(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full hover:bg-red-700 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
        <button 
          type="submit" 
          disabled={loading} 
          className="bg-black text-white py-2 sm:py-3 rounded flex-1 text-sm sm:text-base hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed order-1"
        >
          {loading ? "Saving..." : editId ? "Update Room" : "Add Room"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="bg-gray-200 text-black py-2 sm:py-3 rounded px-4 text-sm sm:text-base hover:bg-gray-300 transition-colors order-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
});

// ---------------- AdminRooms (main) ----------------
export default function AdminRooms() {
  // Core data
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Editing state
  const [editId, setEditId] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    size: "",
    guests: "",
    bed: "",
    view: "",
    price: "",
    desc: "",
  });

  // Image handling
  const [existingImages, setExistingImages] = useState([]); // {id, url}
  const [deletedImages, setDeletedImages] = useState([]); // ids
  const [newImages, setNewImages] = useState([]); // File[]
  const previewsRef = useRef([]); // object URLs for previews (not state)
  const [previewTick, setPreviewTick] = useState(0); // tiny tick to trigger preview re-render

  // misc refs
  const formRef = useRef(null);
  const token = localStorage.getItem("token");

  // react concurrent update for non-blocking transitions
  const [isPending, startTransition] = useTransition();

  // ---------- Data fetch ----------
  const loadRooms = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/rooms/`);
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      setRooms(data);
    } catch (err) {
      console.error("Failed to load rooms", err);
    }
  }, []);

  useEffect(() => {
    loadRooms();
    // cleanup previews on unmount
    return () => {
      previewsRef.current.forEach((u) => URL.revokeObjectURL(u));
      previewsRef.current = [];
    };
  }, [loadRooms]);

  // ---------- Handlers (memoized) ----------
  const handleEdit = useCallback(
    (room) => {
      // non-blocking UI transition
      startTransition(() => {
        setEditId(room.id || null);

        setFormData({
          title: room.title || "",
          size: room.size || "",
          guests: room.guests || "",
          bed: room.bed || "",
          view: room.view || "",
          price: room.price || "",
          desc: room.desc || "",
        });

        setExistingImages(
          room.images?.map((img) => ({ id: img.id, url: img.image })) || []
        );

        // reset new images & previews
        previewsRef.current.forEach((u) => URL.revokeObjectURL(u));
        previewsRef.current = [];
        setNewImages([]);
        setDeletedImages([]);
        setPreviewTick((t) => t + 1);

        formRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    },
    [setExistingImages]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm("Delete this room?")) return;
      try {
        await axios.delete(`${API}/api/rooms/${id}/`, {
          headers: token ? { Authorization: `Token ${token}` } : {},
        });
        // immediate optimistic refresh
        loadRooms();
      } catch (err) {
        console.error("Delete failed", err);
        alert("Failed to delete");
      }
    },
    [loadRooms, token]
  );

  // Submit form
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        data.append(k, v == null ? "" : v);
      });

      // append new images
      newImages.forEach((img) => data.append("images", img));

      // deleted image ids as JSON
      data.append("deleted_images", JSON.stringify(deletedImages || []));

      // set main image as first new image if present (backend expects file)
      if (newImages.length > 0) {
        data.append("main_image", newImages[0]);
      }

      try {
        if (editId) {
          await axios.put(`${API}/api/rooms/${editId}/`, data, {
            headers: token ? { Authorization: `Token ${token}` } : {},
          });
          alert("Room Updated");
        } else {
          await axios.post(`${API}/api/rooms/`, data, {
            headers: token ? { Authorization: `Token ${token}` } : {},
          });
          alert("Room Added");
        }

        // refresh list and reset
        await loadRooms();
        // reset form and images
        setEditId(null);
        setFormData({
          title: "",
          size: "",
          guests: "",
          bed: "",
          view: "",
          price: "",
          desc: "",
        });
        setExistingImages([]);
        previewsRef.current.forEach((u) => URL.revokeObjectURL(u));
        previewsRef.current = [];
        setNewImages([]);
        setDeletedImages([]);
        setPreviewTick((t) => t + 1);
      } catch (err) {
        console.error("Save failed", err);
        alert("Error saving room");
      } finally {
        setLoading(false);
      }
    },
    [formData, newImages, deletedImages, editId, token, loadRooms]
  );

  const handleReset = useCallback(() => {
    setEditId(null);
    setFormData({
      title: "",
      size: "",
      guests: "",
      bed: "",
      view: "",
      price: "",
      desc: "",
    });
    setExistingImages([]);
    previewsRef.current.forEach((u) => URL.revokeObjectURL(u));
    previewsRef.current = [];
    setNewImages([]);
    setDeletedImages([]);
    setPreviewTick((t) => t + 1);
  }, []);

  // ---------- Expose small stable props object for RoomForm to avoid prop churn ----------
  const formProps = useMemo(
    () => ({
      formData,
      setFormData,
      existingImages,
      setExistingImages,
      deletedImages,
      setDeletedImages,
      newImages,
      setNewImages,
      previewsRef,
      previewTick,
      setPreviewTick,
      editId,
      loading,
      onSubmit: handleSubmit,
      onReset: handleReset,
    }),
    [
      formData,
      setFormData,
      existingImages,
      setExistingImages,
      deletedImages,
      setDeletedImages,
      newImages,
      setNewImages,
      previewsRef,
      previewTick,
      setPreviewTick,
      editId,
      loading,
      handleSubmit,
      handleReset,
    ]
  );

  // ---------- Render ----------
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        {editId ? "Edit Room" : "Add Room"}
      </h1>

      <div ref={formRef}>
        <RoomForm {...formProps} />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Rooms</h2>
      {isPending && (
        <div className="mb-4 text-xs sm:text-sm text-gray-500">Applying changes...</div>
      )}

      <RoomsList rooms={rooms} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}