import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PageLoader from "@/components/PageLoader";
import ScrollProgress from "@/components/ScrollProgress";
import PaperBackground from "@/components/PaperBackground";
import useLenis from "@/hooks/useLenis";

const Index = () => {
  useLenis();

  return (
    <PageLoader>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <PaperBackground />
        <ScrollProgress />
        <Navigation />
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </PageLoader>
  );
};

export default Index;
