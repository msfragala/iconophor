<script>
	import '@/app.css';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width" />
	<meta content="https://www.iconophor.com" property="og:url" />
	<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
	<link href="/favicon.svg" rel="mask-icon" type="image/svg+xml" />
</svelte:head>

<main class="constrain-x mt-72 md:mt-144">
	<slot />
</main>
<footer class="constrain-x mt-72 md:mt-144 mb-24 text-sm text-text-soft">
	<div class="flex flex-col md:flex-row gap-y-8 justify-between">
		<p>
			© {new Date().getFullYear()}
			<a class="underline" href="https://www.msfragala.com">Mitchell Fragala</a>. All Rights
			Reserved.
		</p>
	</div>
</footer>
