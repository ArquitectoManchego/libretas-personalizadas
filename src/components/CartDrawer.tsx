import React, { useState } from 'react';
import { CartItem } from '../types';
import { saveOrderToFirebase } from '../firebase';
import confetti from 'canvas-confetti';
import { X, Trash2, Send } from 'lucide-react';

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

  const grandTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleCheckoutWhatsApp = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    const orderData = {
      customerName: customerName || 'Cliente',
      customerPhone: customerPhone || 'Sin teléfono',
      items: cart,
      grandTotal: grandTotal
    };

    await saveOrderToFirebase(orderData);

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {
      console.log(e);
    }

    let message = `*¡HOLA! QUIERO REALIZAR UN PEDIDO DE FORROS ESCOLARES ADHESIVOS*\n\n`;
    if (customerName) message += `👤 *Cliente:* ${customerName}\n`;
    if (customerPhone) message += `📞 *Teléfono:* ${customerPhone}\n`;
    message += `──────────────────\n`;
    message += `📦 *DETALLE DE LIBRETAS EN MI PEDIDO:*\n\n`;

    cart.forEach((item, index) => {
      const modeLabel = item.isPackage ? 'Paquete 6 ($' + item.unitPrice + ' c/u)' : 'Individual ($' + item.unitPrice + ')';
      
      message += `*${index + 1}. ${item.subject.toUpperCase()}*\n`;
      message += `   • Alumno: ${item.studentName}\n`;
      message += `   • Modalidad: ${modeLabel}\n`;
      if(item.isCustom) message += `   • Personaje: ${item.characterName}\n`;
      message += `   • Subtotal: $${item.totalPrice} MXN\n\n`;
    });

    message += `──────────────────\n`;
    message += `💰 *TOTAL A PAGAR:* *$${grandTotal} MXN*\n\n`;
    message += `Por favor indíquenme los datos de pago y tiempo de entrega. ¡Gracias!`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMsg}`;

    setIsSubmitting(false);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-fade-in-right">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E1E3DF] flex items-center justify-between">
          <h3 className="font-semibold text-lg text-[#222222]">Tu Carrito ({cart.length} artículos)</h3>
          <button onClick={onClose} className="text-[#595959] hover:text-[#222222]">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-[#595959]">Tu carrito está vacío.</p>
              <button onClick={onClose} className="mt-4 text-[#222222] font-semibold underline underline-offset-4">
                Seguir comprando
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex gap-4 items-start border-b border-[#E1E3DF] pb-4">
                
                {/* Image / Preview */}
                <div className="w-20 h-20 bg-[#f1f1f1] rounded-md border border-[#E1E3DF] overflow-hidden flex-shrink-0 relative">
                  {item.image ? (
                     <img src={item.image} alt={item.subject} className="w-full h-full object-cover"/>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-center" style={{ backgroundColor: item.bgColor }}>
                      <span className="text-white drop-shadow-md">{item.subject}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-semibold text-[#222222] line-clamp-1">{item.subject}</h4>
                    <span className="text-sm font-bold text-[#222222]">${item.totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-[#595959] mt-1">Alumno: {item.studentName}</p>
                  <p className="text-xs text-[#595959] mt-1">{item.isPackage ? 'Paquete 6 imp.' : '1 Libreta indiv.'}</p>
                  
                  <button onClick={() => onRemoveItem(item.cartId)} className="mt-2 text-xs text-[#595959] hover:text-red-600 flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E1E3DF] bg-[#F8F9FA] space-y-4">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre para tu pedido"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2 border border-[#E1E3DF] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#222222]"
              />
            </div>

            <div className="flex items-center justify-between text-base font-bold text-[#222222] pt-2">
              <span>Total estimado</span>
              <span>${grandTotal.toFixed(2)} MXN</span>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              disabled={isSubmitting}
              className="w-full bg-[#222222] hover:bg-black text-white font-bold rounded-full py-3.5 text-sm transition-colors flex justify-center items-center gap-2"
            >
              <Send className="w-4 h-4" /> Proceder al pago (WhatsApp)
            </button>
            <button
              onClick={onClearCart}
              className="w-full text-center text-xs text-[#595959] hover:text-[#222222] underline underline-offset-4"
            >
              Vaciar carrito
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
