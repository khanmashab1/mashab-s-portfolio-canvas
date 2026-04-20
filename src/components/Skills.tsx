import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Monitor, Server, Database, Wrench, Sparkles, type LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

type Skill = { id: string; category: string; name: string; level: number };

const iconMap: Record<string, LucideIcon> = {
  Frontend: Monitor,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
};

const Skills = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("skills")
      .select("*")
      .order("category")
      .order("display_order")
      .then(({ data }) => {
        setSkills((data ?? []) as Skill[]);
        setLoading(false);
      });
  }, []);

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-secondary/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">Expertise</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-6">Skills & Technologies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A comprehensive toolkit for building modern, scalable applications</p>
        </motion.div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading…</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {Object.entries(grouped).map(([category, items], categoryIndex) => {
              const Icon = iconMap[category] ?? Sparkles;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: isMobile ? 0.1 : categoryIndex * 0.1 }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary">{category}</h3>
                  </div>
                  <div className="space-y-4">
                    {items.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-foreground font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0 : 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
