import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ChevronRight, ArrowLeft, ShoppingBag, CreditCard, ShieldCheck } from 'lucide-react';
import { PerfumeBottleSize, CheckoutFormState } from '../types';

interface PurchaseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSizeId?: string;
}

const BOTTLE_SIZES: PerfumeBottleSize[] = [
  {
    id: '50ml',
    size: '50 ml',
    price: 110,
    description: 'La esencia compacta ideal para viajes y un tocador refinado y minimalista.'
  },
  {
    id: '100ml',
    size: '100 ml',
    price: 175,
    description: 'Nuestra firma clásica para la mesita de noche. El diseño icónico completo.',
    badge: 'Bestseller'
  },
  {
    id: '200ml',
    size: '200 ml',
    price: 290,
    description: 'Intensidad sin límites. Hecho para devotos de la presencia y el magnetismo absoluto.'
  }
];

export default function PurchaseDrawer({ isOpen, onClose, defaultSizeId = '100ml' }: PurchaseDrawerProps) {
  const [selectedSize, setSelectedSize] = useState<PerfumeBottleSize>(
    BOTTLE_SIZES.find((s) => s.id === defaultSizeId) || BOTTLE_SIZES[1]
  );
  const [engravingText, setEngravingText] = useState('');
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [step, setStep] = useState<'details' | 'checkout' | 'success'>('details');

  // Checkout inputs state
  const [form, setForm] = useState<CheckoutFormState>({
    email: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<CheckoutFormState>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (formErrors[name as keyof CheckoutFormState]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<CheckoutFormState> = {};
    if (!form.email || !form.email.includes('@')) errors.email = 'Introduce un email válido';
    if (!form.name) errors.name = 'El nombre es obligatorio';
    if (!form.address) errors.address = 'La dirección es obligatoria';
    if (!form.city) errors.city = 'La ciudad es obligatoria';
    if (!form.zip || form.zip.length < 3) errors.zip = 'Código postal no válido';
    if (!form.cardName) errors.cardName = 'Nombre en tarjeta obligatorio';
    if (form.cardNumber.replace(/\s/g, '').length < 13) errors.cardNumber = 'Número de tarjeta inválido';
    if (!form.cardExpiry || !form.cardExpiry.includes('/')) errors.cardExpiry = 'MM/AA es obligatorio';
    if (form.cardCvv.length < 3) errors.cardCvv = 'CVV inválido';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep('success');
    }
  };

  const handleCardNumberKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic auto card separator
    let val = e.target.value.replace(/\D/g, '');
    let newVal = '';
    for (let i = 0; i < val.length; i++) {
      if (i > 0 && i % 4 === 0) newVal += ' ';
      newVal += val[i];
    }
    setForm((prev) => ({ ...prev, cardNumber: newVal.slice(0, 19) }));
  };

  const handleExpiryKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4);
    }
    setForm((prev) => ({ ...prev, cardExpiry: val.slice(0, 5) }));
  };

  const activePrice = selectedSize.price + (engravingText ? 15 : 0) + (giftWrapping ? 8 : 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-90 cursor-pointer pointer-events-auto"
            id="modal-backdrop"
          />

          {/* Sidedrawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[500px] bg-neutral-950 border-l border-white/10 z-100 flex flex-col shadow-2xl overflow-y-auto pointer-events-auto text-left"
            id="purchase-drawer-panel"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-neutral-950/95 backdrop-blur-lg z-20">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-serif italic text-white/95">
                  L&apos;Atelier de Parfums Royal
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center border border-white/5 hover:border-white/15 hover:bg-white/5 rounded-full text-white/60 hover:text-white transition-all cursor-pointer"
                id="close-drawer-button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Content */}
            <div className="flex-1 p-6 md:p-8 space-y-6">
              {step === 'details' && (
                <>
                  {/* Perfume Overview Header */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400">
                      PARFUM UNISEX MULTIFACÉTICO
                    </span>
                    <h3 className="text-3xl font-serif tracking-normal text-white">
                      ROYAL PARFUM
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Una firma oriental especiada profunda, equilibrada con bergamota vibrante, iris elegante y un fondo persistente de vainilla y ámbar.
                    </p>
                  </div>

                  {/* Size Select Block */}
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#F5F5F0]/65 block">
                      Selecciona un Tamaño
                    </span>
                    <div className="space-y-3">
                      {BOTTLE_SIZES.map((sizeObj) => {
                        const isSelected = selectedSize.id === sizeObj.id;
                        return (
                          <div
                            key={sizeObj.id}
                            onClick={() => setSelectedSize(sizeObj)}
                            id={`size-row-${sizeObj.id}`}
                            className={`border rounded-sm p-4 cursor-pointer transition-all flex flex-col justify-between group ${
                              isSelected
                                ? 'border-white bg-white/[0.03]'
                                : 'border-white/5 bg-neutral-900/50 hover:border-white/15 hover:bg-neutral-900'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <span className={`w-3.5 h-3.5 rounded-full border border-white/20 flex items-center justify-center p-0.5 ${
                                  isSelected ? 'border-white' : ''
                                }`}>
                                  {isSelected && <div className="w-full h-full rounded-full bg-white animate-pulse" />}
                                </span>
                                <span className="text-sm font-sans font-medium text-white group-hover:text-white/90">
                                  {sizeObj.size}
                                </span>
                                {sizeObj.badge && (
                                  <span className="bg-purple-900/40 text-purple-200 border border-purple-800/20 text-[7px] uppercase font-mono px-2 py-0.5 rounded-full tracking-widest">
                                    {sizeObj.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-sm font-mono font-semibold text-white/90">
                                €{sizeObj.price} EUR
                              </span>
                            </div>
                            {isSelected && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="text-xs text-white/50 leading-relaxed mt-2.5 pt-2 border-t border-white/5"
                              >
                                {sizeObj.description}
                              </motion.p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Personalized Silver Engraving Option */}
                  <div className="border border-white/5 rounded-sm p-5 bg-neutral-900/30 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#F5F5F0]/60 block">
                          GRABADO PERSONALIZADO (+€15)
                        </span>
                        <p className="text-xs text-white/50 leading-relaxed">
                          Un recuerdo eterno. Grabamos con láser de plata directamente en la base del cristal.
                        </p>
                      </div>
                      <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        maxLength={8}
                        placeholder="Ej. R-2026 (Max 8 carac.)"
                        value={engravingText}
                        onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                        id="input-engraving"
                        className="w-full bg-neutral-950 border border-white/10 rounded-xs py-2 px-3 text-xs tracking-widest text-white/90 uppercase focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all font-mono"
                      />
                      {engravingText && (
                        <button
                          onClick={() => setEngravingText('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-purple-400 hover:text-white uppercase tracking-wider"
                        >
                          Limpiar
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Gift Wrapping checkbox */}
                  <label className="flex items-center gap-3 border border-white/5 p-4 rounded-sm bg-neutral-900/20 cursor-pointer select-none group hover:border-white/15 transition-all">
                    <input
                      type="checkbox"
                      checked={giftWrapping}
                      onChange={(e) => setGiftWrapping(e.target.checked)}
                      id="checkbox-wrapping"
                      className="accent-purple-600 w-4 h-4 cursor-pointer"
                    />
                    <div className="text-left">
                      <span className="text-xs font-sans font-medium text-white block group-hover:text-white/90">
                        Caja de Regalo de Lujo Royal (+€8)
                      </span>
                      <span className="text-[10px] text-white/40 block leading-tight mt-0.5">
                        Papel texturizado negro absoluto, cinta satinada perfumada y tarjeta de felicitación hecha a mano.
                      </span>
                    </div>
                  </label>

                  {/* Summary Footer */}
                  <div className="pt-6 border-t border-white/5 mt-4 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-white/40">Subtotal</span>
                      <span className="text-white/70">€{selectedSize.price}</span>
                    </div>
                    {engravingText && (
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white/40">Grabado Personalizado</span>
                        <span className="text-purple-300">€15</span>
                      </div>
                    )}
                    {giftWrapping && (
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white/40">Caja de Regalo de Lura</span>
                        <span className="text-purple-300">€8</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t border-white/5 pt-3">
                      <span className="text-sm font-serif italic text-white/80">Importe Total</span>
                      <span className="text-xl font-semibold text-white">€{activePrice} EUR</span>
                    </div>

                    <button
                      onClick={() => setStep('checkout')}
                      id="continue-to-checkout"
                      className="w-full bg-white hover:bg-[#F5F5F0]/90 text-black py-3.5 rounded-sm font-sans text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>Proceder al pago</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] text-white/35 font-mono tracking-widest text-center block uppercase mt-2">
                      Pago seguro cifrado SSL de 256 bits
                    </span>
                  </div>
                </>
              )}

              {step === 'checkout' && (
                <form onSubmit={handleSubmitCheckout} className="space-y-5">
                  <header className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="text-xs text-white/50 hover:text-white flex items-center gap-1.5 uppercase font-mono transition"
                    >
                      <ArrowLeft className="w-4.5 h-4.5" />
                      <span>Volver</span>
                    </button>
                    <span className="text-xs font-mono text-purple-400">PASO 2 DE 2</span>
                  </header>

                  <h3 className="text-xl font-serif text-white tracking-wide">Dirección de Envío</h3>

                  {/* Shipping Grid */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/50 block mb-1 font-mono">Correo Electrónico</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleInputChange}
                        id="billing-email"
                        className="w-full bg-neutral-900 border border-white/10 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-white transition-all font-sans"
                        placeholder="ejemplo@lux-royal.com"
                      />
                      {formErrors.email && <p className="text-[10px] text-red-400 mt-1">{formErrors.email}</p>}
                    </div>

                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/50 block mb-1 font-mono">Nombre Completo</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleInputChange}
                        id="billing-name"
                        className="w-full bg-neutral-900 border border-white/10 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-white transition-all font-sans"
                        placeholder="Sébastien Laurent"
                      />
                      {formErrors.name && <p className="text-[10px] text-red-400 mt-1">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/50 block mb-1 font-mono">Dirección Completa</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={form.address}
                        onChange={handleInputChange}
                        id="billing-address"
                        className="w-full bg-neutral-900 border border-white/10 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-white transition-all font-sans"
                        placeholder="Av. Castellana 44, 4º B"
                      />
                      {formErrors.address && <p className="text-[10px] text-red-400 mt-1">{formErrors.address}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                        <label className="text-[9px] uppercase tracking-widest text-white/50 block mb-1 font-mono">Ciudad</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={form.city}
                          onChange={handleInputChange}
                          id="billing-city"
                          className="w-full bg-neutral-900 border border-white/10 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-white transition-all"
                          placeholder="Madrid"
                        />
                        {formErrors.city && <p className="text-[10px] text-red-400 mt-1">{formErrors.city}</p>}
                      </div>
                      <div className="col-span-1">
                        <label className="text-[9px] uppercase tracking-widest text-white/50 block mb-1 font-mono">Provincia</label>
                        <input
                          type="text"
                          name="state"
                          value={form.state}
                          onChange={handleInputChange}
                          id="billing-state"
                          className="w-full bg-neutral-900 border border-white/10 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-white transition-all"
                          placeholder="Madrid"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[9px] uppercase tracking-widest text-white/50 block mb-1 font-mono">Cód. Postal</label>
                        <input
                          type="text"
                          name="zip"
                          required
                          value={form.zip}
                          onChange={handleInputChange}
                          id="billing-zip"
                          className="w-full bg-neutral-900 border border-white/10 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-white transition-all font-mono"
                          placeholder="28001"
                        />
                        {formErrors.zip && <p className="text-[10px] text-red-400 mt-1">{formErrors.zip}</p>}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif text-white tracking-wide pt-4 border-t border-white/5">Información De Pago</h3>

                  {/* Payment Info */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/50 block mb-1 font-mono">Nombre de la Tarjeta</label>
                      <input
                        type="text"
                        name="cardName"
                        required
                        value={form.cardName}
                        onChange={handleInputChange}
                        id="payment-card-name"
                        className="w-full bg-neutral-900 border border-white/10 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-white transition-all font-sans"
                        placeholder="Mismo de la identificación"
                      />
                      {formErrors.cardName && <p className="text-[10px] text-red-400 mt-1">{formErrors.cardName}</p>}
                    </div>

                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/50 block mb-1 font-mono">Número De Tarjeta</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          required
                          value={form.cardNumber}
                          onChange={handleCardNumberKeyPress}
                          id="payment-card-number"
                          className="w-full bg-neutral-900 border border-white/10 rounded-sm p-2.5 pr-10 text-xs text-white focus:outline-none focus:border-white transition-all font-mono"
                          placeholder="0000 0000 0000 0000"
                        />
                        <CreditCard className="w-4.5 h-4.5 text-white/30 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                      {formErrors.cardNumber && <p className="text-[10px] text-red-400 mt-1">{formErrors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] uppercase tracking-widest text-white/50 block mb-1 font-mono">Vencimiento</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          required
                          placeholder="MM/AA"
                          value={form.cardExpiry}
                          onChange={handleExpiryKeyPress}
                          id="payment-card-expiry"
                          className="w-full bg-neutral-900 border border-white/10 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-white transition-all font-mono"
                        />
                        {formErrors.cardExpiry && <p className="text-[10px] text-red-400 mt-1">{formErrors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className="text-[9px] uppercase tracking-widest text-white/50 block mb-1 font-mono">CVV (Código de seg.)</label>
                        <input
                          type="password"
                          name="cardCvv"
                          required
                          maxLength={4}
                          value={form.cardCvv}
                          onChange={handleInputChange}
                          id="payment-card-cvv"
                          className="w-full bg-neutral-900 border border-white/10 rounded-sm p-2.5 text-xs text-white focus:outline-none focus:border-white transition-all font-mono"
                          placeholder="123"
                        />
                        {formErrors.cardCvv && <p className="text-[10px] text-red-400 mt-1">{formErrors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Action Summary */}
                  <div className="pt-6 border-t border-white/5 mt-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs text-white/50">Selección:</span>
                      <span className="text-xs text-white/90">Royal Parfum — {selectedSize.size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-serif italic text-white/80">Monto Final</span>
                      <span className="text-xl font-semibold text-white">€{activePrice} EUR</span>
                    </div>

                    <button
                      type="submit"
                      id="submit-payment"
                      className="w-full bg-gradient-to-r from-purple-800 to-indigo-900 hover:from-purple-700 hover:to-indigo-800 text-white py-3.5 rounded-sm font-sans text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4.5 h-4.5" />
                      <span>Autorizar Pago de Lujo</span>
                    </button>
                    <span className="text-[9px] text-[#F5F5F0]/40 font-mono tracking-widest text-center block uppercase">
                      Información encriptada AES con estándares PCI-DSS
                    </span>
                  </div>
                </form>
              )}

              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8 py-10 text-center"
                  id="checkout-success-stage"
                >
                  <div className="flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15, delay: 0.2 }}
                      className="w-16 h-16 bg-purple-950 border border-purple-500/30 text-purple-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                    >
                      <Check className="w-8 h-8" />
                    </motion.div>

                    <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-purple-400 mb-2 block">
                      Transacción Exitosa — L&apos;Atelier
                    </span>
                    <h3 className="text-3xl font-serif text-white leading-tight">
                      Tu frasco ha sido reservado
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed max-w-sm mt-3 mx-auto">
                      Hemos enviado el correo de confirmación de pedido con tu número de seguimiento a <span className="text-white/80 font-mono font-medium">{form.email}</span>. Su preparación artesanal comenzará inmediatamente.
                    </p>
                  </div>

                  {/* High Quality Render of Engraved Bottle */}
                  <div className="p-6 bg-neutral-900/50 border border-white/5 rounded-sm relative overflow-hidden flex flex-col items-center justify-center">
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-purple-600/5 blur-xl pointer-events-none rounded-full" />
                    
                    {/* Tiny CSS bottle */}
                    <div className="w-14 h-20 bg-zinc-950 border border-white/20 rounded-xs flex flex-col justify-end items-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent" />
                      {/* Engraving visible! */}
                      {engravingText && (
                        <div className="relative z-10 mb-2 border border-white/10 px-1.5 py-0.5 rounded-3xs bg-black/60 scale-75">
                          <span className="text-[6px] font-mono tracking-widest text-[#F5F5F0] italic uppercase block">
                            {engravingText}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-center mt-4">
                      <span className="text-[9px] font-mono tracking-widest text-[#F5F5F0]/40 uppercase block">
                        Detalles del pedido
                      </span>
                      <span className="text-xs font-serif text-white inline-block mt-1 font-medium">
                        Frasco de Cristal {selectedSize.size} {engravingText ? `con grabado "${engravingText}"` : ''}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <button
                      onClick={() => {
                        setStep('details');
                        setEngravingText('');
                        setGiftWrapping(false);
                        onClose();
                      }}
                      id="finish-order-button"
                      className="w-full bg-white text-black hover:bg-white/90 py-3 rounded-sm font-sans text-xs tracking-widest uppercase font-semibold transition cursor-pointer"
                    >
                      Continuar explorando
                    </button>
                    <span className="text-[9px] text-[#F5F5F0]/30 font-mono tracking-wider italic block">
                      Gracias por confiar en Royal Parfums. Diseñado para un impacto inolvidable.
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
