import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const ArrowRight = (p: P) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const ArrowLeft = (p: P) => (<svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>);
export const Check = (p: P) => (<svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const Close = (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const Menu = (p: P) => (<svg {...base} {...p}><path d="M4 8h16M4 16h16" /></svg>);
export const ChevronDown = (p: P) => (<svg {...base} {...p}><path d="M6 9l6 6 6-6" /></svg>);
export const Mail = (p: P) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5l8.5 6 8.5-6" /></svg>);
export const Pin = (p: P) => (<svg {...base} {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const Upload = (p: P) => (<svg {...base} {...p}><path d="M12 16V4M7 9l5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></svg>);

export const WhatsApp = (p: P) => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.48.7.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.4h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.36 9.36 0 0 1-1.44-5c0-5.18 4.22-9.4 9.42-9.4 2.52 0 4.88.98 6.66 2.76a9.34 9.34 0 0 1 2.75 6.65c0 5.19-4.22 9.41-9.4 9.41m8-17.42A11.24 11.24 0 0 0 12.05.67C5.82.67.74 5.74.74 11.97c0 1.99.52 3.94 1.51 5.65L.65 23.33l5.85-1.53a11.3 11.3 0 0 0 5.54 1.41h.01c6.23 0 11.3-5.07 11.31-11.3 0-3.02-1.18-5.86-3.31-8z" />
  </svg>
);
