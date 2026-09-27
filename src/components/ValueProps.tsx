import React from 'react';
import { Headphones, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const values = [
    {
      icon: Headphones,
      title: '24/7 Plant Doctor Support',
      desc: 'Connect with certified botanists anytime for watering, repotting, or health advice.',
    },
    {
      icon: Truck,
      title: 'Eco Express Shipping',
      desc: 'Custom climate-safe protective pods ensure every stem arrives in peak condition.',
    },
    {
      icon: ShieldCheck,
      title: '30-Day Thriving Guarantee',
      desc: 'If your plant encounters any issues within 30 days, we replace it free of charge.',
    },
    {
      icon: HeartHandshake,
      title: 'Sustainably Grown',
      desc: 'Organically nurtured in local eco-friendly nurseries with zero harsh chemicals.',
    },
  ];

  return (
    <section id="benefits" className="py-16 md:py-20 border-t border-zinc-900 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-[#111315]/70 border border-zinc-800/80 rounded-3xl p-6 hover:border-emerald-500/40 transition group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{v.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
