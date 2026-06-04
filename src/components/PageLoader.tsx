import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const PageLoader = ({ children }: { children: React.ReactNode }) => {
  // Decide synchronously so the splash never flashes on mobile (skipped < 768px)
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 768px)").matches;
  });

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-foreground whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Mashab Jadoon
              </motion.div>
              <motion.div className="mt-8 h-0.5 bg-secondary rounded-full overflow-hidden w-40">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageLoader;
