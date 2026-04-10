import { nextTick, toValue } from 'vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getA11yViolations } from '../../shared/a11y';
import {
  SCarousel,
  SCarouselContent,
  SCarouselItem,
  SCarouselNext,
  SCarouselPrevious
} from '../../../src/components/carousel';

const emblaMock = vi.hoisted(() => {
  const listeners = new Map<string, Set<(api: any) => void>>();
  const state = {
    canScrollNext: true,
    canScrollPrev: false,
    scrollSnaps: [0, 1, 2],
    selectedIndex: 0
  };

  const api = {
    canScrollNext: vi.fn(() => state.canScrollNext),
    canScrollPrev: vi.fn(() => state.canScrollPrev),
    containerNode: vi.fn(() => document.createElement('div')),
    destroy: vi.fn(),
    emit: vi.fn(),
    internalEngine: vi.fn(),
    off: vi.fn((event: string, callback: (api: any) => void) => {
      listeners.get(event)?.delete(callback);
    }),
    on: vi.fn((event: string, callback: (api: any) => void) => {
      let eventListeners = listeners.get(event);

      if (!eventListeners) {
        eventListeners = new Set();
        listeners.set(event, eventListeners);
      }

      eventListeners.add(callback);
    }),
    plugins: vi.fn(() => ({})),
    previousScrollSnap: vi.fn(() => Math.max(state.selectedIndex - 1, 0)),
    reInit: vi.fn(),
    rootNode: vi.fn(() => document.createElement('div')),
    scrollNext: vi.fn(),
    scrollPrev: vi.fn(),
    scrollProgress: vi.fn(() => 0),
    scrollSnapList: vi.fn(() => state.scrollSnaps),
    scrollTo: vi.fn(),
    selectedScrollSnap: vi.fn(() => state.selectedIndex),
    slideNodes: vi.fn(() => []),
    slidesInView: vi.fn(() => [state.selectedIndex]),
    slidesNotInView: vi.fn(() => [])
  };

  return {
    api,
    listeners,
    options: { current: undefined as unknown },
    plugins: { current: undefined as unknown },
    reset() {
      listeners.clear();
      state.canScrollNext = true;
      state.canScrollPrev = false;
      state.scrollSnaps = [0, 1, 2];
      state.selectedIndex = 0;
      this.options.current = undefined;
      this.plugins.current = undefined;
      vi.clearAllMocks();
    },
    state,
    trigger(event: string) {
      listeners.get(event)?.forEach(callback => callback(api));
    }
  };
});

vi.mock('embla-carousel-vue', async () => {
  const { ref } = await import('vue');

  return {
    default: (options: unknown, plugins: unknown) => {
      emblaMock.options.current = options;
      emblaMock.plugins.current = plugins;

      return [ref<HTMLElement>(), ref(emblaMock.api)];
    }
  };
});

function mountCarousel(props: Record<string, unknown> = {}) {
  return mount(SCarousel, {
    props: {
      'aria-label': 'Demo carousel',
      ...props
    },
    slots: {
      default: `
        <SCarouselContent>
          <SCarouselItem>Slide 1</SCarouselItem>
          <SCarouselItem>Slide 2</SCarouselItem>
          <SCarouselItem>Slide 3</SCarouselItem>
        </SCarouselContent>
        <SCarouselPrevious />
        <SCarouselNext />
      `
    },
    attachTo: document.body,
    global: {
      components: {
        SCarouselContent,
        SCarouselItem,
        SCarouselNext,
        SCarouselPrevious
      }
    }
  });
}

