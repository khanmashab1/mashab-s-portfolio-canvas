import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GraduationCap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Item = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
};

const Experience = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("experience")
      .select("id,role,company,period,description")
      .order("display_order")
      .then(({ data }) => {
        setItems((data ?? []) as Item[]);
        setLoading(false);
      });
  }, []);

  return (
    <section id="education" className="py-24 md:py-32 relative bg-secondary/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="eyebrow">Background</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mt-3 mb-6">Education</h2>
        </motion.div>

        {loading ? (
          <div className="relative" aria-hidden="true">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            <div className="space-y-10 md:space-y-12">
              {[0, 1].map((i) => (
                <div key={i} className={`relative flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div className={`glass-card p-6 md:p-8 ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                      <Skeleton className="h-4 w-24 mb-4" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-3" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <div className="space-y-10 md:space-y-12">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: isMobile ? 0.1 : index * 0.1 }}
                  className={`relative flex items-start gap-8 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

                  <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div className={`glass-card p-6 md:p-8 hover:border-primary/30 transition-colors ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-md flex items-center justify-center bg-secondary text-primary">
                          <GraduationCap size={20} />
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">{item.period}</span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.role}</h3>
                      <p className="text-primary text-sm font-medium mb-3">{item.company}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
