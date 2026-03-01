import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const education = [
  {
    icon: GraduationCap,
    title: "BS Computer Science",
    organization: "Pak-Austria Fachhochschule Institute of Applied Sciences and Technology",
    period: "2022 - 2026 (Expected)",
    description: "Pursuing BS degree with focus on software engineering, web technologies, database systems, and algorithms. Final Year Project: MediCare+ — A Smart Healthcare Appointment Management System with AI-Powered Symptom Analysis.",
  },
  {
    icon: BookOpen,
    title: "Relevant Coursework",
    organization: "University Curriculum",
    period: "2022 - Present",
    description: "Data Structures & Algorithms, Database Management Systems, Object-Oriented Programming, Software Engineering, Web Development, Operating Systems, Computer Networks.",
  },
  {
    icon: Award,
    title: "Full-Stack Development",
    organization: "Self-Taught & Online Courses",
    period: "2023 - Present",
    description: "Completed comprehensive courses in React, Node.js, Express.js, TypeScript, and cloud technologies. Continuously learning and staying updated with latest industry trends.",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "0px" });

  return (
    <section id="education" className="py-24 md:py-32 relative bg-secondary/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">Journey</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-6">Education</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-10 md:space-y-12">
            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: isMobile ? 0.1 : index * 0.1 }}
                className={`relative flex items-start gap-8 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

                <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className={`glass-card p-6 md:p-8 hover:border-primary/30 transition-colors ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                        <item.icon size={20} />
                      </div>
                      <span className="text-sm text-muted-foreground font-medium">{item.period}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{item.organization}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>

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
