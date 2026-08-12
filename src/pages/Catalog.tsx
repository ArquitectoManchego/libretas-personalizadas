import React from 'react';
import { CATALOG_DESIGNS } from '../data/catalog';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Catalog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Search Header / Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#222222]">Regreso a clases: Encuentra diseños increíbles para tus libretas escolares.</h2>
        <p className="text-sm text-[#595959] mt-2">Personaliza el fondo liso con el color de cada materia. {CATALOG_DESIGNS.length} diseños pre-aprobados para ti.</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
        {CATALOG_DESIGNS.map((item) => (
          <Link key={item.id} to={`/product/${item.id}`} className="product-card group relative">
            
            {/* Heart Icon (Mock Favorite) */}
            <button className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
            </button>

            {/* Product Image */}
            <div className="product-image-container">
              {item.image ? (
                <img src={item.image} alt={item.title} className="product-image" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: item.bgColor }}>
                  <span className={`${item.subjectGraphicStyle} text-lg`}>{item.defaultSubject}</span>
                </div>
              )}
            </div>
            
            {/* Title */}
            <h3 className="product-title line-clamp-2">Forro Adhesivo Personalizado - {item.title}</h3>
            
            {/* Mock Shop Info / Rating */}
            <div className="text-[12px] text-[#595959] mb-1 flex items-center gap-1">
              <span>LibretasUnicasMX</span>
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-xs">(128)</span>
            </div>

            {/* Price */}
            <div className="product-price">
              $80.00 <span className="text-xs text-[#595959] font-normal">MXN c/u (Paq. 6)</span>
            </div>

            {/* Bestseller Badge (Etsy style) */}
            {item.isPopular && (
              <div>
                <span className="product-badge">Más vendido</span>
              </div>
            )}
          </Link>
        ))}

        {/* Custom Order Card */}
        <Link to={`/custom`} className="product-card group relative">
          <div className="product-image-container flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
            <span className="font-bold text-gray-500 text-center px-4">Diseño 100% Personalizado<br/>Desde Cero</span>
          </div>
          <h3 className="product-title line-clamp-2">Tu Diseño a Medida - Sube tu Imagen o Logo</h3>
          <div className="text-[12px] text-[#595959] mb-1 flex items-center gap-1">
            <span>LibretasUnicasMX</span>
            <span className="text-yellow-500">★★★★★</span>
          </div>
          <div className="product-price">
            $120.00 <span className="text-xs text-[#595959] font-normal">MXN c/u (Paq. 6)</span>
          </div>
        </Link>
      </div>

    </div>
  );
};
