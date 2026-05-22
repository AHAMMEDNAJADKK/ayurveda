import { Leaf } from 'lucide-react';

const productsRow1 = [
  {
    id: 1,
    name: "Hormone Balance Syrup",
    category: "General Wellness",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    price: 380,
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Stress Relief Herbal Capsules",
    category: "Mental Wellness",
    image: "https://images.unsplash.com/photo-1611070973770-b1a60b268471?auto=format&fit=crop&q=80&w=600",
    price: 450,
    badge: "New"
  },
  {
    id: 3,
    name: "Postnatal Recovery Oil",
    category: "Postnatal Care",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    price: 620,
    badge: "Bestseller"
  },
  {
    id: 4,
    name: "Radiance Ubtan Face Pack",
    category: "Skin Care",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
    price: 290,
    badge: "Bestseller"
  }
];

const productsRow2 = [
  {
    id: 5,
    name: "Ashwagandha Vitality Tonic",
    category: "Immunity",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600",
    price: 340,
    badge: ""
  },
  {
    id: 6,
    name: "Digestive Herbal Churna",
    category: "Digestion",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    price: 240,
    badge: ""
  },
  {
    id: 7,
    name: "Tejasvi Saffron Glow Elixir",
    category: "Skin Care",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    price: 540,
    badge: "Premium"
  },
  {
    id: 8,
    name: "Bringadi Intensive Hair Oil",
    category: "Hair Care",
    image: "https://images.unsplash.com/photo-1611070973770-b1a60b268471?auto=format&fit=crop&q=80&w=600",
    price: 420,
    badge: "New"
  }
];

const ProductCard = ({ product }) => {
  return (
    <div className="w-72 flex-shrink-0 bg-white rounded-2xl border border-primary/5 shadow-sm p-4 overflow-hidden relative group hover:shadow-green transition-all duration-300 transform hover:-translate-y-1">
      {product.badge && (
        <span className="absolute top-4 right-4 bg-gold text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full z-10">
          {product.badge}
        </span>
      )}
      <div className="h-44 w-full overflow-hidden rounded-xl bg-cream/10 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="mt-4 space-y-1">
        <span className="text-accent font-semibold text-xs tracking-wider uppercase block font-body">
          {product.category}
        </span>
        <h4 className="font-display font-bold text-textDark text-base group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {product.name}
        </h4>
        <div className="flex justify-between items-center pt-2">
          <span className="text-primary font-bold font-serif text-sm">
            ₹{product.price}
          </span>
          <span className="text-xs text-textMuted flex items-center gap-1 group-hover:text-gold transition-colors">
            <Leaf size={12} className="fill-current text-gold/30 group-hover:text-gold" />
            <span>Organic</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const SignatureProducts = () => {
  // Triple lists for seamless looping across screen widths
  const doubleRow1 = [...productsRow1, ...productsRow1, ...productsRow1];
  const doubleRow2 = [...productsRow2, ...productsRow2, ...productsRow2];

  return (
    <section className="py-24 bg-cream/10 overflow-hidden select-none border-t border-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <div className="flex justify-center">
          <Leaf className="text-gold w-6 h-6 animate-pulse" />
        </div>
        <h2 className="font-display text-3xl md:text-5xl text-primary font-bold tracking-wide">
          Our Botanical Apothecary
        </h2>
        <p className="font-body text-textMuted max-w-xl mx-auto text-sm md:text-base">
          100% natural, laboratory-tested herbal formulations prepared following classical Ayurvedic recipes to heal and restore vitality for everyone.
        </p>
      </div>

      <div className="space-y-6 scroll-pause relative">
        {/* Row 1: Scrolling Left */}
        <div className="flex w-full overflow-hidden relative">
          {/* Edge gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-off-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-off-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex gap-6 py-2 scroll-left">
            {doubleRow1.map((product, idx) => (
              <ProductCard key={`${product.id}-row1-${idx}`} product={product} />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex w-full overflow-hidden relative">
          {/* Edge gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-off-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-off-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-6 py-2 scroll-right">
            {doubleRow2.map((product, idx) => (
              <ProductCard key={`${product.id}-row2-${idx}`} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureProducts;
