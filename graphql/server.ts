import { serve, serveStatic, Hono } from './deps.ts';

const app = new Hono()

app.use('*', serveStatic('../dist'));

serve(app.fetch);
