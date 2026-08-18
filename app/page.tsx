import { SiteNavbar } from "@/components/site-navbar";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Highlights } from "@/components/highlights";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Highlights />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
