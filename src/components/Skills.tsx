import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Monitor, Server, Database, Wrench, type LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

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
          <span className="eyebrow">Expertise</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mt-3 mb-4">Skills &amp; Technologies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A focused toolkit for building modern, scalable applications.</p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8" aria-hidden="true">
            {[0, 1].map((i) => (
              <div key={i} className="glass-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <Skeleton className="w-9 h-9 rounded-md" />
                  <Skeleton className="h-5 w-28" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[16, 20, 14, 24, 18, 12].map((w, j) => (
                    <Skeleton key={j} className="h-8" style={{ width: `${w * 4}px` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {Object.entries(grouped).map(([category, items], categoryIndex) => {
              const Icon = iconMap[category] ?? Wrench;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: isMobile ? 0.1 : categoryIndex * 0.1 }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center text-primary">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1.5 text-sm text-foreground bg-secondary/60 border border-border rounded-md hover:border-primary/50 transition-colors"
                      >
                        {skill.name}
                      </span>
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
