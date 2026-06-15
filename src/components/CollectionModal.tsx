import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Navigation, ArrowRight } from 'lucide-react';
import { PerfumeBottleSize } from '../types';

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (sizeId: string) => void;
}

const COLLECTION_ITEMS: PerfumeBottleSize[] = [
  {
    id: '50ml',
    size: '50 ml / Édition Voyage',
    price: 110,
    description: 'La forma portátil del magnetismo. Diseñado para acompañar al trotamundos exigente sin comprometer la elegancia arquitectónica.'
  },
  {
    id: '100ml',
    size: '100 ml / Signature',
    price: 175,
    description: 'La silueta pura de Royal. Un bloque monolítico de cristal que destila misterio e intensidad equilibrada en su estado perfecto.',
    badge: 'Legendario'
  },
  {
    id: '200ml',
    size: '200 ml / Grand Opulence',
    price: 290,
    description: 'Para estancias que requieren la máxima presencia. Una escultura de cristal macizo con un volumen del doble de sillage absoluto.'
  }
];

export default function CollectionModal({ isOpen, onClose, onSelectSize }: CollectionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-90 cursor-pointer pointer-events-auto"
            id="collection-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="fixed inset-x-4 md:inset-x-0 mx-auto top-1/2 -translate-y-1/2 max-w-5xl bg-[#090909] border border-white/10 z-100 p-8 md:p-12 rounded-[2px] shadow-2xl pointer-events-auto text-left max-h-[90vh] overflow-y-auto"
            id="collection-modal"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-8 pb-4 border-b border-white/5">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400">
                  CRISTALERÍA & ESCULTURA
                </span>
                <h3 className="text-2xl md:text-4xl font-serif font-light text-white mt-1">
                  La Colección Royal
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center border border-white/5 hover:border-white/20 hover:bg-white/5 transition text-white/50 hover:text-white cursor-pointer"
                id="close-collection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sizes Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COLLECTION_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-black border border-white/5 hover:border-white/20 p-6 flex flex-col justify-between rounded-[2px] transition-all duration-300 group h-[280px] md:h-[350px] relative overflow-hidden"
                  id={`collection-item-${item.id}`}
                >
                  {/* Miniature decorative linear gradient backing */}
                  <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-purple-900/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono text-purple-300">0{idx + 1}</span>
                      {item.badge && (
                        <span className="bg-purple-950 text-purple-300 border border-purple-800/30 text-[7px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-lg font-serif text-white/95 group-hover:text-white transition-colors">
                        {item.size}
                      </h4>
                      <p className="text-sm font-mono text-amber-100/80">
                        €{item.price} EUR
                      </p>
                    </div>

                    <p className="text-xs text-white/40 leading-relaxed group-hover:text-white/60 transition-colors line-clamp-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Buy Button inside each card */}
                  <button
                    onClick={() => {
                      onSelectSize(item.id);
                      onClose();
                    }}
                    id={`collection-buy-${item.id}`}
                    className="w-full mt-4 bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black hover:border-white py-2 px-4 rounded-3xs text-[9px] tracking-widest uppercase font-sans transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer relative z-10"
                  >
                    <span>Seleccionar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-center flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-[#F5F5F0]/50">
              <span className="flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                EXTRACTOS DE ACEITES ESCALADOS CON ALTA PRECISIÓN
              </span>
              <span className="uppercase tracking-wider">
                Fabricado en Grasse, Francia
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
