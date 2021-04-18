<script>
  let version = '4.28.0';
  let icon = 'heart';
  let params = '?stroke=pink';
  let path = `/feather/${version}/${icon}${params}`;
  let src = path;
  $: {
    const v = encodeURIComponent(version);
    const i = encodeURIComponent(icon);
    const s = new URLSearchParams(params).toString();
    src = `/feather/${v}/${i}?${s}`;
  }
</script>

<div class="flex flex-col gap-24">
  <div class="flex gap-x-24">
    <div>
      <label class="block text-sm text-text-soft mb-4" for="playground-version">
        Version
      </label>
      <input
        class="bg-background-soft h-36 px-12 rounded"
        id="playground-version"
        name="version"
        on:change={(event) => (version = event.target.value)}
        value={version}
      />
    </div>
    <div>
      <label class="block text-sm text-text-soft mb-4" for="playground-icon">
        Icon name
      </label>
      <input
        class="bg-background-soft h-36 px-12 rounded"
        id="playground-icon"
        name="icon"
        on:change={(event) => (icon = event.target.value)}
        value={icon}
      />
    </div>
  </div>
  <div>
    <label class="block text-sm text-text-soft mb-4" for="playground-params">
      Query string
    </label>
    <input
      class="bg-background-soft h-36 px-12 rounded w-full"
      name="playground-params"
      on:change={(event) => (params = event.target.value || '?')}
      value={params}
    />
  </div>
  <div>
    <p>{path}</p>
    <div>
      <img alt="" onError={(e) => console.log('xxx', e)} {src} />
    </div>
  </div>
</div>
