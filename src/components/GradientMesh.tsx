import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const GradientMesh = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Transform scroll position into hue shifts
  const hue1 = useTransform(scrollYProgress, [0, 0.5, 1], [174, 220, 262]);
  const hue2 = useTransform(scrollYProgress, [0, 0.5, 1], [262, 174, 320]);
  const hue3 = useTransform(scrollYProgress, [0, 0.5, 1], [200, 280, 174]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />

      {/* Animated mesh blobs */}
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
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
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
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[80px] opacity-20"
        style={{
          bottom: "10%",
          left: "20%",
          background: useTransform(
            hue3,
            (h) => `radial-gradient(circle, hsl(${h} 70% 60% / 0.4), transparent 70%)`
          ),
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[90px] opacity-15"
        style={{
          top: "60%",
          right: "30%",
          background: useTransform(
            hue1,
            (h) => `radial-gradient(circle, hsl(${h + 60} 75% 50% / 0.3), transparent 70%)`
          ),
        }}
        animate={{
          x: [0, -50, 70, 0],
          y: [0, 40, -50, 0],
          scale: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
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
