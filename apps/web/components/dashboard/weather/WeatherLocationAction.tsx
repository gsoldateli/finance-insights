'use client'

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LocationModal } from "./LocationModal"
import { useRouter } from "next/navigation"

export const WeatherLocationAction = ({ city, state }: { city: string, state: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleSave = (newCity: string) => {
        // Salva a nova localização em um cookie para o servidor ler no próximo fetch
        document.cookie = `user-location=${newCity}; path=/; max-age=${31536000}`;

        // Dá o refresh para o RSC re-executar o fetch com a nova cidade
        router.refresh();
    };


    return (
        <div className="text-right flex flex-col items-end">
            <p className="text-xs text-slate-500 max-w-[120px]" title={`${city}, ${state}`}>
                {city}, {state}
            </p>
            <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-[10px] mt-1"
                onClick={() => setIsModalOpen(true)}
            >
                <MapPin className="h-3 w-3 mr-1" /> Change
            </Button>

            <LocationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleSave}
            />
        </div>
    );
}