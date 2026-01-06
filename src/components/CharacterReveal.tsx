import { motion } from "framer-motion";

interface CharacterRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  staggerDelay?: number;
}

const CharacterReveal = ({ 
  text, 
  className = "", 
  once = true, 
  delay = 0,
  staggerDelay = 0.03 
}: CharacterRevealProps) => {
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: staggerDelay, 
        delayChildren: delay 
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      style={{ perspective: "1000px" }}
    >
      {characters.map((char, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block"
          style={{ 
            transformOrigin: "bottom center",
            whiteSpace: char === " " ? "pre" : "normal"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default CharacterReveal;
