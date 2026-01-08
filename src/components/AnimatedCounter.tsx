import { useState, useEffect, useRef, useCallback } from "react";

// Easing function for smooth animation
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

// Check if user prefers reduced motion
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  suffix = "", 
  prefix = "",
  className = ""
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const hasStartedRef = useRef(false);
  
  // Shorter duration on mobile for snappier feel
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const actualDuration = prefersReducedMotion() ? 0 : (isMobile ? Math.min(duration, 1200) : duration);

  const animate = useCallback((timestamp: number) => {
    // Skip animation if reduced motion preferred
    if (actualDuration === 0) {
      setCount(end);
      return;
    }
    
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / actualDuration, 1);
    const easedProgress = easeOutQuart(progress);
    const currentValue = Math.round(end * easedProgress);

    setCount(currentValue);

    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animate);
    }
  }, [end, actualDuration]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedRef.current) {
            hasStartedRef.current = true;
            startTimeRef.current = undefined;
            frameRef.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [animate]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
