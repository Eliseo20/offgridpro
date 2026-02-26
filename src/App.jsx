import React, { useState, useMemo } from 'react';
import {
  Sun,
  Calculator,
  Zap,
  Trash2,
  BarChart3,
  Clock,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  FileText,
  Settings,
  Battery,
  ShieldCheck,
  AlertCircle,
  Search,
  Wrench,
  Coins
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine,
  LabelList
} from 'recharts';

// --- Datos del Reporte BCN 2025 ---
const HISTORICAL_BCN_DATA = [
  { label: '2018', value: 100 },
  { label: '2020', value: 111.5 },
  { label: '2022', value: 111.0 },
  { label: '2023', value: 119.9 },
  { label: 'May 24', value: 117.7 },
  { label: 'Ago 24', value: 141.4 },
  { label: 'Oct 24', value: 168.5 },
  { label: 'Mar 25', value: 187.8 },
];

// --- Catálogo Off-Grid (Solar y LED) ---
const OFF_GRID_KITS = [
  {
    id: 'OG-1.2',
    name: 'Kit Off-Grid Básico 1.2kVA',
    capacity: 1.2,
    storage: '2.5kWh (Litio/Gel)',
    price: 685400,
    panels: 2,
    suitable: 4
  },
  {
    id: 'OG-3.0',
    name: 'Kit Off-Grid Pro 3kVA',
    capacity: 3.0,
    storage: '5.12kWh (Litio)',
    price: 1950000,
    panels: 6,
    suitable: 10
  },
  {
    id: 'OG-6.2',
    name: 'Kit Off-Grid Power 6.2kW',
    capacity: 6.2,
    storage: '10.24kWh (Litio)',
    price: 3450000,
    panels: 10,
    suitable: 25
  },
];

const PRESET_LOADS = [
  { id: 1, name: 'Ducha Eléctrica', power: 4500, category: 'Baño', icon: '🚿' },
  { id: 2, name: 'Secadora Ropa', power: 3500, category: 'Lavado', icon: '💨' },
  { id: 3, name: 'Aire Acond. 12k', power: 1500, category: 'Clima', icon: '🌡️' },
  { id: 4, name: 'Horno Eléctrico', power: 2500, category: 'Cocina', icon: '🥧' },
  { id: 6, name: 'Lavadora', power: 1000, category: 'Lavado', icon: '👕' },
  { id: 7, name: 'Plancha', power: 1500, category: 'Hogar', icon: '👔' },
  { id: 8, name: 'Microondas', power: 1000, category: 'Cocina', icon: '🍲' },
  { id: 9, name: 'Hervidor Agua', power: 1800, category: 'Cocina', icon: '☕' },
  { id: 15, name: 'Refrigerador', power: 300, category: 'Frío', icon: '❄️' },
  { id: 16, name: 'PC Escritorio', power: 250, category: 'Oficina', icon: '🖥️' },
  { id: 17, name: 'TV LED/LCD', power: 100, category: 'Ocio', icon: '📺' },
  { id: 20, name: 'Router Wi-Fi', power: 12, category: 'Red', icon: '🌐' },
];

