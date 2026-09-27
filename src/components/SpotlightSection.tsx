import React, { useState } from 'react';
import { Sparkles, CheckCircle, ShoppingBag, ArrowRight, Eye, Check } from 'lucide-react';
import { Plant } from '../types/plant';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface SpotlightSectionProps {
  plant: Plant;
  onQuickView: (plant: Plant) => void;
}

export const SpotlightSection: React.FC<SpotlightSectionProps> = ({ plant, onQuickView }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(plant, 1, 'Medium', 'Forest Matte');
    setIsAdded(true);
    toast.success(`Added ${plant.name} to basket!`, {
      action: {
        label: 'View Cart',
        onClick: () => setIsCartOpen(true),
      },
    });
    setTimeout(() => setIsAdded(false), 1600);
  };

  const perks = [
    'Low maintenance & resilient indoor foliage',
    'Thrives effortlessly in bright indirect ambient light',
    'Natural botanical air purifier for your workspace',
    'Includes grower pot & certified root health check',
  ];

  return (
    <section id="spotlight" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative bg-gradient-to-br from-emerald-950/40 via-[#111315] to-[#0d0f11] border border-emerald-500/30 rounded-3xl p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">
          
          {/* Glowing aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full mb-3 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Spotlight
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Our Best of The Season!
                </h2>
                <h3 className="text-xl sm:text-2xl font-semibold text-emerald-400 mt-1">
                  {plant.name}
                </h3>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {plant.longDescription || plant.description}
              </p>

              {/* Perks List */}
              <div className="space-y-3">
                {perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Price & Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-400">Special Offer</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                      ₹{plant.price.toFixed(2)}
                    </span>
                    {plant.originalPrice && (
                      <span className="text-sm text-zinc-500 line-through">
                        ₹{plant.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAdd}
                    className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition flex items-center gap-2 shadow-lg ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-emerald-500/20 active:scale-98'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Basket</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onQuickView(plant)}
                    className="p-3.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 rounded-2xl text-zinc-300 hover:text-white transition"
                    title="View details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-zinc-900 border border-zinc-800 shadow-2xl">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 p-3.5 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">Botanical Care Level</div>
                    <div className="text-emerald-400 font-medium">{plant.care.difficulty} • {plant.care.light}</div>
                  </div>
                  <span className="text-amber-400 font-bold">★ {plant.rating}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
