import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { flashcardsData } from '../data';
import { MousePointerClick, RefreshCcw, ChevronLeft, ChevronRight, Award } from 'lucide-react';

export default function FlashcardsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
    }, 150);
  }, []);

  const prevCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
    }, 150);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextCard();
      } else if (e.key === 'ArrowLeft') {
        prevCard();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault(); // Prevent scrolling
        setIsFlipped((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard]);

  // Determine Level based on Index (10 cards per level)
  const calculateLevel = (index: number) => {
    const levelNumber = Math.floor(index / 10) + 1;
    let title = "";
    if (levelNumber === 1) title = "Fundamentos Estratégicos & Diagnóstico";
    if (levelNumber === 2) title = "Frameworks Ejecutivos (REWIRED)";
    if (levelNumber === 3) title = "Arquitecturas Analíticas de Ventaja";
    if (levelNumber === 4) title = "Agilidad Institucional & Cambio Cultural";
    if (levelNumber === 5) title = "Reflexiones de Vanguardia Directoral (MIT)";
    
    return { levelNumber, title };
  };

  const currentLevelInfo = calculateLevel(currentIndex);
  const progressPercent = ((currentIndex + 1) / flashcardsData.length) * 100;

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center pb-16 pt-4 animate-in fade-in duration-700">
      
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">Síntesis Académica de Alta Dirección</h2>
        <p className="text-lg text-slate-600 flex items-center justify-center gap-2 font-light">
          <MousePointerClick className="w-5 h-5 text-rose-700" />
          Navegación: Usa las flechas [←] [→] y Espacio para revelar.
        </p>
      </div>

      {/* Mastery Progress Bar */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 px-2">
          <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-amber-500"/> Nivel {currentLevelInfo.levelNumber}: <span className="text-slate-800">{currentLevelInfo.title}</span></span>
          <span className="text-rose-700 font-bold">{currentIndex + 1} / {flashcardsData.length}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-rose-700 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="relative w-full max-w-3xl h-96 perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Front of card */}
          <div className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-10 md:p-14 bg-white border border-slate-200 rounded-[2rem] shadow-xl ring-1 ring-black/5`}>
            <div className="absolute top-8 left-8">
              <span className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                Concepto Nivel {currentLevelInfo.levelNumber}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-800 text-center leading-relaxed">
              {flashcardsData[currentIndex].front}
            </h3>
            <div className="absolute bottom-8 flex items-center gap-2 text-slate-400 text-sm font-medium">
              <RefreshCcw className="w-4 h-4" /> REVELAR INSIGHT
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center p-10 md:p-14 bg-slate-900 text-white border-transparent rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="absolute top-8 left-8 text-xs font-bold text-rose-300 tracking-wider uppercase bg-rose-900/40 px-3 py-1.5 rounded-full border border-rose-800/50">
              Profundización Directiva
            </div>
            
            <p className="text-xl md:text-2xl font-light text-slate-100 text-center leading-relaxed relative z-10">
              {flashcardsData[currentIndex].back}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-8 mt-12">
        <button
          onClick={prevCard}
          className="p-4 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-200 hover:bg-slate-50 transition-all text-slate-700 hover:text-slate-900 hover:-translate-x-1"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-slate-400 font-serif font-medium tracking-widest text-sm">
          FLIP CARD
        </span>
        <button
          onClick={nextCard}
          className="p-4 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-200 hover:bg-slate-50 transition-all text-slate-700 hover:text-slate-900 hover:translate-x-1"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* CSS Utilities for 3D flip (Tailwind arbitrary values lack some support directly) */}
      <style>{`
        .perspective-1000 { 
          perspective: 1200px; 
        }
        .preserve-3d { 
          transform-style: preserve-3d; 
        }
        .backface-hidden { 
          backface-visibility: hidden; 
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 { 
          transform: rotateY(180deg); 
        }
      `}</style>
    </div>
  );
}
