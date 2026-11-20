import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import Hero from "@/components/sections/hero";
import RecruiterSummary from "@/components/sections/recruiter-summary";
import CaseStudy from "@/components/sections/case-study";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Process from "@/components/sections/process";
import Projects from "@/components/sections/projects";
import Education from "@/components/sections/education";
import Experience from "@/components/sections/experience";
import Achievements from "@/components/sections/achievements";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <RecruiterSummary />
        <About />
        <Skills />
        <Process />
        <Projects />
        <CaseStudy />
        <Education />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
