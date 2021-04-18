<script>
  import { svgAttributes } from '../constants/svg-attributes';
  import { libraries } from '../constants/libraries';
  import Playground from '../components/playground.svelte';
</script>

<div class="max-w-640 mx-auto grid gap-y-60 my-144">
  <section class="">
    <h1 class="heading-xl text-center">Iconophor</h1>
    <p class="mt-48">
      Iconophor is an open-source CDN for SVG-based icons that lets you
      manipulate the fill, stroke, viewbox, etc. via query parameters.
    </p>
  </section>
  <section class="">
    <h2 class="heading-lg mb-24">Playground</h2>
    <p class="">Try out the API in this demo with Feather Icons:</p>
    <Playground />
  </section>
  <section class="">
    <h2 class="heading-lg mb-24">Icon libraries supported</h2>
    <ul class="grid gap-y-36">
      {#each libraries as library}
        <li>
          <h3 class="mb-4">
            <a class="heading-md text-pink-300" href={library.homepage}>
              {library.name}
            </a>
          </h3>
          <p class="mb-8">
            <a class="text-sm hover:text-text-soft" href={library.github}>
              GitHub
            </a>
            •
            <a class="text-sm hover:text-text-soft" href={library.unpkg}>
              Unpkg
            </a>
          </p>
          <p class="bg-background-soft px-8 py-4 rounded w-content text-sm">
            <code>{library.urlPattern}</code>
          </p>
        </li>
      {/each}
    </ul>
  </section>
  <section class="">
    <h2 class="heading-lg mb-24">Query parameters</h2>
    <ul class="grid grid-cols-2 gap-y-16">
      {#each svgAttributes as attribute}
        <li class="">
          <a
            class="bg-background-soft hover:text-pink-300 text-sm w-content px-8 py-4 rounded block"
            href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/{attribute}"
          >
            <code>?{attribute}</code>
          </a>
        </li>
      {/each}
    </ul>
  </section>
</div>
