import React from "react";

type P = React.SVGProps<SVGSVGElement>;

export const LinkedInIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452z" />
  </svg>
);

export const GitHubIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2z" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
    <path
      d="M3 11L11 3M11 3H5M11 3V9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M3 5H21V19H3V5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 6L12 13L21 6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const LinkedInOutlineIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 11V16M8 8V8.5M12 16V11M16 16V13C16 11.8954 15.1046 11 14 11C12.8954 11 12 11.8954 12 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path
      d="M12 21C12 21 19 15.5 19 10.5C19 6.35786 15.6421 3 12 3C8.35786 3 5 6.35786 5 10.5C5 15.5 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="10.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ChevronDown = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

