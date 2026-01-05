import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    color: "primary",
    skills: [
      { name: "HTML5, CSS3, Responsive Design", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "React.js (Hooks, Component Architecture)", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion (UI Animations)", level: 80 },
    ],
  },
  {
    title: "Backend Development",
    color: "accent",
    skills: [
      { name: "PHP (Core PHP, Secure APIs)", level: 85 },
      { name: "MySQL (Relational Database Design)", level: 85 },
      { name: "Supabase (PostgreSQL, Auth, Storage)", level: 80 },
      { name: "RESTful API Development", level: 90 },
      { name: "Authentication & Authorization", level: 85 },
    ],
  },
  {
    title: "Security & Authentication",
    color: "primary",
    skills: [
      { name: "Role-Based Access Control", level: 85 },
      { name: "Secure Login & Session Management", level: 90 },
      { name: "CSRF & XSS Protection", level: 80 },
      { name: "SQL Injection Prevention", level: 90 },
      { name: "Web Application Security", level: 80 },
    ],
  },
  {
    title: "Tools & Workflow",
    color: "accent",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Vite & npm", level: 85 },
      { name: "Composer (PHP)", level: 80 },
      { name: "Postman (API Testing)", level: 85 },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-secondary/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Expertise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-6">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            A comprehensive toolkit for building modern, secure, and scalable applications
          </p>
          <motion.a
            href="https://www.fiverr.com/s/wkxDldA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink size={18} />
            Hire Me on Fiverr
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass-card p-8"
            >
              <h3 className={`font-display text-xl font-bold mb-6 ${
                category.color === "primary" ? "text-primary" : "text-accent"
              }`}>
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          category.color === "primary" 
                            ? "bg-gradient-to-r from-primary to-primary/60" 
                            : "bg-gradient-to-r from-accent to-accent/60"
                        }`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.1,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
