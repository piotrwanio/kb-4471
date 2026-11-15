import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const layout = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src/lib/layouts/runbook.svelte');

export default defineConfig({
  plugins: [
    sveltekit({
      extensions: ['.svelte', '.svx'],
      preprocess: [
        vitePreprocess(),
        mdsvex({ extensions: ['.svx'], layout: { runbook: layout } }),
      ],
      adapter: adapter({ pages: 'build', assets: 'build', strict: false }),
      prerender: { entries: ['/kb'], handleHttpError: 'warn' },
    }),
  ],
});
