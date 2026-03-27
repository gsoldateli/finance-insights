
import z from "zod";

const LocationResponseSchema = z.object({
    features: z.object({
        type: z.string(),
        properties: z.object({
            osm_id: z.number(),
            type: z.string(),
            name: z.string(),
            city: z.string().optional(),
            state: z.string(),
            country: z.string(),
        }),
        geometry: z.object({
            coordinates: z.array(z.number()),
        }),
    }).array(),
});

type LocationResponse = z.infer<typeof LocationResponseSchema>;


export class LocationService {

    private baseUrl = 'https://photon.komoot.io/api/';

    async searchLocations(query?: string) {
        try {
            const res = await fetch(`${this.baseUrl}/?q=${encodeURIComponent(query ?? '')}`);
            if (res.ok) {
                const results = await res.json();
                console.log(JSON.stringify(results, null, 2))
                const parsed = LocationResponseSchema.parse(results);

                return parsed; // LocationResponseSchema.parse);
            }
        } catch (error) {
            console.error('[LocationService Error]: searchLocations failed', error);
            return null;
        }

    }

}

