import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Leaf, ShieldCheck, Zap, ChevronRight } from 'lucide-react';

export const LandingView = () => {
    const navigate = useNavigate();

    const handleStartDesktop = () => navigate('/web');
    const handleStartMobile = () => navigate('/app');

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 font-sans text-center relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-emerald-600 rounded-full blur-[150px] opacity-30 pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-yellow-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />

            <div className="z-10 max-w-4xl bg-slate-800/60 p-10 md:p-14 rounded-[3rem] border border-slate-700/80 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <Sun size={80} className="mx-auto mb-8 text-yellow-400 animate-pulse drop-shadow-[0_0_30px_rgba(250,204,21,0.6)]" />

                <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-6 drop-shadow-lg">
                    Off-Grid <span className="text-emerald-400 font-light">Pro</span>
                </h1>

                <p className="text-slate-300 text-lg md:text-2xl mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
                    Descubre tu camino hacia la <strong>independencia energética</strong>.
                    Simula tus consumos, proyecta tu ahorro a 30 años y obtén un diseño
                    personalizado para tu sistema 100% solar.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 text-left max-w-3xl mx-auto">
                    <div className="bg-slate-700/40 p-6 rounded-3xl border border-slate-600 hover:border-emerald-500/50 transition-colors">
                        <Zap className="text-yellow-400 mb-4" size={32} />
                        <h3 className="text-white font-black text-sm uppercase tracking-wider mb-2">Simula tu Demanda</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">Calcula tu consumo diario seleccionando tus artefactos detalladamente.</p>
                    </div>
                    <div className="bg-slate-700/40 p-6 rounded-3xl border border-slate-600 hover:border-emerald-500/50 transition-colors">
                        <Leaf className="text-emerald-400 mb-4" size={32} />
                        <h3 className="text-white font-black text-sm uppercase tracking-wider mb-2">Proyecta Ahorro</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">Visualiza el retorno de inversión frente al constante alza eléctrica en Chile.</p>
                    </div>
                    <div className="bg-slate-700/40 p-6 rounded-3xl border border-slate-600 hover:border-emerald-500/50 transition-colors">
                        <ShieldCheck className="text-blue-400 mb-4" size={32} />
                        <h3 className="text-white font-black text-sm uppercase tracking-wider mb-2">Cotiza tu Equipo</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">Obtén la recomendación ideal de kits S&L y comunícate con un asesor.</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button
                        onClick={handleStartMobile}
                        className="bg-slate-700/80 hover:bg-slate-600 text-white px-8 py-5 rounded-full font-black text-sm md:text-base flex items-center justify-center gap-3 shadow-lg border border-slate-600 hover:-translate-y-1 active:scale-95 transition-all uppercase tracking-widest"
                    >
                        Versión Celular <ChevronRight size={20} />
                    </button>
                    <button
                        onClick={handleStartDesktop}
                        className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-5 rounded-full font-black text-sm md:text-base flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:-translate-y-1 active:scale-95 transition-all uppercase tracking-widest"
                    >
                        Versión PC de Escritorio <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .animate-in { animation: animIn 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes animIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
        </div>
    );
};
