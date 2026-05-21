import React from 'react';
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

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-textDark">
        {/* Global Toast Notifications Container */}
        <Toaster position="top-right" reverseOrder={false} />

        {/* Navigation Sticky Header */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Global Stacked Pulse Floating Communication Buttons (WhatsApp + Call) */}
        <FloatingButtons />

        {/* Common Editorial Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
