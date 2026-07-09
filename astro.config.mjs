// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
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
