import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  ClipboardList,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Image,
} from "lucide-react";
import logo from "../../assets/lumarise_logo.png";

const AdminLayout = () => {
  const [username, setUsername] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/admin-login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/admin-login");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close menu after navigation on mobile
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: BedDouble, label: "Rooms", path: "/admin/rooms" },
    { icon: ClipboardList, label: "Bookings", path: "/admin/bookings" },
    { icon: Image, label: "Gallery", path: "/admin/gallery" },
    { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#1b1b1b] text-white px-4 py-3 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Lumarise Logo" className="h-8 w-auto" />
          <h2 className="text-lg font-bold text-[#f5d36c] tracking-wide">
            LUMARISE ADMIN
          </h2>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-[#1b1b1b] text-white flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          ${isMobileMenuOpen ? 'mt-[52px]' : 'mt-0'}
          md:mt-0
        `}
      >
        <div>
          {/* Desktop Header */}
          <div className="hidden md:block px-6 py-6 border-b border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <img src={logo} alt="Lumarise Logo" className="h-10 w-auto" />
              <h2 className="text-xl font-bold text-[#f5d36c] tracking-wide">
                LUMARISE ADMIN
              </h2>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Welcome, <span className="text-[#f5d36c]">{username}</span>
            </p>
          </div>

          {/* Mobile User Info */}
          <div className="md:hidden px-6 py-4 border-b border-gray-700">
            <p className="text-gray-400 text-sm">
              Welcome, <span className="text-[#f5d36c]">{username}</span>
            </p>
          </div>

          {/* Navigation */}
          <nav className="mt-6 flex flex-col space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="flex items-center gap-3 px-6 py-3 hover:bg-[#f5d36c] hover:text-black transition-all text-left"
                >
                  <Icon size={20} /> {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="px-6 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-[#f5d36c] text-black font-semibold py-2 rounded hover:bg-black hover:text-[#f5d36c] transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Right content area (for nested pages) */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 mt-[52px] md:mt-0">
        <Outlet /> {/* ✅ This renders the nested admin pages like dashboard or rooms */}
      </main>
    </div>
  );
};

export default AdminLayout;