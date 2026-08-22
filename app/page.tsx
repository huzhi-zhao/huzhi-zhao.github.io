import { SiteNavbar } from "@/components/site-navbar";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main>
        {/* 顺序即叙事：问题 → 凭据 → 思考（ADR-0002）。Writing 待首篇 paper 就绪后插在 Experience 之后。 */}
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
