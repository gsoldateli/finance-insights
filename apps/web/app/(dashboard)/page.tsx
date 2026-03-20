export const dynamic = 'force-dynamic';

import React, { Suspense } from 'react';
import {
    Search, TrendingUp, Newspaper, CloudSun,
    MapPin, Mail, ChevronRight
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import NewsFeed from '@/components/dashboard/news/NewsFeed';
import NewsLoadingSkeleton from '@/components/dashboard/news/NewsLoadingSkeleton';



const FinanceDashboard = async () => {

    const trendingCoins = [
        { name: 'Bitcoin', symbol: 'BTC', price: '$67,432.12', change: '+2.4%', color: 'text-orange-500', bg: 'bg-orange-50' },
        { name: 'Ethereum', symbol: 'ETH', price: '$3,452.18', change: '+1.2%', color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Solana', symbol: 'SOL', price: '$143.22', change: '-0.4%', color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-950">
            <main className="container py-10 space-y-8 layout-container">
                {/* Hero Section */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight">Finance Insights Dashboard</h1>
                    <p className="text-slate-500 text-lg">Stay updated with top news, crypto assets, and real-time weather.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: News */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Newspaper className="text-[#144bb8]" />
                                <h2 className="text-2xl font-bold">Latest News</h2>
                            </div>
                            {/* <Button variant="link" className="text-[#144bb8]">View all news</Button> */}
                        </div>
                        <Suspense fallback={<NewsLoadingSkeleton />}>
                            <NewsFeed />
                        </Suspense>
                    </div>

                    {/* Coluna da Direita: Sidebar */}
                    <aside className="space-y-6">
                        {/* Weather Card */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-50 rounded-lg text-blue-500">
                                        <CloudSun className="h-8 w-8" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-slate-500">San Francisco, CA</p>
                                        <Button variant="link" size="sm" className="h-auto p-0 text-[10px]">
                                            <MapPin className="h-3 w-3 mr-1" /> Change
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Weather</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold">22°C</span>
                                    <span className="text-sm text-slate-500">Cloudy</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Trending Coins */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-[#144bb8]" />
                                <h2 className="text-xl font-bold">Trending</h2>
                            </div>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input placeholder="Search for a coin..." className="pl-10" />
                            </div>

                            <div className="space-y-3">
                                {trendingCoins.map((coin) => (
                                    <Card key={coin.symbol} className="hover:border-[#144bb8]/40 transition-colors cursor-pointer group">
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-10 w-10 rounded-full ${coin.bg} flex items-center justify-center ${coin.color}`}>
                                                    <Badge variant="outline" className="border-none font-bold text-[10px]">{coin.symbol}</Badge>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">{coin.name}</p>
                                                    <p className="text-[10px] text-slate-400 uppercase">{coin.symbol}</p>
                                                </div>
                                            </div>
                                            <div className="text-right flex items-center">
                                                <div className="mr-2">
                                                    <p className="text-sm font-bold">{coin.price}</p>
                                                    <p className={`text-[10px] font-bold ${coin.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>{coin.change}</p>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-[#144bb8]" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter CTA */}
                        <Card className="bg-[#144bb8] text-white overflow-hidden relative">
                            <CardContent className="p-6 relative z-10">
                                <h4 className="font-bold mb-1">Get Weekly Reports</h4>
                                <p className="text-xs opacity-80 mb-4">The best insights directly to your inbox.</p>
                                <Button className="w-full bg-white text-[#144bb8] hover:bg-slate-100 font-bold">
                                    Subscribe Now
                                </Button>
                            </CardContent>
                            <Mail className="absolute -right-4 -bottom-4 h-24 w-24 opacity-10 rotate-12" />
                        </Card>
                    </aside>
                </div>
            </main>
        </div>
    );
};

// Sub-componente para organização


export default FinanceDashboard;