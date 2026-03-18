import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';

import { loadTypeDefs } from './graphql/loadTypeDefs.ts';
import { queryResolvers } from './graphql/resolvers.ts';

const app = express();
const server = new ApolloServer({ typeDefs: loadTypeDefs(), resolvers: { Query: queryResolvers } });

await server.start();

app.use('/graphql', cors(), express.json(), expressMiddleware(server));

app.listen(4000, () => console.log('BFF Express running at http://localhost:4000/graphql'));