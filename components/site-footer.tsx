import { MailIcon, LinkedInOutlineIcon } from "@/components/icons";

const LINKS = [
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.08] pt-16">
      <div className="container-x flex flex-wrap items-start justify-between gap-10 pb-12">
        <div className="max-w-[360px]">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gradient-to-br from-[#2b6cff] to-[#1dbf73] font-mono text-[11px] font-bold">
              HZ
            </span>
            <span className="font-heading text-[15px] font-semibold">Huzhi (James) Zhao</span>
          </a>
          <p className="my-[18px] text-[14.5px] text-muted">
            Backend &amp; data engineer building reliable, scalable systems.
          </p>
          <div className="flex gap-2.5">
            <a
              href="mailto:James.Huzhi.Zhao@gmail.com"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.16] text-muted transition hover:border-white hover:text-white"
            >
              <MailIcon />
            </a>
            <a
              href="https://linkedin.com/in/huzhi"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.16] bg-[rgb(45,101,188)] text-white transition hover:border-white"
            >
              <LinkedInOutlineIcon />
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-3 sm:items-end">
          {LINKS.map((l) => (
            <a key={l.link} href={l.link} className="text-sm text-muted transition hover:text-white">
              {l.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="container-x border-t border-white/[0.08] py-6 text-center">
        <p className="text-[13.5px] text-faint">
          © {new Date().getFullYear()} Huzhi (James) Zhao. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
