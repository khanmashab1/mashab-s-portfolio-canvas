import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  // On mobile, just fade in the whole text — no per-character animation
  if (isMobile) {
    return (
      <motion.span
        className={`inline-block ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once }}
        transition={{ duration: 0.4, delay: delay * 0.5 }}
      >
        {text}
      </motion.span>
    );
  }

  const characters = text.split("");

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: staggerDelay, delayChildren: delay } },
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default CharacterReveal;
