import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;

    if (!name || !email || !phone || !subject || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Sending message...');

    try {
      const response = await api.post('/contact', formData);

      if (response.data.success) {
        toast.success(response.data.message || 'Message sent successfully!', { id: toastId });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error(response.data.message || 'Failed to send message', { id: toastId });
      }
    } catch (error) {
      console.error('Contact submit error:', error);
      toast.error(
        error.cleanedMessage || 'Server connection error. Please try again.',
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="font-accent text-sm text-gold tracking-widest uppercase italic">
            Get in touch
          </span>
          <h1 className="font-display text-4xl font-bold text-textDark tracking-wide">
            Contact Health Care Ayurveda
          </h1>
          <div className="w-12 h-[1.5px] bg-gold mx-auto" />
          <p className="font-body text-sm text-textMuted mt-4">
            Have questions about our treatments or products? Fill out the form or reach out directly.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Info & Maps (5/12 width) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-primary/5 shadow-sm space-y-6">
              <h2 className="font-display text-2xl font-bold text-textDark">
                Clinic Details
              </h2>
              
              <ul className="space-y-4 font-body text-sm text-textDark/80">
                <li className="flex items-start space-x-3.5">
                  <MapPin size={18} className="text-primary mt-1 shrink-0" />
                  <a
                    href="https://maps.app.goo.gl/p3n2pCFwT8mFHEK3A?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-relaxed hover:text-primary transition-colors hover:underline"
                  >
                    Health Care Ayurveda Clinic, Kochi, Kerala, India - 682016
                  </a>
                </li>
                <li className="flex items-center space-x-3.5">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span>+91 9539 691 757</span>
                </li>
                <li className="flex items-center space-x-3.5">
                  <Mail size={18} className="text-primary shrink-0" />
                  <span>contact@healthcareayurveda.com</span>
                </li>
              </ul>

              <div className="pt-6 border-t border-cream space-y-3">
                <h3 className="font-display text-lg font-bold text-textDark flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  <span>Hours of Care</span>
                </h3>
                <div className="text-xs font-body text-textMuted space-y-1">
                  <p className="flex justify-between">
                    <span>Monday – Sunday:</span>
                    <span className="font-semibold text-textDark">09:00 AM – 06:00 PM</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map (Actual Location) */}
            <div className="rounded-2xl overflow-hidden shadow-sm h-[280px] border border-primary/5 relative">
              <iframe
                title="Health Care Ayurveda Clinic Location"
                src="https://maps.google.com/maps?q=Healthcare%20Ayurvedic%20Center,%20Plot%20No%2020,%20Sancharapuri%20Colony,%20New%20Bowenpally,%20Secunderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* RIGHT: Contact Form (7/12 width) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-primary/5 shadow-md">
              <h2 className="font-display text-2xl font-bold text-textDark mb-6">
                Send Us an Enquiry
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold font-body text-textDark block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold font-body text-textDark block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold font-body text-textDark block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold font-body text-textDark block">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Treatment query / Product order"
                      className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold font-body text-textDark block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us details of your enquiry..."
                    className="w-full px-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10 resize-none"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-light text-white font-body font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactUs;
