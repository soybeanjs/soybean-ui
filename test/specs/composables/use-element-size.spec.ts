import { nextTick, ref } from 'vue';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { useElementSize } from '@headless/composables/use-element-size';
import { createMockElement, createMockResizeObserverEntry, setupMockResizeObserver } from '../../shared';

describe('useElementSize', () => {
  let mockResizeObserver: () => any;
  let cleanup: () => void;

  beforeEach(() => {
    const setup = setupMockResizeObserver();
    mockResizeObserver = setup.mockResizeObserver;
    cleanup = setup.cleanup;
  });

  afterEach(() => {
    cleanup();
  });

  it('should return initial size of 0x0', () => {
    const element = ref<HTMLElement | null>(null);
    const { width, height } = useElementSize(element);

    expect(width.value).toBe(0);
    expect(height.value).toBe(0);
  });

  it('should observe element when element is set', async () => {
    const element = ref<HTMLElement | null>(null);
    const { width, height } = useElementSize(element);

    const div = createMockElement();
    element.value = div;

    await nextTick();

    expect(globalThis.ResizeObserver).toHaveBeenCalled();
    expect(width.value).toBe(0);
    expect(height.value).toBe(0);
  });

  it('should update size when ResizeObserver triggers', async () => {
    const element = ref<HTMLElement | null>(null);
    const { width, height } = useElementSize(element);

    const div = createMockElement('div', {
      offsetWidth: 100,
      offsetHeight: 200
    });

    element.value = div;
    await nextTick();

    const mockEntry = createMockResizeObserverEntry(div, { width: 100, height: 200 });
    mockResizeObserver().trigger([mockEntry]);

    expect(width.value).toBe(100);
    expect(height.value).toBe(200);
  });

  it('should handle SVG elements', async () => {
    const element = ref<HTMLElement | null>(null);
    const { width, height } = useElementSize(element);

    const svg = createMockElement('svg', {
      getBoundingClientRect: {
        width: 150,
        height: 100,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 150,
        bottom: 100
      }
    });

    // Set namespace for SVG
    Object.defineProperty(svg, 'namespaceURI', {
      value: 'http://www.w3.org/2000/svg',
      configurable: true
    });

    element.value = svg as any;
    await nextTick();

    const mockEntry = createMockResizeObserverEntry(svg, { width: 150, height: 100 });
    mockResizeObserver().trigger([mockEntry]);

    expect(width.value).toBe(150);
    expect(height.value).toBe(100);
  });

  it('should handle array borderBoxSize', async () => {
    const element = ref<HTMLElement | null>(null);
    const { width, height } = useElementSize(element);

    const div = createMockElement();
    element.value = div;
    await nextTick();

    const mockEntry = createMockResizeObserverEntry(div, { width: 120, height: 80 });
    mockResizeObserver().trigger([mockEntry]);

    expect(width.value).toBe(120);
    expect(height.value).toBe(80);
  });

  it('should fallback to offsetWidth/Height when borderBoxSize is not available', async () => {
    const element = ref<HTMLElement | null>(null);
    const { width, height } = useElementSize(element);

    const div = createMockElement('div', {
      offsetWidth: 300,
      offsetHeight: 250
    });

    element.value = div;
    await nextTick();

    // Create entry with no borderBoxSize
    const mockEntry: ResizeObserverEntry = {
      target: div,
      contentRect: new DOMRectReadOnly(0, 0, 300, 250),
      borderBoxSize: [
        {
          inlineSize: 0,
          blockSize: 0
        }
      ] as any,
      contentBoxSize: [] as any,
      devicePixelContentBoxSize: [] as any
    };

    mockResizeObserver().trigger([mockEntry]);

    expect(width.value).toBe(300);
    expect(height.value).toBe(250);
  });

  it('should not observe when element is null', async () => {
    const element = ref<HTMLElement | null>(null);
    useElementSize(element);

    await nextTick();

    expect(globalThis.ResizeObserver).not.toHaveBeenCalled();
  });
});
