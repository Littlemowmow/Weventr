import { useRef, useEffect } from "react";

/**
 * Scroll-reveal hook using IntersectionObserver + CSS transitions.
 * Adds the `visible` class directly to the DOM element (no React re-render).
 *
 * Usage: Apply a base class (`fade-in`, `fade-in-left`, or `fade-in-right`)
 * in your JSX className. The hook adds `visible` when the element scrolls in.
 *
 * Includes a 3-second safety fallback so elements never get stuck invisible.
 *
 * @param delay - Delay in seconds before the transition starts (set via CSS transition-delay)
 * @returns A ref to attach to the element
 */
export function useFadeIn<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set delay via CSS so the transition respects it
    if (delay > 0) {
      el.style.transitionDelay = `${delay}s`;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            el.classList.add("visible");
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "50px 0px 0px 0px" },
    );

    observer.observe(el);

    // Safety fallback: never leave elements invisible
    const fallback = setTimeout(() => {
      el.classList.add("visible");
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [delay]);

  return ref;
}
