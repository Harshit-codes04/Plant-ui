import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, Search, RefreshCw } from 'lucide-react';
import { Plant } from '../types/plant';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  plants: Plant[];
  onQuickView: (plant: Plant) => void;
  searchQuery: string;
  onClearSearch: () => void;
  selectedCategory?: CategoryType;
  onSelectCategory?: (cat: CategoryType) => void;
}

export type CategoryType = 'all' | 'bestsellers' | 'air-purifying' | 'pet-friendly' | 'low-light' | 'rare';
type SortType = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  plants,
  onQuickView,
  searchQuery,
  onClearSearch,
  selectedCategory: propCategory,
  onSelectCategory: propOnSelectCategory,
}) => {
  const [internalCategory, setInternalCategory] = useState<CategoryType>('all');
  const selectedCategory = propCategory !== undefined ? propCategory : internalCategory;
  const setSelectedCategory = propOnSelectCategory || setInternalCategory;
  const [sortBy, setSortBy] = useState<SortType>('featured');

  const categories: { id: CategoryType; label: string; count: number }[] = [
    { id: 'all', label: 'All Plants', count: plants.length },
    {
      id: 'bestsellers',
      label: 'Top Sellers',
      count: plants.filter((p) => p.category === 'bestsellers' || p.badge === 'Bestseller').length,
    },
    {
      id: 'air-purifying',
      label: 'Air Purifying',
      count: plants.filter((p) => p.category === 'air-purifying' || p.badge === 'Air Purifier').length,
    },
    {
      id: 'pet-friendly',
      label: 'Pet-Friendly',
      count: plants.filter((p) => p.care.petFriendly || p.category === 'pet-friendly').length,
    },
    {
      id: 'low-light',
      label: 'Low Light',
      count: plants.filter((p) => p.category === 'low-light' || p.care.light.toLowerCase().includes('low')).length,
    },
    {
      id: 'rare',
      label: 'Rare Gems',
      count: plants.filter((p) => p.category === 'rare' || p.badge === 'Rare').length,
    },
  ];

  const filteredPlants = useMemo(() => {
    return plants
      .filter((plant) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = plant.name.toLowerCase().includes(q);
          const matchesScientific = plant.scientificName.toLowerCase().includes(q);
          const matchesDesc = plant.description.toLowerCase().includes(q);
          if (!matchesName && !matchesScientific && !matchesDesc) return false;
        }

        // Category filter
        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'bestsellers') {
          return plant.category === 'bestsellers' || plant.badge === 'Bestseller';
        }
        if (selectedCategory === 'air-purifying') {
          return plant.category === 'air-purifying' || plant.badge === 'Air Purifier';
        }
        if (selectedCategory === 'pet-friendly') {
          return plant.care.petFriendly || plant.category === 'pet-friendly';
        }
        if (selectedCategory === 'low-light') {
          return plant.category === 'low-light' || plant.care.light.toLowerCase().includes('low');
        }
        if (selectedCategory === 'rare') {
          return plant.category === 'rare' || plant.badge === 'Rare';
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured/default
      });
  }, [plants, selectedCategory, sortBy, searchQuery]);

  return (
    <section id="catalog" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-3 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Curated Storefront
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our Botanical Collection
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              Handpicked indoor plants inspected for prime root health & vitality.
            </p>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 rounded-2xl px-3.5 py-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-zinc-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-zinc-900 text-white">Featured</option>
                <option value="price-asc" className="bg-zinc-900 text-white">Price: Low to High</option>
                <option value="price-desc" className="bg-zinc-900 text-white">Price: High to Low</option>
                <option value="rating" className="bg-zinc-900 text-white">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Pills Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-lg shadow-emerald-500/25'
                  : 'bg-zinc-900/70 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedCategory === cat.id
                    ? 'bg-black/20 text-zinc-900 font-extrabold'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Active Search Notification */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Search className="w-4 h-4 text-emerald-400" />
              <span>
                Showing results for "<strong className="text-white">{searchQuery}</strong>" (
                {filteredPlants.length} matches found)
              </span>
            </div>
            <button
              onClick={onClearSearch}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-medium"
            >
              <RefreshCw className="w-3 h-3" /> Clear search
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredPlants.length === 0 ? (
          <div className="py-20 text-center bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No plants match your criteria</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Try adjusting your search terms or select another category filter to find healthy plants.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                onClearSearch();
              }}
              className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold rounded-xl text-white transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.map((plant) => (
              <ProductCard key={plant.id} plant={plant} onQuickView={onQuickView} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
