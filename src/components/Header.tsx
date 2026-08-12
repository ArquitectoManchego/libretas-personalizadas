import React from 'react';
import { ShoppingBag, Sparkles, Palette, BookOpen } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onScrollTo: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cart, onOpenCart, onScrollTo }) => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-pink-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onScrollTo('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-none">
              LibretasUnicas.mx
            </h1>
            <p className="text-xs text-pink-500 font-medium tracking-wide">
              Forros Adhesivos Escolares Personalizados
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-gray-700 text-sm">
          <button 
            onClick={() => onScrollTo('catalogo')}
            className="hover:text-pink-600 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-pink-500" /> Catálogo ($80 / $100)
          </button>
          <button 
            onClick={() => onScrollTo('personalizar')}
            className="hover:text-purple-600 transition-colors flex items-center gap-1.5"
          >
            <Palette className="w-4 h-4 text-purple-500" /> Crear Personalizado ($120 / $150)
          </button>
          <button 
            onClick={() => onScrollTo('precios')}
            className="hover:text-pink-600 transition-colors"
          >
            Precios y Paquetes
          </button>
          <button 
            onClick={() => onScrollTo('por-que-liso')}
            className="hover:text-pink-600 transition-colors"
          >
            ¿Por qué fondo liso?
          </button>
        </nav>

        {/* Cart button */}
        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-pink-500/25 hover:shadow-lg hover:scale-105 transition-all active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="hidden sm:inline">Mi Pedido</span>
          {totalItems > 0 && (
            <span className="bg-amber-400 text-gray-900 font-extrabold text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-inner animate-bounce">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
