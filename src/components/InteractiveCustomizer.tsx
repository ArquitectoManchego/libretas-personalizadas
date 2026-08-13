import React, { useState } from 'react';
import { CustomizationState, CartItem } from '../types';
import { CHARACTER_OPTIONS, FONT_OPTIONS_STUDENT, GRAPHIC_STYLES } from '../data/catalog';
import { Palette, Image, ShoppingBag, Upload, Sparkles, ArrowLeft, Ruler, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InteractiveCustomizerProps {
  onAddToCart: (item: CartItem) => void;
}

export const InteractiveCustomizer: React.FC<InteractiveCustomizerProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<CustomizationState>({
    subject: 'MATEMÁTICAS',
    studentName: 'Sofía Pérez',
    gradeGroup: '2° A',
    omitSubject: false,
    omitStudentName: false,
    omitGradeGroup: false,
    bgColor: '#FFB6C1',
    bgType: 'solid',
    bgImage: '',
    characterImg: CHARACTER_OPTIONS[0].svg,
    characterName: CHARACTER_OPTIONS[0].name,
    subjectFont: 'Bubblegum Sans',
    studentFont: 'Pacifico',
    subjectGraphicStyle: 'style-pop-pink',
    spineText: 'MATEMÁTICAS',
    isPackage: true,
    
    // Notebook dimensions
    notebookType: 'espiral',
    notebookWidth: '19.5 cm',
    notebookHeight: '26 cm',
    notebookSpine: '1.2 cm'
  });

  const [customCharUrl, setCustomCharUrl] = useState('');

  // Dimension Parser
  const parseDimension = (val: string, fallback: number): number => {
    if (!val) return fallback;
    const match = val.match(/([\d.]+)/);
    if (!match) return fallback;
    const parsed = parseFloat(match[1]);
    return isNaN(parsed) || parsed <= 0 ? fallback : parsed;
  };

  const widthCm = parseDimension(state.notebookWidth, 19.5);
  const heightCm = parseDimension(state.notebookHeight, 26);
  const spineCm = parseDimension(state.notebookSpine, 1.2);

  // Calculate dynamic pixels for real-time visual scaling
  const totalWidthCm = state.notebookType === 'espiral' ? (widthCm * 2) : ((widthCm * 2) + spineCm);
  const totalHeightCm = heightCm;

  // Scale relative to standard notebook (39 cm total width x 26 cm height = 420px x 280px)
  const widthRatio = totalWidthCm / 39;
  const heightRatio = totalHeightCm / 26;

  const calcWidthPx = Math.min(520, Math.max(220, Math.round(420 * widthRatio)));
  const calcHeightPx = Math.min(420, Math.max(160, Math.round(280 * heightRatio)));
  const calcSpinePercent = state.notebookType === 'sin_espiral' 
    ? Math.max(8, Math.min(30, (spineCm / totalWidthCm) * 100)) 
    : 0;

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
      subject: state.omitSubject ? '(Sin Materia)' : state.subject,
      studentName: state.omitStudentName ? '(Sin Nombre)' : state.studentName,
      gradeGroup: state.omitGradeGroup ? '(Sin Grado/Grupo)' : state.gradeGroup,
      omitSubject: state.omitSubject,
      omitStudentName: state.omitStudentName,
      omitGradeGroup: state.omitGradeGroup,
      bgColor: state.bgColor,
      bgType: state.bgType,
      bgImage: state.bgImage,
      characterImg: state.characterImg,
      characterName: state.characterName,
      subjectFont: state.subjectFont,
      studentFont: state.studentFont,
      subjectGraphicStyle: state.subjectGraphicStyle,
      spineText: state.omitSubject ? '' : (state.spineText || state.subject),
      quantity: quantity,
      isPackage: state.isPackage,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      
      // Dimensions
      notebookType: state.notebookType,
      notebookWidth: state.notebookWidth,
      notebookHeight: state.notebookHeight,
      notebookSpine: state.notebookType === 'sin_espiral' ? state.notebookSpine : undefined
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
        
        {/* Left: Interactive Dynamic Proportional Cover Visualizer */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[500px] sticky top-24">
            
            <div className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-2">
              Previsualizador Proporcional Dinámico
            </div>
            
            <div className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full mb-8">
              {state.notebookType === 'espiral' ? 'Libreta Abierta con Espiral' : `Forro Extendido (Lomo ${spineCm} cm)`}
            </div>

            {/* RULER CONTAINER FOR REACTION FEEDBACK */}
            <div className="relative flex items-center justify-center p-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              
              {/* Top Ruler Label (Width) */}
              <div className="absolute -top-3 bg-slate-900 text-white font-mono text-[10px] font-bold px-3 py-0.5 rounded-full shadow-md z-20">
                Ancho Total: {totalWidthCm.toFixed(1)} cm
              </div>

              {/* Left Ruler Label (Height) */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 -rotate-90 bg-slate-900 text-white font-mono text-[10px] font-bold px-3 py-0.5 rounded-full shadow-md z-20 whitespace-nowrap">
                Alto: {heightCm.toFixed(1)} cm
              </div>

              {/* DYNAMIC SCALED NOTEBOOK BOX */}
              <div 
                className="notebook-continuous-wrapper transition-all duration-300 shadow-2xl relative"
                style={{
                  width: `${calcWidthPx}px`,
                  height: `${calcHeightPx}px`,
                  backgroundColor: state.bgColor
                }}
              >
                {state.notebookType === 'espiral' ? (
                  /* OPEN SPIRAL NOTEBOOK VIEW */
                  <>
                    {/* Left Side: Contraportada */}
                    <div className="cover-back flex-1 flex flex-col justify-end items-center p-3 relative">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        Contraportada
                      </span>
                    </div>

                    {/* Middle: 3D Metallic Spiral Spine */}
                    <div className="spiral-wrapper">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="spiral-ring" />
                      ))}
                    </div>

                    {/* Right Side: Portada */}
                    <div className="cover-front flex-1 flex flex-col justify-between items-center p-3">
                      <div className="text-center w-full pt-1">
                        <span className={`${state.subjectGraphicStyle} text-lg sm:text-xl font-black block truncate px-1`}>
                          {state.omitSubject ? '(SIN MATERIA)' : (state.subject || 'MATERIA')}
                        </span>
                      </div>
                      
                      <div className="my-auto py-1">
                        <img
                          src={state.characterImg}
                          alt={state.characterName}
                          className="w-20 sm:w-24 h-20 sm:h-24 object-contain filter drop-shadow-xl transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      <div className="text-center w-full pb-1">
                        <span 
                          className="text-slate-900 text-xs sm:text-sm font-bold block truncate px-1"
                          style={{ fontFamily: state.studentFont }}
                        >
                          {state.omitStudentName ? '(SIN NOMBRE)' : (state.studentName || 'Nombre del Alumno')}
                          {!state.omitGradeGroup && state.gradeGroup ? ` - ${state.gradeGroup}` : ''}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  /* CONTINUOUS WRAP COVER WITH FLAT SPINE */
                  <>
                    {/* Left Side: Contraportada */}
                    <div className="cover-back flex-1 flex flex-col justify-end items-center p-3">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-white/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        Contraportada
                      </span>
                    </div>

                    {/* Middle: Dynamic Flat Spine */}
                    <div 
                      className="cover-spine transition-all duration-300" 
                      style={{ width: `${calcSpinePercent}%` }}
                    >
                      <span className="spine-text">
                        {state.omitSubject ? '' : (state.spineText || state.subject)}
                      </span>
                    </div>

                    {/* Right Side: Portada */}
                    <div className="cover-front flex-1 flex flex-col justify-between items-center p-3">
                      <div className="text-center w-full pt-1">
                        <span className={`${state.subjectGraphicStyle} text-lg sm:text-xl font-black block truncate px-1`}>
                          {state.omitSubject ? '(SIN MATERIA)' : (state.subject || 'MATERIA')}
                        </span>
                      </div>
                      
                      <div className="my-auto py-1">
                        <img
                          src={state.characterImg}
                          alt={state.characterName}
                          className="w-20 sm:w-24 h-20 sm:h-24 object-contain filter drop-shadow-xl transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      <div className="text-center w-full pb-1">
                        <span 
                          className="text-slate-900 text-xs sm:text-sm font-bold block truncate px-1"
                          style={{ fontFamily: state.studentFont }}
                        >
                          {state.omitStudentName ? '(SIN NOMBRE)' : (state.studentName || 'Nombre del Alumno')}
                          {!state.omitGradeGroup && state.gradeGroup ? ` - ${state.gradeGroup}` : ''}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>

            <p className="text-[11px] text-slate-400 mt-6 text-center">
              * Cambia las cifras de Ancho y Alto abajo para observar cómo se adapta el tamaño de la previsualización en vivo.
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

            <div className="space-y-5 pt-2 border-t border-slate-100">
              
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

              {/* Notebook Dimensions Section */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-indigo-600" />
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    2. Medidas Exactas de la Libreta
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Encuadernación</label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setState(prev => ({ ...prev, notebookType: 'espiral' }))}
                      className={`p-2.5 rounded-xl border transition-all ${
                        state.notebookType === 'espiral' 
                          ? 'border-indigo-600 bg-white text-indigo-950 font-bold shadow-sm' 
                          : 'border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      🌀 Con Espiral
                    </button>
                    <button
                      type="button"
                      onClick={() => setState(prev => ({ ...prev, notebookType: 'sin_espiral' }))}
                      className={`p-2.5 rounded-xl border transition-all ${
                        state.notebookType === 'sin_espiral' 
                          ? 'border-indigo-600 bg-white text-indigo-950 font-bold shadow-sm' 
                          : 'border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      📘 Sin Espiral (Cosida / Dura)
                    </button>
                  </div>
                </div>

                {state.notebookType === 'espiral' ? (
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      Mide desde el borde exterior de la pasta hasta el inicio de la espiral.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700">Ancho (borde a espiral)</label>
                        <input 
                          type="text" 
                          value={state.notebookWidth}
                          onChange={(e) => setState(prev => ({ ...prev, notebookWidth: e.target.value }))}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
                          placeholder="ej. 19.5 cm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700">Alto de la libreta</label>
                        <input 
                          type="text" 
                          value={state.notebookHeight}
                          onChange={(e) => setState(prev => ({ ...prev, notebookHeight: e.target.value }))}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
                          placeholder="ej. 26 cm"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                      Ingresa el ancho, alto y el grosor (espesor) del lomo de la libreta.
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700">Ancho</label>
                        <input 
                          type="text" 
                          value={state.notebookWidth}
                          onChange={(e) => setState(prev => ({ ...prev, notebookWidth: e.target.value }))}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
                          placeholder="20 cm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700">Alto</label>
                        <input 
                          type="text" 
                          value={state.notebookHeight}
                          onChange={(e) => setState(prev => ({ ...prev, notebookHeight: e.target.value }))}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
                          placeholder="26 cm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700">Lomo (grosor)</label>
                        <input 
                          type="text" 
                          value={state.notebookSpine}
                          onChange={(e) => setState(prev => ({ ...prev, notebookSpine: e.target.value }))}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
                          placeholder="1.2 cm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Color Presets */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-indigo-500" /> 3. Color de Fondo
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
                  <Image className="w-4 h-4 text-indigo-500" /> 4. Imagen o Logo Central (PNG)
                </label>
                <label className="flex items-center justify-center gap-2 p-3.5 border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/50 cursor-pointer rounded-2xl text-xs font-bold text-slate-700 transition-colors">
                  <Upload className="w-4 h-4 text-indigo-500" />
                  <span>{state.characterName || 'Subir Imagen PNG Transparente'}</span>
                  <input type="file" accept="image/*" onChange={handleCustomImageUpload} className="hidden" />
                </label>
              </div>

              {/* Text Controls & Opt-outs */}
              <div className="space-y-3">
                
                {/* Materia */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Materia</label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      disabled={state.omitSubject}
                      value={state.subject}
                      onChange={(e) => setState(prev => ({ ...prev, subject: e.target.value, spineText: e.target.value }))}
                      className={`w-full border rounded-xl p-2.5 text-xs font-bold outline-none ${
                        state.omitSubject ? 'bg-slate-100 text-slate-400 line-through' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                    <select
                      value={state.subjectGraphicStyle}
                      onChange={(e) => setState(prev => ({ ...prev, subjectGraphicStyle: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                    >
                      {GRAPHIC_STYLES.map((style) => (
                        <option key={style.id} value={style.id}>{style.name}</option>
                      ))}
                    </select>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input 
                      type="checkbox" 
                      checked={state.omitSubject} 
                      onChange={(e) => setState(prev => ({ ...prev, omitSubject: e.target.checked }))} 
                      className="w-3.5 h-3.5 rounded text-indigo-600"
                    />
                    <span className="text-[11px] text-slate-600">Omitir materia</span>
                  </label>
                </div>

                {/* Student Name */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">Nombre Alumno</label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      disabled={state.omitStudentName}
                      value={state.studentName}
                      onChange={(e) => setState(prev => ({ ...prev, studentName: e.target.value }))}
                      className={`w-full border rounded-xl p-2.5 text-xs font-bold outline-none ${
                        state.omitStudentName ? 'bg-slate-100 text-slate-400 line-through' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                    <select
                      value={state.studentFont}
                      onChange={(e) => setState(prev => ({ ...prev, studentFont: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-900 outline-none"
                    >
                      {FONT_OPTIONS_STUDENT.map((font) => (
                        <option key={font.value} value={font.value}>{font.name}</option>
                      ))}
                    </select>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input 
                      type="checkbox" 
                      checked={state.omitStudentName} 
                      onChange={(e) => setState(prev => ({ ...prev, omitStudentName: e.target.checked }))} 
                      className="w-3.5 h-3.5 rounded text-indigo-600"
                    />
                    <span className="text-[11px] text-slate-600">Omitir nombre del alumno</span>
                  </label>
                </div>

                {/* Grade and Group */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Grado y Grupo</label>
                  <input 
                    type="text" 
                    disabled={state.omitGradeGroup}
                    value={state.gradeGroup}
                    onChange={(e) => setState(prev => ({ ...prev, gradeGroup: e.target.value }))}
                    className={`w-full border rounded-xl p-2.5 text-xs font-bold outline-none ${
                      state.omitGradeGroup ? 'bg-slate-100 text-slate-400 line-through' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                    placeholder="Ej. 2° A"
                  />
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input 
                      type="checkbox" 
                      checked={state.omitGradeGroup} 
                      onChange={(e) => setState(prev => ({ ...prev, omitGradeGroup: e.target.checked }))} 
                      className="w-3.5 h-3.5 rounded text-indigo-600"
                    />
                    <span className="text-[11px] text-slate-600">Omitir grado y grupo</span>
                  </label>
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
