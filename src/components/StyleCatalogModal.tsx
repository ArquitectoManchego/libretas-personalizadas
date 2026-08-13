import React, { useState } from 'react';
import { ILLUSTRATOR_STYLES, IllustratorStyleItem } from '../data/illustratorStyles';
import { X, Check, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StyleCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStyleId: string;
  onSelectStyle: (style: IllustratorStyleItem) => void;
}

export const StyleCatalogModal: React.FC<StyleCatalogModalProps> = ({
  isOpen,
  onClose,
  selectedStyleId,
  onSelectStyle
}) => {
  const [filter, setFilter] = useState<'all' | '3d' | 'script' | 'comic' | 'neon'>('all');

  const filteredStyles = ILLUSTRATOR_STYLES.filter(style => {
    if (filter === 'all') return true;
    return style.category === filter;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden z-10 border border-slate-200"
          >
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-tight">Catálogo de Estilos de Texto Illustrator</h2>
                  <p className="text-xs text-indigo-200">Selecciona el tipo de letra y acabado 3D deseado para la materia</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Filter className="w-3.5 h-3.5" /> Categoría:
              </div>
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                {[
                  { id: 'all', label: 'Todos (12)' },
                  { id: '3d', label: 'Efectos 3D' },
                  { id: 'script', label: 'Cursivas / Script' },
                  { id: 'comic', label: 'Comic / Fuego' },
                  { id: 'neon', label: 'Neón / Glow' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      filter === tab.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 12 Style Selectable Cards Grid */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 bg-slate-100/50">
              {filteredStyles.map((style) => {
                const isSelected = selectedStyleId === style.id;
                return (
                  <div
                    key={style.id}
                    onClick={() => onSelectStyle(style)}
                    className={`group relative bg-white rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl ${
                      isSelected
                        ? 'border-indigo-600 ring-4 ring-indigo-600/20 scale-[1.02]'
                        : 'border-slate-200 hover:border-indigo-300 hover:scale-[1.01]'
                    }`}
                  >
                    
                    {/* Badge Number */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`text-[10px] font-extrabold text-white px-2 py-0.5 rounded-full shadow-md ${style.badgeColor}`}>
                        Estilo #{style.codeNumber}
                      </span>
                    </div>

                    {/* Checkmark when selected */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}

                    {/* Image Thumbnail */}
                    <div className="h-32 bg-slate-900 overflow-hidden relative flex items-center justify-center p-2">
                      <img
                        src={style.image}
                        alt={style.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4 space-y-1 bg-white">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                        {style.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        {style.description}
                      </p>
                    </div>

                    {/* Select Action Footer */}
                    <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      <span className={`text-xs font-extrabold ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}>
                        {isSelected ? 'Seleccionado ✅' : 'Elegir este estilo'}
                      </span>
                      <button
                        className={`text-xs font-extrabold px-3 py-1 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-slate-300 text-slate-700 group-hover:bg-indigo-50 group-hover:border-indigo-300'
                        }`}
                      >
                        {isSelected ? 'Aplicado' : 'Seleccionar'}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                * Tu pedido incluirá la ficha exacta de este estilo para su producción en Illustrator.
              </span>
              <button
                onClick={onClose}
                className="bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
              >
                Confirmar Selección
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
