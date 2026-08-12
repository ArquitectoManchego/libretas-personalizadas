import React from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cart, onOpenCart }) => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E1E3DF] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between gap-4">
        
        {/* Brand Logo & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button className="md:hidden text-gray-700 p-2">
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center">
            <h1 className="font-serif text-2xl tracking-tight" style={{ color: '#F1651D', fontWeight: 600 }}>
              LibretasUnicas
            </h1>
          </Link>
        </div>

        {/* Search Bar (Etsy Style) */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Busca diseños, materias, o personajes (ej. Harry Potter)..."
              className="w-full bg-[#F8F9FA] border-2 border-transparent hover:border-[#E1E3DF] focus:border-[#222222] focus:bg-white text-sm rounded-full py-2.5 pl-6 pr-12 outline-none transition-all"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#F1651D] text-white p-2 rounded-full hover:bg-[#d95a1a] transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User & Cart Navigation */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link to="/custom" className="hidden sm:block text-sm font-semibold text-[#222222] hover:bg-[#F8F9FA] px-4 py-2 rounded-full transition-colors">
            Personalizar desde Cero
          </Link>
          
          <button
            onClick={onOpenCart}
            className="relative p-3 rounded-full hover:bg-[#F8F9FA] transition-colors flex items-center"
          >
            <ShoppingCart className="w-6 h-6 text-[#222222]" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-[#F1651D] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
        </nav>

      </div>
      
      {/* Category Links Sub-header */}
      <div className="hidden md:block border-t border-[#E1E3DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-8 py-2 text-[13px] font-medium text-[#595959]">
            <li><Link to="/" className="hover:text-[#222222] hover:underline decoration-2 underline-offset-4">Vuelta a Clases</Link></li>
            <li><Link to="/" className="hover:text-[#222222] hover:underline decoration-2 underline-offset-4">Diseños Infantiles</Link></li>
            <li><Link to="/" className="hover:text-[#222222] hover:underline decoration-2 underline-offset-4">Harry Potter</Link></li>
            <li><Link to="/custom" className="hover:text-[#222222] hover:underline decoration-2 underline-offset-4">Diseño 100% Personalizado</Link></li>
          </ul>
        </div>
      </div>
    </header>
  );
};
