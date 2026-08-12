import React, { useState } from 'react';
import { CustomizationState, CartItem } from '../types';
import { CHARACTER_OPTIONS, FONT_OPTIONS_SUBJECT, FONT_OPTIONS_STUDENT, GRAPHIC_STYLES } from '../data/catalog';
import { Palette, Sparkles, Image, Type, ShoppingBag, Check, Info, ShieldCheck, Upload } from 'lucide-react';

interface InteractiveCustomizerProps {
  onAddToCart: (item: CartItem) => void;
}

export const InteractiveCustomizer: React.FC<InteractiveCustomizerProps> = ({ onAddToCart }) => {
  const [state, setState] = useState<CustomizationState>({
    subject: 'MATEMÁTICAS',
    studentName: 'Sofía Martínez',
    bgColor: '#FF85A2',
    bgType: 'solid',
    bgImage: '',
    characterImg: CHARACTER_OPTIONS[0].svg,
    characterName: CHARACTER_OPTIONS[0].name,
    subjectFont: 'Bubblegum Sans',
    studentFont: 'Pacifico',
    subjectGraphicStyle: 'style-pop-pink',
    spineText: 'MATEMÁTICAS',
    isPackage: true // default pack of 6 ($120 c/u)
  });

  const [customCharUrl, setCustomCharUrl] = useState('');
  const [isAdded, setIsAdded] = useState(false);

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
          characterName: 'Imagen Personalizada Subida'
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
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Preset school background colors
  const COLOR_PRESETS = [
    { name: 'Rosa Pastel', hex: '#FFB6C1' },
    { name: 'Fucsia / Rojo Español', hex: '#FF2D55' },
    { name: 'Azul Matemáticas', hex: '#4D96FF' },
    { name: 'Verde Ciencias', hex: '#6BCB77' },
    { name: 'Amarillo Historia', hex: '#FFD93D' },
    { name: 'Lila Geografía', hex: '#B983FF' },
    { name: 'Azul Noche Harry Potter', hex: '#1E2430' },
    { name: 'Gryffindor Borgoña', hex: '#740001' },
    { name: 'Slytherin Esmeralda', hex: '#1A472A' },
    { name: 'Blanco Limpio', hex: '#FFFFFF' }
  ];

  return (
    <section id="personalizar" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 font-extrabold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
          <Palette className="w-4 h-4" /> Personalizador en Vivo
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-gray-900">
          Crea tu <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Forro Personalizado</span>
        </h2>
        <p className="text-gray-600 text-base leading-relaxed">
          Instrucciones claras: puedes modificar el <strong>color de fondo</strong>, el <strong>personaje/logo central (PNG)</strong>, el <strong>estilo y texto de la materia</strong> y la <strong>tipografía del nombre</strong>.
        </p>
      </div>

      {/* Main Grid: Left Controls, Right Real-time Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Controls (Customization Options) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Color / Tipo de Fondo */}
          <div className="glass-card bg-white p-6 rounded-3xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 font-black text-gray-900 text-base">
                <span className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">1</span>
                <span>Fondo de la Libreta (Cumple Regla Escolar)</span>
              </div>
              <span className="text-xs text-purple-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Fondo Liso Escolar
              </span>
            </div>

            {/* Background Type Toggle */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setState(prev => ({ ...prev, bgType: 'solid' }))}
                className={`p-3 rounded-2xl font-bold text-xs border flex items-center justify-center gap-2 transition-all ${
                  state.bgType === 'solid'
                    ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Palette className="w-4 h-4 text-purple-600" /> Color Sólido / Liso
              </button>

              <button
                onClick={() => setState(prev => ({ ...prev, bgType: 'full_image' }))}
                className={`p-3 rounded-2xl font-bold text-xs border flex items-center justify-center gap-2 transition-all ${
                  state.bgType === 'full_image'
                    ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Image className="w-4 h-4 text-purple-600" /> Imagen Completa de Fondo
              </button>
            </div>

            {state.bgType === 'solid' ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-600">
                  Selecciona el color según la materia de tu escuela:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setState(prev => ({ ...prev, bgColor: color.hex }))}
                      className={`w-9 h-9 rounded-full border-2 transition-transform ${
                        state.bgColor === color.hex ? 'scale-125 border-purple-600 shadow-md' : 'border-white hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                  {/* Custom color input */}
                  <div className="relative">
                    <input
                      type="color"
                      value={state.bgColor}
                      onChange={(e) => setState(prev => ({ ...prev, bgColor: e.target.value }))}
                      className="w-9 h-9 rounded-full border-2 border-gray-300 cursor-pointer overflow-hidden opacity-0 absolute inset-0"
                    />
                    <div className="w-9 h-9 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center text-xs font-bold text-gray-500">
                      +
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-600">
                  Fondo de Imagen Completa (Cubre portada y contraportada):
                </label>
                <input
                  type="text"
                  placeholder="Pega URL de imagen de fondo o usa textura"
                  value={state.bgImage}
                  onChange={(e) => setState(prev => ({ ...prev, bgImage: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>
            )}
          </div>

          {/* Step 2: Personaje PNG / Logo al Centro */}
          <div className="glass-card bg-white p-6 rounded-3xl border border-gray-200 space-y-4">
            <div className="flex items-center gap-2 font-black text-gray-900 text-base border-b border-gray-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">2</span>
              <span>Personaje PNG o Logo Central (Sin Fondo Blanco)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CHARACTER_OPTIONS.map((char) => (
                <div
                  key={char.id}
                  onClick={() => setState(prev => ({ ...prev, characterImg: char.svg, characterName: char.name }))}
                  className={`p-3 rounded-2xl border-2 cursor-pointer text-center transition-all flex flex-col items-center gap-2 ${
                    state.characterImg === char.svg
                      ? 'border-purple-600 bg-purple-50/80 shadow-sm'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <img src={char.svg} alt={char.name} className="w-14 h-14 object-contain" />
                  <span className="text-[11px] font-bold text-gray-800 line-clamp-1">{char.name}</span>
                </div>
              ))}
            </div>

            {/* Custom PNG upload */}
            <div className="pt-2">
              <label className="flex items-center justify-center gap-2 p-3 rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50/50 hover:bg-purple-100/50 cursor-pointer text-xs font-bold text-purple-700 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Subir mi propia imagen / personaje en formato PNG</span>
                <input type="file" accept="image/*" onChange={handleCustomImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Step 3: Nombre de Materia & Estilo Gráfico */}
          <div className="glass-card bg-white p-6 rounded-3xl border border-gray-200 space-y-4">
            <div className="flex items-center gap-2 font-black text-gray-900 text-base border-b border-gray-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">3</span>
              <span>Materia (Título Superior) y Estilo de Ilustrador</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nombre de la Materia:</label>
                <input
                  type="text"
                  value={state.subject}
                  onChange={(e) => setState(prev => ({ ...prev, subject: e.target.value, spineText: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-bold text-sm"
                  placeholder="Ej. MATEMÁTICAS, ESPAÑOL"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Estilo Gráfico (Graphic Style):</label>
                <select
                  value={state.subjectGraphicStyle}
                  onChange={(e) => setState(prev => ({ ...prev, subjectGraphicStyle: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-bold text-sm bg-white"
                >
                  {GRAPHIC_STYLES.map((style) => (
                    <option key={style.id} value={style.id}>{style.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 4: Nombre del Alumno & Tipografía */}
          <div className="glass-card bg-white p-6 rounded-3xl border border-gray-200 space-y-4">
            <div className="flex items-center gap-2 font-black text-gray-900 text-base border-b border-gray-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">4</span>
              <span>Nombre del Alumno (Inferior) y Tipografía Especial</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nombre Completo:</label>
                <input
                  type="text"
                  value={state.studentName}
                  onChange={(e) => setState(prev => ({ ...prev, studentName: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-semibold text-sm"
                  placeholder="Ej. Sofía Martínez"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tipo de Letra del Nombre:</label>
                <select
                  value={state.studentFont}
                  onChange={(e) => setState(prev => ({ ...prev, studentFont: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-semibold text-sm bg-white"
                >
                  {FONT_OPTIONS_STUDENT.map((font) => (
                    <option key={font.value} value={font.value}>{font.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Live Interactive Cover Preview Stickied */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          
          <div className="glass-card bg-white p-6 rounded-3xl border-2 border-purple-300 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-black text-xs text-purple-700 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Simulación de Impresión Real
              </span>
              <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                Vista 360°
              </span>
            </div>

            {/* Continuous Live Canvas Render */}
            <div 
              className="notebook-continuous-wrapper transition-all duration-300"
              style={{
                backgroundColor: state.bgType === 'solid' ? state.bgColor : '#ffffff',
                backgroundImage: state.bgType === 'full_image' && state.bgImage ? `url(${state.bgImage})` : 'none',
                backgroundSize: 'cover'
              }}
            >
              {/* Back Cover */}
              <div className="cover-back">
                <span className="text-[10px] font-extrabold text-black/40 uppercase">Contraportada</span>
              </div>

              {/* Spine */}
              <div className="cover-spine">
                <span className="spine-text">
                  {state.spineText || state.subject}
                </span>
              </div>

              {/* Front Cover */}
              <div className="cover-front">
                {/* Subject Header */}
                <div className="text-center w-full pt-1">
                  <span className={`${state.subjectGraphicStyle} text-2xl font-extrabold block truncate max-w-full px-1`}>
                    {state.subject || 'MATERIA'}
                  </span>
                </div>

                {/* Center Image */}
                <div className="my-auto">
                  <img
                    src={state.characterImg}
                    alt={state.characterName}
                    className="w-28 h-28 object-contain filter drop-shadow-xl transition-transform duration-300"
                  />
                </div>

                {/* Student Name */}
                <div className="text-center w-full pb-1">
                  <span 
                    className="text-gray-900 text-sm font-bold block truncate px-1"
                    style={{ fontFamily: state.studentFont }}
                  >
                    {state.studentName || 'Nombre del Alumno'}
                  </span>
                </div>
              </div>

            </div>

            {/* Price Package Choice for Custom Design */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                <span>Modalidad de Compra Personalizada:</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setState(prev => ({ ...prev, isPackage: true }))}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    state.isPackage
                      ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm font-black'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <div className="text-xs font-bold">Paquete 6 Libretas</div>
                  <div className="text-sm font-black text-purple-700">$120 MXN <span className="text-[10px] font-semibold text-gray-500">c/u ($720)</span></div>
                </button>

                <button
                  onClick={() => setState(prev => ({ ...prev, isPackage: false }))}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    !state.isPackage
                      ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm font-black'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  <div className="text-xs font-bold">1 Libreta Indiv.</div>
                  <div className="text-sm font-black text-purple-700">$150 MXN</div>
                </button>
              </div>
            </div>

            {/* Add Custom to Cart Button */}
            <button
              onClick={handleAddCustomToCart}
              className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:to-pink-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" /> ¡Diseño Personalizado Añadido!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> Añadir Pedido Personalizado (${totalPrice} MXN)
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};
