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
	let params = new URLSearchParams('height=96&stroke=pink');

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

		const newParams = new URLSearchParams(params);
		let color = params.get('fill');
		color ??= params.get('stroke');
		color ??= params.get('replace-colors');
		color ??= 'pink';

		switch (option.key) {
			case 'feather':
			case 'heroicons':
			case 'material':
				newParams.delete('replace-colors');
				newParams.delete('fill');
				newParams.set('stroke', color);
				break;
			case 'fontawesome':
				newParams.delete('replace-colors');
				newParams.delete('stroke');
				newParams.set('fill', color);
				break;
			case 'sanity-icons':
				newParams.delete('fill');
				newParams.delete('stroke');
				newParams.set('replace-colors', color);
				break;
		}

		params = newParams;

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
			fetch(`/api/icon-names?library=${library}&style=${style}`)
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
					data-disabled={!styleOptions.length}
					class="transition-opacity transit duration-300 max-md:data-[disabled=true]:hidden md:data-[disabled=true]:opacity-0"
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
					class="input w-full md:w-[calc(50%-12px)]"
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
				value={decodeURIComponent(`?${params.toString()}`)}
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
			<code class="break-words">{path ? decodeURI(path) : 'Choose an icon'}</code>
		</a>
		<div class="border rounded p-24 min-h-[144px]">
			<img alt="" class="h-[96px]" src={path} />
		</div>
	</output>
</form>
