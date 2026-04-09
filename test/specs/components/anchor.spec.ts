import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import SAnchor from '../../../src/components/anchor/anchor.vue';
import { getA11yViolations } from '../../shared/a11y';

function createSection(id: string, top: number) {
  const element = document.createElement('section');
  let currentTop = top;

  element.id = id;
  element.getClientRects = () => [{ height: 120, width: 120 }] as any;
  element.getBoundingClientRect = () =>
    ({
      bottom: currentTop + 120,
      height: 120,
      left: 0,
      right: 120,
      top: currentTop,
      width: 120,
      x: 0,
      y: currentTop
    }) as DOMRect;

  document.body.appendChild(element);

  return {
    element,
    setTop(topValue: number) {
      currentTop = topValue;
    }
  };
}

function createContainer() {
  const element = document.createElement('div');
  let scrollTop = 0;

  Object.defineProperty(element, 'scrollTop', {
    get: () => scrollTop,
    set: value => {
      scrollTop = value;
    }
  });

  element.scrollTo = vi.fn(((options?: ScrollToOptions | number) => {
    if (typeof options === 'number') {
      return;
    }

    scrollTop = options?.top ?? scrollTop;
  }) as any) as any;
  element.getBoundingClientRect = () =>
    ({
      bottom: 400,
      height: 400,
      left: 0,
      right: 300,
      top: 0,
      width: 300,
      x: 0,
      y: 0
    }) as DOMRect;

  document.body.appendChild(element);

  return element;
}

const items = [
  {
    href: '#overview',
    title: 'Overview'
  },
  {
    href: '#usage',
    title: 'Usage',
    children: [
      {
        href: '#api',
        title: 'API'
      }
    ]
  }
];

describe('SAnchor', () => {
  describe('rendering', () => {
    it('renders nested items and custom class', () => {
      const wrapper = mount(SAnchor, {
        props: {
          class: 'custom-anchor',
          items,
          sticky: false
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Overview');
      expect(wrapper.text()).toContain('API');
      expect(wrapper.html()).toContain('custom-anchor');

      wrapper.unmount();
    });
  });

  describe('active state', () => {
    it('scrolls to the target and emits selection events on click', async () => {
      const container = createContainer();
      const overview = createSection('overview', 80);
      const usage = createSection('usage', 280);
      const api = createSection('api', 520);
      const pushState = vi.spyOn(window.history, 'pushState');

      const wrapper = mount(SAnchor, {
        props: {
          getContainer: () => container,
          items,
          sticky: false
        },
        attachTo: document.body
      });

      await wrapper.find('a[href="#api"]').trigger('click');

      expect(container.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth', top: 520 }));
      expect(pushState).toHaveBeenCalledWith(null, '', '#api');
      expect(wrapper.find('a[href="#api"]').attributes('aria-current')).toBe('location');
      expect(wrapper.emitted('activeChange')).toEqual([['#api']]);
      expect(wrapper.emitted('itemSelect')).toHaveLength(1);
      expect(wrapper.emitted('update:modelValue')).toEqual([['#api']]);

      wrapper.unmount();
      overview.element.remove();
      usage.element.remove();
      api.element.remove();
      container.remove();
      pushState.mockRestore();
    });

    it('updates the active anchor when the container scrolls', async () => {
      const container = createContainer();
      const overview = createSection('overview', -40);
      const usage = createSection('usage', 120);
      const api = createSection('api', 360);

      const wrapper = mount(SAnchor, {
        props: {
          bounds: 10,
          getContainer: () => container,
          items,
          sticky: false
        },
        attachTo: document.body
      });

      container.dispatchEvent(new Event('scroll'));
      await wrapper.vm.$nextTick();

      expect(wrapper.find('a[href="#overview"]').attributes('aria-current')).toBe('location');

      overview.setTop(-260);
      usage.setTop(-20);
      api.setTop(40);

      container.dispatchEvent(new Event('scroll'));
      await wrapper.vm.$nextTick();

      expect(wrapper.find('a[href="#usage"]').attributes('aria-current')).toBe('location');

      wrapper.unmount();
      overview.element.remove();
      usage.element.remove();
      api.element.remove();
      container.remove();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SAnchor, {
        props: {
          items,
          sticky: false
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
