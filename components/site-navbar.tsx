"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { GitHubIcon, LinkedInIcon, ArrowUpRight } from "@/components/icons";

const navItems = [
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Highlights", link: "#highlights" },
  { name: "Experience", link: "#experience" },
  { name: "Contact Me", link: "#contact" },
];

const Brand = () => (
  <a href="#top" className="relative z-20 flex shrink-0 items-center gap-2.5 whitespace-nowrap">
    <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gradient-to-br from-[#2b6cff] to-[#1dbf73] font-mono text-[11px] font-bold">
      HZ
    </span>
    <span className="font-heading text-[15px] font-semibold">Huzhi (James) Zhao</span>
  </a>
);

const IconLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    aria-label={label}
    className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/[0.16] text-muted transition hover:border-white hover:text-white"
  >
    {children}
  </a>
);

export function SiteNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <Brand />
        <NavItems items={navItems} />
        <div className="relative z-20 flex items-center gap-2.5">
          <IconLink href="https://linkedin.com/in/huzhi" label="LinkedIn">
            <LinkedInIcon />
          </IconLink>
          <IconLink href="https://github.com/huzhi-zhao" label="GitHub">
            <GitHubIcon />
          </IconLink>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <Brand />
          <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isOpen}>
          {navItems.map((item) => (
            <a
              key={item.link}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="w-full border-b border-white/[0.08] py-3.5 text-[15px] text-muted transition hover:text-white"
            >
              {item.name}
            </a>
          ))}
          <span className="pb-1 pt-4 font-mono text-[11px] uppercase tracking-[1.5px] text-faint">
            More
          </span>
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener"
            onClick={() => setIsOpen(false)}
            className="group flex w-full items-center justify-between border-b border-white/[0.08] py-3.5 text-[15px] text-muted transition hover:text-white"
          >
            <span>Claude.ai</span>
            <ArrowUpRight className="text-faint transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          </a>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
