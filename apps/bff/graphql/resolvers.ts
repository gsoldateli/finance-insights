import { withCache } from "../lib/cache";
import { NewsService } from "../src/services/news.service";
import { QueryResolvers, Resolvers } from "./generated/resolvers-types";



export const queryResolvers: QueryResolvers = {
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

};