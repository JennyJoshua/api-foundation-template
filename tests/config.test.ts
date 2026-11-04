import { describe, expect, it } from 'vitest';
import { loadConfig } from '../src/config/env.js';

describe('loadConfig', () => {
  it('uses safe development defaults', () => {
    const config = loadConfig({});
    expect(config.NODE_ENV).toBe('development');
    expect(config.PORT).toBe(3000);
  });

  it('rejects invalid ports', () => {
    expect(() => loadConfig({ PORT: '70000' })).toThrow(/Invalid environment configuration/);
  });
});
