import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Palette, ArrowRight } from 'lucide-react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  return (
    <section id="hero" className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      {/* Decorative background blobs */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-pink-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-pink-100/90 text-pink-700 font-semibold px-4 py-1.5 rounded-full text-xs sm:text-sm border border-pink-200 shadow-sm animate-pulse">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>¡Listos para el Regreso a Clases 2026!</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
              Forros Adhesivos Escolares <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Completos y Personalizados
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Forro adhesivo plastificado de portada, lomo y contraportada con continuidad impecable. 
              Cumple con el <strong>código de color reglamentario de la escuela</strong> mientras le das a tus hijos libretas mágicas y únicas.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm font-semibold text-gray-700 pt-2">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Forro Completo (Frente, Lomo, Reversa)
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-indigo-500" /> Cumple Color Escolar (Fondo Liso)
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500" /> Personajes PNG Transparentes
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onScrollTo('catalogo')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-pink-500/25 hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5" /> Ver Diseños de Catálogo desde $80
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onScrollTo('personalizar')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-bold text-base px-7 py-4 rounded-2xl border-2 border-purple-200 shadow-md hover:border-purple-400 hover:scale-105 transition-all"
              >
                <Palette className="w-5 h-5 text-purple-600" /> Diseñar Personalizado ($120)
              </button>
            </div>

            {/* Pricing quick highlights */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-gray-500 font-medium border-t border-pink-100/80">
              <div>
                🏷️ Catálogo: <strong className="text-gray-900">$80 MXN c/u</strong> (Paq. 6) / $100 ind.
              </div>
              <div>
                🎨 Personalizado: <strong className="text-gray-900">$120 MXN c/u</strong> (Paq. 6) / $150 ind.
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic / Card Display */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-xs font-black uppercase text-pink-600 tracking-wider">Vista Previa Continua (Frente + Lomo + Reverso)</span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">Adhesivo Plastificado</span>
              </div>

              {/* Sample notebook continuous view */}
              <div className="notebook-continuous-wrapper bg-pink-200 border-2 border-pink-300">
                
                {/* Back Cover */}
                <div className="cover-back bg-pink-200">
                  <span className="text-[10px] font-bold text-pink-700/60 uppercase">Contraportada</span>
                </div>

                {/* Spine */}
                <div className="cover-spine bg-pink-300">
                  <span className="spine-text text-pink-900">MATEMÁTICAS</span>
                </div>

                {/* Front Cover */}
                <div className="cover-front bg-pink-200">
                  <span className="style-pop-pink text-lg font-bold text-center leading-none mt-2">
                    MATEMÁTICAS
                  </span>
                  
                  {/* Hello Kitty SVG */}
                  <img 
                    src={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><g transform="translate(20,20)"><ellipse cx="80" cy="80" rx="65" ry="50" fill="%23FFFFFF" stroke="%23333333" stroke-width="6"/><ellipse cx="50" cy="80" rx="7" ry="9" fill="%23333333"/><ellipse cx="110" cy="80" rx="7" ry="9" fill="%23333333"/><ellipse cx="80" cy="92" rx="8" ry="5" fill="%23FFD100"/><line x1="20" y1="75" x2="0" y2="70" stroke="%23333333" stroke-width="4"/><line x1="20" y1="85" x2="-5" y2="85" stroke="%23333333" stroke-width="4"/><line x1="20" y1="95" x2="0" y2="100" stroke="%23333333" stroke-width="4"/><line x1="140" y1="75" x2="160" y2="70" stroke="%23333333" stroke-width="4"/><line x1="140" y1="85" x2="165" y2="85" stroke="%23333333" stroke-width="4"/><line x1="140" y1="95" x2="160" y2="100" stroke="%23333333" stroke-width="4"/><path d="M 30,45 Q 25,15 45,25 Q 60,35 45,48 Z" fill="%23FFFFFF" stroke="%23333333" stroke-width="5"/><path d="M 130,45 Q 135,15 115,25 Q 100,35 115,48 Z" fill="%23FFFFFF" stroke="%23333333" stroke-width="5"/><g transform="translate(100, 20) rotate(-15)"><ellipse cx="15" cy="15" rx="14" ry="12" fill="%23FF2D55" stroke="%23333333" stroke-width="4"/><ellipse cx="-10" cy="15" rx="14" ry="12" fill="%23FF2D55" stroke="%23333333" stroke-width="4"/><circle cx="2.5" cy="15" r="7" fill="%23FF2D55" stroke="%23333333" stroke-width="4"/></g></g></svg>`}
                    alt="Hello Kitty"
                    className="w-24 h-24 object-contain filter drop-shadow-md my-auto"
                  />

                  <span className="font-['Pacifico'] text-pink-700 text-sm font-semibold mb-2">
                    Barbie Sofía Pérez
                  </span>
                </div>

              </div>

              {/* Floating badges around preview */}
              <div className="flex items-center justify-between text-xs text-gray-600 bg-pink-50 p-3 rounded-xl border border-pink-100">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  Lomo con materia rotulada
                </div>
                <div className="font-bold text-pink-600">
                  ¡Fondo liso escolar!
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