const Disclaimer = () => (
  <div className="mt-8 mb-4 p-5 bg-slate-100/50 rounded-3xl border border-slate-200">
    <div className="flex items-center gap-2 text-slate-500 mb-2">
      <AlertCircle size={14} />
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Aviso Importante</span>
    </div>
    <p className="text-[10px] text-slate-500 leading-relaxed text-justify">
      Los costos y ahorros presentados son <strong>aproximaciones estimadas</strong>.
      La implementación real está sujeta a una <strong>evaluación técnica</strong>.
      Factores como el clima local, sombras, orientation y área disponible alteran el rendimiento.
      <br /><br />
      <span className="font-bold text-emerald-700 italic underline">Solicita tu cotización formal para un estudio exacto.</span>
    </p>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('calc');
  const [selectedLoads, setSelectedLoads] = useState([]);
  const [energyPrice, setEnergyPrice] = useState(210);
  const [inflationRate, setInflationRate] = useState(8);
  const [annualMaintenance, setAnnualMaintenance] = useState(120000);

  const addLoad = (preset) => {
    const newLoad = { ...preset, uniqueId: Date.now(), quantity: 1, hours: preset.category === 'Frío' || preset.category === 'Red' ? 24 : 1 };
    setSelectedLoads([...selectedLoads, newLoad]);
  };

  const removeLoad = (uniqueId) => {
    setSelectedLoads(selectedLoads.filter(load => load.uniqueId !== uniqueId));
  };

  const updateLoad = (uniqueId, field, value) => {
    const stringValue = value.toString().replace(',', '.');
    const numValue = stringValue === "" ? 0 : parseFloat(stringValue);
    setSelectedLoads(selectedLoads.map(load =>
      load.uniqueId === uniqueId ? { ...load, [field]: numValue } : load
    ));
  };

  const totals = useMemo(() => {
    const dailyKwh = selectedLoads.reduce((sum, load) => (load.power * load.quantity * load.hours) / 1000 + sum, 0);
    const monthlyKwh = dailyKwh * 30;
    const monthlyCostRef = monthlyKwh * energyPrice;

    let selectedKit = OFF_GRID_KITS[0];
    for (const kit of OFF_GRID_KITS) {
      selectedKit = kit;
      if (kit.suitable >= dailyKwh) break;
    }

    // Instalación automática 60%
    const estInstallation = selectedKit.price * 0.6;
    const totalInvestment = selectedKit.price + estInstallation;
    const paybackYears = totalInvestment / (monthlyCostRef * 12);

    return {
      dailyKwh,
      monthlyKwh,
      monthlyCostRef,
      selectedKit,
      estInstallation,
      totalInvestment,
      paybackYears: isFinite(paybackYears) ? paybackYears.toFixed(1) : '∞'
    };
  }, [selectedLoads, energyPrice]);

  const projections = useMemo(() => {
    const data = [];
    let cumTrad = 0;
    let cumSolar = totals.totalInvestment;
    let currentPrice = energyPrice;
    let currentMaint = annualMaintenance;

    for (let year = 1; year <= 30; year++) {
      const annualTrad = totals.monthlyKwh * 12 * currentPrice;
      cumTrad += annualTrad;
      cumSolar += currentMaint;
      if ([1, 3, 5, 10, 15, 20, 25, 30].includes(year)) {
        data.push({
          year: `Añ ${year}`,
          Tradicional: Math.round(cumTrad),
          Solar: Math.round(cumSolar),
          valT: `${(Math.round(cumTrad) / 1000000).toFixed(1)}M`,
          valS: `${(Math.round(cumSolar) / 1000000).toFixed(1)}M`
        });
      }
      currentPrice *= (1 + (inflationRate / 100));
      currentMaint *= (1 + (inflationRate / 100));
    }
    return data;
  }, [totals, energyPrice, inflationRate, annualMaintenance]);

  return (
    <div className="h-screen bg-slate-200 flex justify-center font-sans overflow-hidden">
      <div className="w-full max-w-[440px] bg-slate-50 h-full shadow-2xl relative flex flex-col overflow-hidden">

        {/* Header Superior FIJO */}
        <div className="bg-emerald-700 text-white p-6 pt-10 pb-6 flex justify-between items-end shadow-md shrink-0 z-50">
          <div>
            <h1 className="text-xl font-black flex items-center gap-2 leading-none uppercase tracking-tighter italic">
              <Sun className="text-yellow-400 fill-yellow-400" size={24} />
              Off-Grid <span className="text-emerald-300 font-light text-sm text-opacity-80">Pro</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-black text-emerald-200 opacity-70 leading-none mb-1">Ahorro Est.</p>
            <p className="text-lg font-black text-white leading-none tracking-tighter">100% SOLAR</p>
          </div>
        </div>

        {/* Contenido CENTRAL */}
        <div className="flex-1 overflow-y-auto p-4 custom-scroll bg-slate-50/50">

          {/* TAB 1: CONSUMO */}
          {activeTab === 'calc' && (
            <div className="space-y-4 animate-in pb-4">
              <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
                <h2 className="text-lg font-black text-slate-800 mb-1 flex items-center gap-2 leading-none">
                  <Calculator size={20} className="text-emerald-600" />
                  Consumo Estimado
                </h2>
                <p className="text-[11px] text-slate-400 mb-6 font-medium italic">Toca para agregar artefactos:</p>

                <div className="grid grid-cols-4 gap-2 mb-6 h-56 overflow-y-auto pr-1 custom-scroll">
                  {PRESET_LOADS.map(load => (
                    <button
                      key={load.id}
                      onClick={() => addLoad(load)}
                      className="flex flex-col items-center justify-center p-2 bg-slate-50 rounded-2xl border border-transparent active:bg-emerald-50 active:scale-95 transition-all aspect-square shadow-sm"
                    >
                      <span className="text-2xl mb-1">{load.icon}</span>
                      <span className="text-[8px] font-black text-slate-500 truncate w-full text-center uppercase px-1 leading-tight">{load.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-900 rounded-[2rem] p-6 mb-6 text-white shadow-xl relative overflow-hidden text-center">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Zap size={100} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Pago Actual en Red</p>
                    <p className="text-4xl font-black text-white leading-none tracking-tighter mb-4 italic">
                      ${Math.round(totals.monthlyCostRef).toLocaleString()}
                    </p>
                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-left">
                      <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Costo Anual</p>
                        <p className="text-lg font-black text-emerald-400 leading-none tracking-tighter mt-1">
                          ${Math.round(totals.monthlyCostRef * 12).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Demanda</p>
                        <p className="text-sm font-black text-white mt-1 leading-none">{Math.round(totals.monthlyKwh)} kWh/m</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedLoads.map(item => (
                    <div key={item.uniqueId} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm animate-item">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-700 truncate uppercase tracking-tight leading-none">{item.name}</p>
                        <div className="flex gap-2 items-center mt-2">
                          <input
                            type="number"
                            step="1"
                            inputMode="decimal"
                            value={item.hours}
                            onChange={(e) => updateLoad(item.uniqueId, 'hours', e.target.value)}
                            className="w-12 bg-slate-100 rounded-lg px-2 text-xs font-black text-center h-7 outline-none border border-transparent focus:border-emerald-400 focus:bg-white transition-all"
                          />
                          <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">h/día</span>
                          <div className="ml-auto text-right">
                            <p className="text-[11px] font-black text-emerald-600 leading-none">
                              {Math.round(item.power * item.hours).toLocaleString()} Wh
                            </p>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeLoad(item.uniqueId)} className="p-2 text-slate-300 hover:text-red-400 ml-1 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Battery size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Mtto Anual Est.</span>
                  </div>
                  <input type="number" value={annualMaintenance} onChange={(e) => setAnnualMaintenance(parseFloat(e.target.value) || 0)} className="w-24 bg-slate-50 text-right font-black text-emerald-700 py-1.5 px-2 rounded-lg outline-none" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Settings size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Tarifa Red ($/kWh)</span>
                  </div>
                  <input type="number" value={energyPrice} onChange={(e) => setEnergyPrice(parseFloat(e.target.value) || 0)} className="w-20 bg-slate-50 text-right font-black text-slate-700 py-1.5 px-2 rounded-lg outline-none" />
                </div>
              </div>

              <Disclaimer />
            </div>
          )}

          {/* TAB 2: ANÁLISIS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in pb-4">

              {/* GRÁFICO COMPARATIVO */}
              <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[11px] font-black text-slate-500 uppercase flex items-center gap-2 tracking-[0.1em]">
                    <BarChart3 size={16} className="text-emerald-500" />
                    Ahorro Acumulado
                  </h3>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projections} margin={{ top: 30, right: 15, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: '900', fill: '#94a3b8' }} />
                      <YAxis hide />
                      <Tooltip
                        formatter={(v) => `$${v.toLocaleString()}`}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 'bold' }}
                      />
                      <Area name="Red" type="monotone" dataKey="Tradicional" stroke="#ef4444" fill="#ef4444" fillOpacity={0.03} strokeWidth={3}>
                        <LabelList dataKey="valT" position="top" style={{ fontSize: '9px', fontWeight: '900', fill: '#ef4444' }} offset={10} />
                      </Area>
                      <Area name="Solar" type="monotone" dataKey="Solar" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={3}>
                        <LabelList dataKey="valS" position="bottom" style={{ fontSize: '9px', fontWeight: '900', fill: '#10b981' }} offset={10} />
                      </Area>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 flex flex-col items-center gap-4">
                  <div className="flex justify-center gap-6">
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Conectado a la Red</span></div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" /><span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Sistema Off-Grid</span></div>
                  </div>

                  {/* Dato de Payback ubicado debajo de las etiquetas del gráfico */}
                  <div className="bg-emerald-50 w-full p-4 rounded-2xl border border-emerald-100 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <Clock size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Punto de Retorno (Payback):</span>
                    </div>
                    <span className="text-xl font-black text-emerald-600 tracking-tighter italic">{totals.paybackYears} Años</span>
                  </div>
                </div>
              </div>

              {/* INVERSIÓN INICIAL SIMPLIFICADA */}
              <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-4 text-emerald-600">
                  <ShieldCheck size={20} />
                  <h3 className="text-[11px] font-black uppercase tracking-widest leading-none">Inversión Inicial Proyecto</h3>
                </div>
                <div className="space-y-4">
                  <div className="pt-2 flex justify-between items-end">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Coins size={18} />
                      <span className="text-[11px] font-black uppercase tracking-widest">TOTAL APROXIMADO:</span>
                    </div>
                    <span className="text-2xl font-black text-emerald-600 tracking-tighter leading-none italic underline decoration-emerald-100 underline-offset-4">
                      ${totals.totalInvestment.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-4">
                    <p className="text-[9px] text-slate-500 leading-relaxed text-justify">
                      * El precio es un <strong>estimado</strong> sujeto a evaluación de factibilidad técnica. Puede variar según requerimientos de estructura (suelo/techo), ubicación de emplazamiento, altura de instalación y distancia de canalización.
                    </p>
                  </div>
                </div>
              </div>

              {/* TENDENCIA VALOR KWH (BCN) */}
              <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-6 text-red-500">
                  <TrendingUp size={16} />
                  <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.1em]">
                    Alza Tarifaria Chile (BCN)
                  </h3>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={HISTORICAL_BCN_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                      <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#991b1b', fontWeight: 'bold' }} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ef4444"
                        strokeWidth={4}
                        dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }}
                      >
                        <LabelList dataKey="value" position="top" offset={10} style={{ fontSize: '10px', fontWeight: '900', fill: '#991b1b' }} />
                      </Line>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 p-4 bg-red-50 rounded-2xl border border-red-100 flex gap-3">
                  <AlertTriangle size={20} className="text-red-600 shrink-0" />
                  <p className="text-[10px] text-red-700 font-bold leading-tight">
                    Tendencia detectada: <span className="text-sm font-black underline italic">+59.6%</span> en 12 meses. Su costo energético anual escalará agresivamente.
                  </p>
                </div>
              </div>

              <Disclaimer />
            </div>
          )}

          {/* TAB 3: PLAN FINAL */}
          {activeTab === 'report' && (
            <div className="space-y-4 animate-in pb-4">
              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <div className="bg-emerald-600 p-10 text-white text-center relative overflow-hidden">
                  <Sun size={80} className="mx-auto mb-4 text-yellow-400 animate-pulse relative z-10" />
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none relative z-10 italic">Independencia</h2>
                  <p className="text-emerald-100 text-[9px] font-black mt-3 tracking-[0.3em] uppercase opacity-70 relative z-10 text-center">Plan Propuesto</p>
                </div>
                <div className="p-8 space-y-6">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest text-center">Ficha Resumen</p>
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between text-sm items-center"><span className="text-slate-500 font-medium">Mtto. Anual Recomendado:</span><span className="font-black text-slate-800 uppercase tracking-tighter text-right">${Math.round(annualMaintenance).toLocaleString()}</span></div>
                      <div className="flex justify-between text-sm items-center"><span className="text-slate-500 font-medium italic underline decoration-emerald-100">Anticipo Instalación (60%):</span><span className="font-black text-slate-600 tracking-tighter text-right">${Math.round(totals.totalInvestment * 0.6).toLocaleString()}</span></div>
                      <div className="pt-2 border-t border-slate-200">
                        <div className="flex justify-between text-sm items-center"><span className="text-slate-500 font-black tracking-widest uppercase text-[10px]">TOTAL PROYECTO:</span><span className="text-xl font-black text-emerald-600 tracking-tighter italic underline decoration-emerald-200 decoration-4">${totals.totalInvestment.toLocaleString()}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 text-center">
                    <p className="text-[11px] font-black text-emerald-800 uppercase mb-2 tracking-widest text-center">Ahorro Vitalicio Proyectado</p>
                    <p className="text-3xl font-black text-emerald-700 tracking-tighter leading-none text-center">
                      ${(projections.find(p => p.year === 'Añ 30')?.Tradicional - projections.find(p => p.year === 'Añ 30')?.Solar || 0).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-emerald-600 mt-2 font-bold uppercase tracking-widest italic text-center">Independencia energética por 30 años</p>
                  </div>

                  <button className="w-full bg-yellow-400 text-emerald-950 py-5 rounded-3xl font-black text-sm flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all uppercase tracking-widest">
                    RESERVAR COTIZACIÓN PDF <ChevronRight size={20} />
                  </button>

                  <Disclaimer />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Barra de Navegación Inferior FIJA */}
        <nav className="shrink-0 bg-white border-t border-slate-100 h-24 px-8 flex justify-around items-center z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
          <button onClick={() => setActiveTab('calc')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'calc' ? 'text-emerald-600 scale-110' : 'text-slate-300'}`}>
            <Battery size={26} className={activeTab === 'calc' ? 'fill-emerald-50' : ''} />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Consumo</span>
          </button>
          <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'dashboard' ? 'text-emerald-600 scale-110' : 'text-slate-300'}`}>
            <Search size={26} className={activeTab === 'dashboard' ? 'fill-emerald-50' : ''} />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Análisis</span>
          </button>
          <button onClick={() => setActiveTab('report')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'report' ? 'text-emerald-600 scale-110' : 'text-slate-300'}`}>
            <FileText size={26} className={activeTab === 'report' ? 'fill-emerald-50' : ''} />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Plan</span>
          </button>
        </nav>

        <style dangerouslySetInnerHTML={{
          __html: `
          .animate-in { animation: animIn 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
          .animate-item { animation: itemIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
          @keyframes animIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes itemIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
          .custom-scroll::-webkit-scrollbar { width: 4px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: #d1fae5; border-radius: 10px; }
        `}} />
      </div>
    </div>
  );
};

export default App;
