import React, { createContext, useContext, useState, useEffect } from 'react';
import { Plant, CartItem } from '../types/plant';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    plant: Plant,
    quantity?: number,
    selectedSize?: 'Small' | 'Medium' | 'Large',
    selectedPotColor?: string
  ) => void;
  updateQuantity: (
    plantId: string,
    selectedSize: string,
    selectedPotColor: string,
    newQuantity: number
  ) => void;
  removeFromCart: (
    plantId: string,
    selectedSize: string,
    selectedPotColor: string
  ) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  promoCode: string;
  discountPercentage: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  freeShippingThreshold: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PROMO_CODES: Record<string, number> = {
  PLANTLOVE: 15, // 15% off
  GREEN20: 20, // 20% off
  EARTH10: 10, // 10% off
};

const CART_STORAGE_KEY = 'plant_ui_cart_items';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage error
    }
  }, [items]);

  const addToCart = (
    plant: Plant,
    quantity = 1,
    selectedSize: 'Small' | 'Medium' | 'Large' = 'Medium',
    selectedPotColor = 'Forest Matte'
  ) => {
    const sizeMultiplier =
      plant.sizes?.find((s) => s.name === selectedSize)?.priceMultiplier ?? 1;
    const pricePerUnit = Math.round(plant.price * sizeMultiplier * 100) / 100;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.plant.id === plant.id &&
          item.selectedSize === selectedSize &&
          item.selectedPotColor === selectedPotColor
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            plant,
            quantity,
            selectedSize,
            selectedPotColor,
            pricePerUnit,
          },
        ];
      }
    });
  };

  const updateQuantity = (
    plantId: string,
    selectedSize: string,
    selectedPotColor: string,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) {
      removeFromCart(plantId, selectedSize, selectedPotColor);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (
          item.plant.id === plantId &&
          item.selectedSize === selectedSize &&
          item.selectedPotColor === selectedPotColor
        ) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (
    plantId: string,
    selectedSize: string,
    selectedPotColor: string
  ) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.plant.id === plantId &&
            item.selectedSize === selectedSize &&
            item.selectedPotColor === selectedPotColor
          )
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode('');
    setDiscountPercentage(0);
  };

  const applyPromo = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      setPromoCode(clean);
      setDiscountPercentage(PROMO_CODES[clean]);
      return {
        success: true,
        message: `Promo applied: ${PROMO_CODES[clean]}% off your order! 🌱`,
      };
    }
    return {
      success: false,
      message: 'Invalid discount code. Try "GREEN20" or "PLANTLOVE"!',
    };
  };

  const removePromo = () => {
    setPromoCode('');
    setDiscountPercentage(0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = Math.round(
    items.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0) * 100
  ) / 100;

  const freeShippingThreshold = 99.0;
  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 9.99;
  const discountAmount =
    Math.round(((subtotal * discountPercentage) / 100) * 100) / 100;
  const total = Math.max(0, Math.round((subtotal - discountAmount + shippingFee) * 100) / 100);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        promoCode,
        discountPercentage,
        applyPromo,
        removePromo,
        totalItems,
        subtotal,
        shippingFee,
        discountAmount,
        total,
        freeShippingThreshold,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
