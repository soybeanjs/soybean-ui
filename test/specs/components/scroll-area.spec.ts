import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@soybeanjs/headless/scroll-area';
import { getScrollPosition, setViewportScroll } from '../../../headless/src/components/scroll-area/shared';
import SScrollArea from '../../../src/components/scroll-area/scroll-area.vue';
import { getA11yViolations } from '../../shared/a11y';

function mockOverflowMetrics(wrapper: VueWrapper) {
  const viewport = wrapper.find('[data-soybean-scroll-area-viewport]').element as HTMLElement;
  const content = viewport.firstElementChild;
  const scrollbars = wrapper.findAll('[data-soybean-scroll-area-scrollbar]');
  const thumbs = wrapper.findAll('[data-soybean-scroll-area-thumb]');

  if (!(content instanceof HTMLElement) || scrollbars.length < 2 || thumbs.length < 2) {
    throw new Error('ScrollArea test elements are missing.');
  }

  const verticalScrollbar = scrollbars[0].element as HTMLElement;
  const horizontalScrollbar = scrollbars[1].element as HTMLElement;
  const verticalThumb = thumbs[0].element as HTMLElement;
  const horizontalThumb = thumbs[1].element as HTMLElement;

  Object.defineProperties(viewport, {
    clientHeight: { configurable: true, value: 120 },
    clientWidth: { configurable: true, value: 180 },
    scrollHeight: { configurable: true, value: 360 },
    scrollWidth: { configurable: true, value: 420 },
    scrollTop: { configurable: true, writable: true, value: 24 },
    scrollLeft: { configurable: true, writable: true, value: 36 }
  });

  Object.defineProperties(content, {
    offsetHeight: { configurable: true, value: 360 },
    offsetWidth: { configurable: true, value: 420 },
    scrollHeight: { configurable: true, value: 360 },
    scrollWidth: { configurable: true, value: 420 }
  });

  Object.defineProperties(verticalScrollbar, {
    clientHeight: { configurable: true, value: 120 },
    getBoundingClientRect: {
      configurable: true,
      value: () => ({ top: 0, left: 0, width: 10, height: 120, right: 10, bottom: 120 })
    }
  });

  Object.defineProperties(horizontalScrollbar, {
    clientWidth: { configurable: true, value: 180 },
    getBoundingClientRect: {
      configurable: true,
      value: () => ({ top: 0, left: 0, width: 180, height: 10, right: 180, bottom: 10 })
    }
  });

  Object.defineProperties(verticalThumb, {
    getBoundingClientRect: {
      configurable: true,
      value: () => ({ top: 24, left: 0, width: 10, height: 40, right: 10, bottom: 64 })
    }
  });

  Object.defineProperties(horizontalThumb, {
    getBoundingClientRect: {
      configurable: true,
      value: () => ({ top: 0, left: 36, width: 60, height: 10, right: 96, bottom: 10 })
    }
  });

  viewport.dispatchEvent(new Event('scroll'));
}

function createFakeDocument(mode: 'default' | 'negative' | 'reverse') {
  let createCount = 0;

  return {
    body: {
      appendChild() {},
      removeChild() {}
    },
    createElement() {
      if (createCount === 0) {
        createCount += 1;

        let scrollLeft = mode === 'default' ? 1 : 0;

        return Object.defineProperty(
          {
            dir: '',
            style: {} as Record<string, string>,
            appendChild() {}
          },
          'scrollLeft',
          {
            configurable: true,
            get: () => scrollLeft,
            set: value => {
              if (mode === 'negative') {
                scrollLeft = value > 0 ? 0 : value;
                return;
              }

              scrollLeft = value;
            }
          }
        );
      }

      return {
        style: {} as Record<string, string>
      };
    }
  } as unknown as Document;
}

function createViewport(doc: Document, scrollLeft: number) {
  return {
    ownerDocument: doc,
    scrollLeft,
    scrollTop: 0,
    scrollWidth: 500,
    clientWidth: 200
  } as HTMLElement;
}

