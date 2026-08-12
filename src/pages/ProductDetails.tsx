import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATALOG_DESIGNS } from '../data/catalog';
import { CartItem } from '../types';
import { Check, ShieldCheck } from 'lucide-react';

interface ProductDetailsProps {
  onAddToCart: (item: CartItem) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const design = CATALOG_DESIGNS.find((item) => item.id === id);

  const [subject, setSubject] = useState(design?.defaultSubject || '');
  const [studentName, setStudentName] = useState(design?.defaultStudentName || '');
  const [isPackage, setIsPackage] = useState(true);

  if (!design) {
    return <div className="p-8 text-center text-gray-500">Producto no encontrado.</div>;
  }

  const unitPrice = isPackage ? 80 : 100;
  const quantity = isPackage ? 6 : 1;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      cartId: 'PROD-' + design.id + '-' + Date.now(),
      designId: design.id,
      isCustom: false,
      subject: subject,
      studentName: studentName,
      bgColor: design.bgColor,
      bgType: design.bgType,
      characterImg: design.characterImg,
      characterName: design.characterName,
      image: design.image,
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
    // Simulating Etsy's add to cart behavior (opening cart drawer is handled globally usually, here we might just navigate or open)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-[#595959] mb-4 flex items-center gap-2">
        <button onClick={() => navigate('/')} className="hover:underline">Inicio</button> 
        <span>/</span>
        <span className="capitalize">{design.category.replace('_', ' ')}</span>
        <span>/</span>
        <span className="font-semibold">{design.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Column: Image Gallery */}
        <div className="w-full lg:w-3/5">
          <div className="bg-[#f1f1f1] rounded-xl overflow-hidden shadow-sm border border-[#E1E3DF]">
            {design.image ? (
              <img src={design.image} alt={design.title} className="w-full h-auto object-cover" />
            ) : (
              <div className="w-full aspect-square flex items-center justify-center" style={{ backgroundColor: design.bgColor }}>
                <span className={`${design.subjectGraphicStyle} text-3xl`}>{design.defaultSubject}</span>
              </div>
            )}
          </div>
          
          <div className="mt-8 space-y-4 text-sm text-[#222222]">
            <h3 className="font-bold text-xl mb-4 border-b pb-2">Descripción del artículo</h3>
            <p className="leading-relaxed whitespace-pre-wrap">{design.description}</p>
            <div className="flex items-center gap-2 bg-[#F8F9FA] p-4 rounded-lg mt-4 border border-[#E1E3DF]">
              <ShieldCheck className="w-5 h-5 text-gray-500" />
              <span><strong>Fondo Liso Reglamentario:</strong> Este color ({design.bgColor}) ayuda a cumplir la regla del código de color escolar.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="w-full lg:w-2/5 space-y-6">
          
          <div>
            <div className="text-sm text-pink-600 font-bold mb-1">LibretasUnicasMX</div>
            <h1 className="text-2xl font-light text-[#222222] leading-tight mb-2">
              Forro Adhesivo Personalizado - {design.title}
            </h1>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-sm text-[#595959] underline">128 reseñas</span>
            </div>
            
            <div className="text-3xl font-bold text-[#222222]">
              ${totalPrice.toFixed(2)} MXN
            </div>
            {isPackage && <div className="text-xs text-green-700 font-semibold mt-1">✓ Descuento de paquete aplicado</div>}
            <div className="text-sm text-[#595959] mt-1">IVA incluido (donde corresponda).</div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E1E3DF]">
            
            {/* Modalidad Selector */}
            <div>
              <label className="block text-sm font-bold text-[#222222] mb-1">
                Modalidad de Compra <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full border border-[#E1E3DF] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#222222] bg-white shadow-sm"
                value={isPackage ? 'package' : 'single'}
                onChange={(e) => setIsPackage(e.target.value === 'package')}
              >
                <option value="package">Paquete de 6 Libretas ($80 c/u - Total $480)</option>
                <option value="single">Libreta Individual (1 pza - Total $100)</option>
              </select>
            </div>

            {/* Customization Inputs */}
            <div>
              <label className="block text-sm font-bold text-[#222222] mb-1">
                Nombre de la Materia <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-[#E1E3DF] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#222222] shadow-sm"
                placeholder="Ej. MATEMÁTICAS"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#222222] mb-1">
                Nombre del Alumno <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-[#595959] mb-2">Ingresa el nombre exactamente como quieres que aparezca en la portada inferior.</p>
              <input 
                type="text" 
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full border border-[#E1E3DF] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#222222] shadow-sm"
                placeholder="Ej. Sofía Martínez"
              />
            </div>

            {/* Add to cart */}
            <div className="pt-2">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#222222] hover:bg-black text-white font-bold rounded-full py-4 text-base transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Añadir al carrito
              </button>
            </div>

            {/* Badges / Assurances */}
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex items-center gap-3 text-sm text-[#222222]">
                <Check className="w-5 h-5 text-green-600" />
                <span><strong>Calidad garantizada.</strong> Impresión láser de alta resolución.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#222222]">
                <Check className="w-5 h-5 text-green-600" />
                <span><strong>Material adhesivo plastificado.</strong> Resiste agua y desgaste escolar.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#222222]">
                <Check className="w-5 h-5 text-green-600" />
                <span><strong>Lomo continuo.</strong> Cubre frente, lomo y reverso de la libreta.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
