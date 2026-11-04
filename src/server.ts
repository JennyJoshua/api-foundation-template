import { buildApp } from './app.js';
import { loadConfig } from './config/env.js';

async function start(): Promise<void> {
  const config = loadConfig();
  const app = await buildApp(config);

  try {
    await app.listen({ host: config.HOST, port: config.PORT });
  } catch (error) {
    app.log.error({ err: error }, 'Unable to start API server');
    await app.close();
    process.exitCode = 1;
  }
}

start().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Unable to start API server');
  process.exitCode = 1;
});
