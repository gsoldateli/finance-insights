"use client";

import { useState } from "react";

interface TemperatureDisplayProps {
    fahrenheit: number;
    celsius: number;
    condition: string;
}

export const TemperatureDisplay = ({ fahrenheit, celsius, condition }: TemperatureDisplayProps) => {
    const [isCelsius, setIsCelsius] = useState(false);

    return (
        <div>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                    {isCelsius ? Math.round(celsius) : Math.round(fahrenheit)}°{isCelsius ? 'C' : 'F'}
                </span>
                <span className="text-sm text-slate-500">{condition}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-full w-fit mt-3">
                <button 
                    onClick={() => setIsCelsius(false)} 
                    className={`text-[10px] px-2 py-0.5 rounded-full transition-all ${!isCelsius ? 'bg-white shadow-sm font-bold text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    °F
                </button>
                <button 
                    onClick={() => setIsCelsius(true)} 
                    className={`text-[10px] px-2 py-0.5 rounded-full transition-all ${isCelsius ? 'bg-white shadow-sm font-bold text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    °C
                </button>
            </div>
        </div>
    );
}
