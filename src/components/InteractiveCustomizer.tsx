import React, { useState } from 'react';
import { CustomizationState, CartItem } from '../types';
import { CHARACTER_OPTIONS, FONT_OPTIONS_STUDENT, GRAPHIC_STYLES } from '../data/catalog';
import { Palette, Image, ShoppingBag, Upload, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InteractiveCustomizerProps {
  onAddToCart: (item: CartItem) => void;
}

export const InteractiveCustomizer: React.FC<InteractiveCustomizerProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<CustomizationState>({
    subject: 'MATEMÁTICAS',
    studentName: 'Sofía Pérez',
    bgColor: '#FFB6C1',
    bgType: 'solid',
    bgImage: '',
    characterImg: CHARACTER_OPTIONS[0].svg,
    characterName: CHARACTER_OPTIONS[0].name,
    subjectFont: 'Bubblegum Sans',
    studentFont: 'Pacifico',
    subjectGraphicStyle: 'style-pop-pink',
    spineText: 'MATEMÁTICAS',
    isPackage: true
  });

  const [customCharUrl, setCustomCharUrl] = useState('');
  
  const unitPrice = state.isPackage ? 120 : 150;
  const quantity = state.isPackage ? 6 : 1;
  const totalPrice = unitPrice * quantity;

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setCustomCharUrl(result);
        setState(prev => ({
          ...prev,
          characterImg: result,
          characterName: 'Imagen Personalizada'
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCustomToCart = () => {
    const cartItem: CartItem = {
      cartId: 'CUST-' + Date.now(),
      isCustom: true,
      subject: state.subject,
      studentName: state.studentName,
      bgColor: state.bgColor,
      bgType: state.bgType,
      bgImage: state.bgImage,
      characterImg: state.characterImg,
      characterName: state.characterName,
      subjectFont: state.subjectFont,
      studentFont: state.studentFont,
      subjectGraphicStyle: state.subjectGraphicStyle,
      spineText: state.spineText || state.subject,
      quantity: quantity,
      isPackage: state.isPackage,
      unitPrice: unitPrice,
      totalPrice: totalPrice
    };

    onAddToCart(cartItem);
  };

  const COLOR_PRESETS = [
    { name: 'Rosa Pastel', hex: '#FFB6C1' },
    { name: 'Fucsia Neón', hex: '#FF2D55' },
    { name: 'Azul Cielo', hex: '#4D96FF' },
    { name: 'Verde Ciencias', hex: '#6BCB77' },
    { name: 'Amarillo Sol', hex: '#FFD93D' },
    { name: 'Lila Mágico', hex: '#B983FF' },
    { name: 'Azul Noche', hex: '#1E2430' },
    { name: 'Borgoña', hex: '#740001' },
    { name: 'Esmeralda', hex: '#1A472A' },
    { name: 'Blanco Limpio', hex: '#FFFFFF' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Back Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Catálogo
        </button>
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Estudio de Personalización 2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Interactive 3D Cover Visualizer */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[480px] sticky top-24">
            
            <div className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-4">
              Vista 360° en Tiempo Real (Frente, Lomo y Vuelta)
            </div>

            {/* Notebook Continuous 3D Wrapper */}
            <div 
              className="notebook-continuous-wrapper w-full max-w-lg transition-all duration-300 shadow-2xl"
              style={{
                backgroundColor: state.bgColor
              }}
            >
              {/* Back Cover */}
              <div className="cover-back">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Contraportada</span>
              </div>
              {/* Spine */}
              <div className="cover-spine">
                <span className="spine-text">{state.spineText || state.subject}</span>
              </div>
              {/* Front Cover */}
              <div className="cover-front">
                <div className="text-center w-full pt-2">
                  <span className={`${state.subjectGraphicStyle} text-2xl font-black block truncate px-1`}>
                    {state.subject || 'MATERIA'}
                  </span>
                </div>
                
                <div className="my-auto py-2">
                  <img
                    src={state.characterImg}
                    alt={state.characterName}
                    className="w-28 h-28 object-contain filter drop-shadow-xl transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="text-center w-full pb-2">
                  <span 
                    className="text-slate-900 text-lg font-bold block truncate px-1"
                    style={{ fontFamily: state.studentFont }}
                  >
                    {state.studentName || 'Nombre del Alumno'}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-6 text-center">
              * El color liso seleccionado ({state.bgColor}) cubrirá la totalidad de la libreta para cumplir el código escolar.
            </p>

          </div>
        </div>

        {/* Right: Customization Controls Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Diseño 100% a Medida</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 leading-tight">
                Personalizador de Forro Adhesivo
              </h1>
              <div className="text-2xl font-black text-slate-900 mt-2">
                ${totalPrice.toFixed(2)} <span className="text-sm font-normal text-slate-500">MXN</span>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-100">
              
              {/* Modalidad */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  1. Modalidad
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setState(prev => ({ ...prev, isPackage: true }))}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      state.isPackage ? 'border-indigo-600 bg-indigo-50 text-indigo-950' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Paquete de 6 ($120 c/u)
                  </button>
                  <button
                    type="button"
                    onClick={() => setState(prev => ({ ...prev, isPackage: false }))}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      !state.isPackage ? 'border-indigo-600 bg-indigo-50 text-indigo-950' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    1 Libreta ($150 c/u)
                  </button>
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-indigo-500" /> 2. Color de Fondo Reglamentario
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setState(prev => ({ ...prev, bgColor: color.hex }))}
                      className={`h-9 rounded-xl border border-slate-300 transition-transform ${
                        state.bgColor === color.hex ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Character Upload */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Image className="w-4 h-4 text-indigo-500" /> 3. Imagen o Logo Central (PNG)
                </label>
                <label className="flex items-center justify-center gap-2 p-3.5 border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/50 cursor-pointer rounded-2xl text-xs font-bold text-slate-700 transition-colors">
                  <Upload className="w-4 h-4 text-indigo-500" />
                  <span>{state.characterName || 'Subir Imagen PNG Transparente'}</span>
                  <input type="file" accept="image/*" onChange={handleCustomImageUpload} className="hidden" />
                </label>
              </div>

              {/* Text Controls */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Materia</label>
                  <input 
                    type="text" 
                    value={state.subject}
                    onChange={(e) => setState(prev => ({ ...prev, subject: e.target.value, spineText: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estilo de Materia</label>
                  <select
                    value={state.subjectGraphicStyle}
                    onChange={(e) => setState(prev => ({ ...prev, subjectGraphicStyle: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 outline-none"
                  >
                    {GRAPHIC_STYLES.map((style) => (
                      <option key={style.id} value={style.id}>{style.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Alumno</label>
                  <input 
                    type="text" 
                    value={state.studentName}
                    onChange={(e) => setState(prev => ({ ...prev, studentName: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tipografía Alumno</label>
                  <select
                    value={state.studentFont}
                    onChange={(e) => setState(prev => ({ ...prev, studentFont: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 outline-none"
                  >
                    {FONT_OPTIONS_STUDENT.map((font) => (
                      <option key={font.value} value={font.value}>{font.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-3">
                <button 
                  onClick={handleAddCustomToCart}
                  className="w-full bg-indigo-600 hover:bg-slate-900 text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Añadir Pedido Custom (${totalPrice} MXN)</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
