import { createMemo, createSignal } from 'solid-js';

const createPath = (version: string, icon: string, params: URLSearchParams) => {
  const v = encodeURIComponent(version);
  const i = encodeURIComponent(icon);
  const s = params.toString();
  let path = `/icons/feather/${v}/${i}`;
  if (s) path += `?${s}`;
  return path;
};

const initialParams = new URLSearchParams('stroke=pink&height=96');

export function Playground() {
  const [version, setVersion] = createSignal('4.28.0');
  const [icon, setIcon] = createSignal('activity');
  const [params, setParams] = createSignal(initialParams);
  const path = createMemo(() => createPath(version(), icon(), params()));

  function onChangeVersion(event: InputEvent) {
    const element = event.target as HTMLInputElement;
    setVersion(element.value);
  }

  function onChangeIcon(event: InputEvent) {
    const element = event.target as HTMLInputElement;
    setIcon(element.value);
  }

  function onChangeParams(event: InputEvent) {
    const element = event.target as HTMLInputElement;
    setParams(new URLSearchParams(element.value));
  }

  return (
    <div class="grid grid-cols-1 gap-24">
      <div class="flex flex-col md:flex-row gap-24">
        <div>
          <label
            class="block text-sm text-text-soft mb-4"
            for="playground-version"
          >
            Version
          </label>
          <input
            class="input w-full md:w-auto"
            value={version()}
            onInput={onChangeVersion}
            id="playground-version"
            name="version"
          />
        </div>
        <div>
          <label
            class="block text-sm text-text-soft mb-4"
            for="playground-icon"
          >
            Icon name
          </label>
          <input
            class="input w-full md:w-auto"
            value={icon()}
            id="playground-icon"
            name="icon"
            onInput={onChangeIcon}
          />
        </div>
      </div>
      <div>
        <label
          class="block text-sm text-text-soft mb-4"
          for="playground-params"
        >
          Query string
        </label>
        <input
          class="input w-full"
          value={`?${params().toString()}`}
          onInput={onChangeParams}
          name="playground-params"
        />
      </div>
      <div class="space-y-8">
        <p class="text-sm text-text-soft">
          <code class="break-words">iconophor.com{path()}</code>
        </p>
        <div class="border rounded p-24 min-h-[144px]">
          <img alt="" class="w-content" src={path()} />
        </div>
      </div>
    </div>
  );
}
