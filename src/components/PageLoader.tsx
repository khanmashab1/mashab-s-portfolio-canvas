import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const PageLoader = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  // Skip loader entirely on mobile for fast FCP
  const [isLoading, setIsLoading] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [isMobile]);

  if (isMobile) {
    return <>{children}</>;
  }

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
              <motion.h1
                className="text-4xl md:text-6xl font-bold glow-text whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Mashab Jadoon
              </motion.h1>
              <motion.div className="mt-8 h-1 bg-secondary rounded-full overflow-hidden w-48">
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
