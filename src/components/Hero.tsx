import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onSelectFeatured: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onSelectFeatured }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background Ambient Glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-teal-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
                Welcome to our curated green sanctuary
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              Breathe Deeply with <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                Earth's Exhale
              </span>
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Transform your living room into a serene oasis. We source premium, nursery-grown houseplants delivered safely in sustainable packaging right to your door.
            </p>

            {/* Metrics Counter */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-lg">
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">500+</div>
                <div className="text-xs text-zinc-400 mt-0.5">Plant Varieties</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">10K+</div>
                <div className="text-xs text-zinc-400 mt-0.5">Happy Homes</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">98%</div>
                <div className="text-xs text-zinc-400 mt-0.5">Arrive Thriving</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExplore}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-2xl transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2.5 active:scale-98"
              >
                <span>Explore Plant Catalog</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={onSelectFeatured}
                className="px-6 py-4 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-white font-semibold rounded-2xl transition flex items-center gap-2"
              >
                <span>Spotlight Feature</span>
              </button>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/30 to-teal-400/20 rounded-3xl blur-2xl transform rotate-2" />

              {/* Main Plant Card */}
              <div className="relative bg-[#111315] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-3">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <img
                    src="/plants/monstera.jpg"
                    alt="Featured Botanical"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Floating Guarantee Tag */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-zinc-700/80 px-3 py-1.5 rounded-full flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-zinc-200 font-medium">30-Day Plant Guarantee</span>
                  </div>

                  {/* Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                        Featured Species
                      </span>
                      <h4 className="text-base font-bold text-white">Dragon Scale Alocasia</h4>
                      <p className="text-xs text-zinc-400">Low-maintenance rare jewel</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-extrabold text-emerald-400">₹52.00</div>
                      <button
                        onClick={onSelectFeatured}
                        className="text-[11px] text-zinc-300 hover:text-white underline font-medium"
                      >
                        Inspect →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
