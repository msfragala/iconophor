<script lang="ts">
	import Playground from '@/components/Playground.svelte';
	import { libraries } from '@/lib/libraries';
	import { attributeParams } from '@/lib/parameters';

	const title = 'Iconophor';
	const description = 'An open-source CDN for popular SVG icon libraries.';
	const image = 'https://www.iconophor.com/iconophor.png';
</script>

<svelte:head>
	<title>{title}</title>
	<meta content={title} property="og:title" />
	<meta content={description} name="description" />
	<meta content={description} property="og:description" />
	<meta content={image} property="og:image" />
	<meta content={image} property="twitter:image" />
</svelte:head>

<div class="space-y-60">
	<section>
		<h1 class="heading-xl text-center">Iconophor</h1>
		<p class="mt-48">
			Iconophor is an
			{' '}
			<a class="link" href="https://github.com/msfragala/iconophor"> open-source </a>
			{' '}
			CDN for popular SVG icon libraries that enables you to load icons as images or using
			{' '}
			<a class="link" href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask">CSS masks</a>
			{' '}
			while still controlling the fill, stroke width, etc. via query parameters. Embedding the SVG source
			code inline is a common way to use icons in UI frameworks, but this can cause undesirable page
			bloat. Loading icons as images or masks instead can be beneficial for performance in some contexts
			by reducing duplicate markup and leveraging of caching.
		</p>
	</section>
	<section>
		<h2 class="heading-lg mb-24">Playground</h2>
		<p class="mb-24">Try out the API in this demo with Feather Icons:</p>
		<Playground />
	</section>
	<section>
		<h2 class="heading-lg mb-24">Icon libraries</h2>
		<ul class="grid grid-cols-1 gap-y-36 w-full">
			{#each libraries as library}
				<li>
					<h3 class="mb-4">
						<a
							class="heading-md text-pink-300 hover:underline focus-visible:underline"
							href={library.homepage}
						>
							{library.name}
						</a>
					</h3>
					<p class="mb-8">
						<a
							aria-label={`${library.name} on GitHub`}
							class="text-sm hover:underline focus-visible:underline"
							href={library.github}
						>
							GitHub
						</a>{' '}
						•{' '}
						<a
							aria-label={`${library.name} on Unpkg`}
							class="text-sm hover:underline focus-visible:underline"
							href={library.unpkg}
						>
							Unpkg
						</a>
					</p>
					<p class="pill break-words max-w-full overflow-hidden">
						{library.urlPattern}
					</p>
				</li>
			{/each}
		</ul>
	</section>
	<section id="query-parameters">
		<h2 class="heading-lg mb-24">Query parameters</h2>
		<ul class="space-y-12 sm:columns-2 sm:space-y-16">
			{#each attributeParams as name}
				<li>
					<a
						class="pill underline-offset-2 hover:underline"
						href={`https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/${name}`}
					>
						<code>?{name}</code>
					</a>
				</li>
			{/each}
		</ul>
		<div id="special-query-parameters" class="mt-60">
			<h3 class="heading-lg font-black mb-24">Special query parameters</h3>
			<ul class="flex flex-col gap-y-36">
				<li>
					<section id="replaceColors-parameter">
						<h3 class="pill"><code>?replaceColors</code></h3>
						<p class="mt-12 max-w-[70ch]">
							Replace all <code>fill</code> and <code>stroke</code> attributes with a different
							value. This ignores attributes whose value is <code>none</code>. Can be used for
							example to set all colors to <code>currentColor</code>. Conversely, can also be used
							to remove all stroke and fill values by leaving the query parameter empty.
						</p>
						<p class="bg-yellow-900 rounded text-yellow-100 px-16 py-8 mt-16 w-content text-sm">
							⚠️ May not work well with SVGs that contain multiple stroke or fill colors
						</p>
					</section>
				</li>
				<li>
					<section id="symbol-parameter">
						<h3 class="pill"><code>?symbol=true</code></h3>
						<p class="mt-12 max-w-[70ch]">
							Turn a plain SVG into a <a
								class="link"
								href="https://css-tricks.com/svg-use-with-external-reference-take-2">symbol</a
							>, wrapping the root element's children in a
							<code>&lt;symbol&gt;</code> element with <code>id="icon"</code>. This enables loading
							SVG as external symbols.
						</p>
					</section>
				</li>
			</ul>
		</div>
	</section>
</div>
