import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import projectMedicare from "@/assets/project-medicare.png";
import projectNoorduas from "@/assets/project-noorduas.png";
import projectNoorduas2 from "@/assets/project-noorduas2.png";
import projectTendering from "@/assets/project-tendering.png";
import projectEnergy1 from "@/assets/project-energy1.png";
import projectEnergy2 from "@/assets/project-energy2.png";
import projectEnergy3 from "@/assets/project-energy3.png";
import { useIsMobile } from "@/hooks/use-mobile";

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
    live: "https://syedwarisshahco.vercel.app/",
  },
  {
    title: "Energy Stream – Smart Energy Monitoring System",
    description:
      "A real-time IoT-based energy monitoring dashboard powered by ESP32 smart meters. Tracks voltage, current, power & energy consumption with live updates every 5 seconds, historical analysis, and Google Sheets integration for data export.",
    tech: ["React", "Tailwind CSS", "Supabase", "ESP32", "IoT", "Google Sheets API"],
    features: [
      "Real-time voltage, current, power & energy tracking",
      "ESP32 smart meter integration with 5s refresh",
      "Historical analysis with trend visualization",
      "Google Sheets data source & CSV export",
      "Multi-device management & admin panel",
      "Consumption summary with daily/weekly/monthly views",
    ],
    images: [projectEnergy1, projectEnergy2, projectEnergy3],
    github: "https://github.com/khanmashab1",
    live: "https://energy-stream.vercel.app/login",
  },
  {
    title: "ZicMart – Point of Sale System",
    description:
      "A full-featured POS (Point of Sale) system built for retail management. Handles inventory, billing, sales tracking, and reporting with a local server setup.",
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    features: [
      "Product & inventory management",
      "Sales billing & receipt generation",
      "Sales reporting & analytics",
      "User role management",
    ],
    images: ["/placeholder.svg"],
    github: "https://github.com/khanmashab1",
    live: null,
  },
];

const ImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [current, setCurrent] = useState(0);
  if (images.length === 1) {
    return <img src={images[0]} alt={title} className="w-full h-full object-cover" loading="lazy" />;
  }
  return (
    <div className="relative w-full h-full">
      <img src={images[current]} alt={`${title} - ${current + 1}`} className="w-full h-full object-cover transition-opacity duration-300" loading="lazy" />
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
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: isMobile ? "0px" : "-100px" });

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

        <div className="grid gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
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

                    <ul className="mb-5 space-y-1">
                      {project.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-border">{tech}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Github size={18} /> View Code
                      </a>
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
      </div>
    </section>
  );
};

export default Projects;
