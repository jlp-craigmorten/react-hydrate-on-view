import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { HydrateOnView } from './HydrateOnView';

describe('HydrateOnView Server-side', () => {
  it('should render all content when server-side rendered', () => {
    const html = renderToString(
      <HydrateOnView>
        <div data-testid="child">Test Content</div>
      </HydrateOnView>,
    );

    expect(html).toMatchSnapshot();
  });

  it('should render all content when server-side rendered with custom props', () => {
    const html = renderToString(
      <HydrateOnView
        rootMargin="10px 20px 30px 40px"
        threshold={0.5}
        style={{ background: 'red' }}
      >
        <div data-testid="child">Test Content</div>
      </HydrateOnView>,
    );

    expect(html).toMatchSnapshot();
  });
});
