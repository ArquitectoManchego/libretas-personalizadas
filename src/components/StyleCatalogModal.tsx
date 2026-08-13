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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
          />

          {/* Modal Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.35 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[88vh] flex flex-col overflow-hidden z-10 border border-slate-200"
          >
            
            {/* Modal Fixed Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black tracking-tight">Catálogo de Estilos Gráficos (46 Opciones)</h2>
                  <p className="text-xs text-indigo-200">Selecciona la muestra de estilo para aplicar a la impresión de tu libreta</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Buscar por número o estilo (ej. 5 o Bestie)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500 shadow-sm"
                />
              </div>
              <span className="text-xs font-bold text-slate-500">
                Mostrando {filteredStyles.length} de {ILLUSTRATOR_STYLES.length} estilos
              </span>
            </div>

            {/* Scrollable Grid of Large Prominent Style Images (3 to 4 columns) */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 bg-slate-100/60">
              {filteredStyles.map((style) => {
                const isSelected = selectedStyleId === style.id;
                return (
                  <div
                    key={style.id}
                    onClick={() => {
                      onSelectStyle(style);
                      onClose();
                    }}
                    className={`group relative bg-white rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-2xl ${
                      isSelected
                        ? 'border-indigo-600 ring-4 ring-indigo-600/30 scale-[1.02] z-10'
                        : 'border-slate-200/90 hover:border-indigo-400 hover:scale-[1.01]'
                    }`}
                  >
                    
                    {/* Badge Number */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] font-extrabold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full shadow-md border border-white/20">
                        #{style.codeNumber}
                      </span>
                    </div>

                    {/* Selection Checkmark */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}

                    {/* PROMINENT FULL IMAGE DISPLAY AREA */}
                    <div className="w-full h-40 sm:h-44 md:h-48 bg-slate-950 relative flex items-center justify-center p-2 overflow-hidden">
                      <img
                        src={style.image}
                        alt={style.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Simple Clean Label Below Image */}
                    <div className={`p-3 text-center border-t transition-colors ${
                      isSelected ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100 group-hover:bg-slate-50'
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

            {/* Modal Fixed Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between flex-shrink-0">
              <span className="text-xs text-slate-500 font-semibold">
                * Haz clic en la tarjeta para seleccionar la muestra de tu preferencia.
              </span>
              <button
                onClick={onClose}
                className="bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
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
