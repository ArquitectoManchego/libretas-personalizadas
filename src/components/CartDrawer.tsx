import React, { useState } from 'react';
import { CartItem } from '../types';
import { saveOrderToFirebase } from '../firebase';
import confetti from 'canvas-confetti';
import { X, Trash2, ShoppingBag, Send, CheckCircle2, Package, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  const grandTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleCheckoutWhatsApp = async () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);

    // Save order to Firebase
    const orderData = {
      customerName: customerName || 'Cliente',
      customerPhone: customerPhone || 'Sin teléfono',
      items: cart,
      grandTotal: grandTotal
    };

    await saveOrderToFirebase(orderData);

    // Launch confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log(e);
    }

    // Build WhatsApp pre-filled message text
    let message = `*¡HOLA! QUIERO REALIZAR UN PEDIDO DE FORROS ESCOLARES ADHESIVOS* 📚✨\n\n`;
    if (customerName) message += `👤 *Cliente:* ${customerName}\n`;
    if (customerPhone) message += `📞 *Teléfono:* ${customerPhone}\n`;
    message += `──────────────────\n`;
    message += `📦 *DETALLE DE LIBRETAS EN MI PEDIDO:*\n\n`;

    cart.forEach((item, index) => {
      const typeLabel = item.isCustom ? '🎨 Personalizado' : '⭐ Catálogo';
      const modeLabel = item.isPackage ? 'Paquete 6 impresiones ($' + item.unitPrice + ' c/u)' : 'Pieza Individual ($' + item.unitPrice + ')';
      
      message += `*${index + 1}. ${item.subject.toUpperCase()}* (${typeLabel})\n`;
      message += `   • Alumno: ${item.studentName}\n`;
      message += `   • Modalidad: ${modeLabel}\n`;
      message += `   • Personaje/Logo: ${item.characterName}\n`;
      message += `   • Color Fondo: ${item.bgColor}\n`;
      message += `   • Subtotal: $${item.totalPrice} MXN\n\n`;
    });

    message += `──────────────────\n`;
    message += `💰 *TOTAL A PAGAR:* *$${grandTotal} MXN*\n\n`;
    message += `Por favor indíquenme los datos de pago y tiempo de entrega. ¡Gracias!`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMsg}`;

    setIsSubmitting(false);
    setOrderSent(true);

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fade-in flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="font-extrabold text-lg">Mi Pedido ({cart.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mx-auto text-2xl">
                📚
              </div>
              <h4 className="font-bold text-gray-800 text-lg">Tu carrito está vacío</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Explora el catálogo o crea tus diseños personalizados y añádelos aquí.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartId}
                className="p-4 rounded-2xl border border-gray-200 bg-gray-50/70 flex items-center justify-between gap-3 relative group"
              >
                {/* Visual miniature */}
                <div 
                  className="w-14 h-16 rounded-xl border flex flex-col justify-between items-center p-1 text-[8px] font-bold text-center overflow-hidden shrink-0 shadow-sm"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <span className="truncate w-full text-white drop-shadow-xs">{item.subject}</span>
                  <img src={item.characterImg} alt="" className="w-7 h-7 object-contain" />
                  <span className="truncate w-full text-gray-900">{item.studentName}</span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-gray-900 text-sm truncate">{item.subject}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${item.isCustom ? 'bg-purple-100 text-purple-700' : 'bg-pink-100 text-pink-700'}`}>
                      {item.isCustom ? 'Custom' : 'Catálogo'}
                    </span>
                  </div>

                  <p className="text-gray-600 truncate mt-0.5">Alumno: <strong>{item.studentName}</strong></p>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-gray-500">
                      {item.isPackage ? `Paq. 6 ($${item.unitPrice} c/u)` : `Indiv. ($${item.unitPrice})`}
                    </span>
                    <span className="font-black text-pink-600 text-xs">
                      ${item.totalPrice} MXN
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(item.cartId)}
                  className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-red-100 text-gray-500 hover:text-red-600 flex items-center justify-center transition-colors shrink-0"
                  title="Eliminar de mi pedido"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Customer Form & WhatsApp Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-4">
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">Tus datos para la entrega (Opcional):</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Tu Nombre"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp / Teléfono"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
              <span className="text-sm font-bold text-gray-700">Total General:</span>
              <span className="text-2xl font-black text-pink-600">${grandTotal} MXN</span>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-base transition-all hover:scale-102"
            >
              <Send className="w-5 h-5" /> Enviar Pedido por WhatsApp
            </button>

            <button
              onClick={onClearCart}
              className="w-full text-center text-xs text-gray-400 hover:text-red-500 transition-colors py-1"
            >
              Vaciar mi pedido
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
