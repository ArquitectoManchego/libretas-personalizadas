import React, { useState } from 'react';
import { CATALOG_DESIGNS } from '../data/catalog';
import { DesignItem, CartItem } from '../types';
import { Sparkles, Eye, Plus, Check, Heart, Shield } from 'lucide-react';

interface CatalogGalleryProps {
  onSelectDesign: (design: DesignItem) => void;
  onAddToCart: (item: CartItem) => void;
}

export const CatalogGallery: React.FC<CatalogGalleryProps> = ({ onSelectDesign, onAddToCart }) => {
  const [filter, setFilter] = useState<'all' | 'infantil' | 'harry_potter'>('all');
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const filteredDesigns = CATALOG_DESIGNS.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const handleAddQuick = (design: DesignItem, isPackage: boolean) => {
    const unitPrice = isPackage ? 80 : 100;
    const qty = isPackage ? 6 : 1;
    const cartItem: CartItem = {
      cartId: 'CAT-' + design.id + '-' + Date.now(),
      designId: design.id,
      isCustom: false,
      subject: design.defaultSubject,
      studentName: design.defaultStudentName,
      bgColor: design.bgColor,
      bgType: design.bgType,
      characterImg: design.characterImg,
      characterName: design.characterName,
      subjectFont: design.subjectFont,
      studentFont: design.studentFont,
      subjectGraphicStyle: design.subjectGraphicStyle,
      spineText: design.defaultSubject,
      quantity: qty,
      isPackage: isPackage,
      unitPrice: unitPrice,
      totalPrice: unitPrice * qty
    };

    onAddToCart(cartItem);
    
    setAddedIds(prev => ({ ...prev, [design.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [design.id]: false }));
    }, 2000);
  };

  return (
    <section id="catalogo" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-200 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 font-extrabold px-3.5 py-1 rounded-full text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" /> Diseños Prediseñados Fijos
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Catálogo de <span className="text-pink-600">Diseños Exclusivos</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-1">
            Diseños ya probados para niñas y niños. $80 c/u en paquete de 6 impresiones ($480) o $100 individual.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
              filter === 'all'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Todos ({CATALOG_DESIGNS.length})
          </button>
          <button
            onClick={() => setFilter('infantil')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
              filter === 'infantil'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/25'
                : 'bg-white text-pink-600 hover:bg-pink-50 border border-pink-200'
            }`}
          >
            <Heart className="w-4 h-4" /> Infantiles (8 diseños)
          </button>
          <button
            onClick={() => setFilter('harry_potter')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
              filter === 'harry_potter'
                ? 'bg-indigo-900 text-amber-400 shadow-lg shadow-indigo-950/30'
                : 'bg-white text-indigo-900 hover:bg-indigo-50 border border-indigo-200'
            }`}
          >
            <Shield className="w-4 h-4" /> Harry Potter (5 diseños)
          </button>
        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDesigns.map((item) => (
          <div
            key={item.id}
            className="glass-card bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-pink-300 flex flex-col justify-between group"
          >
            {/* Card Top / Visual Preview */}
            <div className="relative p-5 text-center flex flex-col items-center justify-between h-72 transition-colors duration-300" style={{ backgroundColor: item.bgColor }}>
              
              {/* Badge Popular / Category */}
              <div className="absolute top-3 left-3 flex gap-1">
                {item.isPopular && (
                  <span className="bg-amber-400 text-gray-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                    ⭐ Popular
                  </span>
                )}
              </div>

              {/* Subject Title Top */}
              <div className="w-full pt-2">
                <span className={`${item.subjectGraphicStyle} text-xl font-bold block truncate max-w-full px-2`}>
                  {item.defaultSubject}
                </span>
              </div>

              {/* Center Character SVG */}
              <div className="my-auto transform group-hover:scale-110 transition-transform duration-300">
                <img
                  src={item.characterImg}
                  alt={item.title}
                  className="w-28 h-28 object-contain filter drop-shadow-lg"
                />
              </div>

              {/* Student Name Bottom */}
              <div className="w-full pb-2">
                <span 
                  className="text-gray-900 text-sm font-semibold block truncate px-2"
                  style={{ fontFamily: item.studentFont }}
                >
                  {item.defaultStudentName}
                </span>
              </div>

              {/* Hover overlay quick action */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4 backdrop-blur-xs">
                <button
                  onClick={() => onSelectDesign(item)}
                  className="bg-white text-gray-900 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                >
                  <Eye className="w-4 h-4 text-pink-500" /> Ver Completa
                </button>
              </div>
            </div>

            {/* Card Content & Details */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-extrabold text-gray-900 text-base group-hover:text-pink-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Pricing Tags */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                <div className="text-gray-700">
                  Paquete de 6: <strong className="text-pink-600 font-extrabold text-sm">$80 c/u</strong>
                </div>
                <div className="text-gray-500 font-medium">
                  1 pza: <strong>$100</strong>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleAddQuick(item, true)}
                  className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-colors"
                >
                  {addedIds[item.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> ¡Añadido!
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" /> Paq. 6 ($480)
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleAddQuick(item, false)}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-xs flex items-center justify-center transition-colors"
                >
                  1 pza ($100)
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
