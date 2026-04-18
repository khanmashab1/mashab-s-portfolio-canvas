import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import avatarImage from "@/assets/avatar-professional.png";
import useTypingEffect from "@/hooks/useTypingEffect";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const typedSkill = useTypingEffect(80, 40, 2000);
  const [showAvatar, setShowAvatar] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const interval = setInterval(() => setShowAvatar((prev) => !prev), 2500);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial" />

      <div className="section-container relative z-10 text-center pt-20 pb-16">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.div
            className="relative inline-block cursor-pointer"
            onClick={() => setShowAvatar((prev) => !prev)}
            animate={isMobile ? undefined : { y: [0, -10, 0] }}
            transition={isMobile ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={isMobile ? undefined : { scale: 1.05, rotate: [0, -3, 3, 0], transition: { rotate: { duration: 0.5 }, scale: { duration: 0.3 } } }}
          >
            {!isMobile && (
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30 blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 mx-auto relative"
              style={{ boxShadow: "0 10px 40px hsl(var(--primary) / 0.3)" }}>
              {isMobile ? (
                <img src={profileImage} alt="Mashab Jadoon" className="w-full h-full object-cover" loading="eager" />
              ) : (
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={showAvatar ? "avatar" : "photo"}
                    src={showAvatar ? avatarImage : profileImage}
                    alt="Mashab Jadoon"
                    className="w-full h-full object-cover absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              )}
            </div>
            {!isMobile && (
              <div className="absolute -inset-2 rounded-full border-2 border-primary/20 animate-[spin_20s_linear_infinite]" />
            )}
          </motion.div>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm text-muted-foreground">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            ✨ Available for opportunities
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">Hi, I'm </span>
          <span className="text-primary" style={{ filter: "drop-shadow(0 0 20px hsl(217 91% 60% / 0.4))" }}>
            Mashab Jadoon
          </span>
          <span> 👋</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light mb-4"
        >
          Full Stack Developer 💻
        </motion.p>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="h-8 md:h-10 mb-6 flex items-center justify-center"
        >
          <span className="text-lg md:text-xl text-primary font-medium">{typedSkill}</span>
          <span className="w-0.5 h-6 md:h-7 bg-primary ml-1 animate-pulse" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground/80 mb-10 leading-relaxed"
        >
          I build scalable web applications and smart digital business solutions. 🚀
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a href="#projects">
            <div className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors">
              View Projects 🎯
            </div>
          </a>
          <a href="#contact">
            <div className="px-8 py-4 glass-card font-medium rounded-xl border border-border hover:border-primary/50 transition-colors">
              Contact Me 📬
            </div>
          </a>
          <a href="/resume.pdf" download>
            <div className="flex items-center gap-2 px-6 py-4 bg-secondary text-foreground font-medium rounded-xl border border-border hover:border-primary/50 transition-colors">
              <Download size={18} />
              Resume
            </div>
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          {[
            { icon: Github, href: "https://github.com/khanmashab1", label: "GitHub" },
            { icon: Linkedin, href: "https://pk.linkedin.com/in/mashab-jadoon-895098369", label: "LinkedIn" },
            { icon: Mail, href: "mailto:khanmashab1@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target={label !== "Email" ? "_blank" : undefined} rel={label !== "Email" ? "noopener noreferrer" : undefined} aria-label={label} className="p-3 rounded-xl bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-300">
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 inset-x-0 z-20 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
