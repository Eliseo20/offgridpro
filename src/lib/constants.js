// --- Datos del Reporte BCN 2025 ---
export const HISTORICAL_BCN_DATA = [
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
export const OFF_GRID_KITS = [
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

export const PRESET_LOADS = [
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
    { id: 17, name: 'TV LED', power: 100, category: 'Ocio', icon: '📺' },
    { id: 20, name: 'Router Wi-Fi', power: 12, category: 'Red', icon: '🌐' },
    { id: 21, name: 'Iluminación LED', power: 10, category: 'Hogar', icon: '💡' },
    { id: 22, name: 'Bomba de Agua', power: 750, category: 'Hogar', icon: '💧' },
    { id: 23, name: 'Secador Pelo', power: 2000, category: 'Baño', icon: '💇' },
    { id: 24, name: 'Licuadora', power: 600, category: 'Cocina', icon: '🍹' },
    { id: 25, name: 'Tostadora', power: 800, category: 'Cocina', icon: '🍞' },
    { id: 26, name: 'Freidora Aire', power: 1500, category: 'Cocina', icon: '🍟' },
    { id: 27, name: 'Calefactor', power: 2000, category: 'Clima', icon: '🔥' },
    { id: 28, name: 'Aspiradora', power: 1200, category: 'Hogar', icon: '🧹' },
    { id: 29, name: 'Ventilador', power: 60, category: 'Clima', icon: '🪭' },
    { id: 30, name: 'Consola Juegos', power: 200, category: 'Ocio', icon: '🎮' },
    { id: 31, name: 'Carg. Celular', power: 15, category: 'Ocio', icon: '📱' },
    { id: 32, name: 'Equipo Música', power: 100, category: 'Ocio', icon: '📻' },
];
