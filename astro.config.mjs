// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

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
    plugins: [tailwindcss()]
  },
  devToolbar: {
    enabled: false
  }
});
