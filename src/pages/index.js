import { Playground } from '@/components/playground';
import { libraries } from '@/constants/libraries';
import { svgAttributes } from '@/constants/svg-attributes';

export default function Home() {
  return (
    <div className="space-y-60" style={{ borderColor: 'red' }}>
      <section>
        <h1 className="heading-xl text-center">Iconophor</h1>
        <p className="mt-48">
          Iconophor is an{' '}
          <a className="link" href="https://github.com/msfragala/iconophor">
            open-source
          </a>{' '}
          CDN for popular SVG icon libraries that enables you to load icons as
          images while still controlling the fill, stroke, etc. via query
          parameters. Loading SVG icons as images can be beneficial for
          performance in some contexts, especially when using{' '}
          <span className="inline-code">loading=&#34;lazy&#34;</span>.
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
        <h2 className="heading-lg mb-24">Icon libraries</h2>
        <ul className="grid grid-cols-1 gap-y-36 w-full">
          {libraries.map((library) => (
            <li key={library.name}>
              <h3 className="mb-4">
                <a
                  className="heading-md text-pink-300 hover:underline"
                  href={library.homepage}
                >
                  {library.name}
                </a>
              </h3>
              <p className="mb-8">
                <a
                  aria-label={`${library.name} on GitHub`}
                  className="text-sm hover:underline"
                  href={library.github}
                >
                  GitHub
                </a>{' '}
                •{' '}
                <a
                  aria-label={`${library.name} on Unpkg`}
                  className="text-sm hover:underline"
                  href={library.unpkg}
                >
                  Unpkg
                </a>
              </p>
              <p className="pill break-words max-w-full overflow-hidden">
                {library.urlPattern}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="heading-lg mb-24">Query parameters</h2>
        <ul className="space-y-12 md:columns-2 md:space-y-16">
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
