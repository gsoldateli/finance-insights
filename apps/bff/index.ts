import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';

import { loadTypeDefs } from './graphql/loadTypeDefs.ts';
import { resolvers } from './graphql/resolvers.ts';

const app = express();
const server = new ApolloServer({ typeDefs: loadTypeDefs(), resolvers });

await server.start();

app.use('/graphql', cors(), express.json(), expressMiddleware(server));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`BFF Express running at http://localhost:${port}/graphql`));