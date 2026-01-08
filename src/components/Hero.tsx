import { useState, useEffect, useRef } from "react";
import { motion, type Easing, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import avatarImage from "@/assets/avatar-professional.png";
import useTypingEffect from "@/hooks/useTypingEffect";
import CharacterReveal from "./CharacterReveal";
import MagneticButton from "./MagneticButton";

const Hero = () => {
  const typedSkill = useTypingEffect(80, 40, 2000);
  const [showAvatar, setShowAvatar] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform mouse position to subtle movement
  const moveX = useTransform(x, [-200, 200], [-8, 8]);
  const moveY = useTransform(y, [-200, 200], [-8, 8]);
  const shadowX = useTransform(x, [-200, 200], [15, -15]);
  const shadowY = useTransform(y, [-200, 200], [15, -15]);

  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!profileRef.current) return;
    const rect = profileRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Auto-switch between photo and avatar every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowAvatar((prev) => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as Easing },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="section-container relative z-10 text-center pt-20 pb-32"
      >
        {/* Profile Image with Mouse Parallax */}
        <motion.div 
          ref={profileRef}
          variants={itemVariants} 
          className="mb-8 perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        >
          <motion.div
            className="relative inline-block cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => setShowAvatar((prev) => !prev)}
            style={{ 
              transformStyle: "preserve-3d",
              x: moveX,
              y: moveY,
            }}
          >
            {/* Glow effect behind image */}
            <motion.div
              className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto blur-xl"
              animate={{
                background: showAvatar 
                  ? ["hsl(var(--primary) / 0.4)", "hsl(var(--accent) / 0.4)", "hsl(var(--primary) / 0.4)"]
                  : ["hsl(var(--accent) / 0.4)", "hsl(var(--primary) / 0.4)", "hsl(var(--accent) / 0.4)"],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Main image container with reactive shadow */}
            <motion.div 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 mx-auto glow-border relative"
              style={{
                boxShadow: useTransform(
                  [shadowX, shadowY],
                  ([sx, sy]) => `${sx}px ${sy}px 40px hsl(var(--primary) / 0.3), 0 10px 30px rgba(0,0,0,0.2)`
                ),
              }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={showAvatar ? "avatar" : "photo"}
                  src={showAvatar ? avatarImage : profileImage}
                  alt="Mashab Jadoon"
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ 
                    opacity: 0, 
                    rotateY: -90,
                    scale: 0.9,
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: 0,
                    scale: 1,
                  }}
                  exit={{ 
                    opacity: 0, 
                    rotateY: 90,
                    scale: 0.9,
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                />
              </AnimatePresence>
            </motion.div>
            
            {/* Rotating ring */}
            <motion.div
              className="absolute -inset-2 rounded-full border-2 border-primary/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Pulsing outer ring */}
            <motion.div
              className="absolute -inset-4 rounded-full border border-primary/20"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Sparkle dots */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  top: `${20 + i * 30}%`,
                  left: i % 2 === 0 ? "-10%" : "105%",
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            {/* Magic dust particles floating upward */}
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * 360;
              const radius = 80 + Math.random() * 20;
              const startX = Math.cos((angle * Math.PI) / 180) * radius;
              const startY = Math.sin((angle * Math.PI) / 180) * radius;
              const size = 2 + Math.random() * 4;
              
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: size,
                    height: size,
                    left: "50%",
                    top: "50%",
                    marginLeft: startX,
                    marginTop: startY,
                    background: i % 3 === 0 
                      ? "hsl(var(--primary))" 
                      : i % 3 === 1 
                        ? "hsl(var(--accent))" 
                        : "hsl(var(--primary) / 0.6)",
                    boxShadow: `0 0 ${size * 2}px hsl(var(--primary) / 0.5)`,
                  }}
                  animate={{
                    y: [-20, -80 - Math.random() * 40],
                    x: [0, (Math.random() - 0.5) * 30],
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                />
              );
            })}
            
            {/* Floating sparkle stars */}
            {[...Array(6)].map((_, i) => {
              const angle = (i / 6) * 360 + 30;
              const radius = 100 + Math.random() * 30;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <motion.div
                  key={`star-${i}`}
                  className="absolute pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: x,
                    marginTop: y,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.4 + 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <svg 
                    width="8" 
                    height="8" 
                    viewBox="0 0 24 24" 
                    fill="hsl(var(--primary))"
                    className="drop-shadow-[0_0_4px_hsl(var(--primary))]"
                  >
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                  </svg>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Status Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm text-muted-foreground">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            ✨ Available for opportunities
          </span>
        </motion.div>

        {/* Main Heading with Character Animation */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6"
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.3)"
          }}
        >
          <span className="text-white">Hi, I'm </span>
          <motion.span 
            className="inline-block relative"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(280, 100%, 70%) 25%, hsl(320, 100%, 75%) 50%, hsl(280, 100%, 70%) 75%, hsl(var(--primary)) 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px hsl(var(--primary) / 0.5))"
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            Mashab Jadoon
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 400 }}
          >
            {" "}👋
          </motion.span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light mb-4"
        >
          <CharacterReveal text="Full-Stack Developer" delay={1.2} staggerDelay={0.04} />
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 400 }}
          >
            {" "}💻
          </motion.span>
        </motion.p>

        {/* Typing Animation */}
        <motion.div
          variants={itemVariants}
          className="h-8 md:h-10 mb-6 flex items-center justify-center"
        >
          <span className="text-lg md:text-xl text-primary font-medium">
            {typedSkill}
          </span>
          <span className="w-0.5 h-6 md:h-7 bg-primary ml-1 animate-pulse" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground/80 mb-10 leading-relaxed"
        >
          Building secure, scalable web applications with clean code and modern technologies. 🔥
          Passionate about crafting exceptional digital experiences.
        </motion.p>

        {/* CTA Buttons with Magnetic Effect */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <MagneticButton href="#projects" strength={0.4}>
            <div className="group relative px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl overflow-hidden">
              <span className="relative z-10">View Projects 🎯</span>
              <motion.div
                className="absolute inset-0 bg-primary/80"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </MagneticButton>
          
          <MagneticButton href="#contact" strength={0.4}>
            <div className="px-8 py-4 glass-card font-medium rounded-xl border border-border hover:border-primary/50 transition-colors">
              Contact Me 📬
            </div>
          </MagneticButton>
          
          <MagneticButton href="/resume.pdf" download strength={0.4}>
            <div className="flex items-center gap-2 px-6 py-4 bg-secondary text-foreground font-medium rounded-xl border border-border hover:border-primary/50 transition-colors">
              <Download size={18} />
              Resume
            </div>
          </MagneticButton>
        </motion.div>

        {/* Social Links - Separate Row */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mb-16"
        >
          {[
            { icon: Github, href: "https://github.com/khanmashab1", label: "GitHub" },
            { icon: Linkedin, href: "https://pk.linkedin.com/in/mashab-jadoon-895098369", label: "LinkedIn" },
            { icon: Mail, href: "mailto:khanmashab1@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel={label !== "Email" ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="p-3 rounded-xl bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-300"
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Fixed at Bottom, Centered */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
