import React, { useState } from 'react';
import { CATALOG_DESIGNS } from '../data/catalog';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShieldCheck, ArrowRight, Layers, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const Catalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'infantil' | 'harry_potter'>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredDesigns = activeCategory === 'all' 
    ? CATALOG_DESIGNS 
    : CATALOG_DESIGNS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen pb-16">
      
      {/* Hero Banner Section (2026 Modern Aesthetic) */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Glow Effects background */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wide text-pink-300">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Forros Adhesivos Completos 2025-2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              Catálogo de Forros Escolares Personalizados
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Olvídate de forrar con plástico tradicional. Nuestros forros adhesivos cubren <strong>frente, lomo y vuelta</strong> con el color liso reglamentario de la escuela de tus hijos, incluyendo materias e imborrable nombre del alumno.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-slate-200">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Color liso reglamentario</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Lomo continuo sin cortes</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Impresión láser plastificada</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Catalog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filters Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Diseños Disponibles</h2>
            <p className="text-xs sm:text-sm text-slate-500">Selecciona un modelo para ingresar la materia y el nombre del alumno.</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeCategory === 'all' 
                  ? 'bg-white text-slate-900 shadow-md shadow-slate-200 font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({CATALOG_DESIGNS.length})
            </button>
            <button
              onClick={() => setActiveCategory('infantil')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeCategory === 'infantil' 
                  ? 'bg-white text-slate-900 shadow-md shadow-slate-200 font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              👧 Barbie & Kitty
            </button>
            <button
              onClick={() => setActiveCategory('harry_potter')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeCategory === 'harry_potter' 
                  ? 'bg-white text-slate-900 shadow-md shadow-slate-200 font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚡ Harry Potter
            </button>
          </div>
        </div>

        {/* Product Cards Grid (2026 Sleek Grid) */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {filteredDesigns.map((item) => (
            <motion.div key={item.id} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
              <Link 
                to={`/product/${item.id}`} 
                className="group block bg-white rounded-3xl p-3 border border-slate-200/80 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden"
              >
                
                {/* Image Container */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-3">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: item.bgColor }}>
                      <span className={`${item.subjectGraphicStyle} text-xl font-bold`}>{item.defaultSubject}</span>
                    </div>
                  )}

                  {/* Favorite Heart Button */}
                  <button 
                    onClick={(e) => toggleFavorite(e, item.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${favorites[item.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Badges */}
                  <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                    {item.isPopular && (
                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                        ★ Más Vendido
                      </span>
                    )}
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      Fondo Liso Reglamentario
                    </span>
                  </div>
                </div>

                {/* Content Info */}
                <div className="px-1 pb-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase text-indigo-600 tracking-wider">
                      {item.category === 'harry_potter' ? 'Colección Alex' : 'Colección Barbie'}
                    </span>
                    <div className="flex items-center text-amber-400 text-xs">
                      ★★★★★ <span className="text-slate-400 text-[10px] ml-1">(5.0)</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Price Row */}
                  <div className="flex items-baseline justify-between pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-lg font-extrabold text-slate-900">$80.00</span>
                      <span className="text-[11px] text-slate-500 font-medium ml-1">MXN c/u</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Paquete de 6
                    </span>
                  </div>

                  {/* CTA button inside card */}
                  <div className="pt-2">
                    <div className="w-full bg-slate-100 group-hover:bg-slate-900 text-slate-700 group-hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1">
                      <span>Personalizar</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>

              </Link>
            </motion.div>
          ))}

          {/* Special Custom Card */}
          <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
            <Link 
              to="/custom" 
              className="group block bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white rounded-3xl p-4 border border-indigo-700/50 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 relative h-full flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-pink-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase text-pink-400 tracking-wider">Servicio Especial</span>
                <h3 className="text-xl font-extrabold text-white leading-tight">
                  Diseño 100% Personalizado a Medida
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ¿Tienes un diseño o logo especial? Crea tu combinación de color, personaje e tipografía desde cero.
                </p>
              </div>

              <div className="pt-6 space-y-3">
                <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
                  <span className="text-xl font-black text-white">$120.00 <span className="text-xs font-normal text-slate-300">MXN c/u</span></span>
                  <span className="text-[10px] bg-pink-500/20 border border-pink-500/40 text-pink-300 px-2 py-0.5 rounded-full font-bold">Custom</span>
                </div>
                <div className="w-full bg-white text-slate-900 font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
                  <span>Diseñar Ahora</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

        </motion.div>

      </div>

    </div>
  );
};
