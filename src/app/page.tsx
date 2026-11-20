import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import Studio from "@/components/studio/studio";
import Hero from "@/components/sections/hero";
import RecruiterSummary from "@/components/sections/recruiter-summary";
import Projects from "@/components/sections/projects";
import CaseStudy from "@/components/sections/case-study";
import Experience from "@/components/sections/experience";
import Skills from "@/components/sections/skills";
import Education from "@/components/sections/education";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <RecruiterSummary />
        <Projects />
        <CaseStudy />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Studio />
    </>
  );
}
