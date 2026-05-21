import { Phone } from 'lucide-react';

const FloatingButtons = () => {
  // Grab numbers from import.meta.env (Vite standard) or fallback
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || '+919999999999';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring anim */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-pulse-ring" />
        
        {/* Native WhatsApp SVG icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-current relative z-10 transition-transform duration-300 group-hover:rotate-12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.387 2.005 13.908.979 11.285.979c-5.44 0-9.866 4.372-9.87 9.802 0 1.706.46 3.376 1.332 4.846l-.997 3.636 3.738-.971c1.47.798 3.06 1.218 4.673 1.22h.003zM17.47 14.397c-.3-.149-1.777-.862-2.077-.973-.299-.109-.517-.163-.733.163-.217.327-.84.862-1.03 1.077-.19.215-.38.24-.68.09-1.896-.95-2.894-1.6-4.053-3.568-.3-.513.3-.477.857-1.564.09-.18.046-.337-.023-.487-.069-.15-.733-1.724-1.004-2.378-.264-.63-.53-.545-.733-.555-.189-.01-.408-.012-.627-.012-.218 0-.573.082-.873.407-.3.327-1.144 1.096-1.144 2.67 0 1.575 1.16 3.1 1.322 3.316.163.217 2.28 3.42 5.523 4.792.772.327 1.374.52 1.843.667.776.247 1.482.212 2.04.13.62-.09 1.776-.713 2.029-1.402.253-.688.253-1.277.177-1.402-.076-.125-.27-.2-.57-.35z" />
        </svg>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="group relative flex items-center justify-center w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Call clinic phone"
      >
        {/* Pulse ring anim */}
        <span className="absolute inset-0 rounded-full bg-red-600 opacity-40 animate-pulse-ring" />
        
        {/* Phone icon */}
        <Phone className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
      </a>
    </div>
  );
};

export default FloatingButtons;
