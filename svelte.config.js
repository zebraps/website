import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// BASE_PATH is set by the GitHub Actions workflow (e.g. "/website" for project pages).
const base = process.env.BASE_PATH ?? '';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ fallback: '404.html' }),
		paths: { base },
		prerender: {
			// Hosted binaries live in static/files and may not exist yet for placeholder entries
			handleHttpError: ({ path, message }) => {
				if (path.startsWith(`${base}/files/`)) return;
				throw new Error(message);
			}
		}
	}
};
