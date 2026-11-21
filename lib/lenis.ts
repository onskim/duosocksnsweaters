import type Lenis from "lenis";

/** Shared Lenis instance so modals can pause smooth scrolling. */
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;
