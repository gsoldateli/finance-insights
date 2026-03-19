import { GraphQLClient } from 'graphql-request';
import { API_CONFIG } from '@/config/api.config';

export const api = new GraphQLClient(API_CONFIG.endpoint, {
    fetch,
});
