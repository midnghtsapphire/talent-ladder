import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;

  constructor(
    callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
  ) {
    this.callback = callback;
  }

  observe(target: Element) {
    const rect = target.getBoundingClientRect();
    const entry: IntersectionObserverEntry = {
      time: Date.now(),
      target,
      rootBounds: null,
      boundingClientRect: rect,
      intersectionRect: rect,
      isIntersecting: true,
      intersectionRatio: 1,
    };

    this.callback(
      [entry],
      this as unknown as IntersectionObserver
    );
  }
  unobserve(_target: Element): void {}
  disconnect(): void {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});
