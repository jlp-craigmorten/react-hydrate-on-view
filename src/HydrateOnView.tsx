import { Suspense, useEffect, useRef, useState } from 'react';

import type { FC, PropsWithChildren } from 'react';

interface SuspendConditionallyProps {
  suspend: boolean;
}

const SuspendConditionally: FC<
  PropsWithChildren<SuspendConditionallyProps>
> = ({ suspend, children }) => {
  if (suspend && typeof window !== 'undefined') {
    throw new Promise(() => {});
  }

  return <>{children}</>;
};

export interface HydrateOnViewProps {
  /**
   * Margin around the viewport. Can have values similar to the CSS margin property,
   * e.g. `10px 20px 30px 40px` (top, right, bottom, left).
   */
  rootMargin?: string;
  /**
   * Styles to apply to the container `<div>` element.
   */
  style?: React.CSSProperties;
  /**
   * Number between `0` and `1` indicating the percentage of the content that
   * should be visible before triggering hydration.
   */
  threshold?: number;
}

export const HydrateOnView: FC<PropsWithChildren<HydrateOnViewProps>> = ({
  children,
  rootMargin,
  style,
  threshold,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setInView(true);
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(ref.current!);

    return () => {
      observer.disconnect();
    };
  }, [inView, rootMargin, threshold]);

  return (
    <div ref={ref} style={style}>
      <Suspense fallback={null}>
        <SuspendConditionally suspend={!inView}>
          {children}
        </SuspendConditionally>
      </Suspense>
    </div>
  );
};
