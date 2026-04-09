'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Search, X, ChevronRight, SearchCode } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '@/components/ui/button'

interface Coin {
    name: string
    symbol: string
    icon: string
    color: string
}

export const SearchCoinModal = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Simulação de dados (ou viria via props/fetch)
    const currencies: Coin[] = [
        { name: 'Bitcoin', symbol: 'BTC', icon: 'currency_bitcoin', color: 'orange' },
        { name: 'Ethereum', symbol: 'ETH', icon: 'eth', color: 'blue' },
    ]

    // Lógica de Loading Fake para simular busca em API
    useEffect(() => {
        if (searchQuery.length > 0) {
            setIsLoading(true)
            const timer = setTimeout(() => setIsLoading(false), 300)
            return () => clearTimeout(timer)
        }
    }, [searchQuery])

    const filteredCurrencies = useMemo(() => {
        return currencies.filter(coin =>
            coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => { setIsOpen(open) }}

        >
            <DialogTrigger asChild>
                <Button>Abrir</Button>
            </DialogTrigger>
            <DialogContent className="p-0 gap-0 max-w-3xl overflow-hidden border-none bg-white dark:bg-slate-900 shadow-2xl" showCloseButton={false}>
                <DialogTitle className="sr-only">Search Currencies</DialogTitle>

                {/* Header / Input Area */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 relative">
                    <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6" />
                    <Input
                        autoFocus
                        className="w-full pl-14 pr-12 py-7 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-xl font-medium focus-visible:ring-2 focus-visible:ring-primary/20 outline-none transition-all"
                        placeholder="Search currencies, markets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            setSearchQuery('');
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Results Area */}
                <ScrollArea className="flex-1 max-h-[50vh] p-4">
                    {isLoading ? (
                        <SearchLoadingSkeleton />
                    ) : filteredCurrencies.length > 0 ? (
                        <div className="flex flex-col gap-1">
                            <p className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Currencies
                            </p>
                            {filteredCurrencies.map((coin) => (
                                <button
                                    key={coin.symbol}
                                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center`}>
                                            <span className="text-xl">💰</span> {/* Ou componente de Icon real */}
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-slate-900 dark:text-white">{coin.name}</p>
                                            <p className="text-xs text-slate-500 uppercase font-medium">{coin.symbol}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
                            <SearchCode className="h-16 w-16 opacity-20" />
                            <p className="text-sm font-medium">No results found for "{searchQuery}"</p>
                        </div>
                    )}
                </ScrollArea>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <button onClick={() => setIsOpen(false)} className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">ESC</kbd>
                            Close
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium italic">Data powered by <a href="https://www.coingecko.com/en/api" target="_blank" rel="noopener noreferrer">CoinGecko API</a></p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const SearchLoadingSkeleton = () => (
    <div className="space-y-2 p-2">
        {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-12" />
                </div>
            </div>
        ))}
    </div>
)