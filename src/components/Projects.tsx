import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import projectMedicare from "@/assets/project-medicare.png";
import projectPos from "@/assets/project-pos.png";
import projectTendering from "@/assets/project-tendering.png";
import TiltCard from "./TiltCard";
import CharacterReveal from "./CharacterReveal";

const projects = [
  {
    title: "MediCare Pro – Pharmacy Management System",
    description:
      "Enterprise-level inventory and billing system with dashboard analytics, POS, stock management, expiry alerts, and reports export. Built for real-world pharmacy operations.",
    tech: ["React", "Node.js", "Express", "MySQL"],
    features: ["Dashboard analytics", "Inventory tracking", "Billing system", "Expiry alerts", "Reports export"],
    image: projectMedicare,
    github: "https://github.com/khanmashab1/health-harmony-hub-0547dfb5.git",
    live: "https://medi-careplus-inky.vercel.app/",
    featured: true,
  },
  {
    title: "Noor Duas – Islamic Duas Platform",
    description:
      "Multi-language Islamic dua platform with search, categories, favorites, daily random dua, and tasbeeh counter. Supports Arabic and Urdu content.",
    tech: ["React", "REST API", "Database"],
    features: ["Arabic + Urdu support", "Daily random dua", "Favorites system", "Category filtering"],
    image: projectPos,
    github: "https://github.com/khanmashab1",
    live: null,
  },
  {
    title: "Database / Academic Project",
    description:
      "Relational database system with structured schema design, normalized tables, complex queries, and comprehensive reporting for academic purposes.",
    tech: ["SQL", "Backend API"],
    features: ["Structured schema", "Complex queries", "Reporting"],
    image: projectTendering,
    github: "https://github.com/khanmashab1",
    live: null,
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-32 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-6">
            <CharacterReveal text="Featured Projects" delay={0.2} />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world projects showcasing full-stack development expertise
          </p>
        </motion.div>

        <div className="grid gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <TiltCard className="glass-card-hover overflow-hidden" tiltStrength={8}>
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Project Image */}
                  <div className={`relative h-64 lg:h-80 overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    {project.featured && (
                      <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                        Featured
                      </span>
                    )}
                    {project.live && (
                      <motion.div className="absolute inset-0 bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.a href={project.live} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-primary text-primary-foreground" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <ArrowUpRight size={24} />
                        </motion.a>
                      </motion.div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Features */}
                    <ul className="mb-6 space-y-1">
                      {project.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-border">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4">
                      <motion.a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" whileHover={{ x: 4 }}>
                        <Github size={18} />
                        View Code
                      </motion.a>
                      {project.live && (
                        <motion.a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" whileHover={{ x: 4 }}>
                          <ExternalLink size={18} />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
