import React from 'react';
import { X, Droplets, Sun, Wind, ShieldCheck, Heart, Sparkles, Truck, HelpCircle } from 'lucide-react';

export type ModalTab = 'doctor' | 'watering' | 'shipping' | 'guarantee' | 'story' | 'sustainability';

interface CareGuideModalProps {
  activeTab: ModalTab | null;
  onClose: () => void;
}

export const CareGuideModal: React.FC<CareGuideModalProps> = ({ activeTab, onClose }) => {
  if (!activeTab) return null;

  const contentMap: Record<
    ModalTab,
    { title: string; subtitle: string; icon: React.ComponentType<{ className?: string }>; content: React.ReactNode }
  > = {
    doctor: {
      title: '24/7 Botanical Plant Doctor',
      subtitle: 'Expert horticultural support for all your indoor plants',
      icon: HelpCircle,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            Every plant parent encounters yellowing leaves, slow growth, or pest questions. Our team of certified botanists is available 24/7 to guide you back to lush greenery.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-2xl">
              <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                <Sun className="w-4 h-4" /> Lighting Diagnosis
              </div>
              <p className="text-xs text-zinc-400">
                Identify whether your plant needs direct south light or gentle filtered north exposure.
              </p>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-2xl">
              <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                <Droplets className="w-4 h-4" /> Watering Calibrations
              </div>
              <p className="text-xs text-zinc-400">
                Custom hydration schedules based on seasonal climate, room humidity, and pot size.
              </p>
            </div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-xs text-emerald-300">
            <strong>Need urgent help?</strong> Email our botanist desk directly at <span className="underline font-semibold">care@earthsexhale.com</span> with a photo of your plant for advice within 2 hours.
          </div>
        </div>
      ),
    },
    watering: {
      title: 'Master Indoor Watering Guide',
      subtitle: 'Hydration essentials to keep your foliage thriving',
      icon: Droplets,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <div className="space-y-3">
            <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">1</div>
              <div>
                <strong className="text-white block">The Finger Soil Test</strong>
                <span className="text-xs text-zinc-400">Insert your finger 2 inches into topsoil. If dry, water thoroughly. If damp, wait 3-4 days.</span>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">2</div>
              <div>
                <strong className="text-white block">Drainage is Mandatory</strong>
                <span className="text-xs text-zinc-400">Always discard standing saucer water after 15 minutes to prevent root suffocation and root rot.</span>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-xs">3</div>
              <div>
                <strong className="text-white block">Room Temperature Water</strong>
                <span className="text-xs text-zinc-400">Cold tap water shocks tropical root systems. Use filtered, resting water for best foliage sheen.</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    shipping: {
      title: 'Eco-Protective Shipping & Delivery',
      subtitle: 'Safe transit protocols engineered for delicate houseplants',
      icon: Truck,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            We developed custom hexagonal corrugated pods that lock root balls in place and prevent stem breakage during transit.
          </p>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <strong>Dispatch Time:</strong> Orders ship within 24 hours of nursery quality inspection.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <strong>Climate Heat/Cold Packs:</strong> Automatically included during extreme weather seasons.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <strong>Free Shipping:</strong> Automatically applied to all carts over ₹99.00.
            </li>
          </ul>
        </div>
      ),
    },
    guarantee: {
      title: '30-Day Happy Plant Guarantee',
      subtitle: 'Zero-risk guarantee on every living specimen we send',
      icon: ShieldCheck,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            Plants can experience slight transit fatigue, but if your specimen fails to bounce back or shows root health issues within 30 days of arrival, we will replace it free of charge or issue a full refund.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl space-y-2 text-xs">
            <div className="text-emerald-400 font-bold">How to claim:</div>
            <p className="text-zinc-400">
              1. Snap a quick photo of your plant under natural light.<br />
              2. Send your Order ID and photo to <span className="text-white font-medium">support@earthsexhale.com</span>.<br />
              3. Our botanical team will review and dispatch a replacement within 24 hours.
            </p>
          </div>
        </div>
      ),
    },
    story: {
      title: "Our Story — Earth's Exhale",
      subtitle: 'Connecting modern spaces with nature’s purest tranquility',
      icon: Heart,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            Earth's Exhale started with a simple belief: indoor spaces thrive when surrounded by living green companions. What began as a family greenhouse nursery has grown into a community of over 50,000 passionate plant lovers.
          </p>
          <p className="text-xs text-zinc-400">
            We partner with certified sustainable growers who nurture plants organically without synthetic growth hormones. Each plant is hand-selected and inspected before heading to its new home.
          </p>
        </div>
      ),
    },
    sustainability: {
      title: 'Our Sustainability Commitment',
      subtitle: '100% plastic-free packaging and carbon-neutral operations',
      icon: Sparkles,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-2xl">
              <div className="font-bold text-emerald-400 mb-1">100% Recyclable Packaging</div>
              <p className="text-xs text-zinc-400">All protective wraps and boxes are made from FSC-certified post-consumer paper.</p>
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-2xl">
              <div className="font-bold text-emerald-400 mb-1">One Tree Planted</div>
              <p className="text-xs text-zinc-400">For every 5 plants purchased, we sponsor the planting of an indigenous tree in reforestation zones.</p>
            </div>
          </div>
        </div>
      ),
    },
  };

  const item = contentMap[activeTab];
  const Icon = item.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#111315] border border-zinc-800 rounded-3xl max-w-lg w-full text-white shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="text-xs text-zinc-400">{item.subtitle}</p>
          </div>
        </div>

        <div className="pt-2">{item.content}</div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold rounded-xl text-white transition"
        >
          Close Guide
        </button>
      </div>
    </div>
  );
};
