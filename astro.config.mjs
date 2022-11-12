import solid from '@astrojs/solid-js';
import vercel from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [solid()],
  adapter: vercel(),
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
      wrap: false,
    },
  },
});
