import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Disclaimer = () => (
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
