import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { resolveImage } from "@/lib/projectImages";

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  images: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
};

const ImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [current, setCurrent] = useState(0);
  const resolved = images.map(resolveImage);
  if (resolved.length === 0) {
    return <div className="w-full h-full bg-secondary" />;
  }
  if (resolved.length === 1) {
    return <img src={resolved[0]} alt={title} className="w-full h-full object-cover" loading="lazy" />;
  }
  return (
    <div className="relative w-full h-full">
      <img src={resolved[current]} alt={`${title} - ${current + 1}`} className="w-full h-full object-cover transition-opacity duration-300" loading="lazy" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {resolved.map((_, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-5" : "bg-foreground/40"}`} />
        ))}
      </div>
      <button onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + resolved.length) % resolved.length); }} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-background/60 text-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <ChevronLeft size={16} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % resolved.length); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-background/60 text-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: isMobile ? "0px" : "-100px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        setProjects((data ?? []) as Project[]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">Portfolio</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-6">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Real-world projects showcasing full-stack development expertise</p>
        </motion.div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading projects…</p>
        ) : (
          <div className="grid gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: isMobile ? 0.1 : index * 0.15 }}
                className="group"
              >
                <div className="glass-card overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className={`relative h-64 lg:h-80 overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <ImageCarousel images={project.images} title={project.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                      {project.featured && (
                        <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">Featured</span>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 p-2 rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform">
                          <ArrowUpRight size={18} />
                        </a>
                      )}
                    </div>

                    <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                      <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">{project.description}</p>

                      {project.features.length > 0 && (
                        <ul className="mb-5 space-y-1">
                          {project.features.map((feature) => (
                            <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-border">{tech}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <Github size={18} /> View Code
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <ExternalLink size={18} /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
