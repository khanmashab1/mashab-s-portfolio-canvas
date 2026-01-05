import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Junior Full-Stack Developer",
    organization: "Freelance / Self-Employed",
    period: "2024 - Present",
    description:
      "Building modern web applications with React, Node.js, and Supabase. Specializing in secure authentication systems and scalable database architectures for clients worldwide.",
  },
  {
    type: "work",
    title: "Web Developer",
    organization: "Personal Projects & Open Source",
    period: "2023 - 2024",
    description:
      "Developed multiple full-stack applications including healthcare platforms, POS systems, and admin dashboards. Contributed to open-source projects and built a strong portfolio.",
  },
  {
    type: "education",
    title: "Software Engineering",
    organization: "Pak-Austria Fachhochschule Institute of Applied Sciences and Technology",
    period: "2022 - Present",
    description:
      "Pursuing degree with focus on software engineering, web technologies, and database systems. Active participant in coding competitions and tech communities.",
  },
  {
    type: "education",
    title: "Full-Stack Development",
    organization: "Self-Taught & Online Courses",
    period: "2022 - Present",
    description:
      "Completed comprehensive courses in React, Node.js, TypeScript, and cloud technologies. Continuously learning and staying updated with latest industry trends.",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-32 relative bg-secondary/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Journey
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-6">
            Experience & Education
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-start gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                />

                {/* Content */}
                <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <motion.div
                    className={`glass-card-hover p-6 md:p-8 ${
                      index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          exp.type === "work"
                            ? "bg-primary/10 text-primary"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {exp.type === "work" ? (
                          <Briefcase size={20} />
                        ) : (
                          <GraduationCap size={20} />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground font-medium">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-3">
                      {exp.organization}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
