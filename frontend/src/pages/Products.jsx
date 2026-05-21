import { useState } from 'react';
import ProductCard from '../components/products/ProductCard';
import { Search, Filter, Leaf } from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const products = [
    {
      id: 1,
      name: "HCA Hormone Balance Syrup",
      category: "Women's Health",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
      shortDesc: "Supports female hormonal balance, regulates menstrual cycles, and relieves symptoms of PCOS and bloating naturally.",
      benefits: ["Regulates estrogen levels", "Relieves bloating & cramps", "100% ashoka & lodhra extract"],
      price: 380,
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Stress Relief Herbal Capsules",
      category: "Mental Wellness",
      image: "https://images.unsplash.com/photo-1611070973770-b1a60b268471?auto=format&fit=crop&q=80&w=600",
      shortDesc: "Potent blend of adaptogenic herbs like Ashwagandha and Brahmi to combat mental fatigue, stress, and anxiety.",
      benefits: ["Lowers stress hormone (cortisol)", "Improves mental clarity", "Promotes restful sleep"],
      price: 450,
      badge: "New"
    },
    {
      id: 3,
      name: "Postnatal Recovery Oil",
      category: "Postnatal Care",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
      shortDesc: "Traditional oil blend specifically curated for postpartum moms to restore muscle tone, firm skin, and relieve joint pain.",
      benefits: ["Restores core muscle tone", "Soothes back & pelvic pain", "Enriched with Bala & Ashwagandha"],
      price: 620,
      badge: "Bestseller"
    },
    {
      id: 4,
      name: "Radiance Ubtan Face Pack",
      category: "Skin Care",
      image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
      shortDesc: "Traditional recipe containing turmeric, saffron, and sandalwood to gently exfoliate, remove tan, and brighten tired skin.",
      benefits: ["Evens skin tone", "Exfoliates dead skin cells", "Deep herbal brightness & radiance"],
      price: 290,
      badge: "Bestseller"
    },
    {
      id: 5,
      name: "Ashwagandha Women's Tonic",
      category: "Immunity",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600",
      shortDesc: "Daily tonic tailored for women to boost stamina, build immune response, and supply essential botanical micro-nutrients.",
      benefits: ["Enhances daily energy levels", "Strengthens immune defense", "Combats chronic fatigue"],
      price: 340,
      badge: ""
    },
    {
      id: 6,
      name: "Digestive Herbal Churna",
      category: "Digestion",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
      shortDesc: "Synergistic powder combination of Haritaki, Pippali, and Ginger to stimulate appetite and improve gut metabolism.",
      benefits: ["Enhances digestive fire (Agni)", "Relieves gas and acidity", "Promotes regular bowel movement"],
      price: 240,
      badge: ""
    }
  ];

  const categories = ['All', "Women's Health", 'Skin Care', 'Mental Wellness', 'Postnatal Care', 'Immunity', 'Digestion'];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-cream/10 pb-20">
      
      {/* Header Banner */}
      <div className="bg-primary text-white py-16 relative overflow-hidden">
        {/* Subtle SVG leaves background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full text-accent" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 Q50,50 100,0 T200,0" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <div className="flex justify-center">
            <Leaf className="w-8 h-8 text-gold animate-bounce" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wide">
            HCA Botanical Apothecary
          </h1>
          <p className="font-body text-sm md:text-base text-accent max-w-lg mx-auto">
            100% natural, laboratory-tested herbal formulations prepared following classical ayurvedic texts.
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Filter Sidebar */}
          <div className="lg:w-1/4 space-y-6 shrink-0">
            {/* Search Box */}
            <div className="bg-white p-5 rounded-2xl border border-primary/5 shadow-sm">
              <h3 className="font-display text-base font-bold text-textDark mb-3 flex items-center gap-2">
                <Search size={16} className="text-primary" />
                <span>Search Products</span>
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find herbs, tonics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream focus:outline-none focus:border-primary text-sm font-body bg-cream/10"
                />
                <Search size={16} className="absolute left-3.5 top-3.5 text-textMuted" />
              </div>
            </div>

            {/* Desktop Category Filters */}
            <div className="bg-white p-5 rounded-2xl border border-primary/5 shadow-sm hidden lg:block">
              <h3 className="font-display text-base font-bold text-textDark mb-4 flex items-center gap-2">
                <Filter size={16} className="text-primary" />
                <span>Categories</span>
              </h3>
              <div className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-body transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary text-white font-semibold'
                        : 'text-textMuted hover:bg-cream/50 hover:text-primary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Grid Catalog */}
          <div className="lg:w-3/4 flex-grow space-y-8">
            
            {/* Mobile Category Scroll */}
            <div className="lg:hidden overflow-x-auto flex space-x-2 py-2 no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-body transition-all shrink-0 ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-textMuted border border-cream'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Dynamic Results Counter */}
            <div className="flex justify-between items-center text-xs font-body text-textMuted">
              <p>Showing {filteredProducts.length} premium products</p>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-primary font-bold hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-2xl border border-primary/5 shadow-sm space-y-3">
                <Leaf className="w-12 h-12 text-gold mx-auto opacity-50" />
                <h3 className="font-display text-lg font-bold text-textDark">No products found</h3>
                <p className="font-body text-sm text-textMuted max-w-xs mx-auto">
                  Try adjusting your search terms or selecting a different category.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Products;
