# API Foundation Template

A reusable Node.js 24, TypeScript and Fastify 5 API starter. It includes validated configuration, request validation, OpenAPI documentation, security defaults, automated tests and GitHub Actions CI.

Database and authentication integrations are intentionally optional. Add them only when a consuming application requires them.

## Requirements

- Node.js 24 or newer
- npm

## Getting started

```bash
npm ci
cp .env.example .env
npm run dev
```

The API listens on `http://localhost:3000` by default.

## Endpoints

- `GET /health` — basic health check.
- `GET /api/v1/hello?name=Baimuru` — example endpoint with Zod query validation.
- `/docs` — interactive OpenAPI documentation.
- `/docs/json` — generated OpenAPI JSON.

## Configuration

Copy `.env.example` to `.env`. Environment variables are validated at startup. Invalid values stop startup with a readable configuration error.

| Variable | Default | Description |
| --- | --- | --- |
| NODE_ENV | development | development, test or production |
| HOST | 0.0.0.0 | Listen interface |
| PORT | 3000 | Listen port (1–65535) |
| LOG_LEVEL | info | Fastify log level |
| CORS_ORIGIN | http://localhost:3000 | Comma-separated allowed origins |
| RATE_LIMIT_MAX | 100 | Requests allowed per time window |
| RATE_LIMIT_WINDOW | 1 minute | Rate-limit window |

For production, set explicit allowed origins and review rate limits for the deployment environment. Do not commit real credentials.

## Commands

```bash
npm ci           # install exact locked dependencies
npm run dev      # development server with reload
npm run build    # compile TypeScript to dist/
npm start        # run compiled server
npm run lint     # ESLint
npm run typecheck # TypeScript checks
npm test         # Vitest
npm run check    # lint, typecheck, tests and build
```

## Project structure

```text
src/
  app.ts             # Fastify application factory and plugins
  server.ts          # process entry point
  config/env.ts      # validated runtime configuration
  routes/            # route plugins
tests/               # API and configuration tests
.github/workflows/   # continuous integration
```

## Security notes

- Helmet sets common HTTP security headers.
- CORS uses an explicit allow-list from configuration.
- Rate limiting is enabled by default.
- Request validation is performed with Zod.
- Unexpected errors return a generic message; details are logged server-side.
- Proxy trust is disabled by default. Configure it deliberately if deployed behind a trusted proxy.
- The example has no authentication, database, secrets or business-specific functionality.

This is a starting point, not a complete production security review. Before deployment, configure TLS at the hosting edge, set production environment values, review CORS/rate limits, add monitoring and implement application-specific authentication/authorization where needed.

## Optional extensions

Add a database or authentication adapter in a consuming application when required. Keep connection details in environment variables or a secrets manager, never in source control. Do not make those integrations prerequisites for this template.

## Contributing

See [AGENTS.md](AGENTS.md) for repository conventions and safe contribution rules.
