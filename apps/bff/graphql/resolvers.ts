import { withCache } from "../lib/cache";
import { LocationService } from "../src/services/location.service";
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
            console.log({ ip, city })
            if (!ip && !city) {
                throw new Error('IP or city is required');
            }
            const weatherService = new WeatherService();
            const cacheKey = `weather-${city || ip}`;
            const weatherInfo = await withCache(cacheKey, () => weatherService.getCurrentWeather(`${ip || city}`), 1800); // cache for 30 minutes

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
                    state: properties.state,
                    city: properties.city ?? null,
                    country: properties.country,
                    coordinates: {
                        lat,
                        lng
                    },
                }
            })

        }

    }

}