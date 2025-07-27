import Lenis from "@studio-freight/lenis";

export class LenisScroll {
  lenis: Lenis;
  constructor() {
    const lenis = new Lenis({
      lerp: 0.1,
    });
    this.lenis = lenis;
    window.lenis = lenis;
  }
}

declare global {
  interface Window {
    lenis: Lenis;
  }
}
