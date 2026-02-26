import { useState, useMemo } from 'react';
import { OFF_GRID_KITS } from '../lib/constants';

export const useOffGridCalc = () => {
    const [activeTab, setActiveTab] = useState('calc');
    const [selectedLoads, setSelectedLoads] = useState([]);
    const [energyPrice, setEnergyPrice] = useState(187);
    const [inflationRate, setInflationRate] = useState(8);
    const [annualMaintenance, setAnnualMaintenance] = useState(120000);
    const [manualMonthlyKwh, setManualMonthlyKwh] = useState("");

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
        let monthlyKwh = 0;
        let dailyKwh = 0;

        if (manualMonthlyKwh !== "" && !isNaN(parseFloat(manualMonthlyKwh))) {
            monthlyKwh = parseFloat(manualMonthlyKwh);
            dailyKwh = monthlyKwh / 30;
        } else {
            dailyKwh = selectedLoads.reduce((sum, load) => (load.power * load.quantity * load.hours) / 1000 + sum, 0);
            monthlyKwh = dailyKwh * 30;
        }
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
    }, [selectedLoads, energyPrice, manualMonthlyKwh]);

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

    const requestQuote = () => {
        const phoneNumber = "56967856628"; // Número actualizado
        const message = `Hola! Me interesa solicitar una cotización formal para un Sistema Off-Grid.\n\n` +
            `📊 *Mi consumo actual:* ${Math.round(totals.monthlyKwh)} kWh/mes\n` +
            `⚡ *Equipo recomendado:* ${totals.selectedKit.id}\n` +
            `💰 *Inversión estimada:* $${totals.totalInvestment.toLocaleString()}\n\n` +
            `Me gustaría recibir asesoría para mi proyecto.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return {
        activeTab, setActiveTab,
        selectedLoads, addLoad, removeLoad, updateLoad,
        energyPrice, setEnergyPrice,
        inflationRate, setInflationRate,
        annualMaintenance, setAnnualMaintenance,
        manualMonthlyKwh, setManualMonthlyKwh,
        totals, projections,
        requestQuote
    };
};
