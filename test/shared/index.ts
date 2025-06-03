/** Test utility functions and classes */

/** Constants for common test delays */
// Re-export vi for convenience in test files that use shared utilities
import { defineComponent } from 'vue';
import { vi } from 'vitest';

export const TEST_DELAYS = {
  /** Short delay for image loading simulation */
  IMAGE_LOAD: 20,
  /** Very short delay for immediate async operations */
  IMMEDIATE: 10,
  /** Medium delay for complex operations */
  MEDIUM: 50,
  /** Longer delay for timeout testing */
  LONG: 100
} as const;

/**
 * Create a delay promise that resolves after the specified time
 *
 * @param ms - milliseconds to delay
 * @returns Promise that resolves after delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

/** Mock Image constructor for testing image loading functionality */
export class MockImage {
  src = '';
  referrerPolicy = '';
  crossOrigin: string | null = null;
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;

  constructor() {
    // Simulate async loading with a delay
    setTimeout(() => {
      if (this.src.includes('error')) {
        this.onerror?.();
      } else if (this.src) {
        this.onload?.();
      }
    }, TEST_DELAYS.IMMEDIATE);
  }
}

/** Mock ResizeObserver for testing element size functionality */
export class MockResizeObserver {
  private callback: ResizeObserverCallback;
  private elements: Set<Element> = new Set();

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(element: Element) {
    this.elements.add(element);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  // Helper method to trigger resize
  trigger(entries: ResizeObserverEntry[]) {
    this.callback(entries, this);
  }
}

/**
 * Setup mock Image for testing
 *
 * @returns cleanup function to restore original Image
 */
export function setupMockImage(): () => void {
  const originalImage = globalThis.Image;
  globalThis.Image = MockImage as any;

  return () => {
    globalThis.Image = originalImage;
  };
}

/**
 * Setup mock ResizeObserver for testing
 *
 * @returns object with cleanup function and mock instance
 */
export function setupMockResizeObserver() {
  let mockResizeObserver: MockResizeObserver;
  const originalResizeObserver = globalThis.ResizeObserver;

  const mockImplementation = (callback: ResizeObserverCallback) => {
    mockResizeObserver = new MockResizeObserver(callback);
    return mockResizeObserver;
  };

  globalThis.ResizeObserver = vi.fn().mockImplementation(mockImplementation);

  return {
    mockResizeObserver: () => mockResizeObserver,
    cleanup: () => {
      globalThis.ResizeObserver = originalResizeObserver;
    }
  };
}

/**
 * Generic mock setup function
 *
 * @param globalProperty - property name on globalThis to mock
 * @param mockImplementation - mock implementation
 * @returns cleanup function to restore original
 */
export function setupMock<T>(globalProperty: keyof typeof globalThis, mockImplementation: T): () => void {
  const original = globalThis[globalProperty];
  (globalThis as any)[globalProperty] = mockImplementation;

  return () => {
    (globalThis as any)[globalProperty] = original;
  };
}

/**
 * Create a simple timeout wrapper for testing async operations
 *
 * @param fn - function to execute after delay
 * @param ms - delay in milliseconds
 * @returns Promise that resolves after function execution
 */
export function delayedExecution<T>(fn: () => T, ms: number = TEST_DELAYS.IMMEDIATE): Promise<T> {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      const result = fn();
      resolve(result);
    }, ms);
  });
}

/**
 * Create a mock DOM element with specified properties
 *
 * @param tagName - HTML tag name
 * @param properties - properties to set on the element
 * @returns mock DOM element
 */
export function createMockElement(tagName: string = 'div', properties: Record<string, any> = {}): HTMLElement {
  const element = document.createElement(tagName);

  Object.entries(properties).forEach(([key, value]) => {
    if (key === 'getBoundingClientRect') {
      element.getBoundingClientRect = vi.fn().mockReturnValue(value);
    } else {
      Object.defineProperty(element, key, {
        value,
        configurable: true
      });
    }
  });

  return element;
}

/**
 * Create a mock ResizeObserver entry
 *
 * @param target - target element
 * @param dimensions - size dimensions
 * @returns mock ResizeObserver entry
 */
export function createMockResizeObserverEntry(
  target: Element,
  dimensions: { width: number; height: number }
): ResizeObserverEntry {
  const { width, height } = dimensions;

  return {
    target,
    contentRect: new DOMRectReadOnly(0, 0, width, height),
    borderBoxSize: [
      {
        inlineSize: width,
        blockSize: height
      }
    ] as any,
    contentBoxSize: [] as any,
    devicePixelContentBoxSize: [] as any
  };
}

/**
 * Create a simple test component for testing composables
 *
 * @param setupFn - setup function for the component
 * @param options - component options
 * @returns Vue component
 */
export function createTestComponent(
  setupFn: () => any,
  options: {
    template?: string;
    emits?: string[];
    props?: string[];
  } = {}
) {
  const { template = '<div>Test</div>', emits, props } = options;

  return defineComponent({
    ...(emits && { emits }),
    ...(props && { props }),
    setup: setupFn,
    template
  });
}

/**
 * Create a provider-consumer component pair for context testing
 *
 * @param useProvide - provider hook
 * @param useInject - inject hook
 * @param providerArgs - arguments for provider
 * @returns provider and consumer components
 */
export function createContextTestComponents<T>(
  useProvide: (...args: any[]) => T,
  useInject: () => T | null,
  providerArgs: any[] = []
) {
  const Provider = defineComponent({
    setup() {
      const context = useProvide(...providerArgs);
      return { context };
    },
    template: '<slot :context="context" />'
  });

  const Consumer = defineComponent({
    setup() {
      const context = useInject();
      return { context };
    },
    template: '<div>{{ context?.value ?? "null" }}</div>'
  });

  const App = defineComponent({
    components: { Provider, Consumer },
    template: '<Provider><Consumer /></Provider>'
  });

  return { Provider, Consumer, App };
}

// Re-export for convenience
export { vi, defineComponent };
