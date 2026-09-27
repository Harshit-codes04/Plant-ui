import React, { useState } from 'react';
import { Leaf, Send, Sparkles, Mail, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { ModalTab } from './CareGuideModal';
import { sendNewsletterWelcomeEmail } from '../services/emailService';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenGuide: (tab: ModalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenGuide }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please provide a valid email address.');
      return;
    }
    setIsSubscribed(true);
    toast.success('Welcome to the Plant Parent Club! 🌱', {
      description: 'Your 15% discount code is PLANTLOVE',
    });
    await sendNewsletterWelcomeEmail(email);
  };

  const handleCategoryClick = (cat: string) => {
    onSelectCategory(cat);
    const elem = document.getElementById('catalog');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-[#090b0c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Newsletter Box */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-emerald-950/30 border border-emerald-500/20 rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Weekly Botanical Tips
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Join 50,000+ Plant Enthusiasts
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed max-w-lg">
                Get seasonal repotting reminders, disease prevention alerts, and exclusive secret sales directly to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3 text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <span className="font-bold block">You're Subscribed!</span>
                    <span className="text-xs text-zinc-300">Use promo code <strong className="text-emerald-400 font-mono">PLANTLOVE</strong> for 15% off.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-950/90 border border-zinc-700/80 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-2xl text-sm transition flex items-center justify-center gap-2 flex-shrink-0 shadow-lg shadow-emerald-500/20 active:scale-98"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Footer Categorized Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                Earth's <span className="text-emerald-400">Exhale</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Dedicated to bringing living beauty and clean air into every home. Hand-reared with love, packaged with care, and backed by our green-thumb guarantee.
            </p>
          </div>

          {/* Shop Plants */}
          <div>
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-3.5">
              Shop Plants
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('air-purifying')}
                  className="hover:text-emerald-400 transition"
                >
                  Air Purifying
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('pet-friendly')}
                  className="hover:text-emerald-400 transition"
                >
                  Pet-Friendly
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('low-light')}
                  className="hover:text-emerald-400 transition"
                >
                  Low-Light Gems
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('rare')}
                  className="hover:text-emerald-400 transition"
                >
                  Rare Specimens
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('bestsellers')}
                  className="hover:text-emerald-400 transition"
                >
                  Top Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* Care & Help */}
          <div>
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-3.5">
              Care & Help
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onOpenGuide('doctor')}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Plant Doctor 24/7
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGuide('watering')}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Watering Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGuide('shipping')}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGuide('guarantee')}
                  className="hover:text-emerald-400 transition text-left"
                >
                  30-Day Guarantee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGuide('sustainability')}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Eco Packaging
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-3.5">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => onOpenGuide('story')}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGuide('sustainability')}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenGuide('guarantee')}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Quality Standards
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Earth's Exhale Botanical Co. All rights reserved.</p>
          <div className="flex items-center gap-6 text-zinc-400">
            <button onClick={() => onOpenGuide('shipping')} className="hover:text-white transition">Shipping Policy</button>
            <button onClick={() => onOpenGuide('guarantee')} className="hover:text-white transition">Return Terms</button>
            <button onClick={() => onOpenGuide('doctor')} className="hover:text-white transition">Contact Botanist</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
