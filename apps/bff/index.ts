import * as dotenv from 'dotenv';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';

import { loadTypeDefs } from './graphql/loadTypeDefs.ts';
import { resolvers } from './graphql/resolvers.ts';
import { fileURLToPath } from 'url';

const app = express();
const server = new ApolloServer({ typeDefs: loadTypeDefs(), resolvers });

await server.start();

app.use('/graphql', cors(), express.json(), expressMiddleware(server));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`BFF Express running at http://localhost:${port}/graphql`));