import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { name, category, image, shortDesc, benefits, price, badge } = product;

  const handleEnquiry = () => {
    toast.success(`"${name}" added to enquiry! You can submit details in the Contact Form.`, {
      style: {
        border: '1px solid #2D5A27',
        padding: '16px',
        color: '#1A2E16',
        backgroundColor: '#FAFAF7',
      },
      iconTheme: {
        primary: '#2D5A27',
        secondary: '#FAFAF7',
      },
    });
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
        <div className="space-y-2">
          {/* Category */}
          <span className="text-[10px] font-body font-semibold tracking-widest text-gold uppercase block">
            {category}
          </span>
          
          {/* Name */}
          <h3 className="font-display text-lg font-bold text-textDark leading-tight group-hover:text-primary transition-colors duration-250">
            {name}
          </h3>

          {/* Description */}
          <p className="font-body text-xs text-textMuted leading-relaxed line-clamp-2">
            {shortDesc}
          </p>

          {/* Benefits */}
          <div className="pt-2 space-y-1">
            {benefits.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-center space-x-1.5 text-[11px] text-textDark/80">
                <Check size={10} className="text-accent shrink-0" />
                <span className="line-clamp-1">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom actions (Price + Enquiry Slide-up) */}
        <div className="mt-5 pt-3 border-t border-cream flex items-center justify-between relative overflow-hidden h-10">
          {/* Standard Price view */}
          <div className="transition-transform duration-300 group-hover:-translate-y-12">
            <span className="text-xs text-textMuted block leading-none">Price estimate</span>
            <span className="font-display text-base font-bold text-primary mt-1 block">
              ₹{price}
            </span>
          </div>

          {/* Static Shopping Bag icon */}
          <button
            onClick={handleEnquiry}
            className="p-2 text-primary/70 hover:text-primary transition-colors group-hover:opacity-0"
            title="Enquire Product"
          >
            <ShoppingBag size={20} />
          </button>

          {/* Slide-Up CTA Button on Hover */}
          <button
            onClick={handleEnquiry}
            className="absolute inset-x-0 bottom-0 w-full bg-primary hover:bg-primary-light text-white text-xs font-semibold py-2.5 rounded-lg shadow-md transition-all duration-300 translate-y-12 group-hover:translate-y-0 flex items-center justify-center space-x-2"
          >
            <ShoppingBag size={14} />
            <span>Add to Enquiry</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
