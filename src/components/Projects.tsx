import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import projectMedicare from "@/assets/project-medicare.png";
import projectNoorduas from "@/assets/project-noorduas.png";
import projectNoorduas2 from "@/assets/project-noorduas2.png";
import projectTendering from "@/assets/project-tendering.png";
import TiltCard from "./TiltCard";
import CharacterReveal from "./CharacterReveal";

const projects = [
  {
    title: "MediCare+ – Smart Healthcare Appointment System",
    description:
      "A comprehensive web-based Smart Healthcare Appointment Management System with AI-Powered Symptom Analysis. Features role-based dashboards for Patients, Doctors, Physician Assistants, and Admins — enabling end-to-end clinical workflow from booking to prescription generation.",
    tech: ["React", "Tailwind CSS", "Supabase", "Edge Functions", "Stripe", "AI/RAG"],
    features: [
      "Multi-role dashboards (Patient, Doctor, PA, Admin)",
      "Token-based queue system with estimated wait times",
      "AI-powered symptom checker with RAG architecture",
      "Stripe-integrated subscription plans (Basic, Pro, Enterprise)",
      "Prescription generation with QR verification",
      "Real-time notifications & email system",
    ],
    images: [projectMedicare],
    github: "https://github.com/khanmashab1/health-harmony-hub-0547dfb5.git",
    live: "https://medi-careplus-inky.vercel.app/",
    featured: true,
  },
  {
    title: "Noor Duas – Authentic Duas from Quran & Sunnah",
    description:
      "A comprehensive Islamic platform for daily duas, prayer times, Hadith, Tasbeeh counter, Namaz guides, and Islamic stories. Features GPS-based prayer times with Ramadan mode, Qibla direction, PWA support for offline access, and multi-language support.",
    tech: ["React", "Tailwind CSS", "Supabase", "PWA", "GPS API"],
    features: [
      "GPS-based prayer times with Ramadan mode",
      "Duas with Arabic, Urdu & transliteration",
      "Digital Tasbeeh counter & Qibla compass",
      "Hadith collections, Namaz guides & Islamic stories",
      "PWA with offline access & installable app",
      "Category filtering, search & favorites system",
    ],
    images: [projectNoorduas, projectNoorduas2],
    github: "https://github.com/khanmashab1",
    live: "https://noor-duas.vercel.app/",
  },
  {
    title: "Construction Hub Pro – Tendering & Project Management",
    description:
      "A professional construction company website with admin panel for managing tenders, projects, team members, and company services. Features a public-facing site with 3D hero section and a secure admin dashboard.",
    tech: ["React", "Tailwind CSS", "Supabase", "Edge Functions"],
    features: [
      "Public website with services & project showcase",
      "Admin dashboard with role-based access",
      "Tender & project management system",
      "Admin user management with super admin controls",
      "Responsive design with modern 3D animations",
    ],
    images: [projectTendering],
    github: "https://github.com/khanmashab1",
    live: null,
  },
];

const ImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [current, setCurrent] = useState(0);
  if (images.length === 1) {
    return <img src={images[0]} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />;
  }
  return (
    <div className="relative w-full h-full">
      <img src={images[current]} alt={`${title} - ${current + 1}`} className="w-full h-full object-cover transition-all duration-500" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-5" : "bg-foreground/40"}`} />
        ))}
      </div>
      <button onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); }} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-background/60 text-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <ChevronLeft size={16} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-background/60 text-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

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
                    <ImageCarousel images={project.images} title={project.title} />
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
