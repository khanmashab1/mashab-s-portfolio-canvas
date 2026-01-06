import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PageLoader from "@/components/PageLoader";
import ScrollProgress from "@/components/ScrollProgress";
import useLenis from "@/hooks/useLenis";

const Index = () => {
  useLenis();

  return (
    <PageLoader>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <ScrollProgress />
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Services />
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
