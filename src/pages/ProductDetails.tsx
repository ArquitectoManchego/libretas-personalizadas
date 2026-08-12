import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATALOG_DESIGNS } from '../data/catalog';
import { CartItem } from '../types';
import { ShieldCheck, Check, ArrowLeft, ShoppingBag, Sparkles, Layers, Type } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductDetailsProps {
  onAddToCart: (item: CartItem) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const design = CATALOG_DESIGNS.find((item) => item.id === id);

  const [subject, setSubject] = useState(design?.defaultSubject || 'MATEMÁTICAS');
  const [studentName, setStudentName] = useState(design?.defaultStudentName || 'Sofía Pérez');
  const [isPackage, setIsPackage] = useState(true);
  const [showLiveOverlay, setShowLiveOverlay] = useState(true);

  if (!design) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-slate-500">
        <p className="text-lg font-semibold mb-4">Diseño no encontrado en el catálogo.</p>
        <button onClick={() => navigate('/')} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold">
          Volver al catálogo
        </button>
      </div>
    );
  }

  const unitPrice = isPackage ? 80 : 100;
  const quantity = isPackage ? 6 : 1;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      cartId: 'PROD-' + design.id + '-' + Date.now(),
      designId: design.id,
      isCustom: false,
      subject: subject,
      studentName: studentName,
      bgColor: design.bgColor,
      bgType: design.bgType,
      characterImg: design.characterImg,
      characterName: design.characterName,
      image: design.image,
      subjectFont: design.subjectFont,
      studentFont: design.studentFont,
      subjectGraphicStyle: design.subjectGraphicStyle,
      spineText: subject,
      quantity: quantity,
      isPackage: isPackage,
      unitPrice: unitPrice,
      totalPrice: totalPrice
    };

    onAddToCart(cartItem);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Catálogo
        </button>
        <div className="text-xs text-slate-400 font-medium hidden sm:block">
          Catálogo / <span className="capitalize">{design.category.replace('_', ' ')}</span> / <span className="text-slate-800 font-bold">{design.title}</span>
        </div>
      </div>

      {/* Main Grid: Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Interactive Product Image Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative bg-white rounded-3xl p-4 border border-slate-200 shadow-xl overflow-hidden group">
            
            {/* Live Visualizer Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
              {design.image ? (
                <img 
                  src={design.image} 
                  alt={design.title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: design.bgColor }}>
                  <span className={`${design.subjectGraphicStyle} text-3xl font-bold`}>{subject}</span>
                </div>
              )}

              {/* Dynamic Live Text Overlay Simulation */}
              {showLiveOverlay && (
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 bg-black/10 transition-opacity">
                  {/* Top Live Subject Overlay */}
                  <div className="w-full text-center bg-white/70 backdrop-blur-md rounded-xl py-2 px-3 shadow-md border border-white/40">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Vista Previa Materia:</span>
                    <span className={`${design.subjectGraphicStyle} text-xl sm:text-2xl font-black block truncate`}>
                      {subject || 'MATERIA'}
                    </span>
                  </div>

                  {/* Bottom Live Student Name Overlay */}
                  <div className="w-full text-center bg-white/70 backdrop-blur-md rounded-xl py-2 px-3 shadow-md border border-white/40">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Alumno:</span>
                    <span 
                      className="text-slate-900 text-lg sm:text-xl font-bold block truncate"
                      style={{ fontFamily: design.studentFont }}
                    >
                      {studentName || 'Nombre del Alumno'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Toggle Overlay View Button */}
            <button 
              onClick={() => setShowLiveOverlay(!showLiveOverlay)}
              className="mt-3 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors inline-flex items-center gap-1.5"
            >
              <Type className="w-3.5 h-3.5 text-indigo-500" />
              <span>{showLiveOverlay ? 'Ocultar superposición de texto' : 'Ver con texto personalizado'}</span>
            </button>

          </div>

          {/* Product Specifications Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Especificaciones Técnicas del Forro</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {design.description}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <strong>Material:</strong> Vinil Adhesivo Plastificado MATE/BRILLO
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <strong>Cobertura:</strong> Lomo Continuo (Frente, lomo y vuelta)
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <strong>Resistencia:</strong> 100% Resistente al Agua y Rayaduras
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <strong>Reglamentación:</strong> Fondo Liso Oficial ({design.bgColor})
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            
            {/* Header Title & Ratings */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Edición Escolar 2025-2026</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 leading-tight">
                Forro Adhesivo - {design.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400 text-sm">★★★★★</div>
                <span className="text-xs font-bold text-slate-500">(128 valoraciones de padres de familia)</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Precio Final</span>
                <span className="text-3xl font-black text-slate-900">${totalPrice.toFixed(2)} <span className="text-sm font-normal text-slate-500">MXN</span></span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
                ${unitPrice}.00 MXN / pza
              </span>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
              
              {/* Pack Selector */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  1. Modalidad de Compra
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPackage(true)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isPackage 
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20 font-bold text-indigo-950' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <span className="text-xs font-bold block">Paquete de 6</span>
                    <span className="text-xs text-slate-500 font-normal">$80 MXN c/u ($480 Total)</span>
                    <span className="text-[10px] text-emerald-600 font-extrabold block mt-1">¡Ahorras 20%!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPackage(false)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      !isPackage 
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20 font-bold text-indigo-950' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <span className="text-xs font-bold block">Individual (1 pza)</span>
                    <span className="text-xs text-slate-500 font-normal">$100 MXN c/u</span>
                  </button>
                </div>
              </div>

              {/* Subject Input */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">
                  2. Nombre de la Materia *
                </label>
                <input 
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl p-3.5 text-sm font-semibold text-slate-900 outline-none transition-all"
                  placeholder="Ej. MATEMÁTICAS I"
                />
              </div>

              {/* Student Name Input */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">
                  3. Nombre Completo del Alumno *
                </label>
                <input 
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl p-3.5 text-sm font-semibold text-slate-900 outline-none transition-all"
                  placeholder="Ej. Sofía Pérez Martínez"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Aparecerá en la tipografía cursiva especial en la parte inferior.</span>
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-extrabold py-4 px-6 rounded-2xl shadow-xl shadow-slate-900/20 hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2 group text-base"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Añadir al Carrito (${totalPrice} MXN)</span>
              </button>
            </div>

            {/* Trust Bullet List */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Impresión directa lista para despegar y pegar.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Garantía de coincidencia con el color de la libreta.</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
