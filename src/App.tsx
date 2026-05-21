import React, { useState } from 'react';
import TheorySection from './components/Theory';
import FlashcardsSection from './components/Flashcards';
import QuizSection from './components/Quiz';
import ComplexCasesSection from './components/ComplexCases';
import { BookOpen, Grip, CheckSquare, Layers } from 'lucide-react';

type Tab = 'theory' | 'flashcards' | 'quiz' | 'cases';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('theory');

  const renderContent = () => {
    switch (activeTab) {
      case 'theory': return <TheorySection />;
      case 'flashcards': return <FlashcardsSection />;
      case 'quiz': return <QuizSection />;
      case 'cases': return <ComplexCasesSection />;
      default: return <TheorySection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-800 rounded-sm flex items-center justify-center transform rotate-3">
                <span className="text-white font-serif font-bold text-lg -rotate-3">S</span>
              </div>
              <span className="text-lg font-serif font-bold text-slate-900 tracking-tight">
                Strategy<span className="text-rose-800">&</span>Org.
              </span>
            </div>

            <nav className="flex space-x-1 sm:space-x-4">
              <button 
                onClick={() => setActiveTab('theory')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'theory' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <BookOpen className="w-4 h-4" /> <span className="hidden sm:inline">Teoría</span>
              </button>
              <button 
                onClick={() => setActiveTab('flashcards')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'flashcards' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Grip className="w-4 h-4" /> <span className="hidden sm:inline">Flashcards</span>
              </button>
              <button 
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'quiz' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <CheckSquare className="w-4 h-4" /> <span className="hidden sm:inline">Cuestionario</span>
              </button>
              <button 
                onClick={() => setActiveTab('cases')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'cases' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Layers className="w-4 h-4 text-rose-400" /> <span className="hidden sm:inline">Casos</span>
              </button>
            </nav>
            
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {renderContent()}
      </main>

    </div>
  );
}
