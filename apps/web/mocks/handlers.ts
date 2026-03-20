
import { graphql, HttpResponse } from 'msw';
import { GetNewsQuery, GetNewsQueryVariables, GetNewsDocument } from '@/src/gql/graphql'
import { API_CONFIG } from '@/config/api.config';
const api = graphql.link(API_CONFIG.endpoint)


export const handlers = [

    api.query<GetNewsQuery, GetNewsQueryVariables>(GetNewsDocument, ({ variables }) => {
        return HttpResponse.json({
            data: {
                getNews: [
                    {
                        id: '1',
                        title: 'Mocked News with Type Safety',
                        summary: 'Se eu esquecer um campo obrigatório aqui, o TS reclama.',
                        imageUrl: 'https://placehold.co/600x400',
                        source: 'Codegen',
                        url: '/news/safe',
                        publishedAt: new Date().toISOString(),
                    },
                ],
            },
        });
    }),
];