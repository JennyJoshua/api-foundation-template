import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import type { AppConfig } from './config/env.js';
import { healthRoutes } from './routes/health.js';
import { exampleRoutes } from './routes/example.js';

export async function buildApp(config: AppConfig): Promise<FastifyInstance> {
  const app = Fastify({
    logger: { level: config.LOG_LEVEL },
    trustProxy: false
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler((error, request, reply) => {
    const statusCode = typeof error.statusCode === 'number' && error.statusCode >= 400 && error.statusCode < 500
      ? error.statusCode
      : 500;

    if (statusCode >= 500) {
      request.log.error({ err: error }, 'Request failed');
    } else {
      request.log.info({ err: error }, 'Request rejected');
    }

    return reply.status(statusCode).send({
      error: statusCode === 500 ? 'Internal Server Error' : 'Bad Request',
      message: statusCode === 500 ? 'An unexpected error occurred.' : 'The request could not be processed.',
      statusCode,
      requestId: request.id
    });
  });

  await app.register(helmet);
  await app.register(cors, {
    origin: config.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  });
  await app.register(rateLimit, {
    max: config.RATE_LIMIT_MAX,
    timeWindow: config.RATE_LIMIT_WINDOW
  });
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'API Foundation Template',
        description: 'Reusable API foundation. Replace the example route as your application grows.',
        version: '1.0.0'
      },
      servers: [{ url: '/' }]
    },
    transform: jsonSchemaTransform
  });
  await app.register(swaggerUi, { routePrefix: '/docs' });

  await app.register(healthRoutes);
  await app.register(exampleRoutes, { prefix: '/api/v1' });

  return app;
}
