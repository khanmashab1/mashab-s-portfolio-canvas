import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Globe, Database, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Globe,
    title: "Full-Stack Web Development",
    description: "Complete web applications from frontend to backend, built with modern technologies like React, PHP, MySQL, and Supabase.",
    features: ["Responsive Design", "Database Integration", "API Development", "Authentication Systems"],
  },
  {
    icon: Code,
    title: "Frontend Development",
    description: "Beautiful, interactive user interfaces using React.js, Tailwind CSS, and Framer Motion for smooth animations.",
    features: ["React.js Apps", "Tailwind Styling", "UI Animations", "Mobile-First Design"],
  },
  {
    icon: Database,
    title: "Backend & Database",
    description: "Robust backend solutions with secure APIs, database design, and seamless data management.",
    features: ["PHP APIs", "MySQL/PostgreSQL", "Supabase Integration", "RESTful Services"],
  },
  {
    icon: Shield,
    title: "Security Implementation",
    description: "Secure authentication systems with role-based access control, session management, and protection against common vulnerabilities.",
    features: ["Role-Based Access", "Secure Auth", "CSRF/XSS Protection", "SQL Injection Prevention"],
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            What I Offer
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-6">
            My Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            As a BS Computer Science student at Pak-Austria Fachhochschule Institute of Applied Sciences and Technology, 
            I offer professional web development services to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card-hover p-6 md:p-8 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <service.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#1DBF73] hover:bg-[#19a463] text-white font-medium px-8"
          >
            <a
              href="https://www.fiverr.com/s/Zm3d478"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span>Hire Me on Fiverr</span>
              <ExternalLink size={18} />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
