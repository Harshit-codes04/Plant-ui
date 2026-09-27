import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shippingFee,
    discountAmount,
    total,
    freeShippingThreshold,
    promoCode,
    applyPromo,
    removePromo,
    discountPercentage,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, Math.round((freeShippingThreshold - subtotal) * 100) / 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111315] border-l border-zinc-800 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-wide">Your Green Basket</h2>
                <p className="text-xs text-zinc-400">
                  {items.length === 0 ? 'Empty basket' : `${items.length} unique ${items.length === 1 ? 'plant' : 'plants'}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-zinc-400 hover:text-red-400 px-2 py-1 rounded transition"
                  title="Clear all"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Meter */}
          {items.length > 0 && (
            <div className="bg-zinc-900/80 px-6 py-3 border-b border-zinc-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                {amountToFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Unlocked Free Express Delivery!
                  </span>
                ) : (
                  <span className="text-zinc-300">
                    Add <span className="text-emerald-400 font-semibold">₹{amountToFreeShipping.toFixed(2)}</span> more for Free Shipping
                  </span>
                )}
                <span className="text-zinc-400">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Your cart is feeling lonely</h3>
                  <p className="text-sm text-zinc-400 max-w-xs">
                    Explore our botanical collection to find the perfect plant companion for your space.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20"
                >
                  Explore Plants
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.plant.id}-${item.selectedSize}-${item.selectedPotColor}`}
                  className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 flex gap-4 hover:border-zinc-700 transition"
                >
                  <img
                    src={item.plant.image}
                    alt={item.plant.name}
                    className="w-20 h-20 rounded-xl object-cover bg-zinc-800 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm text-white truncate">
                          {item.plant.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.plant.id,
                              item.selectedSize,
                              item.selectedPotColor
                            )
                          }
                          className="text-zinc-500 hover:text-red-400 transition p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5 flex items-center gap-2">
                        <span>Size: {item.selectedSize}</span>
                        <span>•</span>
                        <span className="truncate">{item.selectedPotColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-emerald-400 font-semibold text-sm">
                        ₹{(item.pricePerUnit * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.plant.id,
                              item.selectedSize,
                              item.selectedPotColor,
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 hover:bg-zinc-700 text-zinc-300 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.plant.id,
                              item.selectedSize,
                              item.selectedPotColor,
                              item.quantity + 1
                            )
                          }
                          className="p-1.5 hover:bg-zinc-700 text-zinc-300 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="border-t border-zinc-800 bg-zinc-950/80 p-6 space-y-4">
              {/* Promo Code Input */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-emerald-400">
                    <span className="flex items-center gap-2 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      Promo <strong className="uppercase">{promoCode}</strong> ({discountPercentage}% OFF)
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-zinc-400 hover:text-white text-xs underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. GREEN20)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold rounded-xl text-white transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <p
                    className={`text-xs mt-1.5 ${
                      promoMessage.isError ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">₹{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercentage}%)</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-white">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-medium">FREE</span>
                    ) : (
                      `₹${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-2 flex justify-between text-base font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-emerald-400">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
