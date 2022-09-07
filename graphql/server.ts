import { makeContext } from './context.ts';
import { serve, serveStatic, Hono, createServer, gql } from './deps.ts';
import type { TypeSource } from './deps.ts';
import { resolvers } from "./resolvers.ts";

export const typeDefs = gql(Deno.readTextFileSync('./graphql/world.graphql')) as TypeSource;

const app = new Hono();

export const graphQLServer = createServer({
  schema: {
    typeDefs,
    resolvers
  },
  context: makeContext
});

app.use('/graphql', (ctx) => {
  return graphQLServer.handleRequest(ctx.req, ctx.res);
})

app.use('*', serveStatic({ root: './', path: 'dist' }));

serve(app.fetch);
