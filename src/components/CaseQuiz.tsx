import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp, RefreshCw, Trophy } from 'lucide-react';

interface CaseQuizProps {
  questions: QuizQuestion[];
  caseTitle: string;
}

export default function CaseQuiz({ questions, caseTitle }: CaseQuizProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswerIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const allAnswered = questions.every(q => answers[q.id] !== undefined);

  if (!isOpen) {
    return (
      <div className="mt-8 border-t border-slate-100 pt-8 flex justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-sm"
        >
          <Trophy className="w-5 h-5 text-amber-400" />
          Tomar Cuestionario Avanzado (20 Preguntas)
        </button>
      </div>
    );
  }

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="mt-12 bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden animate-in fade-in duration-500">
      <div className="bg-slate-100 border-b border-slate-200 p-6 md:px-10 flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-xl text-slate-900">Cuestionario Analítico</h3>
          <p className="text-sm text-slate-500 mt-1">Evaluación de alta complejidad sobre: {caseTitle}</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600 p-2"
          title="Cerrar cuestionario"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 md:p-10 space-y-12">
        {questions.map((q, index) => {
          const isAnswered = answers[q.id] !== undefined;
          const isCorrect = answers[q.id] === q.correctAnswerIndex;
          
          return (
            <div key={q.id} className="space-y-4">
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <h4 className="text-lg font-medium text-slate-900 leading-relaxed mt-0.5">
                  {q.question}
                </h4>
              </div>

              <div className="pl-12 space-y-3">
                {q.options.map((option, optIdx) => {
                  const isSelected = answers[q.id] === optIdx;
                  const isCorrectOption = showResults && optIdx === q.correctAnswerIndex;
                  const isWrongSelected = showResults && isSelected && !isCorrectOption;

                  let optionClass = "border-slate-200 hover:border-blue-400 bg-white";
                  if (isSelected && !showResults) optionClass = "border-blue-500 bg-blue-50 ring-1 ring-blue-500";
                  if (isCorrectOption) optionClass = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500";
                  if (isWrongSelected) optionClass = "border-rose-500 bg-rose-50 ring-1 ring-rose-500 text-slate-500 line-through decoration-rose-500";

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={showResults}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionClass} ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                          ${isSelected && !showResults ? 'border-blue-500' : ''}
                          ${isCorrectOption ? 'border-emerald-500 bg-emerald-500' : ''}
                          ${isWrongSelected ? 'border-rose-500 bg-rose-500' : ''}
                          ${!isSelected && !showResults && !isCorrectOption ? 'border-slate-300' : ''}
                        `}>
                          {isCorrectOption && <CheckCircle2 className="w-3 h-3 text-white" />}
                          {isWrongSelected && <XCircle className="w-3 h-3 text-white" />}
                          {isSelected && !showResults && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                        </div>
                        <span className={`text-sm md:text-base ${isWrongSelected ? 'text-slate-500' : 'text-slate-700'}`}>
                          {option}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className={`ml-12 p-5 rounded-xl flex gap-3 ${isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' : 'bg-rose-100 text-rose-900 border border-rose-200'}`}>
                  {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                  <div>
                    <span className="font-semibold">{isCorrect ? 'Correcto' : 'Incorrecto'}. </span>
                    <span className="text-sm opacity-90">{q.explanation}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-slate-100 border-t border-slate-200 p-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {!showResults ? (
          <>
            <div className="text-slate-600 text-sm">
              Respondidas {Object.keys(answers).length} de {questions.length}
            </div>
            <button
              onClick={() => setShowResults(true)}
              disabled={!allAnswered}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                allAnswered 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Evaluar Respuestas
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-serif font-bold text-slate-900">
                {score}<span className="text-xl text-slate-400">/{questions.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Puntuación</span>
                <span className={`font-mono text-sm ${percentage >= 80 ? 'text-emerald-600' : percentage >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {percentage}% {percentage >= 80 ? 'Excelente' : percentage >= 50 ? 'Regular' : 'Necesita Mejora'}
                </span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Reintentar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
