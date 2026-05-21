import React from 'react';
import { theoryContext, theoryExpanded } from '../data';
import { BookOpen, Target, BrainCircuit, Rocket, BarChart3, Grip, Database, Cpu, Zap, Users, LineChart, Shield, Layout, Lightbulb, TrendingUp, Globe, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IconMap: Record<string, React.ElementType> = {
  Database, BrainCircuit, LineChart, Zap, Users, Shield, Layout, Lightbulb, TrendingUp, Globe, CheckCircle2
};

export default function TheorySection() {
  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-16 animate-in slide-in-from-bottom-4 duration-700">
      <header className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
          {theoryContext.title}
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed font-light">
          {theoryContext.introduction}
        </p>
      </header>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="grid gap-16">
        {theoryExpanded.map((section, idx) => (
          <section key={section.id} className="space-y-6 scroll-mt-24">
            <h2 className="text-3xl font-serif font-semibold text-rose-900 flex items-center gap-3">
              {idx === 0 && <BarChart3 className="w-8 h-8 text-rose-700" />}
              {idx === 1 && <Grip className="w-8 h-8 text-rose-700" />}
              {idx === 2 && <Target className="w-8 h-8 text-rose-700" />}
              {idx === 3 && <Database className="w-8 h-8 text-rose-700" />}
              {idx === 4 && <Cpu className="w-8 h-8 text-rose-700" />}
              {section.heading}
            </h2>
            
            {section.paragraphs && (
              <div className="space-y-4">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-lg text-slate-700 leading-relaxed text-justify">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Custom Content Renderers */}
            {section.type === 'chart' && section.chartData && (
              <div className="my-10 p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={section.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                      <Tooltip 
                        cursor={{fill: '#f1f5f9'}}
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                      />
                      <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}}/>
                      {section.chartKeys?.map((key, i) => (
                        <Bar 
                          key={key} 
                          dataKey={key} 
                          fill={section.chartColors?.[i] || '#0f172a'} 
                          radius={[4, 4, 0, 0]}
                          maxBarSize={60}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {section.type === 'table' && section.tableColumns && section.tableData && (
              <div className="my-10 overflow-hidden bg-white border border-slate-200 rounded-3xl shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {section.tableColumns.map((col, i) => (
                        <th key={i} className="py-4 px-6 font-semibold text-slate-900 text-sm tracking-wider uppercase">
                          {col.header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {section.tableData.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        {section.tableColumns?.map((col, j) => (
                          <td key={j} className={`py-4 px-6 text-slate-700 ${j === 0 ? 'font-medium text-slate-900' : ''}`}>
                            {row[col.accessor]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.type === 'grid' && section.gridItems && (
              <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.gridItems.map((item, i) => {
                  const Icon = item.icon && IconMap[item.icon] ? IconMap[item.icon] : Zap;
                  return (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-rose-50 text-rose-700 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {section.type === 'image' && section.imageUrl && (
              <div className="my-10 space-y-4">
                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                  <img src={section.imageUrl} alt={section.imageCaption} className="w-full h-auto object-cover max-h-[500px]" />
                </div>
                {section.imageCaption && (
                  <p className="text-center text-sm text-slate-500 font-serif italic">
                    {section.imageCaption}
                  </p>
                )}
              </div>
            )}

            {section.quote && (
              <blockquote className="my-8 pl-6 border-l-4 border-rose-700 bg-rose-50/50 py-4 pr-4 rounded-r-2xl">
                <p className="text-xl font-serif text-slate-800 italic mb-2">"{section.quote.text}"</p>
                <footer className="text-sm font-semibold text-rose-800 tracking-wide uppercase">
                  — {section.quote.author}
                </footer>
              </blockquote>
            )}

          </section>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-xl mt-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Rocket className="w-48 h-48" />
        </div>
        <h3 className="text-3xl font-serif font-bold mb-6 relative z-10">
          El Mandato Ejecutivo Global
        </h3>
        <p className="text-slate-300 relative z-10 text-xl leading-relaxed font-light">
          La transformación digital es, en última instancia, un <strong>reto de diseño organizacional</strong>. 
          Las herramientas son commodities adquiribles; el talento articulado capaz de alinear esas herramientas 
          a las fricciones reales del mercado es la verdadera y única ventaja competitiva sostenible.
        </p>
      </div>
    </div>
  );
}
