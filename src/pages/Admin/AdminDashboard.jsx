import React from "react";

const AdminDashboard = () => {
  const username = localStorage.getItem("username");

  return (
    <div className="px-4 sm:px-6 md:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
        Admin Dashboard
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
        Welcome back, <span className="font-semibold">{username}</span> 👋
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Rooms</h2>
          <p className="text-sm sm:text-base text-gray-500">Manage room listings</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Bookings</h2>
          <p className="text-sm sm:text-base text-gray-500">View and update all bookings</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-shadow sm:col-span-2 md:col-span-1">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Testimonials</h2>
          <p className="text-sm sm:text-base text-gray-500">Review customer feedback</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;