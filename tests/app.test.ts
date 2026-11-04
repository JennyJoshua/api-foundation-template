import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { loadConfig } from '../src/config/env.js';

describe('API foundation', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp(loadConfig({ NODE_ENV: 'test', LOG_LEVEL: 'silent' }));
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns a health response', async () => {
    const response = await app.inject({ method: 'GET', url: '/health' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });

  it('validates and handles example query input', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/v1/hello?name=Baimuru' });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: 'Hello, Baimuru!' });
  });

  it('rejects invalid example query input', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/v1/hello?name=' });
    expect(response.statusCode).toBe(400);
  });

  it('serves OpenAPI JSON', async () => {
    const response = await app.inject({ method: 'GET', url: '/docs/json' });
    expect(response.statusCode).toBe(200);
    expect(response.json().paths['/api/v1/hello']).toBeDefined();
  });
});
