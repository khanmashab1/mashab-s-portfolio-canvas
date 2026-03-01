import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const GradientMesh = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();

  const hue1 = useTransform(scrollYProgress, [0, 0.5, 1], [174, 220, 262]);
  const hue2 = useTransform(scrollYProgress, [0, 0.5, 1], [262, 174, 320]);

  // On mobile, render a single static gradient — no animations
  if (isMobile) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, hsl(217 72% 50% / 0.3), transparent 60%), radial-gradient(ellipse at 70% 80%, hsl(262 72% 50% / 0.2), transparent 60%)",
          }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />

      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-30"
        style={{
          top: "-20%",
          left: "-10%",
          background: useTransform(hue1, (h) => `radial-gradient(circle, hsl(${h} 72% 50% / 0.4), transparent 70%)`),
        }}
        animate={{ x: [0, 100, 50, 0], y: [0, 50, 100, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-25"
        style={{
          top: "30%",
          right: "-5%",
          background: useTransform(hue2, (h) => `radial-gradient(circle, hsl(${h} 80% 55% / 0.4), transparent 70%)`),
        }}
        animate={{ x: [0, -80, -40, 0], y: [0, 80, -40, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

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
