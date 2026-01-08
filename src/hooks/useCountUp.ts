import { useState, useEffect, useRef, useCallback } from "react";

// Easing function for smooth animation
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
}

const useCountUp = ({ end, duration = 2000, start = 0, decimals = 0 }: UseCountUpOptions) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    const currentValue = start + (end - start) * easedProgress;

    setCount(Number(currentValue.toFixed(decimals)));

    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animate);
    }
  }, [end, duration, start, decimals]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            frameRef.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [animate, hasStarted]);

  return { count, ref };
};

export default useCountUp;
