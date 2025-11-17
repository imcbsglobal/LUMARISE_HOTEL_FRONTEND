import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    quote: "",
    image: null,
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/testimonials/")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || res.data.data || [];
        setTestimonials(data);
      })
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const resetForm = () => {
    setFormData({ name: "", quote: "", image: null });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("comment", formData.quote);
    if (formData.image) uploadData.append("avatar", formData.image);

    if (editingId) {
      // UPDATE EXISTING TESTIMONIAL
      axios
        .patch(
          `http://127.0.0.1:8000/api/testimonials/${editingId}/`,
          uploadData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          setTestimonials(
            testimonials.map((t) => (t.id === editingId ? res.data : t))
          );
          resetForm();
        })
        .catch((err) => console.error("Error updating testimonial:", err));
    } else {
      // CREATE NEW TESTIMONIAL
      axios
        .post("http://127.0.0.1:8000/api/testimonials/", uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setTestimonials([...testimonials, res.data]);
          resetForm();
        })
        .catch((err) => console.error("Error uploading testimonial:", err));
    }
  };

  const handleEdit = (t) => {
    setEditingId(t.id);
    setFormData({
      name: t.name,
      quote: t.comment,
      image: null, // user may choose new image
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    
    axios
      .delete(`http://127.0.0.1:8000/api/testimonials/${id}/`)
      .then(() => {
        setTestimonials(testimonials.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Error deleting testimonial:", err));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Manage Testimonials</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10 bg-white p-4 sm:p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
          <input
            type="text"
            name="name"
            placeholder="Client Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 sm:p-3 rounded w-full text-sm sm:text-base"
            required
          />

          <textarea
            name="quote"
            placeholder="Client Feedback"
            value={formData.quote}
            onChange={handleChange}
            className="border p-2 sm:p-3 rounded w-full text-sm sm:text-base"
            rows="3"
            required
          />
        </div>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 sm:p-3 rounded w-full text-sm sm:text-base"
        />

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-sm sm:text-base font-medium transition-colors order-1"
          >
            {editingId ? "Update" : "Add"} Testimonial
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-sm sm:text-base font-medium transition-colors order-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {Array.isArray(testimonials) && testimonials.length > 0 ? (
          testimonials.map((t) => (
            <div
              key={t.id}
              className="p-4 sm:p-5 md:p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              {t.avatar && (
                <img
                  src={`http://127.0.0.1:8000${t.avatar}`}
                  alt={t.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-3 sm:mb-4 border-2 border-gray-200"
                />
              )}

              <h3 className="font-semibold text-base sm:text-lg mb-2">{t.name}</h3>
              <p className="text-sm sm:text-base text-gray-700 italic mb-3 sm:mb-4 line-clamp-3">
                "{t.comment}"
              </p>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleEdit(t)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm sm:text-base transition-colors flex-1 sm:flex-initial"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(t.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm sm:text-base transition-colors flex-1 sm:flex-initial"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm sm:text-base text-gray-600 text-center col-span-full py-8">
            No testimonials available. Add your first testimonial above!
          </p>
        )}
      </div>
    </div>
  );
}