import 'dotenv/config';
import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import schema from './schema/index.ts';

const yoga = createYoga({ schema });
export const server = createServer(yoga);
server.listen(3000);
console.log('Server running at: http://0.0.0.0:3000/graphql');
