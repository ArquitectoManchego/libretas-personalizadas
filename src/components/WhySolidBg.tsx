import React from 'react';
import { ShieldCheck, Palette, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhySolidBg: React.FC = () => {
  return (
    <section id="por-que-liso" className="py-16 bg-white/60 backdrop-blur-sm border-y border-pink-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> 100% Cumplimiento Escolar
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            ¿Por qué usamos <span className="text-pink-600">Fondos Lisos</span> de un solo color?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Sabemos que en la mayoría de las escuelas primarias y secundarias <strong>exigen que la libreta sea de un solo color específico según la materia</strong> (por ejemplo: Rojo para Español, Azul para Matemáticas, Verde para Ciencias).
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          <div className="glass-card p-6 border-pink-200/60 bg-white/90 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-gray-900">Cumple la Regla de la Escuela</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              El color de fondo uniforme cubre toda la portada y contraportada respetando la indicación de los maestros, sin llamados de atención.
            </p>
          </div>

          <div className="glass-card p-6 border-purple-200/60 bg-white/90 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-gray-900">Personalización Única</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Sobre ese fondo liso colocamos personajes PNG transparentes en el centro, materias con estilos de ilustrador 3D y su nombre en tipografía especial.
            </p>
          </div>

          <div className="glass-card p-6 border-amber-200/60 bg-white/90 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-gray-900">Elección Libre de Fondo</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ¿Tu escuela permite imágenes completas de fondo? ¡También podemos hacerlo! Al personalizar puedes elegir entre color sólido o patrón/imagen completa.
            </p>
          </div>

        </div>

        {/* Visual Callout */}
        <div className="mt-10 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold">¿Tienes la lista de materias y colores de tu escuela?</h4>
            <p className="text-pink-100 text-sm">
              Envíanos los colores requeridos por materia y adaptamos los personajes o escudos a cada color exacto.
            </p>
          </div>
          <a
            href="https://wa.me/?text=Hola%2C%20quiero%20cotizar%20forros%20para%20libretas%20escolares%20con%20mis%20colores%20de%20materia"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold px-6 py-3.5 rounded-xl shadow-md hover:scale-105 transition-all text-sm"
          >
            💬 Enviar Lista por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
