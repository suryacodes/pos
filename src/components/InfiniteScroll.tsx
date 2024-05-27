import React, {
  ForwardRefExoticComponent,
  useEffect,
  useRef,
  useState,
} from "react";

function InfiniteScroll(
  WrappedComponent: ForwardRefExoticComponent<{ isIntersecting: boolean }>,
  options: IntersectionObserverInit | undefined
) {
  return function InfiniteScrollWrapper(props: any) {
    const eleRef = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
          } else {
            setIsIntersecting(false);
          }
        });
      }, options);

      const currentEleRef = eleRef.current;

      if (currentEleRef) {
        observer.observe(currentEleRef);
      }

      return () => {
        if (currentEleRef) {
          observer.unobserve(currentEleRef);
        }
      };
    }, []);

    return (
      <WrappedComponent
        {...props}
        ref={eleRef}
        isIntersecting={isIntersecting}
      />
    );
  };
}

export default InfiniteScroll;
