import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { quizData } from '../data';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';

export default function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = quizData[currentQ];

  const handleSubmit = () => {
    if (selectedOption !== null && !isSubmitted) {
      setIsSubmitted(true);
      if (selectedOption === question.correctAnswerIndex) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQ < quizData.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const isHigh = score > quizData.length / 2;
    return (
      <div className="max-w-2xl mx-auto bg-white p-12 rounded-3xl shadow-xl border border-slate-100 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 mx-auto bg-rose-50 text-rose-700 rounded-full flex items-center justify-center mb-6">
          <Trophy className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Evaluación Completada</h2>
        <p className="text-xl text-slate-600 mb-8">
          Tu puntuación: <span className="font-bold text-rose-700">{score}</span> de {quizData.length}
        </p>
        <div className="p-6 bg-slate-50 text-slate-700 rounded-2xl mb-8">
          {isHigh 
            ? "¡Excelente análisis! Posees una profunda comprensión sobre los ecosistemas de transformación digital, los retos culturales y los marcos organizacionales." 
            : "Te recomendamos repasar los pilares del modelo REWIRED y los cuellos de botella del cambio cultural organizacional detectados por Centrum PUCP."}
        </div>
        <button
          onClick={restart}
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 transition-colors font-medium"
        >
          <RotateCcw className="w-5 h-5" />
          Reiniciar Evaluación
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-16 animate-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        
        {/* Header Progress */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-rose-800 uppercase tracking-wider text-sm">
            Control de Conocimiento
          </h3>
          <div className="text-sm font-medium text-slate-500">
            Pregunta {currentQ + 1} de {quizData.length}
          </div>
        </div>

        {/* Question Body */}
        <div className="p-8">
          <h2 className="text-2xl font-serif font-medium text-slate-900 mb-8 leading-tight">
            {question.question}
          </h2>

          <div className="space-y-3 mb-8">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctAnswerIndex;
              
              let stateClasses = "border-slate-200 hover:border-slate-400 bg-white cursor-pointer";
              let icon = null;

              if (isSubmitted) {
                if (isSelected && isCorrect) {
                  stateClasses = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500";
                  icon = <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0" />;
                } else if (isSelected && !isCorrect) {
                  stateClasses = "border-red-300 bg-red-50";
                  icon = <XCircle className="text-red-500 w-5 h-5 flex-shrink-0" />;
                } else if (!isSelected && isCorrect) {
                  stateClasses = "border-emerald-500 border-dashed bg-white";
                  icon = <CheckCircle2 className="text-emerald-400 w-5 h-5 flex-shrink-0 opacity-60" />;
                } else {
                  stateClasses = "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed";
                }
              } else if (isSelected) {
                stateClasses = "border-rose-700 bg-rose-50 ring-1 ring-rose-700";
              }

              return (
                <div
                  key={idx}
                  onClick={() => !isSubmitted && setSelectedOption(idx)}
                  className={`p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${stateClasses}`}
                >
                  <div className={`mt-0.5 w-5 h-5 flex items-center justify-center rounded-full border-2 text-xs font-bold shrink-0
                    ${isSelected && !isSubmitted ? 'border-rose-700 bg-rose-700 text-white' : 'border-slate-300 text-transparent'}
                    ${isSubmitted ? 'hidden' : 'flex'}
                  `}>
                    {idx + 1}
                  </div>
                  {icon}
                  <span className={`text-slate-700 ${isSelected ? 'font-medium' : ''}`}>
                    {option}
                  </span>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-xl mb-8 ${selectedOption === question.correctAnswerIndex ? 'bg-emerald-50 text-emerald-900 border border-emerald-100' : 'bg-rose-50 text-rose-900 border border-rose-100'}`}
              >
                <div className="font-bold mb-1">
                  {selectedOption === question.correctAnswerIndex ? 'Respuesta Correcta' : 'Incorrecto'}
                </div>
                <div className="text-sm opacity-90 leading-relaxed">
                  {question.explanation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Footer */}
          <div className="flex justify-end pt-4 border-t border-slate-100 mt-8">
            {!isSubmitted ? (
              <button
                disabled={selectedOption === null}
                onClick={handleSubmit}
                className="bg-slate-900 text-white px-8 py-3 rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Confirmar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-rose-700 text-white px-8 py-3 rounded-full hover:bg-rose-800 transition-colors font-medium flex items-center gap-2"
              >
                {currentQ < quizData.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
