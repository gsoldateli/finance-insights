
import { z } from 'zod';

const CoindeskNewsSchema = z.object({
    Data: z.array(z.object({
        ID: z.number().transform((id) => `${id}`),
        TITLE: z.string(),
        BODY: z.string(),
        URL: z.string(),
        IMAGE_URL: z.string(),
        SOURCE_DATA: z.object({
            NAME: z.string()
        }),
        PUBLISHED_ON: z.number()
    })),
});


export const NewsService = {
    async getLatestNews() {
        console.log('GETCH')
        const apiKey = process.env.COINDESK_API_KEY;
        const url = `https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=3&api_key=${apiKey}`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            const parsed = CoindeskNewsSchema.safeParse(json);
            console.log(JSON.stringify(parsed, null, 2));
            if (parsed.error) {
                throw new Error(parsed.error.message);
            }

            return parsed.data.Data.map((item) => ({
                id: `${item.ID}`,
                title: item.TITLE,
                summary: item.BODY,
                url: item.URL,
                source: item.SOURCE_DATA.NAME,
                imageUrl: item.IMAGE_URL,
                publishedAt: new Date(item.PUBLISHED_ON * 1000).toISOString(),
            }));

        } catch (error) {
            console.error('[NewsService Error]:', error);
            return [];
        }
    }
};