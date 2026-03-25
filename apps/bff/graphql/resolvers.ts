import { withCache } from "../lib/cache";
import { NewsService } from "../src/services/news.service";
import { WeatherService } from "../src/services/weather.service";
import { Resolvers } from "./generated/resolvers-types";
import { DateTimeResolver } from 'graphql-scalars';

export const resolvers: Partial<Resolvers> = {
    DateTime: DateTimeResolver,
    Query: {
        getCryptos: async (_, { limit = 5 }) => {
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
        getWeather: async (_, { ip, city }) => {

            const cacheKey = `weather-${city || ip || 'default'}`;
            return withCache(cacheKey, () => WeatherService.getWeather(ip, city), 1800); // cache for 30 minutes
        }

    }
}