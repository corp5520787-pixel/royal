import { useState } from 'react';
import { motion } from 'motion/react';
import { Sliders, Sparkles, Navigation } from 'lucide-react';
import { SillageLevel } from '../types';

export default function SillageController() {
  const [level, setLevel] = useState<SillageLevel>('Magnética');

  const configs = {
    Sutil: {
      range: '1 - 2 metros',
      diffusion: 'Difusión táctil e íntima, diseñada para el contacto cercano.',
      scale: 1,
      glowOpacity: 0.2,
      shadowBlur: '20px',
      color: 'rgba(139, 92, 246, 0.15)', // Light violet
      radius: 'w-24 h-24',
    },
    'Magnética': {
      range: '4 - 6 metros',
      diffusion: 'Presencia suspendida de larga duración que acapara miradas sutiles.',
      scale: 1.3,
      glowOpacity: 0.5,
      shadowBlur: '45px',
      color: 'rgba(139, 92, 246, 0.35)', // Medium violet
      radius: 'w-44 h-44',
    },
    Imperial: {
      range: 'Más de 10 metros',
      diffusion: 'Firma cinematográfica indeleble. Llena cualquier habitación con misterios profundos.',
      scale: 1.7,
      glowOpacity: 0.75,
      shadowBlur: '70px',
      color: 'rgba(139, 92, 246, 0.65)', // Deep intense violet
      radius: 'w-64 h-64',
    },
  };

  const current = configs[level];

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center" id="sillage-controller">
      {/* Left Text / Controls */}
      <div className="text-left flex flex-col justify-center">
        <span className="text-[10px] uppercase tracking-[0.35em] text-sleek-dim font-mono block mb-1">
          Ritual Diario & Atmosférico
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-sleek-text mb-6">
          Más que un aroma
        </h2>
        <p className="text-sm text-sleek-dim leading-relaxed mb-8">
          Royal es una atmósfera suspendida entre la luz de terciopelo y la sombra. Transforma el acto de usar fragancia en un ritual de presencia. Controla el radio de difusión y estela de tu proyección mística.
        </p>

        {/* Level Controls */}
        <div className="space-y-4 p-4 border border-white/5 rounded-[2px] bg-black/30 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-white/70 tracking-wider mb-2">
            <Sliders className="w-4 h-4 text-purple-400" />
            <span>ESTELA & PROYECCIÓN (SILLAGE)</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(['Sutil', 'Magnética', 'Imperial'] as SillageLevel[]).map((lvl) => {
              const isSelected = level === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  id={`sillage-button-${lvl}`}
                  className={`py-2 text-[10px] tracking-widest uppercase font-sans font-medium transition-all duration-300 pointer-events-auto cursor-pointer rounded-sm ${
                    isSelected
                      ? 'bg-white text-black font-semibold'
                      : 'bg-white/5 text-white/50 border border-white/5 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>

          {/* Level Info Grid */}
          <div className="pt-3 border-t border-white/5 mt-2">
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <span className="text-white/40">Radio Estimado:</span>
              <span className="text-purple-300 font-semibold">{current.range}</span>
            </div>
            <p className="text-xs text-white/60 min-h-[40px] leading-relaxed transition-all">
              {current.diffusion}
            </p>
          </div>
        </div>
      </div>

      {/* Right Immersive Interactive Visualizer Stage */}
      <div className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center bg-black/45 border border-white/5 rounded-sm overflow-hidden backdrop-blur-md">
        {/* Animated Radial Concentric Waves */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Wave 1 */}
          <motion.div
            animate={{
              scale: current.scale * 1.5,
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{ borderColor: current.color }}
            className="absolute rounded-full border border-dashed text-purple-500/10 w-48 h-48"
          />

          {/* Wave 2 (Larger and slower) */}
          <motion.div
            animate={{
              scale: current.scale * 2.2,
              opacity: [0.15, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 1.5,
            }}
            style={{ borderColor: current.color }}
            className="absolute rounded-full border border-dashed text-purple-500/10 w-48 h-48"
          />

          {/* Halo Glow */}
          <motion.div
            animate={{
              width: current.scale * 130,
              height: current.scale * 130,
              opacity: current.glowOpacity,
            }}
            style={{
              backgroundColor: '#4A306D',
              filter: `blur(${current.shadowBlur})`,
            }}
            className="absolute rounded-full transition-all duration-700 pointer-events-none"
          />
        </div>

        {/* Minimalist 3D-Look Physical Bottle Outline */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col items-center"
          >
            {/* Spray Dispenser Cap */}
            <div className="w-10 h-8 bg-gradient-to-r from-zinc-800 to-zinc-600 border border-white/10 rounded-sm relative shadow-inner">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-1 bg-zinc-950" />
              {/* Nozzle opening details */}
              <div className="absolute right-[2px] top-3 w-1 h-2 bg-black" />
            </div>

            {/* Glass Neck Connector */}
            <div className="w-6 h-3 bg-gradient-to-r from-yellow-700/80 to-amber-600/80 border border-white/15" />

            {/* Heavy Luxury Glass Bottle Body */}
            <div className="w-24 h-40 bg-zinc-950/80 backdrop-blur-md rounded-sm border border-white/20 p-2 flex flex-col justify-between items-center relative overflow-hidden group">
              {/* High-fashion geometric glass reflections inside */}
              <div className="absolute top-0 bottom-0 left-0 w-2 bg-white/10 skew-x-12 transform origin-top pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-4 w-1 bg-white/5 group-hover:bg-white/15 transition-all duration-300 pointer-events-none" />
              
              {/* Ambient fluid volume filling inside (interactive color shifting) */}
              <motion.div
                animate={{
                  height: '65%',
                  opacity: current.glowOpacity + 0.3,
                }}
                className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-purple-950/80 via-indigo-950/60 to-transparent z-0 transition-all duration-500"
              />

              {/* Fragrance Label */}
              <div className="relative z-10 border border-white/10 bg-black/60 w-full rounded-xs py-3 mt-4 text-center">
                <span className="text-[7px] uppercase font-mono tracking-widest text-white/40 block">
                  PARFUM DE LUXE
                </span>
                <span className="text-xs font-serif tracking-[0.2em] text-white/95 font-medium block mt-1">
                  ROYAL
                </span>
              </div>

              {/* Status details inside label */}
              <div className="relative z-10 mb-2">
                <span className="text-[6px] uppercase font-mono tracking-widest text-[#F5F5F0]/40">
                  ESTELA: {level}
                </span>
              </div>
            </div>
          </motion.div>

          <span className="text-[9px] font-mono tracking-widest text-white/40 mt-6 flex items-center gap-1.5 uppercase">
            <Sparkles className="w-2.5 h-2.5 text-purple-400 animate-pulse" /> COMPORTAMIENTO FISICO
          </span>
        </div>
      </div>
    </div>
  );
}
