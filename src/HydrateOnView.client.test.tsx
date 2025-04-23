import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';
import { HydrateOnView } from './HydrateOnView';

let mockIntersectionObserver: {
  observe: Mock;
  unobserve: Mock;
  disconnect: Mock;
};

let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;

describe('HydrateOnView', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockIntersectionObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };

    window.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      intersectionCallback = callback;

      return mockIntersectionObserver;
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('should render just the container div when the component is not in the viewport', () => {
    const { container } = render(
      <HydrateOnView>
        <div data-testid="child">Test Content</div>
      </HydrateOnView>,
    );

    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should observe the container div with an IntersectionObserver', () => {
    const { container } = render(
      <HydrateOnView>
        <div data-testid="child">Test Content</div>
      </HydrateOnView>,
    );

    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {},
    );

    expect(mockIntersectionObserver.observe).toHaveBeenCalledWith(
      container.firstChild,
    );
  });

  it('should observe the container div with a customised IntersectionObserver', () => {
    const { container } = render(
      <HydrateOnView rootMargin="10px 20px 30px 40px" threshold={0.5}>
        <div data-testid="child">Test Content</div>
      </HydrateOnView>,
    );

    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        rootMargin: '10px 20px 30px 40px',
        threshold: 0.5,
      },
    );

    expect(mockIntersectionObserver.observe).toHaveBeenCalledWith(
      container.firstChild,
    );
  });

  it('should not hydrate the content if the IntersectionObserver observes an event where the content is not in the viewport', () => {
    render(
      <HydrateOnView>
        <div data-testid="child">Test Content</div>
      </HydrateOnView>,
    );

    const mockEntry = {
      isIntersecting: false,
    } as IntersectionObserverEntry;

    act(() => {
      intersectionCallback([mockEntry]);
    });

    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  it('should disconnect the IntersectionObserver and hydrate the content when it enters the viewport', () => {
    const { container } = render(
      <HydrateOnView>
        <div data-testid="child">Test Content</div>
      </HydrateOnView>,
    );

    const mockEntry = {
      isIntersecting: true,
    } as IntersectionObserverEntry;

    act(() => {
      intersectionCallback([mockEntry]);
    });

    expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should disconnect the IntersectionObserver on unmount', () => {
    const { unmount } = render(
      <HydrateOnView>
        <div data-testid="child">Test Content</div>
      </HydrateOnView>,
    );

    unmount();

    expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
  });
});
