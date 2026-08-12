import React, { useState } from 'react';
import { CustomizationState, CartItem } from '../types';
import { CHARACTER_OPTIONS, FONT_OPTIONS_SUBJECT, FONT_OPTIONS_STUDENT, GRAPHIC_STYLES } from '../data/catalog';
import { Palette, Sparkles, Image, Type, ShoppingBag, Check, ShieldCheck, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InteractiveCustomizerProps {
  onAddToCart: (item: CartItem) => void;
}

export const InteractiveCustomizer: React.FC<InteractiveCustomizerProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<CustomizationState>({
    subject: 'MATEMÁTICAS',
    studentName: 'Nombre del Alumno',
    bgColor: '#F8F9FA',
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
  };

  const COLOR_PRESETS = [
    { name: 'Rosa Pastel', hex: '#FFB6C1' },
    { name: 'Fucsia', hex: '#FF2D55' },
    { name: 'Azul Claro', hex: '#4D96FF' },
    { name: 'Verde Ciencias', hex: '#6BCB77' },
    { name: 'Amarillo', hex: '#FFD93D' },
    { name: 'Lila', hex: '#B983FF' },
    { name: 'Azul Noche', hex: '#1E2430' },
    { name: 'Borgoña', hex: '#740001' },
    { name: 'Esmeralda', hex: '#1A472A' },
    { name: 'Blanco Limpio', hex: '#FFFFFF' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-[#595959] mb-6 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:underline">Inicio</button> 
        <span>/</span>
        <span className="font-semibold">Diseño 100% Personalizado</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Column: Interactive 360 Preview (Etsy Style: Large Main Image) */}
        <div className="w-full lg:w-3/5">
          <div className="bg-[#f1f1f1] rounded-xl overflow-hidden shadow-sm border border-[#E1E3DF] p-8 flex items-center justify-center min-h-[500px]">
             
             {/* The Notebook Wrapper directly matching CSS */}
             <div 
              className="notebook-continuous-wrapper w-full max-w-2xl transition-all duration-300 shadow-xl"
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
                <span className="spine-text">{state.spineText || state.subject}</span>
              </div>
              {/* Front Cover */}
              <div className="cover-front">
                <div className="text-center w-full pt-1">
                  <span className={`${state.subjectGraphicStyle} text-3xl font-extrabold block truncate px-1`}>
                    {state.subject || 'MATERIA'}
                  </span>
                </div>
                <div className="my-auto">
                  <img
                    src={state.characterImg}
                    alt={state.characterName}
                    className="w-32 h-32 object-contain filter drop-shadow-xl transition-transform duration-300"
                  />
                </div>
                <div className="text-center w-full pb-1">
                  <span 
                    className="text-gray-900 text-xl font-bold block truncate px-1"
                    style={{ fontFamily: state.studentFont }}
                  >
                    {state.studentName || 'Nombre del Alumno'}
                  </span>
                </div>
              </div>
            </div>

          </div>
          
          <div className="mt-8 space-y-4 text-sm text-[#222222]">
            <h3 className="font-bold text-xl mb-4 border-b pb-2">Descripción del artículo</h3>
            <p className="leading-relaxed">Crea tu propio diseño desde cero. Ideal para materias específicas que requieren colores exactos o personajes que no están en el catálogo. Todo el proceso es monitoreado para asegurar que tu diseño cumpla con los lineamientos escolares.</p>
          </div>
        </div>

        {/* Right Column: Customization Controls (Etsy Style right panel) */}
        <div className="w-full lg:w-2/5 space-y-6">
          
          <div>
            <div className="text-sm text-[#F1651D] font-bold mb-1">LibretasUnicasMX</div>
            <h1 className="text-2xl font-light text-[#222222] leading-tight mb-2">
              Diseño de Libreta 100% Personalizado a Medida
            </h1>
            
            <div className="text-3xl font-bold text-[#222222] mt-4">
              ${totalPrice.toFixed(2)} MXN
            </div>
            <div className="text-sm text-[#595959] mt-1">Precio varía según modalidad elegida.</div>
          </div>

          <div className="space-y-5 pt-4 border-t border-[#E1E3DF]">
            
            {/* Modalidad */}
            <div>
              <label className="block text-sm font-bold text-[#222222] mb-1">
                Modalidad de Compra
              </label>
              <select 
                className="w-full border border-[#E1E3DF] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#222222]"
                value={state.isPackage ? 'package' : 'single'}
                onChange={(e) => setState(prev => ({ ...prev, isPackage: e.target.value === 'package' }))}
              >
                <option value="package">Paquete de 6 Libretas ($120 c/u - Total $720)</option>
                <option value="single">Libreta Individual (1 pza - Total $150)</option>
              </select>
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-sm font-bold text-[#222222] mb-2 flex items-center gap-2">
                <Palette className="w-4 h-4"/> Color de Fondo
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setState(prev => ({ ...prev, bgColor: color.hex, bgType: 'solid' }))}
                    className={`w-8 h-8 rounded-full border border-[#E1E3DF] transition-transform ${
                      state.bgColor === color.hex && state.bgType === 'solid' ? 'ring-2 ring-offset-2 ring-[#222222]' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Character Upload / Select */}
            <div>
              <label className="block text-sm font-bold text-[#222222] mb-2 flex items-center gap-2">
                <Image className="w-4 h-4"/> Personaje o Logo Central
              </label>
              <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-[#E1E3DF] bg-[#F8F9FA] hover:bg-gray-100 cursor-pointer text-sm text-[#595959] transition-colors rounded-md">
                <Upload className="w-4 h-4" />
                <span>Subir archivo PNG transparente</span>
                <input type="file" accept="image/*" onChange={handleCustomImageUpload} className="hidden" />
              </label>
            </div>

            {/* Text Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#222222] mb-1">Materia</label>
                <input 
                  type="text" 
                  value={state.subject}
                  onChange={(e) => setState(prev => ({ ...prev, subject: e.target.value, spineText: e.target.value }))}
                  className="w-full border border-[#E1E3DF] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#222222]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#222222] mb-1">Estilo de Letra</label>
                <select
                  value={state.subjectGraphicStyle}
                  onChange={(e) => setState(prev => ({ ...prev, subjectGraphicStyle: e.target.value }))}
                  className="w-full border border-[#E1E3DF] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#222222] bg-white"
                >
                  {GRAPHIC_STYLES.map((style) => (
                    <option key={style.id} value={style.id}>{style.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#222222] mb-1">Alumno</label>
                <input 
                  type="text" 
                  value={state.studentName}
                  onChange={(e) => setState(prev => ({ ...prev, studentName: e.target.value }))}
                  className="w-full border border-[#E1E3DF] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#222222]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#222222] mb-1">Tipografía</label>
                <select
                  value={state.studentFont}
                  onChange={(e) => setState(prev => ({ ...prev, studentFont: e.target.value }))}
                  className="w-full border border-[#E1E3DF] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#222222] bg-white"
                >
                  {FONT_OPTIONS_STUDENT.map((font) => (
                    <option key={font.value} value={font.value}>{font.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add to cart */}
            <div className="pt-4">
              <button 
                onClick={handleAddCustomToCart}
                className="w-full bg-[#222222] hover:bg-black text-white font-bold rounded-full py-4 text-base transition-colors flex items-center justify-center gap-2"
              >
                Añadir al carrito
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
