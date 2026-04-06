
import z from "zod";

const CurrentWeatherResponseSchema = z.object({
    location: z.object({
        name: z.string(),
        region: z.string(),
        country: z.string(),
    }),
    current: z.object({
        temp_f: z.number().transform((temp_f) => Math.round(temp_f)),
        temp_c: z.number().transform((temp_c) => Math.round(temp_c)),
        condition: z.object({
            text: z.string(),
        }),
    }),

});


export class WeatherService {
    private API_KEY: string;
    private baseUrl = 'https://api.weatherapi.com/v1';

    constructor() {
        if (!process.env.WEATHER_API_KEY) {
            throw new Error("WEATHER_API_KEY is not set");
        }
        this.API_KEY = process.env.WEATHER_API_KEY;

    }

    async getCurrentWeather(query?: string) {

        try {
            const res = await fetch(`${this.baseUrl}/current.json?key=${this.API_KEY}&q=${query}`);
            if (res.ok) {
                return CurrentWeatherResponseSchema.parse(await res.json());
            }
        } catch (error) {
            console.error('[WeatherService Error]: getCurrentWeather failed', error);
            return null;
        }

    }

}

