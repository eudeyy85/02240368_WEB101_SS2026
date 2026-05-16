import { useEffect, useRef } from 'react';  // react hooks

// useIntersectionObserver — detects when an element enters the viewport
// This is how we know the user has scrolled to the bottom of the feed
const useIntersectionObserver = ({ target, onIntersect, threshold = 0.1, rootMargin = '0px' }) => {
  
  // store the observer in a ref so it persists between renders
  const observerRef = useRef(null);

  useEffect(() => {
    // if target element doesn't exist yet, do nothing
    if (!target?.current) return;

    // create the observer — calls onIntersect when target becomes visible
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // entry.isIntersecting = true when element is visible in viewport
          if (entry.isIntersecting) {
            onIntersect();  // trigger loading more videos
          }
        });
      },
      {
        threshold,    // how much of element must be visible (0.1 = 10%)
        rootMargin,   // extra margin around viewport
      }
    );

    // start watching the target element
    observerRef.current.observe(target.current);

    // cleanup — stop watching when component unmounts
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [target, onIntersect, threshold, rootMargin]);
};

export default useIntersectionObserver;
