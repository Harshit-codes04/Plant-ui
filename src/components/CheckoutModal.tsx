import React, { useState } from 'react';
import { X, CheckCircle2, Truck, Sparkles, Loader2, ArrowRight, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sendOrderConfirmationEmail, isEmailConfigured } from '../services/emailService';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, total, subtotal, shippingFee, discountAmount, clearCart } = useCart();
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'upi',
  });
  const [orderNumber, setOrderNumber] = useState('');
  const [emailStatusMessage, setEmailStatusMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    const generatedOrder = 'EXHALE-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(generatedOrder);

    // Prepare payload for real email dispatch
    const emailPayload = {
      orderId: generatedOrder,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod,
      items: items.map((i) => ({
        name: i.plant.name,
        quantity: i.quantity,
        size: i.selectedSize,
        potColor: i.selectedPotColor,
        price: i.pricePerUnit,
      })),
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total,
    };

    // Send real email via EmailJS (or fallback simulation if keys missing)
    const emailResult = await sendOrderConfirmationEmail(emailPayload);
    setEmailStatusMessage(emailResult.message);

    setTimeout(() => {
      setStep('success');
      clearCart();

      // Confetti celebration
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#059669', '#a7f3d0'],
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  const handleDone = () => {
    setStep('details');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={step === 'processing' ? undefined : onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#111315] border border-zinc-800 rounded-3xl max-w-xl w-full text-white shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        {step !== 'processing' && (
          <button
            onClick={step === 'success' ? handleDone : onClose}
            className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* STEP 1: Customer Details & Checkout */}
        {step === 'details' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Express Eco-Checkout</h3>
                <p className="text-xs text-zinc-400">Secure botanical delivery straight to your doorstep</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Email Address (For Order Receipt)</label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  placeholder="Flat/House No, Street, Apartment"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    placeholder="Bengaluru"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    placeholder="560001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / QR', sub: 'Instant' },
                    { id: 'card', label: 'Card', sub: 'Debit/Credit' },
                    { id: 'cod', label: 'Cash on Delivery', sub: 'Pay on arrival' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                      className={`p-3 rounded-xl border text-xs text-left transition ${
                        formData.paymentMethod === method.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-white'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="font-semibold text-white">{method.label}</div>
                      <div className="text-[10px] text-zinc-400">{method.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-3.5 space-y-1.5 text-xs text-zinc-300 mt-4">
                <div className="flex justify-between">
                  <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Eco-Packaging & Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-zinc-800 pt-2 flex justify-between font-bold text-sm text-white">
                  <span>Total Due</span>
                  <span className="text-emerald-400 text-base">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.99] mt-4"
              >
                <span>Complete Order • ₹{total.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Processing State */}
        {step === 'processing' && (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
            <h4 className="text-lg font-bold text-white">Dispatching Order Receipt...</h4>
            <p className="text-xs text-zinc-400 max-w-xs">
              Communicating with nursery servers and triggering delivery email.
            </p>
          </div>
        )}

        {/* STEP 3: Order Placed Success */}
        {step === 'success' && (
          <div className="py-8 flex flex-col items-center text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Order Confirmed
              </span>
              <h3 className="text-2xl font-extrabold text-white">Thank You for Growing With Us!</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Order ID: <strong className="text-white">{orderNumber}</strong>
              </p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 w-full text-left space-y-2 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Recipient:</span>
                <span className="font-semibold text-white">{formData.name || 'Plant Enthusiast'}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Destination:</span>
                <span className="font-semibold text-white truncate max-w-[200px]">
                  {formData.city}, {formData.pincode}
                </span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span className="text-zinc-500">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-400">Within 2-3 Business Days 🌿</span>
              </div>
            </div>

            {/* Email Dispatch Status Tag */}
            <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-2xl p-3 w-full flex items-center gap-2.5 text-xs text-emerald-300 text-left">
              <Mail className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <div>
                <span className="font-medium">
                  {isEmailConfigured() ? 'Live Confirmation Sent' : 'Ready to Send Real Email'}
                </span>
                <p className="text-[11px] text-zinc-400">
                  {isEmailConfigured()
                    ? `Receipt sent directly to ${formData.email}`
                    : `To receive real emails in your inbox, add your free keys in .env!`}
                </p>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20"
            >
              Back to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
