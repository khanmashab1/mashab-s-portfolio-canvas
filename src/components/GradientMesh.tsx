import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const GradientMesh = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const shouldReduceAnimations = prefersReducedMotion || isMobile;

  // Transform scroll position into hue shifts
  const hue1 = useTransform(scrollYProgress, [0, 0.5, 1], [174, 220, 262]);
  const hue2 = useTransform(scrollYProgress, [0, 0.5, 1], [262, 174, 320]);

  // CSS-only animations for mobile - lightweight but still visually engaging
  if (shouldReduceAnimations) {
    return (
      <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 animate-gentle-pulse"
          style={{
            top: "-10%",
            left: "-10%",
            background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)",
          }}
        />
        <div 
          className="absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-20 animate-gentle-pulse"
          style={{
            bottom: "10%",
            right: "-5%",
            background: "radial-gradient(circle, hsl(var(--accent) / 0.4), transparent 70%)",
            animationDelay: "2s",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 bg-background" />

      {/* Simplified animated blobs for desktop */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-30"
        style={{
          top: "-20%",
          left: "-10%",
          background: useTransform(
            hue1,
            (h) => `radial-gradient(circle, hsl(${h} 72% 50% / 0.4), transparent 70%)`
          ),
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-25"
        style={{
          top: "30%",
          right: "-5%",
          background: useTransform(
            hue2,
            (h) => `radial-gradient(circle, hsl(${h} 80% 55% / 0.4), transparent 70%)`
          ),
        }}
      />

      {/* Subtle noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GradientMesh;
