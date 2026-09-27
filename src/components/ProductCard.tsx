import React, { useState } from 'react';
import { ShoppingCart, Star, Eye, Check, Heart } from 'lucide-react';
import { Plant } from '../types/plant';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  plant: Plant;
  onQuickView: (plant: Plant) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ plant, onQuickView }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(plant, 1, 'Medium', 'Forest Matte');
    setIsAdded(true);
    
    toast.success(`Added ${plant.name} to basket!`, {
      description: 'Standard size • Forest Matte Planter',
      action: {
        label: 'Open Cart',
        onClick: () => setIsCartOpen(true),
      },
    });

    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast('Saved to your favorites wishlist ❤️', {
        description: plant.name,
      });
    }
  };

  return (
    <div
      onClick={() => onQuickView(plant)}
      className="group relative bg-[#111315]/80 backdrop-blur border border-zinc-800/90 rounded-3xl overflow-hidden hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Thumbnail Area */}
      <div className="relative overflow-hidden bg-zinc-900 aspect-[4/3] w-full">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badge */}
        {plant.badge && (
          <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 text-emerald-400 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-lg">
            {plant.badge}
          </span>
        )}

        {/* Floating Actions */}
        <div className="absolute top-3.5 right-3.5 flex flex-col gap-2">
          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isLiked
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 scale-105'
                : 'bg-zinc-950/60 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800/80'
            }`}
            title="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(plant);
            }}
            className="p-2 rounded-full bg-zinc-950/60 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800/80 backdrop-blur-md transition-all md:opacity-0 md:group-hover:opacity-100"
            title="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(plant.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-zinc-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-zinc-300">{plant.rating}</span>
            <span className="text-[11px] text-zinc-500">({plant.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {plant.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-2 mt-1.5 leading-relaxed">
            {plant.description}
          </p>
        </div>

        {/* Footer: Price & Add to Cart */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-800/60">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 font-medium">Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-emerald-400">
                ₹{plant.price.toFixed(2)}
              </span>
              {plant.originalPrice && (
                <span className="text-xs text-zinc-500 line-through">
                  ₹{plant.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-zinc-950 border border-emerald-500/30 hover:border-emerald-500'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
