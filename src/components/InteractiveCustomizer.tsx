import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { CustomizationState, CartItem } from '../types';
import { CHARACTER_OPTIONS, FONT_OPTIONS_STUDENT, GRAPHIC_STYLES } from '../data/catalog';
import { Palette, Image, ShoppingBag, Upload, Sparkles, ArrowLeft, Ruler, HelpCircle, AlertCircle, Move } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InteractiveCustomizerProps {
  onAddToCart: (item: CartItem) => void;
}

export const InteractiveCustomizer: React.FC<InteractiveCustomizerProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [state, setState] = useState<CustomizationState>({
    subject: 'MATEMÁTICAS',
    subjectCustomImg: '',
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
    subjectGraphicStyle: 'style-illustrator-3d-extrude',
    spineText: 'MATEMÁTICAS',
    isPackage: true,
    
    // Notebook dimensions
    notebookType: 'espiral',
    notebookWidth: '19.5 cm',
    notebookHeight: '26 cm',
    notebookSpine: '1.2 cm',

    // Position & Size for Draggable Elements
    subjectPos: { x: 10, y: 15, width: 180, height: 50 },
    characterPos: { x: 45, y: 80, width: 110, height: 110 }
  });

  const [customCharUrl, setCustomCharUrl] = useState('');
  const [customSubjectUrl, setCustomSubjectUrl] = useState('');

  // Dimension Parser with 15x15 cm minimum clamping
  const parseDimension = (val: string, fallback: number): number => {
    if (!val) return fallback;
    const match = val.match(/([\d.]+)/);
    if (!match) return fallback;
    const parsed = parseFloat(match[1]);
    return isNaN(parsed) || parsed <= 0 ? fallback : parsed;
  };

  const rawWidth = parseDimension(state.notebookWidth, 19.5);
  const rawHeight = parseDimension(state.notebookHeight, 26);
  
  const widthCm = Math.max(15, rawWidth);
  const heightCm = Math.max(15, rawHeight);
  const spineCm = parseDimension(state.notebookSpine, 1.2);

  const isClamped = rawWidth < 15 || rawHeight < 15;

  // Proportional Scaling Ratio
  const scaleRatio = heightCm / 26;
  const studentFontSize = Math.max(11, Math.min(16, Math.round(13 * scaleRatio)));

  const totalWidthCm = state.notebookType === 'espiral' ? (widthCm * 2) : ((widthCm * 2) + spineCm);
  const totalHeightCm = heightCm;

  const widthRatio = totalWidthCm / 39;
  const heightRatio = totalHeightCm / 26;

  const calcWidthPx = Math.min(540, Math.max(240, Math.round(440 * widthRatio)));
  const calcHeightPx = Math.min(440, Math.max(180, Math.round(300 * heightRatio)));
  const calcSpinePercent = state.notebookType === 'sin_espiral' 
    ? Math.max(8, Math.min(30, (spineCm / totalWidthCm) * 100)) 
    : 0;

  const unitPrice = state.isPackage ? 120 : 150;
  const quantity = state.isPackage ? 6 : 1;
  const totalPrice = unitPrice * quantity;

  // Upload Character PNG
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

  // Upload Illustrator Pre-Rendered Subject Title PNG/SVG
  const handleSubjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setCustomSubjectUrl(result);
        setState(prev => ({
          ...prev,
          subjectCustomImg: result
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
      subjectCustomImg: state.subjectCustomImg,
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
      
      // Dimensions & Draggable Positions
      notebookType: state.notebookType,
      notebookWidth: `${widthCm} cm`,
      notebookHeight: `${heightCm} cm`,
      notebookSpine: state.notebookType === 'sin_espiral' ? `${spineCm} cm` : undefined,
      subjectPos: state.subjectPos,
      characterPos: state.characterPos
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
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Editor Interactivo 2026 (Drag & Resize)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Interactive Dynamic Proportional & Draggable Cover Visualizer */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl flex flex-col items-center justify-center min-h-[520px] sticky top-24">
            
            <div className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-1 flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 text-indigo-500" />
              <span>Previsualizador Interactivo (Arrastra y Redimensiona)</span>
            </div>
            
            <div className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full mb-3">
              {state.notebookType === 'espiral' ? 'Libreta Abierta con Espiral Metálica 3D' : `Forro Extendido (Lomo ${spineCm} cm)`}
            </div>

            {isClamped && (
              <div className="mb-3 flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Mínimo reglamentario aplicado: 15 cm x 15 cm.</span>
              </div>
            )}

            {/* RULER CONTAINER */}
            <div className="relative flex items-center justify-center p-6 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              
              {/* Top Ruler */}
              <div className="absolute -top-3 bg-slate-900 text-white font-mono text-[10px] font-bold px-3 py-0.5 rounded-full shadow-md z-20">
                Ancho Total: {totalWidthCm.toFixed(1)} cm
              </div>

              {/* Left Ruler */}
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
                  <>
                    {/* Left: Contraportada */}
                    <div className="cover-back flex-1 flex flex-col justify-end items-center p-2 relative">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest bg-white/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        Contraportada
                      </span>
                    </div>

                    {/* Middle: 3D Metallic Dense Spiral Spine (24 loops) */}
                    <div className="spiral-spine-container">
                      {[...Array(24)].map((_, i) => (
                        <div key={i} className="spiral-wire-loop relative w-full flex items-center justify-between">
                          <div className="spiral-hole-left" />
                          <div className="spiral-hole-right" />
                        </div>
                      ))}
                    </div>

                    {/* Right: Portada canvas with Rnd elements */}
                    <div className="cover-front flex-1 relative overflow-hidden p-2 flex flex-col justify-between">
                      
                      {/* DRAGGABLE SUBJECT TITLE (TEXT OR ILLUSTRATOR PNG) */}
                      {!state.omitSubject && (
                        <Rnd
                          bounds="parent"
                          size={{ width: state.subjectPos.width, height: state.subjectPos.height }}
                          position={{ x: state.subjectPos.x, y: state.subjectPos.y }}
                          onDragStop={(e, d) => setState(prev => ({ ...prev, subjectPos: { ...prev.subjectPos, x: d.x, y: d.y } }))}
                          onResizeStop={(e, direction, ref, delta, position) => {
                            setState(prev => ({
                              ...prev,
                              subjectPos: {
                                width: ref.offsetWidth,
                                height: ref.offsetHeight,
                                ...position
                              }
                            }));
                          }}
                          className="border border-indigo-400/40 hover:border-indigo-600 border-dashed rounded-lg flex items-center justify-center cursor-move transition-colors group z-20"
                        >
                          {state.subjectCustomImg ? (
                            <img 
                              src={state.subjectCustomImg} 
                              alt="Título Illustrator" 
                              className="w-full h-full object-contain filter drop-shadow-md"
                            />
                          ) : (
                            <span 
                              className={`${state.subjectGraphicStyle} font-black block truncate text-center w-full select-none`}
                              style={{ 
                                fontSize: `${Math.max(12, Math.min(32, Math.round(state.subjectPos.height * 0.55)))}px` 
                              }}
                            >
                              {state.subject || 'MATERIA'}
                            </span>
                          )}
                          <span className="absolute -top-3 -right-2 bg-indigo-600 text-white text-[8px] font-bold px-1.5 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Mover / Escalar
                          </span>
                        </Rnd>
                      )}

                      {/* DRAGGABLE CHARACTER IMAGE */}
                      <Rnd
                        bounds="parent"
                        size={{ width: state.characterPos.width, height: state.characterPos.height }}
                        position={{ x: state.characterPos.x, y: state.characterPos.y }}
                        onDragStop={(e, d) => setState(prev => ({ ...prev, characterPos: { ...prev.characterPos, x: d.x, y: d.y } }))}
                        onResizeStop={(e, direction, ref, delta, position) => {
                          setState(prev => ({
                            ...prev,
                            characterPos: {
                              width: ref.offsetWidth,
                              height: ref.offsetHeight,
                              ...position
                            }
                          }));
                        }}
                        className="border border-purple-400/40 hover:border-purple-600 border-dashed rounded-lg flex items-center justify-center cursor-move transition-colors group z-10"
                      >
                        <img
                          src={state.characterImg}
                          alt={state.characterName}
                          className="w-full h-full object-contain filter drop-shadow-xl select-none pointer-events-none"
                        />
                        <span className="absolute -top-3 -right-2 bg-purple-600 text-white text-[8px] font-bold px-1.5 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          Imagen
                        </span>
                      </Rnd>

                      {/* Bottom Fixed Student Name */}
                      <div className="absolute bottom-2 left-0 right-0 text-center px-2 z-0">
                        <span 
                          className="text-slate-900 font-bold block truncate"
                          style={{ 
                            fontFamily: state.studentFont,
                            fontSize: `${studentFontSize}px`
                          }}
                        >
                          {state.omitStudentName ? '(SIN NOMBRE)' : (state.studentName || 'Nombre del Alumno')}
                          {!state.omitGradeGroup && state.gradeGroup ? ` - ${state.gradeGroup}` : ''}
                        </span>
                      </div>

                    </div>
                  </>
                ) : (
                  /* CONTINUOUS COVER WITH FLAT SPINE */
                  <>
                    <div className="cover-back flex-1 flex flex-col justify-end items-center p-2">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest bg-white/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        Contraportada
                      </span>
                    </div>

                    <div 
                      className="cover-spine transition-all duration-300" 
                      style={{ width: `${calcSpinePercent}%` }}
                    >
                      <span className="spine-text">
                        {state.omitSubject ? '' : (state.spineText || state.subject)}
                      </span>
                    </div>

                    <div className="cover-front flex-1 relative overflow-hidden p-2">
                      
                      {/* DRAGGABLE SUBJECT TITLE */}
                      {!state.omitSubject && (
                        <Rnd
                          bounds="parent"
                          size={{ width: state.subjectPos.width, height: state.subjectPos.height }}
                          position={{ x: state.subjectPos.x, y: state.subjectPos.y }}
                          onDragStop={(e, d) => setState(prev => ({ ...prev, subjectPos: { ...prev.subjectPos, x: d.x, y: d.y } }))}
                          onResizeStop={(e, direction, ref, delta, position) => {
                            setState(prev => ({
                              ...prev,
                              subjectPos: {
                                width: ref.offsetWidth,
                                height: ref.offsetHeight,
                                ...position
                              }
                            }));
                          }}
                          className="border border-indigo-400/40 hover:border-indigo-600 border-dashed rounded-lg flex items-center justify-center cursor-move transition-colors group z-20"
                        >
                          {state.subjectCustomImg ? (
                            <img 
                              src={state.subjectCustomImg} 
                              alt="Título Illustrator" 
                              className="w-full h-full object-contain filter drop-shadow-md"
                            />
                          ) : (
                            <span 
                              className={`${state.subjectGraphicStyle} font-black block truncate text-center w-full select-none`}
                              style={{ 
                                fontSize: `${Math.max(12, Math.min(32, Math.round(state.subjectPos.height * 0.55)))}px` 
                              }}
                            >
                              {state.subject || 'MATERIA'}
                            </span>
                          )}
                        </Rnd>
                      )}

                      {/* DRAGGABLE CHARACTER IMAGE */}
                      <Rnd
                        bounds="parent"
                        size={{ width: state.characterPos.width, height: state.characterPos.height }}
                        position={{ x: state.characterPos.x, y: state.characterPos.y }}
                        onDragStop={(e, d) => setState(prev => ({ ...prev, characterPos: { ...prev.characterPos, x: d.x, y: d.y } }))}
                        onResizeStop={(e, direction, ref, delta, position) => {
                          setState(prev => ({
                            ...prev,
                            characterPos: {
                              width: ref.offsetWidth,
                              height: ref.offsetHeight,
                              ...position
                            }
                          }));
                        }}
                        className="border border-purple-400/40 hover:border-purple-600 border-dashed rounded-lg flex items-center justify-center cursor-move transition-colors group z-10"
                      >
                        <img
                          src={state.characterImg}
                          alt={state.characterName}
                          className="w-full h-full object-contain filter drop-shadow-xl select-none pointer-events-none"
                        />
                      </Rnd>

                      {/* Bottom Fixed Student Name */}
                      <div className="absolute bottom-2 left-0 right-0 text-center px-2 z-0">
                        <span 
                          className="text-slate-900 font-bold block truncate"
                          style={{ 
                            fontFamily: state.studentFont,
                            fontSize: `${studentFontSize}px`
                          }}
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

            <p className="text-[11px] font-medium text-slate-400 mt-4 text-center">
              💡 Arrastra las esquinas del título o imagen para cambiar su tamaño y posición en la libreta.
            </p>

          </div>
        </div>

        {/* Right: Customization Controls Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Estilos Illustrator + Drag & Resize</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 leading-tight">
                Personalizador de Forro
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

              {/* Dimensions Section */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-indigo-600" />
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    2. Medidas Exactas (Mín. 15x15 cm)
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Encuadernación</label>
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
                      📘 Sin Espiral (Dura / Cosida)
                    </button>
                  </div>
                </div>

                {state.notebookType === 'espiral' ? (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700">Ancho (cm)</label>
                      <input 
                        type="text" 
                        value={state.notebookWidth}
                        onChange={(e) => setState(prev => ({ ...prev, notebookWidth: e.target.value }))}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700">Alto (cm)</label>
                      <input 
                        type="text" 
                        value={state.notebookHeight}
                        onChange={(e) => setState(prev => ({ ...prev, notebookHeight: e.target.value }))}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-900 outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700">Ancho</label>
                      <input 
                        type="text" 
                        value={state.notebookWidth}
                        onChange={(e) => setState(prev => ({ ...prev, notebookWidth: e.target.value }))}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700">Alto</label>
                      <input 
                        type="text" 
                        value={state.notebookHeight}
                        onChange={(e) => setState(prev => ({ ...prev, notebookHeight: e.target.value }))}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700">Lomo</label>
                      <input 
                        type="text" 
                        value={state.notebookSpine}
                        onChange={(e) => setState(prev => ({ ...prev, notebookSpine: e.target.value }))}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-semibold text-slate-900 outline-none"
                      />
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
                      className={`h-8 rounded-xl border border-slate-300 transition-transform ${
                        state.bgColor === color.hex ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Título de Materia + Illustrator Upload Option */}
              <div className="space-y-3 pt-1 border-t border-slate-100">
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  4. Título de la Materia & Graphic Styles
                </label>

                {/* Option A: Live Text with Illustrator Simulators */}
                <div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input 
                      type="text" 
                      disabled={state.omitSubject || !!state.subjectCustomImg}
                      value={state.subject}
                      onChange={(e) => setState(prev => ({ ...prev, subject: e.target.value, spineText: e.target.value }))}
                      className={`w-full border rounded-xl p-2 text-xs font-bold outline-none ${
                        state.omitSubject || !!state.subjectCustomImg ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                      placeholder="Materia (ej. MATEMÁTICAS)"
                    />
                    <select
                      disabled={!!state.subjectCustomImg}
                      value={state.subjectGraphicStyle}
                      onChange={(e) => setState(prev => ({ ...prev, subjectGraphicStyle: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-900 outline-none"
                    >
                      {GRAPHIC_STYLES.map((style) => (
                        <option key={style.id} value={style.id}>{style.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Option B: Upload PNG Title exported from Illustrator */}
                <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-indigo-900">
                      🎨 O bien: Sube Título Diseñado en Illustrator (PNG/SVG)
                    </span>
                    {state.subjectCustomImg && (
                      <button 
                        onClick={() => setState(prev => ({ ...prev, subjectCustomImg: '' }))}
                        className="text-[10px] text-red-600 font-bold hover:underline"
                      >
                        Quitar
                      </button>
                    )}
                  </div>
                  <label className="flex items-center justify-center gap-2 p-2.5 bg-white border border-indigo-200 hover:border-indigo-400 cursor-pointer rounded-xl text-xs font-bold text-indigo-700 transition-colors shadow-sm">
                    <Upload className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="truncate">
                      {state.subjectCustomImg ? 'Imagen de Título Subida ✅' : 'Subir Archivo de Illustrator Renderizado'}
                    </span>
                    <input type="file" accept="image/*" onChange={handleSubjectImageUpload} className="hidden" />
                  </label>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={state.omitSubject} 
                    onChange={(e) => setState(prev => ({ ...prev, omitSubject: e.target.checked }))} 
                    className="w-3.5 h-3.5 rounded text-indigo-600"
                  />
                  <span className="text-[11px] text-slate-600">Omitir materia en el forro</span>
                </label>
              </div>

              {/* Character Upload */}
              <div className="pt-1 border-t border-slate-100">
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Image className="w-4 h-4 text-indigo-500" /> 5. Imagen o Logo Central (PNG)
                </label>
                <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/50 cursor-pointer rounded-2xl text-xs font-bold text-slate-700 transition-colors">
                  <Upload className="w-4 h-4 text-indigo-500" />
                  <span>{state.characterName || 'Subir Imagen PNG Transparente'}</span>
                  <input type="file" accept="image/*" onChange={handleCustomImageUpload} className="hidden" />
                </label>
              </div>

              {/* Student Name */}
              <div className="space-y-3 pt-1 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nombre Alumno y Tipografía</label>
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