describe('SCarousel', () => {
  beforeEach(() => {
    emblaMock.reset();
  });

  describe('rendering', () => {
    it('renders slides and initializes the embla api', async () => {
      const wrapper = mountCarousel();
      await nextTick();

      expect(wrapper.text()).toContain('Slide 1');
      expect(wrapper.findAll('[data-soybean-carousel-item]')).toHaveLength(3);
      expect(wrapper.find('[data-soybean-carousel-root]').attributes('role')).toBe('region');
      expect(wrapper.emitted('initApi')?.[0]?.[0]).toStrictEqual(emblaMock.api);
      wrapper.unmount();
    });

    it('passes orientation and direction to embla options', async () => {
      const wrapper = mountCarousel({ dir: 'rtl', orientation: 'vertical' });
      await nextTick();

      const options = toValue(emblaMock.options.current) as Record<string, unknown>;
      const container = wrapper.find('[data-soybean-carousel-container]');
      const previousButton = wrapper.find('[data-soybean-carousel-previous]');
      const nextButton = wrapper.find('[data-soybean-carousel-next]');

      expect(options.axis).toBe('y');
      expect(options.direction).toBe('rtl');
      expect(wrapper.find('[data-soybean-carousel-content]').attributes('data-orientation')).toBe('vertical');
      expect(container.classes()).toContain('h-full');
      expect(previousButton.classes()).not.toContain('rotate-90');
      expect(previousButton.classes()).toContain('right-auto');
      expect(nextButton.classes()).not.toContain('rotate-90');
      expect(nextButton.classes()).toContain('top-auto');
      expect(nextButton.classes()).toContain('right-auto');
      wrapper.unmount();
    });
  });

  describe('interaction state', () => {
    it('updates controls and handles keyboard navigation', async () => {
      const wrapper = mountCarousel();
      await nextTick();

      const previousButton = wrapper.find('[data-soybean-carousel-previous]');
      const nextButton = wrapper.find('[data-soybean-carousel-next]');

      expect(previousButton.attributes('aria-disabled')).toBe('true');
      expect(nextButton.attributes('aria-disabled')).toBeUndefined();

      emblaMock.state.canScrollPrev = true;
      emblaMock.trigger('select');
      await nextTick();

      expect(previousButton.attributes('aria-disabled')).toBeUndefined();

      await previousButton.trigger('click');
      await nextButton.trigger('click');
      await wrapper.find('[data-soybean-carousel-root]').trigger('keydown', { key: 'ArrowLeft' });
      await wrapper.find('[data-soybean-carousel-root]').trigger('keydown', { key: 'ArrowRight' });

      expect(emblaMock.api.scrollPrev).toHaveBeenCalledTimes(2);
      expect(emblaMock.api.scrollNext).toHaveBeenCalledTimes(2);
      wrapper.unmount();
    });

    it('swaps horizontal arrow key behavior in rtl mode', async () => {
      emblaMock.state.canScrollPrev = true;

      const wrapper = mountCarousel({ dir: 'rtl' });
      await nextTick();

      await wrapper.find('[data-soybean-carousel-root]').trigger('keydown', { key: 'ArrowLeft' });
      await wrapper.find('[data-soybean-carousel-root]').trigger('keydown', { key: 'ArrowRight' });

      expect(emblaMock.api.scrollNext).toHaveBeenCalledTimes(1);
      expect(emblaMock.api.scrollPrev).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it('does not intercept arrow keys from descendant inputs', async () => {
      const wrapper = mount(SCarousel, {
        props: {
          'aria-label': 'Interactive carousel'
        },
        slots: {
          default: `
            <SCarouselContent>
              <SCarouselItem>
                <input data-test-input />
              </SCarouselItem>
            </SCarouselContent>
            <SCarouselPrevious />
            <SCarouselNext />
          `
        },
        attachTo: document.body,
        global: {
          components: {
            SCarouselContent,
            SCarouselItem,
            SCarouselNext,
            SCarouselPrevious
          }
        }
      });
      await nextTick();

      const input = wrapper.find('[data-test-input]');
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });

      input.element.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(false);
      expect(emblaMock.api.scrollPrev).not.toHaveBeenCalled();
      expect(emblaMock.api.scrollNext).not.toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mountCarousel();
      await nextTick();

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
