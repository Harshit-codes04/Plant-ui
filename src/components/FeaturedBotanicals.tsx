import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Plant } from '../types/plant';

interface FeaturedBotanicalsProps {
  onSelectPlant: (plantId: string) => void;
}

export const FeaturedBotanicals: React.FC<FeaturedBotanicalsProps> = ({ onSelectPlant }) => {
  const featured = [
    {
      id: 'peace-lily',
      name: 'Peace Lily (Spathiphyllum)',
      subtitle: 'Air-Purifying Beauty',
      description: 'Lush emerald foliage with graceful white blooms that cleanse indoor air pollutants.',
      price: '₹36.00',
      image: '/plants/peace_lily.jpg',
      tag: 'NASA Top Air Cleaner',
    },
    {
      id: 'calathea-orbifolia',
      name: 'Calathea Orbifolia',
      subtitle: 'Bold & Pet Resilient',
      description: 'Striking metallic striped leaves that create a dramatic tropical statement anywhere.',
      price: '₹49.00',
      image: '/plants/calathea.jpg',
      tag: '100% Non-Toxic',
    },
  ];

  return (
    <section id="featured" className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-3 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Handpicked Highlights
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Botanical Breathtakers
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Curated specimens designed to flourish in modern apartments and bright workspaces.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {featured.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectPlant(item.id)}
              className="group bg-[#111315]/80 hover:bg-[#15181b] border border-zinc-800 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 cursor-pointer transition-all duration-300 shadow-xl"
            >
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-zinc-900 flex-shrink-0 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {item.tag}
                </span>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  {item.subtitle}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/80">
                  <span className="text-lg font-bold text-emerald-400">{item.price}</span>
                  <button className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect & Customise</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
