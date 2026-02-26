import React, { useState } from 'react';
import {
    Sun, Calculator, Zap, Trash2, BarChart3, Clock, TrendingUp,
    AlertTriangle, ChevronRight, FileText, Settings, Battery,
    ShieldCheck, Coins, Info, X
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, LabelList
} from 'recharts';
import { useOffGridCalc } from '../hooks/useOffGridCalc';
import { PRESET_LOADS, HISTORICAL_BCN_DATA } from '../lib/constants';
import { Disclaimer } from '../components/Disclaimer';

export const DesktopView = () => {
    const [showInfo, setShowInfo] = useState(false);
    const {
        selectedLoads, addLoad, removeLoad, updateLoad,
        energyPrice, setEnergyPrice,
        annualMaintenance, setAnnualMaintenance,
        manualMonthlyKwh, setManualMonthlyKwh,
        totals, projections, requestQuote
    } = useOffGridCalc();

    return (
        <div className="min-h-screen bg-slate-100 p-8 font-sans xl:p-12 overflow-y-auto">
            <div className="max-w-[1440px] mx-auto space-y-8 animate-in">

                {/* HEADER */}
                <header className="bg-emerald-700 text-white p-8 rounded-[2rem] flex justify-between items-center shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-4 rounded-2xl">
                            <Sun className="text-yellow-400 fill-yellow-400" size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black flex items-center gap-2 leading-none uppercase tracking-tighter italic shadow-sm">
                                Off-Grid <span className="text-emerald-300 font-light text-2xl text-opacity-80">Pro</span>
                            </h1>
                            <p className="text-emerald-200 text-sm font-medium mt-1 tracking-widest uppercase">Plataforma de Diseño Energético</p>
                        </div>
                    </div>
                    <div className="text-right flex items-center gap-8">
                        <div>
                            <p className="text-xs uppercase font-black text-emerald-200 opacity-70 leading-none mb-1">Resultado de la Simulación</p>
                            <p className="text-3xl font-black text-white leading-none tracking-tighter">100% INDEPENDENCIA</p>
                        </div>
                        <button
                            onClick={requestQuote}
                            className="bg-yellow-400 text-emerald-950 px-8 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-lg hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
                        >
                            SOLICITAR COTIZACIÓN <ChevronRight size={20} />
                        </button>
                    </div>
                </header>

                {/* 3 COLUMN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* COL 1: CONSUMO Y TARIFAS */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 shadow-md border border-slate-100">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 leading-none">
                                        <Calculator className="text-emerald-600" size={24} />
                                        Consumo Estimado
                                    </h2>
                                    <button onClick={() => setShowInfo(true)} className="flex items-center gap-1 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-2 rounded-full transition-colors ml-2 shadow-sm">
                                        <Info size={16} /> Instrucciones
                                    </button>
                                </div>
                                <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-3 py-1 rounded-full">{selectedLoads.length} equipos</span>
                            </div>

                            <div className="grid grid-cols-3 xl:grid-cols-4 gap-3 mb-8">
                                {PRESET_LOADS.map(load => (
                                    <button
                                        key={load.id}
                                        onClick={() => addLoad(load)}
                                        className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 rounded-2xl border border-slate-100 active:scale-95 transition-all aspect-square"
                                    >
                                        <span className="text-3xl mb-2">{load.icon}</span>
                                        <span className="text-[9px] font-black text-slate-500 truncate w-full text-center uppercase tracking-tight">{load.name.split(' ')[0]}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="bg-slate-900 rounded-[1.5rem] p-6 mb-6 text-white shadow-xl relative overflow-hidden">
                                <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                                    <Zap size={140} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Pago Actual en Red</p>
                                    <p className="text-5xl font-black text-white leading-none tracking-tighter mb-4 italic">
                                        ${Math.round(totals.monthlyCostRef).toLocaleString()}
                                    </p>
                                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-left">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Costo Anual</p>
                                            <p className="text-2xl font-black text-emerald-400 leading-none tracking-tighter mt-1">
                                                ${Math.round(totals.monthlyCostRef * 12).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Demanda</p>
                                            <p className="text-xl font-black text-white mt-1 leading-none">{Math.round(totals.monthlyKwh)} kWh/m</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scroll">
                                {selectedLoads.map(item => (
                                    <div key={item.uniqueId} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-emerald-200 transition-colors animate-item">
                                        <span className="text-3xl">{item.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-black text-slate-700 truncate uppercase tracking-tight">{item.name}</p>
                                            <div className="flex gap-2 items-center mt-2">
                                                <input
                                                    type="number"
                                                    step="1"
                                                    inputMode="decimal"
                                                    value={item.hours}
                                                    onChange={(e) => updateLoad(item.uniqueId, 'hours', e.target.value)}
                                                    className="w-16 bg-white border border-slate-200 rounded-lg px-2 text-sm font-black text-center h-8 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
                                                />
                                                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">horas/día</span>
                                            </div>
                                        </div>
                                        <div className="text-right mr-2">
                                            <p className="text-xs font-black text-emerald-600">
                                                {Math.round(item.power * item.hours).toLocaleString()} Wh
                                            </p>
                                        </div>
                                        <button onClick={() => removeLoad(item.uniqueId)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                                {selectedLoads.length === 0 && (
                                    <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl">
                                        <p className="text-slate-400 text-sm font-medium">Añade equipos desde arriba para comenzar 👆</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 space-y-4">

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3 text-slate-500">
                                    <Calculator size={20} className="text-emerald-500" />
                                    <div>
                                        <span className="block text-xs font-black uppercase tracking-widest text-slate-700">Consumo Manual</span>
                                        <span className="block text-[9px] text-slate-400 font-medium">Desde boleta (kWh/mes)</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    placeholder="Autocalculado"
                                    value={manualMonthlyKwh}
                                    onChange={(e) => setManualMonthlyKwh(e.target.value)}
                                    className="w-28 bg-slate-50 focus:bg-white text-right font-black text-emerald-700 py-2 px-3 focus:outline-emerald-500 rounded-xl border border-transparent focus:border-emerald-500 transition-colors placeholder:text-[9px] placeholder:font-normal"
                                />
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-3 text-slate-500">
                                    <Settings size={20} className="text-slate-400" />
                                    <span className="text-xs font-black uppercase tracking-widest">Tarifa Red ($/kWh)</span>
                                </div>
                                <input type="number" value={energyPrice} onChange={(e) => setEnergyPrice(parseFloat(e.target.value) || 0)} className="w-28 bg-slate-50 focus:bg-white text-right font-black text-slate-700 py-2 px-3 focus:outline-emerald-500 rounded-xl border border-transparent focus:border-emerald-500 transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* COL 2: GRÁFICOS Y ANÁLISIS */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] shadow-md border border-slate-100">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-sm font-black text-slate-600 uppercase flex items-center gap-2 tracking-[0.1em]">
                                    <BarChart3 size={20} className="text-emerald-500" />
                                    Proyección de Ahorro a 30 Años
                                </h3>
                            </div>

                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={projections} margin={{ top: 30, right: 15, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: '900', fill: '#94a3b8' }} />
                                        <YAxis hide />
                                        <Tooltip
                                            formatter={(v) => `$${v.toLocaleString()}`}
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '13px', fontWeight: 'bold' }}
                                        />
                                        <Area name="Red Tradicional" type="monotone" dataKey="Tradicional" stroke="#ef4444" fill="#ef4444" fillOpacity={0.03} strokeWidth={4}>
                                            <LabelList dataKey="valT" position="top" style={{ fontSize: '11px', fontWeight: '900', fill: '#ef4444' }} offset={10} />
                                        </Area>
                                        <Area name="Sistema Solar" type="monotone" dataKey="Solar" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={4}>
                                            <LabelList dataKey="valS" position="bottom" style={{ fontSize: '11px', fontWeight: '900', fill: '#10b981' }} offset={15} />
                                        </Area>
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-8 flex flex-col items-center gap-6">
                                <div className="flex justify-center gap-8 bg-slate-50 py-3 px-6 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-400" /><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Conectado a la Red</span></div>
                                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-400" /><span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest leading-none">Sistema Off-Grid</span></div>
                                </div>

                                <div className="bg-emerald-50 w-full p-6 rounded-2xl border border-emerald-100 flex justify-between items-center shadow-inner">
                                    <div className="flex items-center gap-3 text-emerald-800">
                                        <Clock size={20} />
                                        <span className="text-xs font-black uppercase tracking-widest">Retorno de Inversión (Payback):</span>
                                    </div>
                                    <span className="text-3xl font-black text-emerald-600 tracking-tighter italic">{totals.paybackYears} Años</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] shadow-md border border-slate-100">
                            <div className="flex items-center gap-2 mb-6 text-red-500">
                                <TrendingUp size={20} />
                                <h3 className="text-xs font-black text-slate-600 uppercase tracking-[0.1em]">
                                    Proyección Alza Tarifaria (Reporte BCN Chile)
                                </h3>
                            </div>

                            <div className="h-56 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={HISTORICAL_BCN_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#991b1b', fontWeight: 'bold' }} />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#ef4444"
                                            strokeWidth={5}
                                            dot={{ r: 5, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }}
                                            activeDot={{ r: 8 }}
                                        >
                                            <LabelList dataKey="value" position="top" offset={10} style={{ fontSize: '11px', fontWeight: '900', fill: '#991b1b' }} />
                                        </Line>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-8 p-5 bg-red-50/50 rounded-2xl border border-red-100 flex gap-4 items-center">
                                <AlertTriangle size={28} className="text-red-600 shrink-0" />
                                <p className="text-xs text-red-800 font-medium leading-relaxed">
                                    Basado en índices BCN, se detecta una tendencia de <span className="text-sm font-black underline italic">+59.6%</span> en los últimos periodos. El costo de mantener dependencia a la red eléctrica escalará significativamente.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* COL 3: PLAN FINAL E INVERSIÓN */}
                    <div className="space-y-6">

                        <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100">
                            <div className="bg-emerald-600 p-10 text-white text-center relative overflow-hidden">
                                <Sun size={80} className="absolute -top-10 -left-10 text-emerald-500 opacity-50" />
                                <h2 className="text-4xl font-black tracking-tighter uppercase leading-none relative z-10 italic drop-shadow-md">Propuesta</h2>
                                <p className="text-emerald-100 text-[10px] font-black mt-4 tracking-[0.4em] uppercase opacity-90 relative z-10 text-center">Plan de Independencia</p>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                    <p className="text-[11px] font-black text-slate-400 uppercase mb-5 tracking-[0.2em] text-center border-b border-slate-200 pb-3">Ficha de Inversión Inicial</p>
                                    <div className="space-y-4 text-left">
                                        <div className="flex justify-between text-sm items-center"><span className="text-slate-500 font-bold">Equipos Recomendados:</span><span className="font-black text-slate-800 uppercase tracking-tighter text-right text-base">{totals.selectedKit.id}</span></div>
                                        <div className="flex justify-between text-sm items-center"><span className="text-slate-500 font-medium">Mtto. Anual Recomendado:</span><span className="font-black text-slate-700 tracking-tighter text-right">${Math.round(annualMaintenance).toLocaleString()}</span></div>
                                        <div className="flex justify-between text-sm items-center"><span className="text-slate-500 font-medium">Instalación Estructura (est. 60%):</span><span className="font-black text-slate-700 tracking-tighter text-right">${Math.round(totals.estInstallation).toLocaleString()}</span></div>

                                        <div className="pt-4 border-t-2 border-slate-200">
                                            <div className="flex justify-between items-end">
                                                <span className="text-emerald-700 font-black tracking-widest uppercase text-xs flex items-center gap-2"><Coins size={16} />TOTAL APROX.:</span>
                                                <span className="text-3xl font-black text-emerald-600 tracking-tighter italic underline decoration-emerald-200 decoration-4">${totals.totalInvestment.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm items-center mt-3 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                                                <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest">Anticipo Instalación (60%):</span>
                                                <span className="font-black text-emerald-900 tracking-tighter text-right text-base">${Math.round(totals.totalInvestment * 0.6).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200 shadow-sm mt-4">
                                    <p className="text-[10px] text-yellow-800 leading-relaxed text-justify font-medium">
                                        * El precio total es un <strong>estimado</strong> sujeto a evaluación de factibilidad técnica. Puede variar según requerimientos físicos (suelo/techo), emplazamiento y canalización.
                                    </p>
                                </div>

                                <div className="bg-emerald-50 p-8 rounded-3xl border text-center shadow-inner pt-10 pb-10">
                                    <p className="text-xs font-black text-emerald-800 uppercase mb-3 tracking-[0.2em] text-center">Ahorro Vitalicio Proyectado</p>
                                    <p className="text-5xl font-black text-emerald-600 tracking-tighter leading-none text-center drop-shadow-sm">
                                        ${(projections.find(p => p.year === 'Añ 30')?.Tradicional - projections.find(p => p.year === 'Añ 30')?.Solar || 0).toLocaleString()}
                                    </p>
                                    <p className="text-[11px] text-emerald-600/80 mt-4 font-black uppercase tracking-widest italic text-center">Proyección a 30 años</p>
                                </div>

                            </div>
                        </div>

                        <Disclaimer />
                    </div>
                </div>

                {showInfo && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                    <Info className="text-emerald-500" size={24} />
                                    Instrucciones de Uso
                                </h3>
                                <button onClick={() => setShowInfo(false)} className="text-slate-400 hover:text-slate-600 p-1">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                                <p>
                                    <strong>1. Selecciona tus equipos:</strong> Haz clic en los íconos de la cuadrícula superior para agregar los aparatos eléctricos que utilizas en tu hogar.
                                </p>
                                <p>
                                    <strong>2. Ajusta las horas:</strong> En la lista que aparecerá debajo, indica cuántas <strong>horas al día</strong> en promedio utilizas cada uno.
                                </p>
                                <p>
                                    <strong>3. Configura tu tarifa:</strong> Si lo conoces, puedes ajustar el valor de la <strong>Tarifa Red ($/kWh)</strong> para una cotización más exacta.
                                </p>
                                <p>
                                    <strong>4. Revisa tu proyección:</strong> La plataforma calculará automáticamente tu demanda y proyectará el sistema solar recomendado para lograr independencia energética.
                                </p>
                            </div>
                            <button onClick={() => setShowInfo(false)} className="mt-6 w-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 py-3 rounded-xl font-black transition-colors uppercase tracking-widest text-xs">
                                ¡Entendido!
                            </button>
                        </div>
                    </div>
                )}

                <style dangerouslySetInnerHTML={{
                    __html: `
          .animate-in { animation: animIn 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
          .animate-item { animation: itemIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
          @keyframes animIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes itemIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          .custom-scroll::-webkit-scrollbar { width: 6px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        `}} />
            </div>
        </div>
    );
};
