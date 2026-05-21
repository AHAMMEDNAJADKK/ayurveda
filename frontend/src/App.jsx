import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/layout/FloatingButtons';

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-offWhite text-textDark">
          {/* Global Toast Notifications Container */}
          <Toaster position="top-right" reverseOrder={false} />

          {/* Navigation Sticky Header */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow" style={{ position: 'relative', zIndex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/login" element={<Login />} />

              {/* Admin — fully protected, no layout wrapper */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          {/* Global Stacked Pulse Floating Communication Buttons (WhatsApp + Call) */}
          <FloatingButtons />

          {/* Common Editorial Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
