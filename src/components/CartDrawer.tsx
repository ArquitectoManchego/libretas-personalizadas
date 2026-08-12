import React, { useState } from 'react';
import { CartItem } from '../types';
import { saveOrderToFirebase } from '../firebase';
import confetti from 'canvas-confetti';
import { X, Trash2, Send, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden z-10"
          >
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-base text-slate-900">Tu Carrito ({cart.length})</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Tu carrito está vacío actualmente.</p>
                  <button 
                    onClick={onClose}
                    className="text-xs font-extrabold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-full"
                  >
                    Explorar el Catálogo
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4 items-center bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
                    
                    {/* Thumbnail */}
                    <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 overflow-hidden flex-shrink-0 relative shadow-sm">
                      {item.image ? (
                        <img src={item.image} alt={item.subject} className="w-full h-full object-cover"/>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] font-bold text-center" style={{ backgroundColor: item.bgColor }}>
                          <span className="text-slate-900">{item.subject}</span>
                        </div>
                      )}
                    </div>

                    {/* Information */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-extrabold text-slate-900 truncate">{item.subject}</h4>
                        <span className="text-xs font-black text-slate-900 ml-2">${item.totalPrice}</span>
                      </div>
                      <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">Alumno: {item.studentName}</p>
                      <span className="inline-block text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mt-1">
                        {item.isPackage ? 'Paquete 6 ($' + item.unitPrice + ' c/u)' : '1 Libreta ($' + item.unitPrice + ')'}
                      </span>
                    </div>

                    {/* Delete Button */}
                    <button 
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Tu nombre completo (para WhatsApp)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-between text-base font-extrabold text-slate-900 pt-1">
                  <span>Total Final:</span>
                  <span className="text-xl text-indigo-600">${grandTotal.toFixed(2)} MXN</span>
                </div>

                <button
                  onClick={handleCheckoutWhatsApp}
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl py-4 text-xs transition-all shadow-lg shadow-emerald-600/20 flex justify-center items-center gap-2 uppercase tracking-wide"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Pedido por WhatsApp</span>
                </button>

                <button
                  onClick={onClearCart}
                  className="w-full text-center text-[11px] text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Vaciar carrito
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
