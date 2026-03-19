import { withCache } from "../lib/cache";
import { NewsService } from "../src/services/news.service";
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
        getWeather: async (_, { city }) => {
            return null;
        }

    }
}