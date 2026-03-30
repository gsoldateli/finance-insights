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

import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api-client"
import { SEARCH_LOCATIONS_QUERY } from "./weather.gql"
import { LocationResult } from "@/src/gql/graphql"

interface LocationModalProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (location: Omit<LocationResult, 'type'>) => void
}

export function LocationModal({ onSelect, isOpen, onClose }: LocationModalProps) {
    const [query, setQuery] = useState<string>("")
    const [isLocating, setIsLocating] = useState(false)

    const debouncedQuery = useDebounce(query, 400);

    useEffect(() => {
        if (!isOpen) {
            setQuery("")
        }
    }, [isOpen])

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

    const emptyMessage = getEmptyMessage(isLoading, query, locations.length);
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
                        {(() => {
                            if (emptyMessage) {
                                return <CommandEmpty className="py-6 text-center text-sm text-slate-500">{emptyMessage}</CommandEmpty>
                            }

                            if (locations.length > 0) {
                                return <CommandGroup heading="Suggestions">
                                    {locations?.map((location, index) => {
                                        if (!location) {
                                            return null;
                                        }
                                        const displayLocation = [location.name, location.city, location.state, location.country].filter(Boolean).join(', ');
                                        return <CommandItem
                                            id={`${location.id}-${index}`}
                                            key={`${location.id}-${index}`}
                                            onSelect={() => {
                                                onSelect(location)
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
                                                    {displayLocation}
                                                </span>
                                            </div>
                                        </CommandItem>
                                    })}

                                </CommandGroup>
                            }

                            return null;
                        })()}

                    </CommandList>
                </Command>

            </DialogContent>
        </Dialog >
    )
}

const getEmptyMessage = (isLoading: boolean, query: string, locationsQuantity: number) => {
    if (isLoading) return "Searching...";
    if (query.length >= 3 && locationsQuantity === 0) return "No results found.";
    return null;
};