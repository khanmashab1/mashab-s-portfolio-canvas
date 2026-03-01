import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Layers, Target } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { useIsMobile } from "@/hooks/use-mobile";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, readable, and well-structured code",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description: "Building systems designed to grow with your business",
  },
  {
    icon: Target,
    title: "Business-Focused Solutions",
    description: "Software that solves real-world business problems",
  },
];

const About = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: isMobile ? "0px" : "-100px" });

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

        {/* Stats */}
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
              I'm a passionate Full Stack Developer with a strong drive to build 
              real-world systems that make a meaningful impact. My focus lies in creating 
              scalable backend architectures and business-oriented software solutions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From Pharmacy Management Systems to healthcare platforms, I specialize in 
              turning complex business requirements into clean, efficient software. I thrive 
              on problem-solving and continuously learning new technologies to deliver 
              top-notch solutions.
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
                Let's work together →
              </a>
            </motion.div>
          </motion.div>

          {/* Highlight Cards - 3 cards */}
          <div className="grid gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass-card-hover p-6 flex items-start gap-4"
              >
              <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0"
                  whileHover={!isMobile ? { rotate: 5, scale: 1.1 } : undefined}
                >
                  <item.icon size={24} />
                </motion.div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
