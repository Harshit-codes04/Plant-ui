import React, { useState } from 'react';
import { X, Star, Sun, Droplets, Wind, ShieldCheck, AlertTriangle, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { Plant } from '../types/plant';
import { POT_COLORS } from '../data/plants';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface ProductModalProps {
  plant: Plant | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ plant, onClose, onOpenCart }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [selectedPotColor, setSelectedPotColor] = useState<string>(POT_COLORS[0].name);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!plant) return null;

  const currentMultiplier =
    plant.sizes?.find((s) => s.name === selectedSize)?.priceMultiplier ?? 1;
  const currentPrice = Math.round(plant.price * currentMultiplier * 100) / 100;
  const originalPrice = plant.originalPrice
    ? Math.round(plant.originalPrice * currentMultiplier * 100) / 100
    : null;

  // Real photograph corresponding to the chosen pot finish
  const activeDisplayImage = plant.potImages?.[selectedPotColor] || plant.image;

  const handleAddToCart = () => {
    addToCart(plant, quantity, selectedSize, selectedPotColor);
    setIsAdded(true);
    
    toast.success(`Added ${quantity}x ${plant.name} to basket!`, {
      description: `${selectedSize} Size • ${selectedPotColor} Planter`,
      action: {
        label: 'View Basket',
        onClick: () => setIsCartOpen(true),
      },
    });

    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(plant, quantity, selectedSize, selectedPotColor);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#111315] border border-zinc-800 rounded-3xl max-w-3xl w-full text-white shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 rounded-full text-zinc-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          
          {/* Left Column: Real Photographic Pot Showcase */}
          <div className="relative bg-[#090b0c] min-h-[340px] md:min-h-[480px] flex items-center justify-center overflow-hidden group select-none">
            {/* Active Real Photographic Image */}
            <img
              key={activeDisplayImage}
              src={activeDisplayImage}
              alt={`${plant.name} in ${selectedPotColor}`}
              className="w-full h-full object-cover animate-in fade-in duration-300"
            />

            {/* Top Botanical Badge */}
            {plant.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-500/90 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg backdrop-blur">
                {plant.badge}
              </span>
            )}

            {/* Planter Finish Pill */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
              <div className="backdrop-blur-md bg-black/75 border border-zinc-700/80 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
                <span
                  className="w-3 h-3 rounded-full border border-white/50 shadow-inner"
                  style={{ backgroundColor: POT_COLORS.find((p) => p.name === selectedPotColor)?.hex }}
                />
                <span className="text-xs font-semibold text-zinc-200">
                  {selectedPotColor}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Customizer */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-emerald-400 italic tracking-wider">
                  {plant.scientificName}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
                  {plant.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(plant.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-zinc-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white">{plant.rating}</span>
                  <span className="text-xs text-zinc-400">
                    ({plant.reviewsCount} customer reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-emerald-400">
                  ₹{currentPrice.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-sm text-zinc-500 line-through">
                    ₹{originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                  In Stock & Ready to Ship
                </span>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {plant.longDescription || plant.description}
              </p>

              {/* Size Selector */}
              {plant.sizes && plant.sizes.length > 0 && (
                <div>
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                    Select Pot Size
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {plant.sizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size.name)}
                        className={`py-2 px-3 rounded-xl border text-xs font-medium flex flex-col items-center transition ${
                          selectedSize === size.name
                            ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-sm'
                            : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        <span className="font-semibold">{size.name}</span>
                        <span className="text-[10px] text-zinc-400">{size.height}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Planter Finish Swatches */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Planter Finish: <span className="text-emerald-400 font-bold normal-case">{selectedPotColor}</span>
                  </label>
                  <span className="text-[10px] text-zinc-500">Select pot to switch photo</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {POT_COLORS.map((pot) => {
                    const isSelected = selectedPotColor === pot.name;
                    return (
                      <button
                        key={pot.name}
                        onClick={() => setSelectedPotColor(pot.name)}
                        className={`p-2.5 rounded-2xl border text-xs text-left flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-500/15 text-white shadow-md shadow-emerald-500/10 scale-[1.02]'
                            : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: pot.hex }}
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-transform ${
                            isSelected
                              ? 'border-white scale-110 shadow-lg ring-2 ring-emerald-400'
                              : 'border-zinc-600'
                          }`}
                        />
                        <span className="font-medium truncate">{pot.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Care Grid */}
              <div className="grid grid-cols-2 gap-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-3">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Sun className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{plant.care.light}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Droplets className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{plant.care.water}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Wind className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{plant.care.humidity}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  {plant.care.petFriendly ? (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-emerald-400 font-medium">Pet Safe</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-zinc-400">Mildly Toxic to Pets</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-6 border-t border-zinc-800/80 mt-6 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden px-2 py-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-zinc-400 hover:text-white transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-zinc-400 hover:text-white transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-emerald-500/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Basket • ₹{(currentPrice * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold rounded-xl text-zinc-200 hover:text-white transition"
              >
                Instant Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
