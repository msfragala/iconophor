# Iconophor

Create API endpoints for your SVG icon library with support for transforming the SVG markup using URL search parameters.

## Installation

```
pnpm add iconophor
```

## Usage

Here is an example of setting up a basic endpoint:
```ts
import { fromSVG } from "iconophor"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = "<url-to-some-svg-icon>"
  const response = await fetch(url)
  const text = await response.text()
  // Pass the SVG content as a string, along with the search parameters from the request
  const svg = fromSVG(text, searchParams)
  return new Response(svg)
}
```

Here is a more real-life example of setting up an endpoing in Next.js:

```tsx
// app/iconophor/icons/[icon]/route.ts
import { fromSVG } from "iconophor"

export async function GET(
  request: Request
  context: RouteContext<"/iconophor/icons/[icon]">
) {
  try {
    const { icon } = await context.params
    const { searchParams } = new URL(request.url)
    const url = "<url-to-svg-icon-based-on-icon-param>"
    const response = await fetch(url)

    if (!response.ok) {
      return new Response("", { status: response.status })
    }

    const text = await response.text()
    const svg = fromSVG(text, searchParams)

    return new Response(svg, {
      headers: {
        "Cache-Control": `public, s-maxage=86400, max-age=3600`,
        "Content-Type": "image/svg+xml; charset=utf-8",
      }
    })
  } catch (error) {
    return new Response("", { status: 500 })
  }
}
```

## Search parameters

|Search Parameter|Behavior|
|---|---|
|`?replace-colors`|Replace all fill and stroke attributes with a different value. This ignores attributes whose value is `none`. Can be used for example to set all colors to `currentColor` or any browser-supported color value. Conversely, can also be used to remove all stroke and fill values by leaving the query parameter empty|
|`?smybol=true`|Turns the SVG into a symbol, wrapping the root element's children in a <symbol> element with `id="icon"`. This enables loading SVG as external symbols via `<use>`|
|`?fill`|Overrides or sets the `fill` on the root `<svg>` element|
|`?stroke`|Overrides or sets the `stroke` on the root `<svg>` element|
|`?width`|Overrides or sets the `width` on the root `<svg>` element|
|`?height`|Overrides or sets the `height` on the root `<svg>` element|
|`?color`|Overrides or sets the `color` on the root `<svg>` element|
|`?fill-opacity`|Overrides or sets the `fill-opacity` on the root `<svg>` element|
|`?fill-rule`|Overrides or sets the `fill-rule` on the root `<svg>` element|
|`?stroke-dasharray`|Overrides or sets the `stroke-dasharray` on the root `<svg>` element|
|`?stroke-dashoffset`|Overrides or sets the `stroke-dashoffset` on the root `<svg>` element|
|`?stroke-linecap`|Overrides or sets the `stroke-linecap` on the root `<svg>` element|
|`?stroke-linejoin`|Overrides or sets the `stroke-linejoin` on the root `<svg>` element|
|`?stroke-miterlimit`|Overrides or sets the `stroke-miterlimit` on the root `<svg>` element|
|`?stroke-opacity`|Overrides or sets the `stroke-opacity` on the root `<svg>` element|
|`?stroke-width`|Overrides or sets the `stroke-width` on the root `<svg>` element|
