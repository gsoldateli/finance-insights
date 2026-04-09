import { withCache } from "../lib/cache";
import { CoinGeckoService } from "../src/services/coins.service";
import { LocationService } from "../src/services/location.service";
import { NewsService } from "../src/services/news.service";
import { WeatherService } from "../src/services/weather.service";
import { CoinDetails, HistoryPoint, Resolvers } from "./generated/resolvers-types";
import { DateTimeResolver } from 'graphql-scalars';
import { withRedisCache } from "../lib/redis";



export const resolvers: Partial<Resolvers> = {
    DateTime: DateTimeResolver,
    Query: {
        getTrendingCoins: async () => {
            const coinsService = new CoinGeckoService()
            const { coins } = await withCache('trending-coins', () => coinsService.getTrendingCoins(), 60 * 60 * 3)

            return coins.map(({ item }) => {
                return {
                    id: item.id,
                    symbol: item.symbol,
                    name: item.name,
                    iconUrl: item.large,

                    currentPrice: {
                        amount: item.data.price,
                        currency: 'USD',
                        formatted: item.data.price.toString(),
                    },
                    marketCap: {
                        amount: item.data.market_cap,
                        currency: 'USD',
                        formatted: item.data.market_cap.toString(),
                    },
                    volume24h: {
                        amount: item.data.total_volume,
                        currency: 'USD',
                        formatted: item.data.total_volume.toString(),
                    },
                    history: [],
                    performance: {
                        changeAbs: item.data.price_change_percentage_24h.usd,
                        changePercent: item.data.price_change_percentage_24h.usd,
                        isPositive: item.data.price_change_percentage_24h.usd > 0,
                    },
                }
            })
        },
        coin: async (_, { symbol }) => {

            return {
                id: symbol,
                symbol: symbol,
                name: symbol,
                description: symbol,
                iconUrl: symbol,
                currentPrice: {
                    amount: 0,
                    currency: 'USD',
                    formatted: '0',
                },
                marketCap: {
                    amount: 0,
                    currency: 'USD',
                    formatted: '0',
                },
                volume24h: {
                    amount: 0,
                    currency: 'USD',
                    formatted: '0',
                },
                performance: {
                    changeAbs: 0,
                    changePercent: 0,
                    isPositive: false,
                    fiftyTwoWeekHigh: 0,
                    fiftyTwoWeekLow: 0,
                    allTimeHigh: 0,
                    athDate: '',
                },
                history: [],
            }
        },
        searchCoins: async (_, { query }) => {

            const coinsService = new CoinGeckoService()
            const coins = await withRedisCache(`search-coins-${query.toLowerCase()}`, () => coinsService.searchCoins(query), 60 * 60 * 24)
            return coins.coins.map((item) => {
                return {
                    id: item.symbol,
                    name: item.name,
                    symbol: item.symbol,
                    iconUrl: item.large,
                }
            })
        },
        getCryptos: async (_, { limit = 5 }) => {



            // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false
            return [{
                id: '1',
                symbol: 'BTC',
                price: 100000,
                change24h: 10,
            }];
        },
        getNews: async () => {
            return withCache('latest-news', () => NewsService.getLatestNews());
        },
        getWeather: async (_, { query }) => {
            const weatherService = new WeatherService();

            const cacheKey = `weather-${query}`;
            const weatherInfo = await withCache(cacheKey, () => weatherService.getCurrentWeather(`${query}`), 1800); // cache for 30 minutes

            if (!weatherInfo) {
                throw new Error('Weather not found');
            }

            return {
                temperature: {
                    fahrenheit: weatherInfo.current.temp_f,
                    celsius: weatherInfo.current.temp_c,
                },
                condition: weatherInfo.current.condition.text,
                location: {
                    city: weatherInfo.location.name,
                    state: weatherInfo.location.region,
                    country: weatherInfo.location.country,
                },
            };
        },
        searchLocations: async (_, { query }) => {
            const locationService = new LocationService();
            const locations = await locationService.searchLocations(query);

            if (!locations || locations.features.length === 0) {
                return [];
            }

            return locations.features.map((feature) => {
                const { properties, geometry } = feature;
                const [lng, lat] = geometry.coordinates;
                return {
                    id: properties.osm_id.toString(),
                    name: properties.name,
                    type: properties.type,
                    state: properties.state ?? null,
                    city: properties.city ?? null,
                    country: properties.country,
                    coordinates: {
                        lat,
                        lng
                    },
                }
            })

        }

    },
    CoinDetails: {
        history: async (parent: CoinDetails, { period }: { period: string }) => {
            return new Promise<HistoryPoint[]>((resolve) => {
                resolve([{
                    price: 1,
                    timestamp: 1,
                    volume: 1,
                }])
            })

        }
    },

}