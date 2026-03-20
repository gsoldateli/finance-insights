import { GraphQLClient } from 'graphql-request';
import { API_CONFIG } from '@/config/api.config';

export const api = new GraphQLClient(API_CONFIG.endpoint, {
    // ensure fetch is the global fetch after msw setup
    fetch: (...args) => globalThis.fetch(...args),
});
