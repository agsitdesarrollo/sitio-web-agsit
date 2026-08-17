// @ts-check
import { defineConfig } from 'astro/config';
import { createRequire } from 'node:module';
import netlify from '@astrojs/netlify';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

const require = createRequire(import.meta.url);
const astroPrerenderEntrypoint = require.resolve('astro/entrypoints/prerender');

const adapter =
  process.env.NETLIFY === 'true' || process.env.ASTRO_ADAPTER === 'netlify'
    ? netlify()
    : node({
        mode: 'standalone',
      });

// https://astro.build/config
export default defineConfig({
  adapter,
  integrations: [],
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  redirects: {
    '/es': '/',
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        'astro/entrypoints/prerender': astroPrerenderEntrypoint,
      },
    },
  },
  devToolbar: {
    enabled: false
  }
});
