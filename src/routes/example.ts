import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

const helloQuery = z.object({
  name: z.string().trim().min(1).max(80).default('Papua New Guinea')
});

const helloResponse = z.object({
  message: z.string()
});

export const exampleRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get('/hello', {
    schema: {
      tags: ['Example'],
      summary: 'Example validated endpoint',
      querystring: helloQuery,
      response: { 200: helloResponse }
    }
  }, async (request) => ({
    message: `Hello, ${request.query.name}!`
  }));
};
