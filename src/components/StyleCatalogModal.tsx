import React, { useState } from 'react';
import { ILLUSTRATOR_STYLES, IllustratorStyleItem } from '../data/illustratorStyles';
import { X, Check, Sparkles, Search } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStyles = ILLUSTRATOR_STYLES.filter(style => 
    style.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    style.codeNumber.toString().includes(searchTerm)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/75 backdrop-blur-md"
          />

          {/* Modal Container (Wider max-w-6xl for 5 columns layout) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.35 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden z-10 border border-slate-200"
          >
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black tracking-tight">Catálogo de Estilos Gráficos (46 Opciones)</h2>
                  <p className="text-xs text-indigo-200 hidden sm:block">Selecciona el número de estilo para aplicar al título en Illustrator</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar Bar */}
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Buscar por número o nombre (ej. 5 o Bestie)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500 shadow-sm"
                />
              </div>
              <span className="text-xs font-bold text-slate-500">
                Mostrando {filteredStyles.length} de {ILLUSTRATOR_STYLES.length} estilos
              </span>
            </div>

            {/* 4 to 5 Columns Responsive Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 bg-slate-100/50">
              {filteredStyles.map((style) => {
                const isSelected = selectedStyleId === style.id;
                return (
                  <div
                    key={style.id}
                    onClick={() => {
                      onSelectStyle(style);
                      onClose();
                    }}
                    className={`group relative bg-white rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl ${
                      isSelected
                        ? 'border-indigo-600 ring-4 ring-indigo-600/25 scale-[1.03] z-10'
                        : 'border-slate-200 hover:border-indigo-300 hover:scale-[1.02]'
                    }`}
                  >
                    
                    {/* Checkmark Badge if selected */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    {/* Style Image */}
                    <div className="h-28 sm:h-32 bg-slate-900 overflow-hidden relative flex items-center justify-center p-1">
                      <img
                        src={style.image}
                        alt={style.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Simple Label Below Image */}
                    <div className={`p-2.5 text-center border-t transition-colors ${
                      isSelected ? 'bg-indigo-50/80 border-indigo-200' : 'bg-white border-slate-100 group-hover:bg-slate-50'
                    }`}>
                      <p className={`text-xs font-extrabold truncate ${
                        isSelected ? 'text-indigo-700' : 'text-slate-800'
                      }`}>
                        {style.name}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex items-center justify-between flex-shrink-0">
              <span className="text-xs text-slate-500 font-medium">
                * Haz clic sobre cualquier casilla para seleccionarla.
              </span>
              <button
                onClick={onClose}
                className="bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md"
              >
                Cerrar Ventana
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
