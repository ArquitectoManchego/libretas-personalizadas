import React from 'react';
import { ShoppingBag, Search, Sparkles, Wand2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cart, onOpenCart }) => {
  const location = useLocation();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-slate-200/80 transition-all duration-300">
      
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>¡Temporada Escolar 2025-2026! Forros Adhesivos con Fondo Liso Reglamentario</span>
        <span className="hidden md:inline-block bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">Envíos Rápidos</span>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <span className="text-xl">📚</span>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-pink-600 bg-clip-text text-transparent">
              LibretasÚnicas
            </span>
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest -mt-1">
              Forros Adhesivos
            </span>
          </div>
        </Link>

        {/* Search Bar (2026 Style) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Buscar por materia, personaje (ej. Harry Potter, Barbie)..."
              className="w-full bg-slate-100/80 hover:bg-white focus:bg-white border border-slate-200 focus:border-indigo-500 text-sm text-slate-800 rounded-full py-2.5 pl-11 pr-4 outline-none transition-all duration-300 shadow-inner focus:shadow-lg focus:shadow-indigo-500/10"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" />
          </div>
        </div>

        {/* Actions Nav */}
        <div className="flex items-center gap-3">
          <Link
            to="/custom"
            className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 px-4 py-2.5 rounded-full transition-all duration-300 shadow-sm"
          >
            <Wand2 className="w-4 h-4 text-indigo-500" />
            <span>Crear desde Cero</span>
          </Link>
          
          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative bg-slate-900 hover:bg-indigo-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg shadow-slate-900/20 hover:scale-105 active:scale-95 flex items-center justify-center"
            aria-label="Carrito de compras"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Sub-nav Category Tabs */}
      <div className="border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 py-2 overflow-x-auto text-xs font-semibold text-slate-600">
          <Link 
            to="/" 
            className={`px-4 py-1.5 rounded-full transition-all ${
              location.pathname === '/' ? 'bg-slate-900 text-white shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            🔥 Catálogo Completo
          </Link>
          <Link 
            to="/custom" 
            className={`px-4 py-1.5 rounded-full transition-all ${
              location.pathname === '/custom' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            🎨 100% Personalizable
          </Link>
        </div>
      </div>

    </header>
  );
};
