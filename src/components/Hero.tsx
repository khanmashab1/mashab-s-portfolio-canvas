import { useState, useEffect, useRef } from "react";
import { motion, type Easing, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import avatarImage from "@/assets/avatar-professional.png";
import useTypingEffect from "@/hooks/useTypingEffect";
import CharacterReveal from "./CharacterReveal";
import MagneticButton from "./MagneticButton";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const typedSkill = useTypingEffect(80, 40, 2000);
  const [showAvatar, setShowAvatar] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const moveX = useTransform(x, [-200, 200], [-8, 8]);
  const moveY = useTransform(y, [-200, 200], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !profileRef.current) return;
    const rect = profileRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => setShowAvatar((prev) => !prev), 2500);
    return () => clearInterval(interval);
  }, [isMobile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as Easing } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial" />
      {!isMobile && (
        <>
          <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        </>
      )}

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="section-container relative z-10 text-center pt-20 pb-32">
        {/* Profile Image */}
        <motion.div ref={profileRef} variants={itemVariants} className="mb-8 perspective-1000" onMouseMove={!isMobile ? handleMouseMove : undefined} onMouseLeave={!isMobile ? () => { mouseX.set(0); mouseY.set(0); } : undefined}>
          <motion.div className="relative inline-block cursor-pointer" whileHover={!isMobile ? { scale: 1.05 } : undefined} whileTap={{ scale: 0.95 }} onClick={() => setShowAvatar((prev) => !prev)} style={!isMobile ? { transformStyle: "preserve-3d", x: moveX, y: moveY } : undefined}>
            <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto blur-xl bg-primary/30" />
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 mx-auto glow-border relative" style={{ boxShadow: "0 10px 40px hsl(var(--primary) / 0.3)" }}>
              {isMobile ? (
                <img src={profileImage} alt="Mashab Jadoon" className="w-full h-full object-cover" />
              ) : (
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img key={showAvatar ? "avatar" : "photo"} src={showAvatar ? avatarImage : profileImage} alt="Mashab Jadoon" className="w-full h-full object-cover absolute inset-0" initial={{ opacity: 0, rotateY: -90, scale: 0.9 }} animate={{ opacity: 1, rotateY: 0, scale: 1 }} exit={{ opacity: 0, rotateY: 90, scale: 0.9 }} transition={{ duration: 0.3, ease: "easeOut" }} />
                </AnimatePresence>
              )}
            </div>
            <div className="absolute -inset-2 rounded-full border-2 border-primary/30" />
            {!isMobile && (
              <>
                <motion.div className="absolute -inset-2 rounded-full border-2 border-primary/30" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                <motion.div className="absolute -inset-4 rounded-full border border-primary/20" animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
              </>
            )}
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
        <motion.h1 variants={itemVariants} className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6">
          <span className="text-foreground">Hi, I'm </span>
          <motion.span className="inline-block relative" style={{ background: "linear-gradient(90deg, hsl(217, 91%, 60%) 0%, hsl(217, 91%, 75%) 50%, hsl(217, 91%, 60%) 100%)", backgroundSize: "200% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 0 30px hsl(217 91% 60% / 0.5))" }} animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}>
            Mashab Jadoon
          </motion.span>
          <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8, type: "spring", stiffness: 400 }}>
            {" "}👋
          </motion.span>
        </motion.h1>

        {/* Role */}
        <motion.p variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light mb-4">
          <CharacterReveal text="Full Stack Developer" delay={1.2} staggerDelay={0.04} />
          <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2, type: "spring", stiffness: 400 }}>
            {" "}💻
          </motion.span>
        </motion.p>

        {/* Typing Animation */}
        <motion.div variants={itemVariants} className="h-8 md:h-10 mb-6 flex items-center justify-center">
          <span className="text-lg md:text-xl text-primary font-medium">{typedSkill}</span>
          <span className="w-0.5 h-6 md:h-7 bg-primary ml-1 animate-pulse" />
        </motion.div>

        {/* Tagline */}
        <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground/80 mb-10 leading-relaxed">
          I build scalable web applications and smart digital business solutions. 🚀
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <MagneticButton href="#projects" strength={0.4}>
            <div className="group relative px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl overflow-hidden">
              <span className="relative z-10">View Projects 🎯</span>
              <motion.div className="absolute inset-0 bg-primary/80" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
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

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 mb-16">
          {[
            { icon: Github, href: "https://github.com/khanmashab1", label: "GitHub" },
            { icon: Linkedin, href: "https://pk.linkedin.com/in/mashab-jadoon-895098369", label: "LinkedIn" },
            { icon: Mail, href: "mailto:khanmashab1@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a key={label} href={href} target={label !== "Email" ? "_blank" : undefined} rel={label !== "Email" ? "noopener noreferrer" : undefined} aria-label={label} className="p-3 rounded-xl bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-300" whileHover={{ y: -4, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div className="absolute bottom-8 inset-x-0 z-20 flex justify-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.6 }}>
        <motion.a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
