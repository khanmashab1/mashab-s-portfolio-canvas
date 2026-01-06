import { useState, useEffect } from "react";
import { motion, type Easing, AnimatePresence } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import avatarImage from "@/assets/avatar-illustration.png";
import useTypingEffect from "@/hooks/useTypingEffect";

const Hero = () => {
  const typedSkill = useTypingEffect(80, 40, 2000);
  const [showAvatar, setShowAvatar] = useState(false);

  // Auto-switch between photo and avatar every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowAvatar((prev) => !prev);
    }, 4000);
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
        className="section-container relative z-10 text-center pt-20"
      >
        {/* Profile Image with 3D Flip Animation */}
        <motion.div variants={itemVariants} className="mb-8 perspective-1000">
          <motion.div
            className="relative inline-block cursor-pointer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => setShowAvatar((prev) => !prev)}
            style={{ transformStyle: "preserve-3d" }}
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
            
            {/* Main image container */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 mx-auto glow-border relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={showAvatar ? "avatar" : "photo"}
                  src={showAvatar ? avatarImage : profileImage}
                  alt="Mashab Jadoon"
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ 
                    opacity: 0, 
                    rotateY: -90,
                    scale: 0.8,
                    filter: "blur(10px)"
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotateY: 0,
                    scale: 1,
                    filter: "blur(0px)"
                  }}
                  exit={{ 
                    opacity: 0, 
                    rotateY: 90,
                    scale: 0.8,
                    filter: "blur(10px)"
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.68, -0.55, 0.265, 1.55] // Back easing for bounce
                  }}
                />
              </AnimatePresence>
            </div>
            
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
                key={i}
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
          </motion.div>
        </motion.div>

        {/* Status Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm text-muted-foreground">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            ✨ Available for opportunities
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">Hi, I'm </span>
          <span className="glow-text">Mashab Jadoon</span> 👋
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light mb-4"
        >
          Full-Stack Developer 💻
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

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View Projects 🎯</span>
            <motion.div
              className="absolute inset-0 bg-primary/80"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 glass-card font-medium rounded-xl border border-border hover:border-primary/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me 📬
          </motion.a>
          <motion.a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-6 py-4 bg-secondary text-foreground font-medium rounded-xl border border-border hover:border-primary/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={18} />
            Resume
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6"
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

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-muted-foreground"
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
