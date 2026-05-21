import { useEffect } from 'react';

/**
 * Custom hook to initialize an IntersectionObserver targeting scroll reveal classes
 * (.reveal-on-scroll and .section-reveal) and toggling the active state classes.
 * Uses a MutationObserver to handle elements rendered dynamically after the initial mount.
 * 
 * @param {any} dependency Optional dependency to re-run observation (e.g. after async content loads)
 */
export const useScrollReveal = (dependency) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active', 'in-view');
            // Stop observing once the element is visible
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01, // Trigger when 1% of the element is visible
        rootMargin: '0px 0px 100px 0px' // Trigger 100px before it enters the viewport for seamless load
      }
    );

    const observedElements = new Set();

    const scanAndObserve = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll, .section-reveal');
      elements.forEach((el) => {
        if (!observedElements.has(el)) {
          observer.observe(el);
          observedElements.add(el);
        }
      });
    };

    // Run initial scan
    scanAndObserve();

    // Set up MutationObserver to detect dynamically added nodes
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Robust Fallback: After 1500ms, force-reveal all sections in case observer fails
    const fallbackTimeout = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal-on-scroll, .section-reveal');
      revealElements.forEach((el) => {
        if (!el.classList.contains('in-view')) {
          el.classList.add('active', 'in-view');
        }
      });
    }, 1500);

    return () => {
      clearTimeout(fallbackTimeout);
      mutationObserver.disconnect();
      observedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [dependency]);
};

export default useScrollReveal;

