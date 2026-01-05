import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import projectMedicare from "@/assets/project-medicare.png";
import projectPos from "@/assets/project-pos.png";
import projectTendering from "@/assets/project-tendering.png";
import projectLms from "@/assets/project-lms.png";

const projects = [
  {
    title: "MediCare+",
    description:
      "A comprehensive healthcare platform with doctor appointments, medical scheduling, and patient management. Built for modern healthcare providers.",
    tech: ["React", "Tailwind CSS", "TypeScript", "Vercel"],
    image: projectMedicare,
    github: "https://github.com/khanmashab1",
    live: "https://medi-careplus-inky.vercel.app/",
    featured: true,
  },
  {
    title: "POS System",
    description:
      "A comprehensive point-of-sale system with inventory management, sales tracking, multi-shop support, and real-time analytics. Features super admin panel, cashier management, and secure authentication.",
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    image: projectPos,
    github: "https://github.com/khanmashab1/POS_System.git",
    live: null,
  },
  {
    title: "Tendering Website",
    description:
      "A professional tendering and bidding platform for managing tenders, bids, and procurement processes. Features tender listings, bid management, and status tracking.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: projectTendering,
    github: "https://github.com/khanmashab1",
    live: null,
  },
  {
    title: "LMS System",
    description:
      "A modern Learning Management System for educational institutions. Features course management, student progress tracking, quizzes, and interactive learning modules.",
    tech: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    image: projectLms,
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
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="glass-card-hover overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Project Image/Preview */}
                  <div className={`relative h-64 lg:h-80 overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    
                    {/* Featured badge */}
                    {project.featured && (
                      <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                        Featured
                      </span>
                    )}
                    
                    {/* Hover overlay */}
                    {project.live && (
                      <motion.div
                        className="absolute inset-0 bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-full bg-primary text-primary-foreground"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <Github size={18} />
                        View Code
                      </motion.a>
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </motion.a>
                      )}
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
