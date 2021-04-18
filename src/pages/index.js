import { Playground } from '@/components/playground';
import { libraries } from '@/constants/libraries';
import { svgAttributes } from '@/constants/svg-attributes';

export default function Home() {
  return (
    <div className="max-w-640 mx-auto grid gap-y-60 my-144">
      <section>
        <h1 className="heading-xl text-center">Iconophor</h1>
        <p className="mt-48">
          Iconophor is an open-source CDN for SVG-based icons that lets you
          manipulate the fill, stroke, viewbox, etc. via query parameters.
        </p>
      </section>
      <section>
        <h2 className="heading-lg mb-24">Playground</h2>
        <p className="mb-24">
          Try out the API in this demo with Feather Icons:
        </p>
        <Playground />
      </section>
      <section>
        <h2 className="heading-lg mb-24">Icon libraries supported</h2>
        <ul className="grid gap-y-36">
          {libraries.map((library) => (
            <li key={library.name}>
              <h3 className="mb-4">
                <a className="heading-md text-pink-300" href={library.homepage}>
                  {library.name}
                </a>
              </h3>
              <p className="mb-8">
                <a
                  className="text-sm hover:text-text-soft"
                  href={library.github}
                >
                  GitHub
                </a>{' '}
                •{' '}
                <a
                  className="text-sm hover:text-text-soft"
                  href={library.unpkg}
                >
                  Unpkg
                </a>
              </p>
              <p className="bg-background-soft px-8 py-4 rounded w-content text-sm">
                <code>{library.urlPattern}</code>
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="heading-lg mb-24">Query parameters</h2>
        <ul className="grid grid-cols-2 gap-y-16">
          {svgAttributes.map((name) => (
            <li key={name}>
              <a
                className="bg-background-soft hover:text-pink-300 text-sm w-content px-8 py-4 rounded block"
                href={`https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/${name}`}
              >
                <code>?{name}</code>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
