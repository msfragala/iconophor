import { useEffect, useState } from 'react';

const createSrc = (version, icon, params) => {
  const v = encodeURIComponent(version);
  const i = encodeURIComponent(icon);
  const s = new URLSearchParams(params).toString();
  return `https://www.iconophor.com/feather/${v}/${i}?${s}`;
};

export function Playground() {
  const [version, setVersion] = useState('4.28.0');
  const [icon, setIcon] = useState('activity');
  const [params, setParams] = useState('stroke=pink');
  const [src, setSrc] = useState(createSrc(version, icon, params));

  useEffect(() => {
    setSrc(createSrc(version, icon, params));
  }, [version, params, icon]);

  return (
    <div className="grid gap-24">
      <div className="flex gap-24">
        <div>
          <label
            className="block text-sm text-text-soft mb-4"
            htmlFor="playground-version"
          >
            Version
          </label>
          <input
            className="bg-background-soft px-12 py-8 rounded"
            id="playground-version"
            name="version"
            onChange={(event) => setVersion(event.target.value)}
            value={version}
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
            className="bg-background-soft px-12 py-8 rounded"
            id="playground-icon"
            name="icon"
            onChange={(event) => setIcon(event.target.value)}
            value={icon}
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
          className="bg-background-soft px-12 py-8 rounded w-full"
          name="playground-params"
          onChange={(event) => setParams(event.target.value.replace('?', ''))}
          value={`?${params}`.replace('??', '?')}
        />
      </div>
      <div className="space-y-8 pt-24">
        <p className="text-sm text-text-soft">
          <code>{src}</code>
        </p>
        <div className="border rounded p-24">
          <img alt="" className="h-64 w-64" src={src} />
        </div>
      </div>
    </div>
  );
}
