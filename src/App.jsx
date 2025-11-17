import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Gallery from "./pages/Gallery";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RoomCard from "./components/RoomCard";
import About from "./pages/About";
import Amenities from "./pages/Amenities";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRooms from "./pages/Admin/AdminRooms";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminGallery from "./pages/Admin/AdminGallery";
import AdminTestimonials from "./pages/Admin/AdminTestimonials";
import AdminBookings from "./pages/Admin/AdminBookings";
import BookingForm from "./pages/BookingForm";
import ExploreWayanad from "./pages/ExploreWayanad";
import Terms from "./pages/Terms";
import Faq from "./pages/Faq";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();

  // Hide Navbar & Footer on specific routes
  const hideLayoutRoutes = ["/booking"];
  const isAdminRoute = location.pathname.startsWith("/admin");
  const shouldShowLayout = !isAdminRoute && !hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowLayout && <Navbar />}

      <Routes>
        {/* 🌍 Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/explore-wayanad" element={<ExploreWayanad />} /> {/* ✅ Moved here */}
        <Route path="/room/:id" element={<RoomCard />} /> 
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq" element={<Faq />} />

        {/* 🔐 Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 🧱 Admin routes (sidebar layout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="rooms" element={<AdminRooms />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
        </Route>

        {/* 🔁 Redirects for old paths */}
        <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin-rooms" element={<Navigate to="/admin/rooms" replace />} />
        <Route path="/admin-bookings" element={<Navigate to="/admin/bookings" replace />} />
        <Route path="/admin-gallery" element={<Navigate to="/admin/gallery" replace />} />

        {/* 🚫 Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {shouldShowLayout && <Footer />}
    </>
  );
}

export default App;
