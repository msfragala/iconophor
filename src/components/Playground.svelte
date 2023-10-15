<script lang="ts">
	import debounce from 'lodash.debounce';
	import { browser } from '$app/environment';
	import { createIconPath, libraryOptions } from '@/lib/playground';

	const initialOption = libraryOptions[0];

	let timeout: number;
	let library = initialOption.key;
	let version = initialOption.version;
	let style = initialOption.styles[0];
	let icon = 'academic-cap';
	let params = new URLSearchParams('replace-colors=pink&height=96');

	let styleOptions: string[] = initialOption.styles;
	let iconOptions: string[] = [];

	$: path = createIconPath({ library, version, icon, style, params });

	const setParams = debounce((value: URLSearchParams) => (params = value), 500);

	function setLibrary(value: string) {
		const option = libraryOptions.find((o) => o.key === value);
		if (!option) return;
		clearTimeout(timeout);
		library = option.key;
		version = option.version;
		icon = '';
		if (option.styles.length) {
			styleOptions = option.styles;
			style = option.styles[0];
		} else {
			setTimeout(() => {
				styleOptions = option.styles;
				style = option.styles[0];
			}, 200);
		}
	}

	$: {
		if (browser) {
			fetch(`/api/icon-names?library=${library}&style=outline`)
				.then((res) => res.json())
				.then((names) => {
					iconOptions = names;
					icon = names[0];
				});
		}
	}
</script>

<form class="grid gap-36" on:submit|preventDefault novalidate>
	<div class="grid gap-24">
		<div class="flex flex-col gap-24">
			<div class="flex flex-col md:grid md:grid-cols-2 gap-24">
				<div>
					<label class="block text-sm text-text-soft mb-4" for="playground-version">Library</label>
					<select
						class="input w-full h-40"
						on:change={(event) => setLibrary(event.currentTarget.value)}
						value={library}
					>
						{#each libraryOptions as option}
							<option value={option.key}>{option.name} ({option.version})</option>
						{/each}
					</select>
				</div>
				<div
					class:opacity-0={!styleOptions.length}
					class="transition-opacity transit scale-95 duration-[200ms]"
				>
					<label class="block text-sm text-text-soft mb-4" for="playground-version">Style</label>
					<select
						class="input w-full h-40"
						disabled={!styleOptions.length}
						on:change={(event) => (style = event.currentTarget.value)}
						value={style}
					>
						{#each styleOptions as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
				</div>
			</div>
			<div>
				<label class="block text-sm text-text-soft mb-4" for="playground-icon"> Icon name </label>
				<select
					class="input w-full"
					value={icon}
					id="playground-icon"
					name="icon"
					on:change={(event) => (icon = event.currentTarget.value)}
				>
					{#each iconOptions as name}
						<option value={name}>{name}</option>
					{:else}
						{#if icon}
							<option value={icon}>{icon}</option>
						{/if}
					{/each}
				</select>
			</div>
		</div>
		<div>
			<label class="block text-sm text-text-soft mb-4" for="playground-params">
				Query string
			</label>
			<input
				class="input w-full"
				value={`?${params.toString()}`}
				on:input={(event) => setParams(new URLSearchParams(event.currentTarget.value))}
				name="playground-params"
			/>
		</div>
	</div>
	<output class="space-y-8">
		<a
			class="text-sm text-text-soft min-h-[1lh] hover:underline underline-offset-2"
			href={path}
			target="_blank"
		>
			<code class="break-words">{path ?? 'Choose an icon'}</code>
		</a>
		<div class="border rounded p-24 min-h-[144px]">
			<img alt="" class="h-[96px]" src={path} />
		</div>
	</output>
</form>