describe('SScrollArea', () => {
  describe('rendering', () => {
    it('renders default slot content', () => {
      const wrapper = mount(SScrollArea, {
        props: { class: 'h-40 w-40' },
        slots: { default: '<div>Scrollable Content</div>' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Scrollable Content');
      expect(wrapper.classes()).toContain('h-40');
      wrapper.unmount();
    });

    it('renders viewport and both scrollbars', () => {
      const wrapper = mount(SScrollArea, {
        props: { class: 'h-40 w-40' },
        slots: { default: '<div>Scrollable Content</div>' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-scroll-area-viewport]').exists()).toBe(true);
      expect(wrapper.findAll('[data-soybean-scroll-area-scrollbar]')).toHaveLength(2);
      wrapper.unmount();
    });

    it('does not leak viewport as props onto the outer viewport element', () => {
      const wrapper = mount(SScrollArea, {
        props: {
          class: 'h-40 w-40',
          viewportProps: {
            as: 'section',
            asChild: true,
            id: 'viewport-id'
          }
        },
        slots: { default: '<div data-content>Scrollable Content</div>' },
        attachTo: document.body
      });

      const viewport = wrapper.find('[data-soybean-scroll-area-viewport]');
      expect(viewport.attributes('id')).toBe('viewport-id');
      expect(viewport.attributes('as')).toBeUndefined();
      expect(viewport.attributes('as-child')).toBeUndefined();
      wrapper.unmount();
    });
  });

  describe('visibility state', () => {
    it('shows scrollbars when type is always and content overflows', async () => {
      const wrapper = mount(SScrollArea, {
        props: { type: 'always', class: 'h-40 w-40' },
        slots: { default: '<div>Scrollable Content</div>' },
        attachTo: document.body
      });

      mockOverflowMetrics(wrapper);
      await nextTick();

      const [verticalScrollbar, horizontalScrollbar] = wrapper.findAll('[data-soybean-scroll-area-scrollbar]');
      expect(verticalScrollbar.attributes('data-state')).toBe('visible');
      expect(horizontalScrollbar.attributes('data-state')).toBe('visible');
      wrapper.unmount();
    });

    it('keeps hover scrollbars hidden before interaction', async () => {
      const wrapper = mount(SScrollArea, {
        props: { type: 'hover', class: 'h-40 w-40' },
        slots: { default: '<div>Scrollable Content</div>' },
        attachTo: document.body
      });

      mockOverflowMetrics(wrapper);
      await nextTick();

      const [verticalScrollbar] = wrapper.findAll('[data-soybean-scroll-area-scrollbar]');
      expect(verticalScrollbar.attributes('data-state')).toBe('hidden');
      wrapper.unmount();
    });

    it('cleans drag state when pointercancel fires', async () => {
      const wrapper = mount(SScrollArea, {
        props: { type: 'hover', class: 'h-40 w-40' },
        slots: { default: '<div>Scrollable Content</div>' },
        attachTo: document.body
      });

      mockOverflowMetrics(wrapper);
      await nextTick();

      const verticalScrollbar = wrapper.findAll('[data-soybean-scroll-area-scrollbar]')[0];
      const verticalThumb = wrapper.findAll('[data-soybean-scroll-area-thumb]')[0];

      await verticalThumb.trigger('pointerdown', { button: 0, clientY: 30 });
      expect(verticalScrollbar.attributes('data-state')).toBe('visible');

      window.dispatchEvent(new PointerEvent('pointercancel'));
      await nextTick();

      expect(verticalScrollbar.attributes('data-state')).toBe('hidden');
      wrapper.unmount();
    });

    it('disables the previous scrollbar orientation when orientation changes', async () => {
      const orientation = ref<'vertical' | 'horizontal'>('vertical');
      const wrapper = mount(
        {
          components: {
            ScrollAreaRoot,
            ScrollAreaViewport,
            ScrollAreaScrollbar,
            ScrollAreaThumb
          },
          setup() {
            return { orientation };
          },
          template: `
            <ScrollAreaRoot>
              <ScrollAreaViewport data-testid="viewport">
                <div>Scrollable Content</div>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar :orientation="orientation">
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
            </ScrollAreaRoot>
          `
        },
        {
          attachTo: document.body
        }
      );

      const viewport = wrapper.find('[data-testid="viewport"]').element as HTMLElement;
      await nextTick();
      expect(viewport.style.overflowY).toBe('scroll');
      expect(viewport.style.overflowX).toBe('hidden');

      orientation.value = 'horizontal';
      await nextTick();

      expect(viewport.style.overflowY).toBe('hidden');
      expect(viewport.style.overflowX).toBe('scroll');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SScrollArea, {
        props: { type: 'always', class: 'h-40 w-40' },
        slots: { default: '<div class="h-80 w-80">Scrollable Content</div>' },
        attachTo: document.body
      });

      mockOverflowMetrics(wrapper);
      await nextTick();

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });

  describe('rtl scrolling', () => {
    it.each([
      ['default', 40, 40],
      ['negative', -40, -40],
      ['reverse', 260, 260]
    ] as const)('normalizes %s rtl scrollLeft values', (mode, normalizedScrollLeft, expectedRawScrollLeft) => {
      const doc = createFakeDocument(mode);
      const viewport = createViewport(doc, normalizedScrollLeft);

      expect(getScrollPosition(viewport, 'horizontal', 'rtl')).toBe(40);

      setViewportScroll(viewport, 'horizontal', 40, 'rtl');
      expect(viewport.scrollLeft).toBe(expectedRawScrollLeft);
    });
  });
});
