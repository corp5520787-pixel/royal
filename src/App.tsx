import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  ArrowDown, 
  Sparkles, 
  ShoppingBag, 
  Eye, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  MousePointerClick
} from 'lucide-react';

// Modular Custom Components
import OlfactoryNotes from './components/OlfactoryNotes';
import SillageController from './components/SillageController';
import PurchaseDrawer from './components/PurchaseDrawer';
import CollectionModal from './components/CollectionModal';

// Chapters tracking mapping for the pinned vertically rotated side-indicator
const CHAPTERS = [
  { id: 'sec-hero', label: '01 / INICIO — LA INTRODUCCIÓN' },
  { id: 'sec-presencia', label: '02 / PRESENCIA — LA ESENCIA' },
  { id: 'sec-notas', label: '03 / COMPOSICIÓN — CAPAS' },
  { id: 'sec-atmosfera', label: '04 / ATMÓSFERA — RITUAL' },
  { id: 'sec-objeto', label: '05 / EL FRASCO — OBJETO' },
  { id: 'sec-cta', label: '06 / EL ATELIER — COMPRAR' }
];

export default function App() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [selectedSizeId, setSelectedSizeId] = useState('100ml');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Scroll Progress Hooks
  const { scrollYProgress } = useScroll();

  // Background video fades to 0.4 capacity from 0.8 to 1.0 scroll progression
  const videoOpacityVal = useTransform(scrollYProgress, [0, 0.8, 1.0], [0.85, 0.85, 0.4]);
  // Scroll hint fades out early on scroll
  const hintOpacityVal = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Audio Toggle Controller
  const toggleAudio = () => {
    if (videoRef.current) {
      const currentMute = videoRef.current.muted;
      videoRef.current.muted = !currentMute;
      setIsVideoMuted(!currentMute);
    }
  };

  // Scrollspy to detect active viewport division
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.15,
    };

    const handleObserve = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedIdx = CHAPTERS.findIndex((ch) => ch.id === entry.target.id);
          if (matchedIdx !== -1) {
            setActiveChapter(matchedIdx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleObserve, observerOptions);

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => {
      CHAPTERS.forEach((ch) => {
        const el = document.getElementById(ch.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Handler to open purchase with preset item size
  const triggerPurchase = (sizeId: string) => {
    setSelectedSizeId(sizeId);
    setIsPurchaseOpen(true);
  };

  const handleSmoothScroll = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white selection:bg-purple-800 selection:text-white font-sans w-full overflow-x-hidden">
      
      {/* 1. FIXED BACKGROUND VIDEO BACKDROP */}
      <motion.div 
        style={{ opacity: videoOpacityVal }}
        className="fixed inset-0 w-full h-full p-0 m-0 overflow-hidden select-none pointer-events-none z-0 bg-black transition-all duration-300"
      >
        <video
          ref={videoRef}
          src="https://peru-koala-693771.hostingersite.com/wp-content/uploads/2026/04/perfume_full.mp4"
          loop
          muted
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-102"
        />
        {/* Cinematic Vignette Shadows Grid Overlay */}
        <div className="absolute inset-0 vignette-overlay bg-black/45" />
      </motion.div>

      {/* 2. PINNED NAVIGATION HEADER BAR */}
      <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 md:py-10 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-xs">
        {/* Logo and Brand Title */}
        <div 
          onClick={() => handleSmoothScroll('sec-hero')}
          className="font-serif font-light text-2xl tracking-[0.4em] text-[#F5F5F0] hover:text-white cursor-pointer active:scale-95 transition-all"
          id="brand-logo"
        >
          ROYAL
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => handleSmoothScroll('sec-notas')} 
            className="text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition duration-300 font-medium font-sans cursor-pointer"
          >
            Colección
          </button>
          <button 
            onClick={() => handleSmoothScroll('sec-presencia')} 
            className="text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition duration-300 font-medium font-sans cursor-pointer"
          >
            La Película
          </button>
          <button 
            onClick={() => handleSmoothScroll('sec-objeto')} 
            className="text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition duration-300 font-medium font-sans cursor-pointer"
          >
            Atelier
          </button>

          {/* Checkout Trigger */}
          <button
            onClick={() => triggerPurchase('100ml')}
            id="nav-buy-now"
            className="border border-white/20 hover:border-white px-6 py-2.5 rounded-3xs text-[10px] tracking-[0.25em] bg-transparent hover:bg-white hover:text-black transition-all duration-500 uppercase font-sans font-medium cursor-pointer"
          >
            Comprar ahora
          </button>
        </div>

        {/* Mobile Mini Burger Trigger */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => triggerPurchase('100ml')}
            className="bg-white text-black px-4 py-1.5 rounded-3xs text-[9px] tracking-widest uppercase font-sans font-bold"
          >
            Comprar
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-white/10 rounded-full hover:bg-white/5 text-white cursor-pointer"
            id="mobile-menu-trigger"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE SEAMLESS OVERLAY SIDEBAR */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-y-0 right-0 w-80 bg-[#070707] border-l border-white/10 z-60 p-8 flex flex-col justify-between"
            id="mobile-navigation-panel"
          >
            <div className="space-y-12">
              <div className="flex justify-between items-center pb-6 border-b border-white/5">
                <span className="font-serif tracking-[0.3em] font-light text-xl">ROYAL</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-left">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSmoothScroll('sec-hero');
                  }}
                  className="text-lg font-serif italic text-white/70 hover:text-white text-left"
                >
                  La Introducción
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSmoothScroll('sec-presencia');
                  }}
                  className="text-lg font-serif italic text-white/70 hover:text-white text-left"
                >
                  Presencia
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSmoothScroll('sec-notas');
                  }}
                  className="text-lg font-serif italic text-white/70 hover:text-white text-left"
                >
                  Composición
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSmoothScroll('sec-atmosfera');
                  }}
                  className="text-lg font-serif italic text-white/70 hover:text-white text-left"
                >
                  Ritual de Estela
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSmoothScroll('sec-objeto');
                  }}
                  className="text-lg font-serif italic text-white/70 hover:text-white text-left"
                >
                  El Frasco
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  triggerPurchase('100ml');
                }}
                className="w-full bg-[#F5F5F0] text-black py-3 text-xs tracking-widest uppercase font-medium hover:bg-white rounded-3xs"
              >
                Comprar ahora
              </button>
              <p className="text-[10px] font-mono tracking-widest text-[#F5F5F0]/30 text-center uppercase">
                Ediciones Limitadas — Grasse, FR
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. PINNED ROTATING CHAPTER INDICATOR (LEFT-ALIGN) */}
      <div 
        className="fixed left-6 lg:left-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-12"
        id="pinned-timeline-widget"
      >
        {/* Slim active timeline */}
        <div className="relative w-[1px] h-32 bg-white/10 flex items-start">
          <motion.div
            animate={{ y: activeChapter * 24 }}
            transition={{ type: 'spring', damping: 15 }}
            className="absolute left-[-2px] w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]"
          />
        </div>

        {/* Text Rotation vertical */}
        <div 
          className="text-[9px] font-mono tracking-[0.35em] text-[#F5F5F0]/50 uppercase select-none font-medium h-48 flex items-center justify-center pt-8"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeChapter}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.3 }}
              className="whitespace-nowrap"
            >
              {CHAPTERS[activeChapter].label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* 4. PINNED FLOATING SOUND CONTROL (BOTTOM-RIGHT) */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-41 flex items-center gap-3">
        {/* Ambient music bar indicators */}
        {!isVideoMuted && (
          <div className="flex gap-0.5 items-end h-3 pl-3 pointer-events-none">
            {[0.4, 0.8, 0.5, 0.9, 0.3].map((val, i) => (
              <motion.div
                key={i}
                animate={{ height: ['2px', '14px', '2px'] }}
                transition={{ duration: 1.2 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[2px] bg-purple-400"
              />
            ))}
          </div>
        )}

        <button 
          onClick={toggleAudio}
          id="sound-control-trigger"
          className="w-11 h-11 rounded-full border border-white/10 bg-black/40 backdrop-blur-md hover:bg-black/60 hover:border-white/25 flex items-center justify-center text-white/70 hover:text-white transition duration-300 group cursor-pointer shadow-lg"
          title={isVideoMuted ? 'Reproducir Audio de la Campaña' : 'Silenciar Campaña'}
        >
          {isVideoMuted ? (
            <VolumeX className="w-4 h-4 text-white/50 group-hover:text-white/80" />
          ) : (
            <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />
          )}
        </button>
      </div>

      {/* 5. ACTIVE CONTENT SCROLL CONTAINER */}
      <main className="relative z-20 w-full">
        
        {/* --- SECCIÓN 1: HÉROE (Izq) --- */}
        <section 
          id="sec-hero"
          className="min-h-screen w-full flex flex-col justify-center text-left px-6 sm:px-12 md:px-24 lg:px-44 py-20 relative overflow-hidden"
        >
          <div className="max-w-2xl relative z-10 space-y-6 pt-16 md:pt-0">
            {/* Category / Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-1"
            >
              <span className="text-[10px] sm:text-xs tracking-[0.4em] text-purple-400 font-mono font-medium block uppercase">
                CAMPAÑA CINEMATOGRÁFICA
              </span>
              <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-white/80 font-light mt-1">
                &ldquo;La forma del deseo tras el anochecer.&rdquo;
              </p>
            </motion.div>

            {/* Giant Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-[80px] sm:text-[110px] md:text-[145px] lg:text-[170px] font-serif font-light text-[#F5F5F0] leading-[0.8] tracking-[-0.04em] relative drop-shadow-[0_2px_15px_rgba(0,0,0,0.85)]"
            >
              ROYAL
            </motion.h1>

            {/* Paragraph details */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm md:text-base text-[#F5F5F0]/70 max-w-lg leading-relaxed pt-2"
            >
              Una campaña de fragancias construida en torno al cristal, la luz, la sombra y la intensidad nocturna. Diseñado para lo inolvidable.
            </motion.p>

            {/* Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-6"
            >
              <button
                onClick={() => triggerPurchase('100ml')}
                id="hero-buy-now"
                className="bg-[#F5F5F0] hover:bg-white text-black px-8 py-4 rounded-3xs text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 shadow-xl cursor-pointer"
              >
                Descubre la fragancia
              </button>
              <button
                onClick={() => handleSmoothScroll('sec-presencia')}
                id="hero-scroll-btn"
                className="bg-white/5 hover:bg-white/[0.12] border border-white/10 px-8 py-4 rounded-3xs text-[10px] sm:text-xs tracking-[0.25em] text-white uppercase font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                Ver la campaña
              </button>
            </motion.div>
          </div>

          {/* Sizable Animated Scroll Hint */}
          <motion.div 
            style={{ opacity: hintOpacityVal }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 text-center cursor-pointer"
            onClick={() => handleSmoothScroll('sec-presencia')}
            id="scroll-hint-widget"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 hover:text-white font-mono font-medium transition">
              Desliza para entrar
            </span>
            <div className="w-[1px] h-10 bg-white/10 relative overflow-hidden flex justify-center">
              <motion.div
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[1px] h-4 bg-purple-400 absolute"
              />
            </div>
          </motion.div>
        </section>


        {/* --- SECCIÓN 2: PRESENCIA (Der) --- */}
        <section 
          id="sec-presencia"
          className="min-h-screen w-full flex flex-col justify-center text-right px-6 sm:px-12 md:px-24 lg:px-44 py-20 relative"
        >
          <div className="max-w-2xl ml-auto relative z-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8 }}
              className="space-y-1.5"
            >
              <span className="text-[10px] tracking-[0.35em] text-purple-400 font-mono block uppercase">
                EL CARÁCTER
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F5F0] leading-tight">
                Una firma que entra antes de que hables
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-[#F5F5F0]/65 leading-relaxed"
            >
              Royal abre con una tensión luminosa y se asienta en una estela profunda y magnética. Está compuesto para veladas que se sienten cinematográficas e inolvidables.
            </motion.p>

            {/* Custom Interactive Diffusion wave simulator panel */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="p-6 border border-white/5 bg-black/45 backdrop-blur-md rounded-sm flex flex-col gap-4 text-left max-w-md ml-auto"
              id="presence-waveform"
            >
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/40 uppercase">Oclusión Olfativa</span>
                <span className="text-purple-300 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping inline-block" /> Activo
                </span>
              </div>
              
              {/* Fake Interactive visualizer bars */}
              <div className="flex gap-1 items-end h-16 pt-2">
                {[45, 12, 60, 20, 85, 30, 95, 40, 70, 15, 60].map((h, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
                    transition={{ duration: 2.2 + idx * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex-1 bg-gradient-to-t from-indigo-950 via-purple-900 to-amber-200 opacity-60 rounded-7xs"
                  />
                ))}
              </div>
              <span className="text-[9px] text-[#F5F5F0]/40 font-mono tracking-widest uppercase">
                * Simulación de conductividad aromática en micro-partículas
              </span>
            </motion.div>
          </div>
        </section>


        {/* --- SECCIÓN 3: NOTAS (Centro) --- */}
        <section 
          id="sec-notas"
          className="min-h-screen w-full flex flex-col justify-center text-center px-6 sm:px-12 md:px-24 py-20 relative bg-black/10"
        >
          {/* Notes module widget (modularized for clarity and block sizes) */}
          <OlfactoryNotes />
        </section>


        {/* --- SECCIÓN 4: ATMÓSFERA (Izq) --- */}
        <section 
          id="sec-atmosfera"
          className="min-h-screen w-full flex flex-col justify-center text-left px-6 sm:px-12 md:px-24 lg:px-44 py-20 relative"
        >
          {/* Sillage control slider module */}
          <SillageController />
        </section>


        {/* --- SECCIÓN 5: OBJETO (Der) --- */}
        <section 
          id="sec-objeto"
          className="min-h-screen w-full flex flex-col justify-center text-right px-6 sm:px-12 md:px-24 lg:px-44 py-20 relative bg-black/5"
        >
          <div className="max-w-2xl ml-auto relative z-10 space-y-8 flex flex-col items-end">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.35em] text-purple-400 font-mono block uppercase">
                ARTESANÍA INDUSTRIAL
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F5F0] leading-tight">
                Diseñado como un icono
              </h2>
              <p className="text-sm text-[#F5F5F0]/65 leading-relaxed max-w-md">
                El frasco debe sentirse arquitectónico, reflectante y escultórico: afilado en su silueta, luminoso en sus detalles y elevado como un objeto de deseo.
              </p>
            </div>

            {/* OBJETO ARTEFACTO CARD */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="bg-white/5 border border-white/10 p-8 sm:p-10 w-full max-w-sm rounded-[2px] shadow-2xl backdrop-blur-md relative overflow-hidden group text-left cursor-pointer"
              id="object-artifact-card"
            >
              {/* Dynamic hover color backing */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-700/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="space-y-3 relative z-15">
                <span className="text-xs font-serif italic text-purple-300 block">
                  Objeto Escultórico
                </span>
                
                {/* Thin dividing line that expands inside */}
                <div className="h-[1px] bg-white/10 group-hover:bg-purple-500/50 w-full transition-colors duration-500" />

                <h3 className="text-2xl sm:text-3xl font-serif font-light tracking-wide text-white uppercase pt-2">
                  CRISTAL NOCTURNO
                </h3>
                
                <p className="text-[10px] font-mono tracking-widest text-[#F5F5F0]/50 uppercase leading-relaxed pt-2">
                  * Bloque de cristal templado pulido a mano. Cuenta con facetas simétricas de 12 grados para reflejar el anochecer.
                </p>

                {/* Simulated bottle physical draft look */}
                <div className="pt-6 flex justify-center">
                  <div className="w-16 h-28 border border-white/10 group-hover:border-purple-400/40 rounded-xs flex flex-col justify-end items-center p-1.5 relative transition-colors duration-500 bg-neutral-950/80">
                    <div className="absolute top-2 w-6 h-5 border border-white/10 bg-neutral-900 rounded-2xs" />
                    <div className="w-full h-[65%] bg-gradient-to-t from-purple-950/50 to-transparent text-[8px] font-mono text-center flex items-center justify-center text-white/20">
                      ROYAL
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-[10px] font-mono text-purple-400/80 uppercase tracking-widest group-hover:text-purple-300 transition-all">
                  <span>Inspeccionar frasco</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* --- SECCIÓN 6: CTA FINAL (Centro) --- */}
        <section 
          id="sec-cta"
          className="min-h-screen w-full flex flex-col justify-center text-center px-6 sm:px-12 md:px-24 py-20 relative bg-[#060606]"
        >
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-3"
            >
              <span className="text-[10px] tracking-[0.45em] text-purple-400 font-mono block uppercase">
                EXPERIENCIA COMPLETA
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-light text-[#F5F5F0] leading-tight">
                Entra en el mundo de Royal
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base text-[#F5F5F0]/65 leading-relaxed max-w-xl mx-auto"
            >
              Explora la campaña, descubre la composición y experimenta una fragancia diseñada como una película.
            </motion.p>

            {/* Action buttons callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            >
              <button
                onClick={() => setIsCollectionOpen(true)}
                id="cta-explore-collection"
                className="w-full sm:w-auto bg-white hover:bg-[#F5F5F0]/90 text-black px-10 py-4.5 rounded-3xs text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold transition shadow-2xl cursor-pointer"
              >
                Explorar colección
              </button>
              <button
                onClick={() => triggerPurchase('100ml')}
                id="cta-buy-now"
                className="w-full sm:w-auto bg-transparent hover:bg-white/[0.05] border border-white/20 hover:border-white text-white px-10 py-4.5 rounded-3xs text-[10px] sm:text-xs tracking-[0.3em] uppercase font-semibold transition-all duration-300 cursor-pointer text-stroke-none"
              >
                Comprar ahora
              </button>
            </motion.div>
          </div>
        </section>


        {/* --- PIE DE PÁGINA (FOOTER) --- */}
        <footer className="bg-[#050505] border-t border-white/5 py-16 px-6 sm:px-12 text-center relative z-20 space-y-8">
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="font-serif italic text-4xl text-white/95 tracking-[0.1em]" id="footer-logo">
              Royal
            </h3>
            <p className="text-xs text-white/50 leading-relaxed uppercase tracking-widest font-mono">
              Diseñado para lo inolvidable. Experimenta una fragancia diseñada como una película.
            </p>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#F5F5F0]/30 max-w-6xl mx-auto uppercase tracking-widest">
            <span>© 2026 Royal Parfums. Todos los derechos reservados.</span>
            
            <div className="flex gap-6">
              <span className="hover:text-white transition cursor-pointer">Privacidad</span>
              <span className="hover:text-white transition cursor-pointer">Colección</span>
              <span className="hover:text-white transition cursor-pointer">Grasse Atelier</span>
            </div>

            <span className="flex items-center gap-1.5 text-purple-400">
              <ShieldCheck className="w-3.5 h-3.5" /> ORIGEN CONCERTADO
            </span>
          </div>
        </footer>

      </main>

      {/* 6. IMMERSIVE COMPANION SLIDE-OVER PURCHASE DRAWER */}
      <PurchaseDrawer
        isOpen={isPurchaseOpen}
        onClose={() => setIsPurchaseOpen(false)}
        defaultSizeId={selectedSizeId}
      />

      {/* 7. IMMERSIVE BOTTLES COLLECTION POPUP MODAL */}
      <CollectionModal
        isOpen={isCollectionOpen}
        onClose={() => setIsCollectionOpen(false)}
        onSelectSize={(sizeId) => triggerPurchase(sizeId)}
      />

    </div>
  );
}
