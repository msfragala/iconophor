<script lang="ts">
	import debounce from 'lodash.debounce';

	let version = '4.29.1';
	let icon = 'activity';
	let params = new URLSearchParams('stroke=pink&height=96');

	$: path = createPath(version, icon, params);

	function createPath(version: string, icon: string, params: URLSearchParams) {
		const v = encodeURIComponent(version);
		const i = encodeURIComponent(icon);
		const s = params.toString();
		let path = `/icons/feather/${v}/${i}`;
		if (s) path += `?${s}`;
		return path;
	}

	const setIcon = debounce((value: string) => (icon = value), 500);
	const setVersion = debounce((value: string) => (version = value), 500);
	const setParams = debounce((value: URLSearchParams) => (params = value), 500);
</script>

<form class="grid gap-36">
	<div class="grid gap-24">
		<div class="flex flex-col md:flex-row gap-24">
			<div>
				<label class="block text-sm text-text-soft mb-4" for="playground-version"> Version </label>
				<input
					class="input w-full md:w-auto"
					value={version}
					on:input={(event) => setVersion(event.currentTarget.value)}
					id="playground-version"
					name="version"
				/>
			</div>
			<div>
				<label class="block text-sm text-text-soft mb-4" for="playground-icon"> Icon name </label>
				<input
					class="input w-full md:w-auto"
					value={icon}
					id="playground-icon"
					name="icon"
					on:input={(event) => setIcon(event.currentTarget.value)}
				/>
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
		<p class="text-sm text-text-soft">
			<code class="break-words">{path}</code>
		</p>
		<div class="border rounded p-24 min-h-[144px]">
			<img alt="" class="w-content" src={path} />
		</div>
	</output>
</form>
