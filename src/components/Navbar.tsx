import React, { useState } from 'react';
import { Leaf, ShoppingCart, Search, Menu, X, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  activeSection,
  onNavigate,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'catalog', label: 'Shop Plants' },
    { id: 'featured', label: 'Botanical Highlights' },
    { id: 'spotlight', label: 'Plant of the Month' },
    { id: 'benefits', label: 'Why Us' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0a0a] rounded-[14px] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Earth's <span className="text-emerald-400">Exhale</span>
              </span>
              <span className="text-[10px] text-zinc-400 tracking-wider uppercase hidden sm:block">
                Botanical Sanctuary
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/80 px-4 py-1.5 rounded-full">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition ${
                  activeSection === link.id
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Toggle / Input */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-zinc-900 border border-emerald-500/50 rounded-2xl px-3 py-1.5 w-48 sm:w-64 animate-in fade-in zoom-in-95 duration-150">
                  <Search className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search Monstera, Pothos..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-transparent text-xs text-white placeholder-zinc-500 ml-2 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="text-zinc-400 hover:text-white p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 text-zinc-300 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 rounded-2xl transition"
                  title="Search plants"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/40 text-zinc-200 hover:text-white rounded-2xl transition group"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-zinc-950 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40 animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 lg:hidden text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-2xl border border-zinc-800 transition"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800/80 py-4 px-2 space-y-2 animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeSection === link.id
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
