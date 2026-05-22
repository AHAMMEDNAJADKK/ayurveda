import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/layout/FloatingButtons';

// Effects
import GlobalFallingLeaves from './components/effects/GlobalFallingLeaves';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Appointment from './pages/Appointment';
import Admin from './pages/Admin';
import Login from './pages/Login';

// Auth
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout for Public Pages
function PublicLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      {/* Navigation Sticky Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow" style={{ position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>

      {/* Global Stacked Pulse Floating Communication Buttons (WhatsApp + Call) */}
      <FloatingButtons />

      {/* Common Editorial Footer */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-offWhite text-textDark">
          {/* Global Toast Notifications Container */}
          <Toaster position="top-right" reverseOrder={false} />

          {/* Global Immersive Falling Leaves Canvas Overlay */}
          <GlobalFallingLeaves />

          <Routes>
            {/* Public Layout Wrapping Regular Website Pages */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Admin Section - Fully Isolated layout */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
