import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Catalog } from './pages/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { InteractiveCustomizer } from './components/InteractiveCustomizer';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CartItem } from './types';

export const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
    setIsCartOpen(true); // Auto-open cart like Etsy usually shows a slide-out or popup
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#F1651D] selection:text-white bg-white">
      
      {/* Top Navigation */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Routing */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
          <Route path="/custom" element={<InteractiveCustomizer onAddToCart={handleAddToCart} />} />
        </Routes>
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
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
