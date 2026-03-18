
import { z } from 'zod';

const CoindeskNewsSchema = z.object({
    Data: z.array(z.object({
        ID: z.number().transform((id) => `${id}`),
        TITLE: z.string(),
        BODY: z.string(),
        URL: z.string(),
        SOURCE_DATA: z.object({
            NAME: z.string()
        }),
        PUBLISHED_ON: z.number()
    })),
});


export const NewsService = {
    async getLatestNews() {
        const apiKey = process.env.CRYPTOCOMPARE_API_KEY;
        // Endpoint de notícias filtrado por categorias (BTC, ETH, etc)
        const url = `https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=3&api_key=${apiKey}`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            const parsed = CoindeskNewsSchema.safeParse(json);

            if (parsed.error) {
                throw new Error(parsed.error.message);
            }

            console.log(JSON.stringify(json, null, 2));

            // Mapeando o 'Data' da CryptoCompare para o nosso tipo 'News' do GraphQL
            return parsed.data.Data.map((item) => ({
                id: `${item.ID}`,
                title: item.TITLE,
                summary: item.BODY, // Trim para o card do front
                url: item.URL,
                source: item.SOURCE_DATA.NAME,
                publishedAt: new Date(item.PUBLISHED_ON * 1000).toISOString(),
            }));
        } catch (error) {
            console.error('[NewsService Error]:', error);
            return []; // Retorno resiliente: o app não quebra se a API falhar
        }
    }
};