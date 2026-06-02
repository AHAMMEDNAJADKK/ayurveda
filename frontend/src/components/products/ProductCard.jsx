import { ShoppingBag, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { name, category, image, shortDesc, benefits, price, badge } = product;

  const handleEnquiry = () => {
    const adminPhone = "919539691757";
    const benefitsList = benefits && benefits.length > 0
      ? benefits.map(b => `• ${b}`).join('\n')
      : 'N/A';
    
    const messageText = `🌿 *Product Inquiry - Health Care Ayurveda*
━━━━━━━━━━━━━━━━
📦 *Product Name:* ${name}
🗂️ *Category:* ${category}
💵 *Estimated Price:* ₹${price}
📝 *Description:* ${shortDesc}
✨ *Key Benefits:*
${benefitsList}
━━━━━━━━━━━━━━━━
Please check availability and details.`;
    
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedText}`;
    
    toast.success(`Redirecting to WhatsApp for "${name}" enquiry...`, {
      style: {
        border: '1px solid #61aa45',
        padding: '16px',
        color: '#1a3d10',
        backgroundColor: '#edf7e8',
      },
      iconTheme: {
        primary: '#61aa45',
        secondary: '#edf7e8',
      },
    });

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-primary/5 hover:border-primary/25 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
      
      {/* Product Image & Badge */}
      <div className="relative overflow-hidden aspect-square bg-cream/20">
        {badge && (
          <span className="absolute top-3 left-3 z-10 bg-gold text-white font-body text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm">
            {badge}
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Glow Overlay border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/25 rounded-t-2xl transition-all duration-300 pointer-events-none" />
      </div>

      {/* Details Container */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          {/* Category */}
          <span className="text-[10px] font-body font-semibold tracking-widest text-gold uppercase block">
            {category}
          </span>
          
          {/* Name */}
          <h3 className="font-display text-lg font-bold text-textDark leading-tight group-hover:text-primary transition-colors duration-250">
            {name}
          </h3>

          {/* Description */}
          <p className="font-body text-xs text-textMuted leading-relaxed">
            {shortDesc}
          </p>

          {/* Benefits */}
          <div className="pt-2 space-y-1.5">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start space-x-1.5 text-[11px] text-textDark/80">
                <Check size={11} className="text-accent shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom actions (Price + Enquiry static and always visible) */}
        <div className="mt-5 pt-4 border-t border-cream flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-textMuted block font-body uppercase tracking-wider">Price Estimate</span>
            <span className="font-body text-lg font-bold text-primary mt-1 block">
              ₹{price}
            </span>
          </div>

          <button
            onClick={handleEnquiry}
            className="bg-primary hover:bg-primary-light text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-primary/20 flex items-center space-x-1.5 transition-all duration-300 transform active:scale-95 shrink-0"
          >
            <ShoppingBag size={13} />
            <span>Add Enquiry</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
