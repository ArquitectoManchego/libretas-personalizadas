import React from 'react';
import { BookOpen, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white">LibretasUnicas.mx</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Expertos en forros adhesivos plastificados continuos de portada, lomo y contraportada. 
              Personalización profesional que cumple con los requerimientos escolares de color de tus hijos.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-4">Precios de Línea</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li>• Catálogo 8 Infantiles ($80 c/u paq. 6)</li>
              <li>• Catálogo 5 Harry Potter ($80 c/u paq. 6)</li>
              <li>• Pieza Individual Catálogo ($100 MXN)</li>
              <li>• Personalizado ($120 c/u paq. 6)</li>
              <li>• Pieza Individual Custom ($150 MXN)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-4">Detalle Técnico</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li>✨ Vinil adhesivo de alta resistencia</li>
              <li>🛡️ Plastificado resistente a derrames</li>
              <li>📐 Diseñado a la medida exacta de libreta</li>
              <li>🔖 Lomo rotulado para libretas cosidas</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 LibretasUnicas.mx — Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado con <Heart className="w-3.5 h-3.5 text-pink-500 inline fill-pink-500" /> para el regreso a clases.
          </p>
        </div>

      </div>
    </footer>
  );
};
