import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "POS System",
    description:
      "A comprehensive point-of-sale system with inventory management, sales tracking, and real-time analytics. Built for retail businesses to streamline operations.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "pos",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Secure Admin Panel",
    description:
      "Role-based admin dashboard with secure authentication, user management, and activity logging. Features include 2FA and audit trails.",
    tech: ["Next.js", "TypeScript", "Supabase", "shadcn/ui"],
    image: "admin",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Supabase Auth App",
    description:
      "Modern authentication system with email, OAuth providers, and magic links. Demonstrates secure session management and protected routes.",
    tech: ["React", "Supabase", "Tailwind CSS", "Zod"],
    image: "auth",
    github: "https://github.com",
    live: "https://example.com",
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
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in building secure, scalable applications
          </p>
        </motion.div>

        <div className="grid gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="glass-card-hover overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Project Image/Preview */}
                  <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-32 h-32 rounded-2xl bg-secondary/80 backdrop-blur flex items-center justify-center border border-border"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="font-display text-3xl font-bold glow-text">
                          {project.title.split(" ")[0][0]}
                          {project.title.split(" ")[1]?.[0] || ""}
                        </span>
                      </motion.div>
                    </div>
                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.a
                        href={project.live}
                        className="p-4 rounded-full bg-primary text-primary-foreground"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowUpRight size={24} />
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4">
                      <motion.a
                        href={project.github}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <Github size={18} />
                        View Code
                      </motion.a>
                      <motion.a
                        href={project.live}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
