import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/lib/content/projects";

export function Projects() {
  return (
    <section id="projects" className="border-t border-white/[0.08] py-24">
      <SectionHeading
        eyebrow="PROJECTS"
        title="Projects I've Shipped."
        subtitle="A couple of projects showing how I take systems from raw data to production."
      />
      <div className="container-x grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
