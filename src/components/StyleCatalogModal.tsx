import React, { useState } from 'react';
import { ILLUSTRATOR_STYLES, IllustratorStyleItem } from '../data/illustratorStyles';
import { X, Check, Sparkles, Search, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 16; // 4 columns x 4 rows = 16 styles per page

  const filteredStyles = ILLUSTRATOR_STYLES.filter(style => 
    style.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    style.codeNumber.toString().includes(searchTerm)
  );

  const totalPages = Math.max(1, Math.ceil(filteredStyles.length / ITEMS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);

  const currentStylesSlice = filteredStyles.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePrevPage = () => {
    if (activePage > 1) setCurrentPage(activePage - 1);
  };

  const handleNextPage = () => {
    if (activePage < totalPages) setCurrentPage(activePage + 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden z-10 border border-slate-200"
          >
            
            {/* Modal Fixed Header */}
            <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black tracking-tight">Catálogo de Estilos Gráficos (4x4 por Pagina)</h2>
                  <p className="text-xs text-indigo-200 hidden sm:block">Selecciona la muestra de estilo deseada para tu materia</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search & Navigation Bar */}
            <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 flex-shrink-0">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Buscar estilo o número (ej. 5 o Bestie)..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500 shadow-sm"
                />
              </div>

              {/* Page indicator pill */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                  Página {activePage} de {totalPages}
                </span>
                <span className="text-xs font-bold text-slate-400 hidden md:inline">
                  ({filteredStyles.length} estilos totales)
                </span>
              </div>
            </div>

            {/* Main Content Area with Side Navigation Triangles */}
            <div className="relative flex-1 bg-slate-100/60 p-3 sm:p-5 flex items-center justify-between gap-2 overflow-hidden">
              
              {/* Left Triangle Button (Previous Page) */}
              <button
                onClick={handlePrevPage}
                disabled={activePage <= 1}
                className={`z-20 w-11 h-16 sm:w-12 sm:h-24 rounded-2xl flex items-center justify-center transition-all shadow-xl flex-shrink-0 ${
                  activePage <= 1
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-40'
                    : 'bg-slate-900 hover:bg-indigo-600 text-white hover:scale-105 active:scale-95'
                }`}
                title="Página Anterior"
              >
                <ChevronLeft className="w-8 h-8 stroke-[3]" />
              </button>

              {/* 4x4 Grid Container (16 styles) */}
              <div className="flex-1 h-full grid grid-cols-2 sm:grid-cols-4 grid-rows-4 gap-2.5 sm:gap-3.5 overflow-hidden">
                {currentStylesSlice.map((style) => {
                  const isSelected = selectedStyleId === style.id;
                  return (
                    <div
                      key={style.id}
                      onClick={() => {
                        onSelectStyle(style);
                        onClose();
                      }}
                      className={`group relative bg-white rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-xl ${
                        isSelected
                          ? 'border-indigo-600 ring-4 ring-indigo-600/30 scale-[1.02] z-10'
                          : 'border-slate-200 hover:border-indigo-400 hover:scale-[1.01]'
                      }`}
                    >
                      {/* Number Badge */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className="text-[9px] font-extrabold text-white bg-slate-900/85 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-md border border-white/20">
                          #{style.codeNumber}
                        </span>
                      </div>

                      {/* Selection Checkmark */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Style Image */}
                      <div className="flex-1 bg-slate-950 relative flex items-center justify-center p-1.5 overflow-hidden min-h-0">
                        <img
                          src={style.image}
                          alt={style.name}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Simple Label Below Image */}
                      <div className={`py-1.5 px-2 text-center border-t flex-shrink-0 transition-colors ${
                        isSelected ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100 group-hover:bg-slate-50'
                      }`}>
                        <p className={`text-[11px] font-extrabold truncate ${
                          isSelected ? 'text-indigo-700' : 'text-slate-800'
                        }`}>
                          {style.name}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Right Triangle Button (Next Page) */}
              <button
                onClick={handleNextPage}
                disabled={activePage >= totalPages}
                className={`z-20 w-11 h-16 sm:w-12 sm:h-24 rounded-2xl flex items-center justify-center transition-all shadow-xl flex-shrink-0 ${
                  activePage >= totalPages
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-40'
                    : 'bg-slate-900 hover:bg-indigo-600 text-white hover:scale-105 active:scale-95'
                }`}
                title="Página Siguiente"
              >
                <ChevronRight className="w-8 h-8 stroke-[3]" />
              </button>

            </div>

            {/* Modal Footer with Page Navigation Controls */}
            <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-between flex-shrink-0">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={activePage <= 1}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all ${
                    activePage <= 1
                      ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                      : 'bg-slate-900 hover:bg-indigo-600 text-white'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </button>

                {/* Page Number Pills */}
                <div className="hidden sm:flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 rounded-lg text-xs font-extrabold transition-all ${
                          activePage === pageNum
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={activePage >= totalPages}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all ${
                    activePage >= totalPages
                      ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                      : 'bg-slate-900 hover:bg-indigo-600 text-white'
                  }`}
                >
                  Siguiente <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={onClose}
                className="bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-xs px-5 py-2 rounded-xl transition-all shadow-md"
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
