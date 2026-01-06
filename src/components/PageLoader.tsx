import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const PageLoader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial opacity-50"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Logo/Name reveal */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                className="overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-bold glow-text whitespace-nowrap"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Mashab Jadoon
                </motion.h1>
              </motion.div>

              {/* Loading bar */}
              <motion.div
                className="mt-8 h-1 bg-secondary rounded-full overflow-hidden w-48"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.3, delay: 0.5, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Dots animation */}
              <div className="flex gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Curtain panels */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full bg-secondary origin-left"
              initial={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
            />
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full bg-secondary origin-right"
              initial={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageLoader;
