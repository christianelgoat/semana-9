import React from 'react';
import { complexCasesData } from '../data';
import { Building2, Lightbulb, Zap, LineChart, Hash } from 'lucide-react';
import CaseQuiz from './CaseQuiz';

export default function ComplexCasesSection() {
  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in slide-in-from-bottom-4 duration-700">
      
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
          Casos de Alta Complejidad Analítica
        </h2>
        <p className="text-lg md:text-xl font-light text-slate-600 max-w-3xl mx-auto text-balance">
          Casos detallados de corporaciones que reestructuraron radicalmente su arquitectura operativa, asimilando la tecnología B2B y transitando exitosamente hacia la innovación escalable.
        </p>
      </div>

      <div className="space-y-16">
        {complexCasesData.map((kase, index) => (
          <div key={kase.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            
            <div className="bg-slate-900 px-8 py-8 md:px-12 md:py-10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="absolute -top-10 -right-10 opacity-5 rotate-12">
                <Building2 className="w-64 h-64" />
              </div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl" />
              <div className="flex flex-col relative z-10 space-y-2">
                <span className="inline-block px-3 py-1 bg-rose-900/50 text-rose-300 text-xs font-bold uppercase tracking-wider rounded-full w-max border border-rose-800/50">
                  {kase.company}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-semibold text-white leading-tight">
                  {kase.title}
                </h3>
              </div>
              <div className="relative z-10 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 shadow-inner">
                 <span className="text-slate-400 font-serif text-2xl font-bold">{index + 1}</span>
              </div>
            </div>

            <div className="p-8 md:p-12 grid lg:grid-cols-2 gap-12 relative">
              <div className="space-y-10">
                
                {/* Context Section */}
                <div className="relative pl-6 border-l-2 border-slate-100">
                  <div className="absolute -left-3.5 top-0 bg-white p-1 rounded-full border border-slate-200 shadow-sm">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-4 text-lg font-serif">Diagnosis Estructural</h4>
                  <div className="space-y-4">
                    {kase.context.map((p, i) => (
                      <p key={i} className="text-slate-600 leading-relaxed">{p}</p>
                    ))}
                  </div>
                </div>
                
                {/* Strategy Section */}
                <div className="relative pl-6 border-l-2 border-slate-100">
                  <div className="absolute -left-3.5 top-0 bg-white p-1 rounded-full border border-slate-200 shadow-sm">
                    <Zap className="w-4 h-4 text-blue-500" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-4 text-lg font-serif">Vector Estratégico (Maniobra)</h4>
                  <div className="space-y-4">
                    {kase.strategy.map((p, i) => (
                      <p key={i} className="text-slate-600 leading-relaxed">{p}</p>
                    ))}
                  </div>
                </div>
                
              </div>

              <div className="space-y-10">
                {/* Impact Section */}
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-inner">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700">
                       <LineChart className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg font-serif">Impacto Operativo & P&L</h4>
                  </div>
                  <div className="space-y-4">
                    {kase.impact.map((p, i) => (
                      <div key={i} className="flex gap-3">
                         <Hash className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                         <p className="text-slate-700 font-medium leading-relaxed">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Insight Section */}
                <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-rose-100 opacity-50 font-serif text-[10rem] leading-none select-none">"</div>
                  <h4 className="text-rose-900 font-serif font-bold italic mb-4 text-lg z-10 relative">Axioma Ejecutivo (Key Insight)</h4>
                  <p className="text-rose-900/80 leading-relaxed font-medium z-10 relative text-lg">{kase.keyInsight}</p>
                </div>
              </div>
            </div>

            {/* Quiz Section */}
            {kase.questions && kase.questions.length > 0 && (
              <div className="px-8 pb-8 md:px-12 md:pb-12">
                <CaseQuiz questions={kase.questions} caseTitle={kase.title} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
