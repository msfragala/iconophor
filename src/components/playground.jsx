import { useCallback, useEffect, useRef, useState } from 'react';

const createPath = (version, icon, params) => {
  const v = encodeURIComponent(version);
  const i = encodeURIComponent(icon);
  const s = params.toString();
  let path = `/icons/feather/${v}/${i}`;
  if (s) path += `?${s}`;
  return path;
};

const initialParams = new URLSearchParams('stroke=pink&height=96');

export function Playground() {
  const [version, setVersion] = useState('4.28.0');
  const [icon, setIcon] = useState('activity');
  const [params, setParams] = useState(initialParams);
  const [path, setPath] = useState(createPath(version, icon, params));

  const onChangeVersion = useCallback((event) => {
    setVersion(event.target.value);
  }, []);

  const onChangeIcon = useCallback((event) => {
    setIcon(event.target.value);
  }, []);

  const onChangeParams = useCallback((event) => {
    setParams(new URLSearchParams(event.target.value));
  }, []);

  const versionRef = useOnChange(onChangeVersion);
  const iconRef = useOnChange(onChangeIcon);
  const paramsRef = useOnChange(onChangeParams);

  useEffect(() => {
    setPath(createPath(version, icon, params));
  }, [version, params, icon]);

  return (
    <div className="grid grid-cols-1 gap-24">
      <div className="flex flex-col md:flex-row gap-24">
        <div>
          <label
            className="block text-sm text-text-soft mb-4"
            htmlFor="playground-version"
          >
            Version
          </label>
          <input
            className="input w-full md:w-auto"
            defaultValue={version}
            id="playground-version"
            name="version"
            ref={versionRef}
          />
        </div>
        <div>
          <label
            className="block text-sm text-text-soft mb-4"
            htmlFor="playground-icon"
          >
            Icon name
          </label>
          <input
            className="input w-full md:w-auto"
            defaultValue={icon}
            id="playground-icon"
            name="icon"
            ref={iconRef}
          />
        </div>
      </div>
      <div>
        <label
          className="block text-sm text-text-soft mb-4"
          htmlFor="playground-params"
        >
          Query string
        </label>
        <input
          className="input w-full"
          defaultValue={`?${params.toString()}`}
          name="playground-params"
          ref={paramsRef}
        />
      </div>
      <div className="space-y-8">
        <p className="text-sm text-text-soft">
          <code className="break-words">iconophor.com{path}</code>
        </p>
        <div className="border rounded p-24">
          <img alt="" className="w-content" src={path} />
        </div>
      </div>
    </div>
  );
}

function useOnChange(fn) {
  const ref = useRef();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.addEventListener('change', fn);
    return () => node.removeEventListener('change', fn);
  }, [fn]);

  return ref;
}
