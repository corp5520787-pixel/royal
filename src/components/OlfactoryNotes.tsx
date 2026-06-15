import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, Info } from 'lucide-react';
import { OlfactoryNote } from '../types';

const COMPOSITION_NOTES: OlfactoryNote[] = [
  {
    id: 'salida',
    name: 'Salida',
    ingredients: 'bergamota de calabria, ciruela negra, hoja de violeta salvaje',
    description: 'La tensión inicial que impacta con frescura cítrica y mística frutal profunda.',
    intensity: 'Intensidad Cítrica Eléctrica',
    hue: 'from-amber-500/10 to-purple-900/20'
  },
  {
    id: 'corazon',
    name: 'Corazón',
    ingredients: 'iris de florencia, rosa ahumada, azafrán heleno',
    description: 'El alma noble de la fragancia. Un bouquet ahumado enriquecido con especias nocturnas.',
    intensity: 'Elegancia Hermética Floral',
    hue: 'from-purple-900/20 to-indigo-950/20'
  },
  {
    id: 'fondo',
    name: 'Fondo',
    ingredients: 'ámbar gris líquido, madera de cedro blanco, vainilla noir',
    description: 'La estela persistente e imborrable que reside sobre la piel durante horas tras el anochecer.',
    intensity: 'Calidez Nocturna Adictiva',
    hue: 'from-amber-950/30 to-black'
  }
];

export default function OlfactoryNotes() {
  const [selectedNote, setSelectedNote] = useState<OlfactoryNote | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto" id="olfactory-notes-widget">
      <div className="mb-8">
        <span className="text-[10px] uppercase tracking-[0.35em] text-sleek-dim font-mono block mb-1">
          La Composición
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-sleek-text">
          Construido en capas
        </h2>
        <p className="mt-4 text-sm text-sleek-dim max-w-2xl mx-auto leading-relaxed">
          La energía brillante surge primero, luego da paso a un corazón más rico y una base cálida y persistente. Haz clic en cada etapa para revelar el misticismo detrás de su alquimia.
        </p>
      </div>

      {/* Layer Stack Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {COMPOSITION_NOTES.map((note, index) => {
          const isActive = selectedNote?.id === note.id;
          return (
            <motion.div
              key={note.id}
              onClick={() => setSelectedNote(isActive ? null : note)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className={`cursor-pointer rounded-sm border border-white/10 p-8 backdrop-blur-md transition-all duration-300 relative overflow-hidden text-left group flex flex-col justify-between min-h-[250px] ${
                isActive ? 'bg-white/10 border-white/35 ring-1 ring-white/20' : 'bg-black/40 hover:bg-white/5 hover:border-white/20'
              }`}
              id={`note-card-${note.id}`}
            >
              {/* Highlight Background Flare */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${note.hue} opacity-50 block transition-all duration-500`} />

              {/* Card Meta Content */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-mono text-white/40 tracking-wider">
                    Fase 0{index + 1}
                  </span>
                  <div className="text-white/30 group-hover:text-white/80 transition-colors">
                    {isActive ? (
                      <Sparkles className="w-4.5 h-4.5 text-purple-400" />
                    ) : (
                      <Eye className="w-4.5 h-4.5" />
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-serif italic text-white/90 group-hover:text-white transition-colors capitalize">
                  {note.name}
                </h3>
                <p className="mt-3 text-xs tracking-wider leading-relaxed text-white/50 group-hover:text-white/75 transition-colors line-clamp-3">
                  {note.ingredients}
                </p>
              </div>

              {/* Reveal indicator trigger */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] tracking-widest uppercase text-white/50 font-mono group-hover:text-white/80 transition-colors">
                  {isActive ? 'Cerrar Alquimia' : 'Explorar Alquimia'}
                </span>
                <Info className="w-3.5 h-3.5 text-white/40 group-hover:text-white/70" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Alchemical Note Detail Disclosure Panel */}
      <div className="relative mt-8 min-h-[140px] md:min-h-[120px]">
        <AnimatePresence mode="wait">
          {selectedNote ? (
            <motion.div
              key={selectedNote.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white/5 border border-white/10 rounded-sm p-6 text-left backdrop-blur-xl relative overflow-hidden"
              id="alchemy-detail-panel"
            >
              {/* Abs Accent Orb */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-purple-600/10 blur-xl pointer-events-none rounded-full" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div className="md:col-span-1 border-r border-white/10 pr-4">
                  <span className="text-[9px] font-mono tracking-widest text-purple-300 block mb-1 uppercase">
                    {selectedNote.intensity}
                  </span>
                  <span className="text-xl font-serif italic text-white capitalize">
                    {selectedNote.name}
                  </span>
                </div>
                <div className="md:col-span-3">
                  <p className="text-sm text-sleek-text leading-relaxed">
                    {selectedNote.description}
                  </p>
                  <p className="text-xs text-sleek-dim mt-2 font-mono italic">
                    Ingredientes principales: {selectedNote.ingredients}.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex items-center justify-center p-8 border border-dashed border-white/5 rounded-sm"
            >
              <p className="text-xs font-mono text-white/30 tracking-widest uppercase">
                [ Selecciona una fase aromática superior para revelar su composición ]
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
