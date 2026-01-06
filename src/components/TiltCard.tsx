import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number;
  glareEnabled?: boolean;
}

const TiltCard = ({ 
  children, 
  className = "", 
  tiltStrength = 15,
  glareEnabled = true 
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [0, 1], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(xSpring, [0, 1], [-tiltStrength, tiltStrength]);

  // Glare effect
  const glareX = useTransform(xSpring, [0, 1], ["-100%", "200%"]);
  const glareOpacity = useTransform(
    xSpring,
    [0, 0.5, 1],
    [0, 0.15, 0]
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
      
      {/* Glare overlay */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
          style={{ transform: "translateZ(1px)" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              x: glareX,
              opacity: glareOpacity,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default TiltCard;
