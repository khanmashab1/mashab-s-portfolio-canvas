import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-7xl md:text-8xl font-semibold text-primary mb-4">404</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Page not found
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            That page doesn't exist or has moved. Let's get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button asChild size="lg" className="gap-2">
            <a href="/">
              <Home size={18} />
              Back to Home
            </a>
          </Button>
          <Button variant="outline" size="lg" className="gap-2" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Go Back
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
