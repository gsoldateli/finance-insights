'use client'

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LocationModal } from "./LocationModal"
import { useRouter } from "next/navigation"
import { LocationResult } from "@/src/gql/graphql"
import { UserLocationCookie } from "@/app/shared/user/user-location"

export const WeatherLocationAction = ({ location }: { location: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleSave = (location: Omit<LocationResult, 'type'>) => {
        const { coordinates } = location;


        UserLocationCookie.setContext({
            lat: coordinates.lat,
            lng: coordinates.lng,
            location: location.name,
            timezone: 'America/Sao_Paulo',
        });
        // Dá o refresh para o RSC re-executar o fetch com a nova cidade
        router.refresh();
    };


    return (
        <div className="text-right flex flex-col items-end">
            <p className="text-xs text-slate-500 max-w-[120px]" title={`${location}`}>
                {location}
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