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
import GradientMesh from "@/components/GradientMesh";
import useLenis from "@/hooks/useLenis";

const Index = () => {
  useLenis();

  return (
    <PageLoader>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <GradientMesh />
        <ScrollProgress />
        <Navigation />
        <main>
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
