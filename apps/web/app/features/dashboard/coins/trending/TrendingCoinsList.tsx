import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { GET_TRENDING_COINS_QUERY } from "./trending-coins.gql";
import { api } from "@/lib/api-client";
import { ChevronRight } from "lucide-react";
import { ModuleError } from "@/components/ModuleError.client";
import { ScrollArea } from "@/components/ui/scroll-area";




export const TrendingCoinsList = async () => {
    let data;
    try {
        data = await api.request(GET_TRENDING_COINS_QUERY);

    } catch (error) {
        return <ModuleError moduleName="Trending Coins" />
    }

    const trendingCoins = data.getTrendingCoins;

    return (

        <ScrollArea className="h-auto md:h-[450px]">
            <div className="grid grid-cols-1 gap-3 p-[1px] relative">
                <div className="[mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] absolute bottom-0 inset-0"></div>
                {(() => {
                    if (trendingCoins.length === 0) {
                        return <p>No trending coins found</p>
                    }

                    return trendingCoins.map(coin => {
                        if (!coin) {
                            return null;
                        }
                        return (
                            <Card key={coin.symbol} className="hover:border-[#144bb8]/40 transition-colors cursor-pointer group">
                                <CardContent className="px-4 py-2 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {coin.iconUrl ? <div className={`h-10 w-10 rounded-full overflow-hidden  flex items-center justify-center`}>
                                            <img src={coin.iconUrl} alt={coin.name} className="w-full h-full object-cover" />

                                        </div> : <div className={`h-12 w-12 rounded-full  flex items-center justify-center`}>
                                            <Badge variant="outline" className="border-none font-bold text-[10px]">{coin.symbol}</Badge>
                                        </div>}
                                        <div>
                                            <p className="text-sm font-bold">{coin.name}</p>
                                            <p className="text-[10px] text-slate-400 uppercase">{coin.symbol}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center">
                                        <div className="mr-2">
                                            <p className="text-sm font-bold">{Intl.NumberFormat('en-US', { style: 'currency', currency: coin.currentPrice.currency }).format(coin.currentPrice.amount)}</p>
                                            <p className={`text-[10px] font-bold ${coin.performance.changePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>{Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(coin.performance.changePercent / 100)}</p>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-[#144bb8]" />
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })
                })()}
            </div>
        </ScrollArea>
    );


}

