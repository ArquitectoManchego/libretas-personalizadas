import React, { useState } from 'react';
import { DesignItem, CartItem } from '../types';
import { X, ShoppingBag, Check, Layers, Sparkles } from 'lucide-react';

interface CoverPreviewModalProps {
  design: DesignItem | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CoverPreviewModal: React.FC<CoverPreviewModalProps> = ({ design, onClose, onAddToCart }) => {
  if (!design) return null;

  const [subject, setSubject] = useState(design.defaultSubject);
  const [studentName, setStudentName] = useState(design.defaultStudentName);
  const [isPackage, setIsPackage] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  const unitPrice = isPackage ? 80 : 100;
  const quantity = isPackage ? 6 : 1;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartId: 'MODAL-' + design.id + '-' + Date.now(),
      designId: design.id,
      isCustom: false,
      subject: subject,
      studentName: studentName,
      bgColor: design.bgColor,
      bgType: design.bgType,
      characterImg: design.characterImg,
      characterName: design.characterName,
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
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <h3 className="font-extrabold text-gray-900 text-lg">{design.title}</h3>
            <span className="bg-pink-100 text-pink-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Diseño Continuo Completo
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Continuous Cover Simulator Canvas */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-1">
              <span>CONTRA PORTADA (REVERSO)</span>
              <span>LOMO (SIN ESPIRAL)</span>
              <span>PORTADA (FRENTE)</span>
            </div>

            <div 
              className="notebook-continuous-wrapper transition-colors duration-300"
              style={{ backgroundColor: design.bgColor }}
            >
              {/* Back Cover */}
              <div className="cover-back">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest block">FORRO ADHESIVO</span>
                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest block">LIBRETASUNICAS.MX</span>
                </div>
              </div>

              {/* Spine */}
              <div className="cover-spine">
                <span className="spine-text">
                  {subject || 'MATERIA'}
                </span>
              </div>

              {/* Front Cover */}
              <div className="cover-front">
                {/* Subject Title Top */}
                <div className="text-center w-full pt-1">
                  <span className={`${design.subjectGraphicStyle} text-2xl sm:text-3xl font-extrabold block truncate max-w-full px-1`}>
                    {subject || 'MATERIA'}
                  </span>
                </div>

                {/* Center Image */}
                <div className="my-auto">
                  <img
                    src={design.characterImg}
                    alt={design.title}
                    className="w-28 sm:w-36 h-28 sm:h-36 object-contain filter drop-shadow-xl"
                  />
                </div>

                {/* Student Name Bottom */}
                <div className="text-center w-full pb-1">
                  <span 
                    className="text-gray-900 text-base sm:text-lg font-bold block truncate px-1"
                    style={{ fontFamily: design.studentFont }}
                  >
                    {studentName || 'Nombre del Alumno'}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Inline Edit Inputs for instant custom text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                Nombre de la Materia:
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 font-semibold text-sm"
                placeholder="Ej. Español, Matemáticas"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1">
                Nombre del Alumno:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 font-semibold text-sm"
                placeholder="Ej. Sofía Pérez"
              />
            </div>
          </div>

          {/* Pricing Options Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-extrabold text-gray-700 uppercase">
              Selecciona modalidad de compra:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setIsPackage(true)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  isPackage
                    ? 'border-pink-500 bg-pink-50/80 shadow-md'
                    : 'border-gray-200 bg-white hover:border-pink-200'
                }`}
              >
                <div>
                  <div className="font-black text-gray-900 text-sm">Paquete de 6 impresiones</div>
                  <div className="text-xs text-pink-600 font-bold">$80 c/u → Total $480 MXN</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isPackage ? 'border-pink-500 bg-pink-500 text-white' : 'border-gray-300'}`}>
                  {isPackage && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>

              <div
                onClick={() => setIsPackage(false)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  !isPackage
                    ? 'border-pink-500 bg-pink-50/80 shadow-md'
                    : 'border-gray-200 bg-white hover:border-pink-200'
                }`}
              >
                <div>
                  <div className="font-black text-gray-900 text-sm">Libreta Individual (1 pza)</div>
                  <div className="text-xs text-gray-600 font-bold">$100 MXN</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isPackage ? 'border-pink-500 bg-pink-500 text-white' : 'border-gray-300'}`}>
                  {!isPackage && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Modal Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Total a pagar:</span>
            <span className="text-2xl font-black text-pink-600">${totalPrice} MXN</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAdd}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-extrabold text-sm shadow-lg shadow-pink-500/25 flex items-center gap-2 transition-all"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" /> ¡Agregado al Carrito!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Agregar al Pedido
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
