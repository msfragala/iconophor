import '@/styles.css';

import Head from 'next/head';

const year = new Date().getFullYear();
const title = 'Iconophor';
const description = 'An open-source CDN for popular SVG icon libraries.';
const image = 'https://www.iconophor.com/iconophor.png';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content={image} property="og:image" />
        <meta content={image} property="twitter:image" />
        <meta content="https://www.iconophor.com" property="og:url" />
        <link
          color="#101010"
          href="/favicon.svg"
          rel="icon"
          type="image/svg+xml"
        />
        <link
          color="#101010"
          href="/favicon.svg"
          rel="mask-icon"
          type="image/svg+xml"
        />
      </Head>
      <main className="constrain-x mt-144">
        <Component {...pageProps} />
      </main>
      <footer className="constrain-x mt-144 mb-24">
        <div className="flex flex-col md:flex-row gap-y-8 justify-between">
          <p>© {year} Iconophor</p>
          <p>Made by Mitchell Fragala</p>
        </div>
      </footer>
      <script
        async
        data-domain="iconophor.com"
        defer
        src="https://plausible.io/js/plausible.js"
      />
    </>
  );
}
