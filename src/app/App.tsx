import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { CartProvider } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FeaturedBotanicals } from '../components/FeaturedBotanicals';
import { CatalogSection, CategoryType } from '../components/CatalogSection';
import { SpotlightSection } from '../components/SpotlightSection';
import { ValueProps } from '../components/ValueProps';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { ProductModal } from '../components/ProductModal';
import { CheckoutModal } from '../components/CheckoutModal';
import { CareGuideModal, ModalTab } from '../components/CareGuideModal';
import { PLANTS_DATA } from '../data/plants';
import { Plant } from '../types/plant';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedPlantForModal, setSelectedPlantForModal] = useState<Plant | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState<ModalTab | null>(null);

  // Featured spotlight plant
  const spotlightPlant = PLANTS_DATA.find((p) => p.id === 'dragon-scale-alocasia') || PLANTS_DATA[0];

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFeaturedPlant = (plantId: string) => {
    const target = PLANTS_DATA.find((p) => p.id === plantId);
    if (target) {
      setSelectedPlantForModal(target);
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
        {/* Toast Notifications */}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#111315',
              border: '1px solid #27272a',
              color: '#ffffff',
            },
          }}
        />

        {/* Sticky Header Navigation */}
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (q.trim()) {
              handleNavigate('catalog');
            }
          }}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onExplore={() => handleNavigate('catalog')}
            onSelectFeatured={() => setSelectedPlantForModal(spotlightPlant)}
          />

          {/* Featured Botanicals */}
          <FeaturedBotanicals onSelectPlant={handleSelectFeaturedPlant} />

          {/* Full Interactive Catalog Store */}
          <CatalogSection
            plants={PLANTS_DATA}
            onQuickView={(plant) => setSelectedPlantForModal(plant)}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Plant of the Month Spotlight */}
          <SpotlightSection
            plant={spotlightPlant}
            onQuickView={(plant) => setSelectedPlantForModal(plant)}
          />

          {/* Value Props & Guarantees */}
          <ValueProps />
        </main>

        {/* Footer */}
        <Footer
          onSelectCategory={(cat) => setSelectedCategory(cat as CategoryType)}
          onOpenGuide={(tab) => setActiveGuideTab(tab)}
        />

        {/* Slide-over Shopping Basket Drawer */}
        <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />

        {/* Quick View / Customizer Modal */}
        <ProductModal
          plant={selectedPlantForModal}
          onClose={() => setSelectedPlantForModal(null)}
          onOpenCart={() => setSelectedPlantForModal(null)}
        />

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />

        {/* Plant Care & Help Guide Modal */}
        <CareGuideModal
          activeTab={activeGuideTab}
          onClose={() => setActiveGuideTab(null)}
        />
      </div>
    </CartProvider>
  );
}