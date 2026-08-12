import React from 'react';
import { Tag, Sparkles, Check, Package, Palette, Shield } from 'lucide-react';

interface PricingSectionProps {
  onScrollTo: (id: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onScrollTo }) => {
  return (
    <section id="precios" className="py-20 bg-gradient-to-b from-transparent via-pink-50/50 to-purple-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
            <Tag className="w-4 h-4" /> Precios Claros y Transparentes
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900">
            Ahorra al comprar tu <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Paquete de 6 Libretas</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Aprovecha nuestros precios fijos de catálogo o personaliza cada libreta desde cero con tus personajes y materias favoritas.
          </p>
        </div>

        {/* Pricing Cards Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Diseños de Catálogo */}
          <div className="glass-card bg-white p-8 rounded-3xl border-2 border-pink-200 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-pink-400 transition-all">
            <div className="absolute top-0 right-0 bg-pink-500 text-white font-extrabold text-xs px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
              ¡Más Elegido!
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Diseños de Catálogo</h3>
                  <p className="text-xs text-pink-600 font-semibold">Hello Kitty, My Melody & Harry Potter</p>
                </div>
              </div>

              {/* Price Tier Package */}
              <div className="bg-pink-50/80 p-5 rounded-2xl border border-pink-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700">📦 Paquete de 6 impresiones</span>
                  <span className="bg-pink-600 text-white font-black text-xs px-2.5 py-1 rounded-md">AHORRA $120</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-pink-600">$80</span>
                  <span className="text-gray-600 text-sm font-bold">MXN / por libreta</span>
                </div>
                <p className="text-xs text-pink-700 font-medium">
                  Total del paquete (6 forros completos): <strong>$480 MXN</strong>
                </p>
              </div>

              {/* Individual Price */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-sm font-semibold text-gray-600">Comprar 1 libreta individual</span>
                <span className="text-xl font-extrabold text-gray-900">$100 MXN</span>
              </div>

              {/* Included features */}
              <ul className="space-y-3 text-sm text-gray-600 pt-2">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-pink-500 font-bold" />
                  <span>Escoge entre 8 diseños Infantiles o 5 de Harry Potter</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-pink-500 font-bold" />
                  <span>Incluye tu nombre en la parte inferior con letra especial</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-pink-500 font-bold" />
                  <span>Nombre de la materia en grande con estilo de ilustrador</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-pink-500 font-bold" />
                  <span>Forro continuo completo (Frente, Lomo rotulado y Contraportada)</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onScrollTo('catalogo')}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/25 transition-all text-center block"
              >
                Elegir del Catálogo ($80 c/u)
              </button>
            </div>
          </div>

          {/* Card 2: Diseños Personalizados */}
          <div className="glass-card bg-white p-8 rounded-3xl border-2 border-purple-200 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-purple-400 transition-all">
            <div className="absolute top-0 right-0 bg-purple-600 text-white font-extrabold text-xs px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
              100% A tu Gusto
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Diseño Personalizado</h3>
                  <p className="text-xs text-purple-600 font-semibold">Cualquier personaje, materia o imagen</p>
                </div>
              </div>

              {/* Price Tier Package */}
              <div className="bg-purple-50/80 p-5 rounded-2xl border border-purple-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700">📦 Paquete de 6 impresiones</span>
                  <span className="bg-purple-600 text-white font-black text-xs px-2.5 py-1 rounded-md">AHORRA $180</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-purple-600">$120</span>
                  <span className="text-gray-600 text-sm font-bold">MXN / por libreta</span>
                </div>
                <p className="text-xs text-purple-700 font-medium">
                  Total del paquete (6 forros completos): <strong>$720 MXN</strong>
                </p>
              </div>

              {/* Individual Price */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-sm font-semibold text-gray-600">Comprar 1 libreta individual</span>
                <span className="text-xl font-extrabold text-gray-900">$150 MXN</span>
              </div>

              {/* Included features */}
              <ul className="space-y-3 text-sm text-gray-600 pt-2">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-600 font-bold" />
                  <span>Personaliza el color de fondo exacto que pide la escuela</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-600 font-bold" />
                  <span>Elige cualquier personaje en PNG o imagen completa de fondo</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-600 font-bold" />
                  <span>Selecciona tipo de letra para el título y el nombre</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-600 font-bold" />
                  <span>Configuración completa del lomo y contraportada</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onScrollTo('personalizar')}
                className="w-full py-4 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-2xl shadow-lg shadow-purple-600/25 transition-all text-center block"
              >
                Crear Mi Diseño ($120 c/u)
              </button>
            </div>
          </div>

        </div>

        {/* Note on printing and packages */}
        <div className="mt-12 text-center text-sm text-gray-500 max-w-xl mx-auto flex items-center justify-center gap-2 bg-white/70 backdrop-blur p-4 rounded-2xl border border-gray-200 shadow-sm">
          <Package className="w-5 h-5 text-pink-500" />
          <span>* Los paquetes de 6 impresiones pueden combinar distintas materias y nombres si lo requieres.</span>
        </div>

      </div>
    </section>
  );
};
