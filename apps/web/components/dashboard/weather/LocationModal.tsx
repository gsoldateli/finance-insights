'use client'

import { useEffect, useState } from "react"
import { MapPin, ArrowLeft, Map as MapIcon, Loader2, Navigation } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import useDebounce from "@/hooks/useDebounce"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api-client"
import { SEARCH_LOCATIONS_QUERY } from "./weather.gql"

interface LocationModalProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (city: string) => void
}

export function LocationModal({ onSelect, isOpen, onClose }: LocationModalProps) {
    const [query, setQuery] = useState<string>("")
    const [isLocating, setIsLocating] = useState(false)

    const debouncedQuery = useDebounce(query, 400);



    const { data, isLoading, error } = useQuery({
        queryKey: ['search-locations', debouncedQuery],
        queryFn: async () => {
            if (debouncedQuery.length < 3) {
                return null
            }
            return await api.request(SEARCH_LOCATIONS_QUERY, { query: debouncedQuery })
        }
    })
    const locations = data?.searchLocations ?? [];


    const handleGeolocation = () => {
        setIsLocating(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords

                setIsLocating(false)
            },
            () => setIsLocating(false),
            { timeout: 10000 }
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[480px] p-0 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden gap-0">

                <div className="p-6 pb-2">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm font-medium mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar
                    </button>
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-slate-900 dark:text-slate-100 text-2xl font-bold">
                            Change Location
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 dark:text-slate-400 text-sm">
                            Search for your city to update the weather data.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <Command shouldFilter={false}>
                    <div className="relative px-4">
                        <CommandInput
                            size={20}
                            placeholder="Type the city name..."
                            value={query}
                            onValueChange={setQuery}
                            className="h-14 border-none focus:ring-0 bg-transparent"
                            prefixIcon={isLoading ? <Loader2 className="h-4 w-4 animate-spin opacity-50" /> : <MapPin className="h-4 w-4 text-slate-400" />}

                        />
                    </div>

                    <CommandList className="max-h-[300px] p-2">
                        <CommandEmpty className="py-6 text-center text-sm text-slate-500">
                            {isLoading ? "Searching..." : "No results found."}
                        </CommandEmpty>

                        <CommandGroup heading="Sugestões">
                            {locations.length > 0 ? locations?.map((location, index) => {
                                if (!location) {
                                    return null;
                                }
                                return <CommandItem
                                    key={`${location.id}-${index}`}
                                    onSelect={() => {
                                        console.log({ selectedLocation: location })

                                        // onSelect(location)
                                        onClose()
                                    }}
                                    className="flex items-center gap-3 p-3 cursor-pointer rounded-lg"
                                >
                                    <MapPin className="h-4 w-4 text-slate-400" />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900 dark:text-slate-100">
                                            {location.name}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {`${location.name},${location.city}, ${location.state}, ${location.country}`}
                                        </span>
                                    </div>
                                </CommandItem>
                            }) : null}
                            <CommandItem
                                onSelect={handleGeolocation}
                                className="flex items-center gap-3 p-3 cursor-pointer rounded-lg"
                                disabled={isLocating}
                            >
                                <Navigation className={cn("h-4 w-4 text-primary", isLocating && "animate-pulse")} />
                                <span className="font-medium text-primary">Usar minha localização atual</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>


                <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800">
                    <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 h-20 relative group">
                        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <MapIcon className="text-slate-300 dark:text-slate-600 h-8 w-8" />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
}