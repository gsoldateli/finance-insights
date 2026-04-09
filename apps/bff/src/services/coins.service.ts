
import z from "zod";


const currencyStringToNumber = z.string().transform((val) =>
    Number(val.replace(/[^0-9.-]+/g, ""))
);

const CoinSchema = z.object({
    item: z.object({
        id: z.string(),
        coin_id: z.number(),
        name: z.string(),
        symbol: z.string(),
        market_cap_rank: z.number().nullable(),
        thumb: z.string().url(),
        small: z.string().url(),
        large: z.string().url(),
        slug: z.string(),
        price_btc: z.number(),
        score: z.number(),
        data: z.object({
            price: z.number(),
            price_btc: z.string().transform(Number), // Converte a string científica para Number
            price_change_percentage_24h: z.object({
                usd: z.number()
            }), // Pega todas as moedas dinamicamente
            market_cap: currencyStringToNumber,
            market_cap_btc: z.string().transform(Number),
            total_volume: currencyStringToNumber,
            total_volume_btc: z.string().transform(Number),
            sparkline: z.string().url(),
            content: z.object({
                title: z.string().optional(),
                description: z.string().optional(),
            }).nullable(),
        }),
    })

});

export const TrendingCoinsResponse = z.object({
    coins: z.array(CoinSchema)
});

export const CoinSearchItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    symbol: z.string(),
    thumb: z.string().url(),
    large: z.string().url(),

})
export const ListAllCoinsResponseSchema = z.object({
    coins: z.array(CoinSearchItemSchema)
})

export class CoinGeckoService {
    private API_KEY: string;
    private baseUrl = 'https://api.coingecko.com/api/v3';

    private fetch = async (url: string) => {
        console.log(`${this.baseUrl}/${url}`)
        const res = await fetch(`${this.baseUrl}/${url}`, {
            headers: {
                'x-cg-demo-api-key': this.API_KEY,
            },
        });
        if (res.ok) {
            return res.json();
        }
        throw new Error(`Failed to fetch ${url}`);
    }

    constructor() {
        if (!process.env.COINGECKO_API_KEY) {
            throw new Error("COINGECKO_API_KEY is not set");
        }
        this.API_KEY = process.env.COINGECKO_API_KEY;

    }

    async getTrendingCoins() {
        const url = `search/trending`;
        const coins = await this.fetch(url);

        return TrendingCoinsResponse.parse(coins)
    }

    async searchCoins(query: string) {
        const url = `search?query=${query}`;
        const data = await this.fetch(url);
        return ListAllCoinsResponseSchema.parse(data)
    }

}


