import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhySolidBg } from './components/WhySolidBg';
import { PricingSection } from './components/PricingSection';
import { CatalogGallery } from './components/CatalogGallery';
import { CoverPreviewModal } from './components/CoverPreviewModal';
import { InteractiveCustomizer } from './components/InteractiveCustomizer';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { DesignItem, CartItem } from './types';

export const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Navbar Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollTo={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Banner */}
        <Hero onScrollTo={scrollToSection} />

        {/* Why Solid Color Background Rule */}
        <WhySolidBg />

        {/* Catalog Gallery (8 Infantiles + 5 Harry Potter) */}
        <CatalogGallery
          onSelectDesign={(design) => setSelectedDesign(design)}
          onAddToCart={handleAddToCart}
        />

        {/* Interactive Customizer */}
        <InteractiveCustomizer onAddToCart={handleAddToCart} />

        {/* Pricing & Package Calculator */}
        <PricingSection onScrollTo={scrollToSection} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Continuous Cover Full Preview Modal */}
      <CoverPreviewModal
        design={selectedDesign}
        onClose={() => setSelectedDesign(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & WhatsApp Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

    </div>
  );
};

export default App;
