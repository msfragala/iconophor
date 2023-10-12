import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: vercel({
			runtime: 'edge',
		}),
		alias: {
			'@': './src',
		},
	},
};

export default config;
