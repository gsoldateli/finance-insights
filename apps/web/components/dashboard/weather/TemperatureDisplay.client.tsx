"use client";

import { updateTemperatureUnitAction } from "@/app/shared/user/user-actions";
import { useCallback, useState, useTransition } from "react";

interface TemperatureDisplayProps {
    fahrenheit: number;
    celsius: number;
    condition: string;
    initialTemperatureUnit: 'celsius' | 'fahrenheit';
}

export const TemperatureDisplay = ({ fahrenheit, celsius, condition, initialTemperatureUnit }: TemperatureDisplayProps) => {
    const [isCelsius, setIsCelsius] = useState(initialTemperatureUnit === 'celsius');
    const [isPending, startTransition] = useTransition()
    const updateTemperatureUnit = useCallback((unit: 'celsius' | 'fahrenheit') => {
        setIsCelsius(unit === 'celsius');
        startTransition(async () => {
            await updateTemperatureUnitAction(unit);
        })
    }, []);

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
                    onClick={() => {
                        updateTemperatureUnit('fahrenheit');
                    }}
                    className={`text-[10px] px-2 py-0.5 rounded-full transition-all ${!isCelsius ? 'bg-white shadow-sm font-bold text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    °F
                </button>
                <button
                    onClick={() => updateTemperatureUnit('celsius')}
                    className={`text-[10px] px-2 py-0.5 rounded-full transition-all ${isCelsius ? 'bg-white shadow-sm font-bold text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    °C
                </button>
            </div>
        </div>
    );
}
