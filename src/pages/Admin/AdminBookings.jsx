import React, { useState, useEffect } from 'react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/`);
      const data = await response.json();
      const bookingsData = Array.isArray(data) ? data : data.results || [];
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setBookings(bookings.map((b) =>
          b.id === bookingId ? { ...b, status: newStatus } : b
        ));
        alert('Status updated successfully!');
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status. Please try again.');
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/`, { method: 'DELETE' });
      if (response.ok) {
        setBookings(bookings.filter((b) => b.id !== bookingId));
        alert('Booking deleted successfully!');
      } else throw new Error('Failed to delete booking');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Error deleting booking. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || '';
    switch (s) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'checked-in':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'checked-out':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const calculateNights = (checkin, checkout) => {
    if (!checkin || !checkout) return 0;
    const diffTime = Math.abs(new Date(checkout) - new Date(checkin));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // === Filtering Logic ===
  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter =
      filter === 'all' || booking.status?.toLowerCase() === filter.toLowerCase();

    const matchesSearch =
      searchTerm === '' ||
      booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone?.includes(searchTerm) ||
      booking.room_type?.toLowerCase().includes(searchTerm.toLowerCase());

    const checkin = new Date(booking.checkin || booking.check_in);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const matchesDate =
      (!from || checkin >= from) && (!to || checkin <= to);

    return matchesFilter && matchesSearch && matchesDate;
  });

  // === Status Counts (based on filtered data) ===
  const statusCounts = {
    pending: filteredBookings.filter((b) => b.status?.toLowerCase() === 'pending').length,
    confirmed: filteredBookings.filter((b) => b.status?.toLowerCase() === 'confirmed').length,
    checkedIn: filteredBookings.filter((b) => b.status?.toLowerCase() === 'checked-in').length,
    checkedOut: filteredBookings.filter((b) => b.status?.toLowerCase() === 'checked-out').length,
    cancelled: filteredBookings.filter((b) => b.status?.toLowerCase() === 'cancelled').length,
  };

  // === Pagination ===
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const startIndex = (currentPage - 1) * bookingsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, startIndex + bookingsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg sm:text-xl text-gray-600">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Bookings Management</h1>
        <p className="text-sm sm:text-base text-gray-600">View and manage all hotel bookings</p>
      </div>

      {/* Filters */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <label className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border px-2 py-1 rounded-md text-xs sm:text-sm flex-1 sm:flex-initial"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border px-2 py-1 rounded-md text-xs sm:text-sm flex-1 sm:flex-initial"
            />
          </div>
          {(fromDate || toDate) && (
            <button
              onClick={() => {
                setFromDate('');
                setToDate('');
              }}
              className="text-xs sm:text-sm text-blue-600 underline self-start sm:self-auto"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4 sm:mb-6 flex flex-wrap gap-2">
        {[
          { label: 'All', key: 'all', count: filteredBookings.length },
          { label: 'Pending', key: 'Pending', count: statusCounts.pending },
          { label: 'Confirmed', key: 'Confirmed', count: statusCounts.confirmed },
          { label: 'Checked-in', key: 'Checked-in', count: statusCounts.checkedIn },
          { label: 'Checked-out', key: 'Checked-out', count: statusCounts.checkedOut },
          { label: 'Cancelled', key: 'Cancelled', count: statusCounts.cancelled },
        ].map(({ label, key, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              filter === key
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Bookings Table - Desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Guest Details', 'Check-In/Out', 'Room Details', 'Status', 'Actions'].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                currentBookings.map((booking) => {
                  const guestName = booking.name || booking.guest_name || 'N/A';
                  const checkIn = booking.checkin || booking.check_in;
                  const checkOut = booking.checkout || booking.check_out;
                  const nights = calculateNights(checkIn, checkOut);

                  return (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">#{booking.id}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{guestName}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        In: {formatDate(checkIn)} <br />
                        Out: {formatDate(checkOut)} <br />
                        <span className="text-xs text-gray-500">{nights} night(s)</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {booking.room_type || 'N/A'}
                        <div className="text-sm text-gray-500">
                          {booking.guests || 1} Guest(s)
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-y-2 text-sm">
                        <select
                          value={booking.status || 'Pending'}
                          onChange={(e) => updateStatus(booking.id, e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Checked-in">Checked-in</option>
                          <option value="Checked-out">Checked-out</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="w-full px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bookings Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {currentBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            No bookings found
          </div>
        ) : (
          currentBookings.map((booking) => {
            const guestName = booking.name || booking.guest_name || 'N/A';
            const checkIn = booking.checkin || booking.check_in;
            const checkOut = booking.checkout || booking.check_out;
            const nights = calculateNights(checkIn, checkOut);

            return (
              <div key={booking.id} className="bg-white rounded-lg shadow p-4">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-sm font-bold text-gray-900">#{booking.id}</div>
                    <div className="text-base font-semibold text-gray-900 mt-1">{guestName}</div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status || 'Pending'}
                  </span>
                </div>

                {/* Guest Details */}
                <div className="mb-3 space-y-1">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> {booking.phone}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {booking.email}
                  </div>
                </div>

                {/* Check-in/out */}
                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-xs text-gray-500">Check-in</div>
                      <div className="font-medium text-gray-900">{formatDate(checkIn)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Check-out</div>
                      <div className="font-medium text-gray-900">{formatDate(checkOut)}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{nights} night(s)</div>
                </div>

                {/* Room Details */}
                <div className="mb-3 text-sm">
                  <div className="text-gray-900 font-medium">{booking.room_type || 'N/A'}</div>
                  <div className="text-gray-600">{booking.guests || 1} Guest(s)</div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <select
                    value={booking.status || 'Pending'}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Checked-in">Checked-in</option>
                    <option value="Checked-out">Checked-out</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => deleteBooking(booking.id)}
                    className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination + Summary */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs sm:text-sm text-gray-600">
          Showing {startIndex + 1}–
          {Math.min(startIndex + bookingsPerPage, filteredBookings.length)} of{' '}
          {filteredBookings.length} results
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-xs sm:text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="text-xs sm:text-sm">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-xs sm:text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;