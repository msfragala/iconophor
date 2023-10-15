// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

declare module '$env/static/private' {
	export const VERCEL_ENV: 'production' | 'preview' | 'development' | undefined;
	export const VERCEL_URL: string | undefined;
}

export {};
