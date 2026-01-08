import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Shield, Zap, Users } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Building with security in mind",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized for speed and efficiency",
  },
  {
    icon: Users,
    title: "User Focused",
    description: "Creating intuitive experiences",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            About Me
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-6">
            Crafting Digital Experiences
          </h2>
        </motion.div>

        {/* Stats with Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { value: 3, suffix: "+", label: "Projects Completed" },
            { value: 1, suffix: "+", label: "Year Experience" },
            { value: 8, suffix: "+", label: "Technologies" },
            { value: 100, suffix: "%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="text-center p-4 glass-card rounded-xl"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                <AnimatedCounter end={stat.value} duration={2000} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate Full-Stack Developer with a keen eye for building 
              secure, scalable web applications. My journey in tech started with 
              curiosity and has evolved into a commitment to excellence.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I specialize in React, Node.js, and modern authentication systems. 
              Every project is an opportunity to solve problems and create 
              meaningful impact through technology.
            </p>
            <motion.div
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4"
              >
                Let's work together
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>
          </motion.div>

          {/* Highlight Cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass-card-hover p-6"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <item.icon size={24} />
                </motion.div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
