# react-hydrate-on-view

<a href="https://www.npmjs.com/package/react-hydrate-on-view"><img alt="Available on NPM" src="https://img.shields.io/npm/v/react-hydrate-on-view" /></a>
<a href="https://github.com/jlp-craigmorten/react-hydrate-on-view/actions/workflows/test.yml"><img alt="Test workflows" src="https://github.com/jlp-craigmorten/react-hydrate-on-view/workflows/Test/badge.svg" /></a>
<a href="https://github.com/jlp-craigmorten/react-hydrate-on-view/blob/main/LICENSE"><img alt="MIT license" src="https://img.shields.io/github/license/jlp-craigmorten/react-hydrate-on-view" /></a>

A React library for suspending hydration of components until they enter the viewport using the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## Installation

```bash
# Using npm
npm install react-hydrate-on-view

# Using yarn
yarn add react-hydrate-on-view

# Using pnpm
pnpm add react-hydrate-on-view
```

## Usage

```tsx
import { HydrateOnView } from "react-hydrate-on-view";

function MyComponent() {
  return (
    <div>
      {/* Render above the fold content immediately */}
      <CriticalComponent />

      {/* Render below the fold content in HydrateOnView to defer hydration until the content enters the viewport */}
      <HydrateOnView>
        <BelowTheFoldComponent />
      </HydrateOnView>

      {/* Hydrate 200px before the component enters the viewport */}
      <HydrateOnView rootMargin="200px 0px 0px 0px">
        <EarlyHydrationComponent />
      </HydrateOnView>

      {/* Only hydrate when at least 50% of the component is visible */}
      <HydrateOnView threshold={0.5}>
        <PartiallyVisibleComponent />
      </HydrateOnView>

      {/* Combined usage */}
      <HydrateOnView rootMargin="100px" threshold={0.2}>
        <ConfiguredComponent />
      </HydrateOnView>
    </div>
  );
}
```

## API

### HydrateOnView

A component that defers hydration of its children until they enter the viewport.

#### Props

| Prop       | Type        | Description                                                                                                                                                                 |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children   | `ReactNode` | The content to be conditionally hydrated.                                                                                                                                   |
| rootMargin | `string`    | (Optional) Margin around the viewport for triggering hydration early. Uses the same format as CSS margin property, e.g. `"10px 20px 30px 40px"` (top, right, bottom, left). |
| threshold  | `number`    | (Optional) Number between 0 and 1 indicating what percentage of the target element must be visible to trigger hydration (0 = any visibility, 1 = fully visible).            |

#### Behavior

- **Server Rendering**: During server-side rendering, the children are rendered normally.
- **Client Initial Load**: On the client, hydration is suspended for children until the component enters the viewport.
- **Client Scroll**: Uses the browser's [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to detect when elements enter the viewport (taking into account the additional margins and the required threshold) and hydrates the children components.

#### Notes

- Components inside `<HydrateOnView />` should be designed to work correctly without hydration until they become visible.
- This component is most effective when used for below the fold content in server-rendered React applications.

## Resources

- [Contributing](.github/CONTRIBUTING.md)
- [Changelog](https://github.com/jlp-craigmorten/react-hydrate-on-view/releases)
- [MIT License](https://github.com/jlp-craigmorten/react-hydrate-on-view/blob/main/LICENSE)
