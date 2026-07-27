import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react";
import profileImage from "@/assets/profile.jpeg";
import { Button } from "@/components/ui/button";

const specialties = [
  "Backend Architecture",
  "Scalable Systems",
  "Business Software",
];

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.4]" />
      <div className="absolute inset-x-0 top-0 h-px bg-border" />

      <div className="section-container relative z-10 text-center pt-28 pb-16">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-border mx-auto ring-1 ring-border shadow-sm">
            <img
              src={profileImage}
              alt="Portrait of Mashab Jadoon, Full-Stack Developer"
              className="w-full h-full object-cover"
              width={160}
              height={160}
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <span className="eyebrow">Available for freelance &amp; full-time roles</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-5 text-foreground"
        >
          Mashab Jadoon
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-primary font-medium mb-6"
        >
          Full-Stack Developer
        </motion.p>

        {/* Specialties */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-8"
        >
          {specialties.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />}
              {item}
            </span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-xl mx-auto text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed text-balance"
        >
          I build scalable web applications and dependable digital business
          solutions, from healthcare platforms to management systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <a href="#contact">Contact Me</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
            <a href="/resume.pdf" download>
              <Download size={17} />
              Resume
            </a>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex items-center justify-center gap-3"
        >
          {[
            { icon: Github, href: "https://github.com/khanmashab1", label: "GitHub" },
            { icon: Linkedin, href: "https://pk.linkedin.com/in/mashab-jadoon-895098369", label: "LinkedIn" },
            { icon: Mail, href: "mailto:khanmashab1@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target={label !== "Email" ? "_blank" : undefined} rel={label !== "Email" ? "noopener noreferrer" : undefined} aria-label={label} className="p-2.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 inset-x-0 z-20 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <a href="#about" className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
