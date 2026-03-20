import { expect, test } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import NewsFeed from '../NewsFeed'
import { describe } from 'node:test'
import { server } from '@/mocks/server'

import { graphql, HttpResponse } from 'msw'
import { GetNewsDocument } from '@/src/gql/graphql'

describe('NewsFeed integration', () => {
    // console.log('true');

    test('should render no news message when there are no news', async () => {
        server.use(
            graphql.query(GetNewsDocument, () => {
                return HttpResponse.json({ data: { getNews: [] } });
            })
        );
        await act(async () => {
            render(await NewsFeed());
        });
        expect(await screen.findByText('No news available at the moment.')).toBeDefined()
    })

    test('should render the layout correctly with only 2 news in total', async () => {
        const now = new Date();
        server.use(
            graphql.query(GetNewsDocument, () => {
                return HttpResponse.json({
                    data: {
                        getNews: [
                            {
                                id: '1',
                                title: 'Global Markets See Sharp Recovery Amid New Tech Surge',
                                summary: 'Investors are reacting positively to the latest earnings reports from major technology firms, leading to a significant bounce in international stock indices.',
                                imageUrl: 'https://placehold.co/600x400?text=Market+Recovery',
                                source: 'Financial Times',
                                url: '/news/market-recovery',
                                // 1 minuto atrás (60 * 1000 ms)
                                publishedAt: new Date(now.getTime() - 1 * 60 * 1000).toISOString(),
                            },
                            {
                                id: '2',
                                title: 'New Sustainable Energy Breakthrough Announced by Research Team',
                                summary: 'A breakthrough in solid-state battery technology could double the range of electric vehicles while significantly reducing charging times.',
                                imageUrl: 'https://placehold.co/600x400?text=Energy+Breakthrough',
                                source: 'TechCrunch',
                                url: '/news/energy-breakthrough',
                                // 2 minutos atrás (2 * 60 * 1000 ms)
                                publishedAt: new Date(now.getTime() - 2 * 60 * 1000).toISOString(),
                            },


                        ],
                    },
                });
            })
        );

        const Result = await NewsFeed();
        await act(async () => { render(Result); });

        const news = await screen.findAllByRole('article');
        expect(news).toHaveLength(2);

        expect(news[0]).toHaveTextContent('Global Markets See Sharp Recovery Amid New Tech Surge');
        expect(news[0]).toHaveTextContent('1 minute ago');
        expect(news[1]).toHaveTextContent('New Sustainable Energy Breakthrough Announced by Research Team');
        expect(news[1]).toHaveTextContent('2 minutes ago');
    });


})