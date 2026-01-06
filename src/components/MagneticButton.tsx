import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  download?: boolean;
  target?: string;
  rel?: string;
  strength?: number;
}

const MagneticButton = ({ 
  children, 
  className = "", 
  href, 
  onClick,
  download,
  target,
  rel,
  strength = 0.3 
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={ref}
      className={`inline-block cursor-pointer ${className}`}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        download={download}
        target={target}
        rel={rel}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className="inline-block">
      {content}
    </div>
  );
};

export default MagneticButton;
