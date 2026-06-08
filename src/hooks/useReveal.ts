import { useEffect, useRef, useState } from 'react';

export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Once visible stays visible
        }
      },
      { threshold }
    );
    
    observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
