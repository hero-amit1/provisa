import { useEffect, useRef } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  animation?: string; // default 'slide-up'
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    once = true,
    animation = 'slide-up'
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.remove('opacity-0', '[data-animate]', '[data-scroll-reveal]');
            el.classList.add(`animate-${animation}`);
            if (once) {
              observer.unobserve(el);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe all [data-scroll-reveal] elements in current component
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, animation]);
};

// Custom hook for specific element
export const useElementReveal = (ref: React.RefObject<HTMLElement>, animation = 'slide-up') => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add(`animate-${animation}`);
          ref.current?.classList.remove('opacity-0', '[data-animate]');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, animation]);
};

