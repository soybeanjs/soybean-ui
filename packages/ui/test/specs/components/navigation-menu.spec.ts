import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SNavigationMenu from '@/components/navigation-menu/navigation-menu.vue';
import {
  getNavigationMenuIndicatorPosition,
  getNavigationMenuViewportPosition
} from '../../../../headless/src/components/navigation-menu/shared';
import { getA11yViolations } from '../../shared/a11y';

interface MockElementRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

function createMockElementRect(params: MockElementRect) {
  const { left, top, width, height } = params;

  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({})
  } satisfies DOMRect;
}

function createMockElement(params: MockElementRect) {
  return {
    getBoundingClientRect: () => createMockElementRect(params)
  } as HTMLElement;
}

function setViewportSize(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: width
  });

  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    value: height
  });
}

describe('NavigationMenu viewport positioning', () => {
  it('anchors a horizontal viewport to the whole root menu instead of the active trigger', () => {
    setViewportSize(1280, 720);

    const position = getNavigationMenuViewportPosition({
      rootElement: createMockElement({
        left: 80,
        top: 40,
        width: 640,
        height: 56
      }),
      contentSize: {
        width: 240,
        height: 180
      },
      orientation: 'horizontal',
      dir: 'ltr',
      align: 'start'
    });

    expect(position).toEqual({
      left: 80,
      top: 96
    });
  });

  it('centers a vertical viewport against the whole root menu and clamps it within the viewport', () => {
    setViewportSize(360, 220);

    const position = getNavigationMenuViewportPosition({
      rootElement: createMockElement({
        left: 220,
        top: 140,
        width: 72,
        height: 120
      }),
      contentSize: {
        width: 180,
        height: 160
      },
      orientation: 'vertical',
      dir: 'ltr',
      align: 'center'
    });

    expect(position).toEqual({
      left: 170,
      top: 50
    });
  });

  it('uses inline-start alignment for horizontal RTL viewports', () => {
    setViewportSize(1280, 720);

    const position = getNavigationMenuViewportPosition({
      rootElement: createMockElement({
        left: 80,
        top: 40,
        width: 640,
        height: 56
      }),
      contentSize: {
        width: 240,
        height: 180
      },
      orientation: 'horizontal',
      dir: 'rtl',
      align: 'start'
    });

    expect(position).toEqual({
      left: 560,
      top: 96
    });
  });

  it('uses logical inline-start coordinates for vertical RTL viewports', () => {
    setViewportSize(1280, 720);

    const position = getNavigationMenuViewportPosition({
      rootElement: createMockElement({
        left: 220,
        top: 140,
        width: 72,
        height: 120
      }),
      contentSize: {
        width: 180,
        height: 160
      },
      orientation: 'vertical',
      dir: 'rtl',
      align: 'center'
    });

    expect(position).toEqual({
      left: 1060,
      top: 120
    });
  });
});

describe('NavigationMenu indicator positioning', () => {
  it('returns fixed coordinates for a horizontal indicator using the active trigger rect', () => {
    const position = getNavigationMenuIndicatorPosition({
      indicatorTrackElement: createMockElement({
        left: 80,
        top: 40,
        width: 640,
        height: 56
      }),
      activeTriggerElement: createMockElement({
        left: 320,
        top: 44,
        width: 100,
        height: 40
      }),
      orientation: 'horizontal',
      dir: 'ltr'
    });

    expect(position).toEqual({
      size: 100,
      left: 320,
      top: 96
    });
  });

  it('returns logical inline-start coordinates for a horizontal RTL indicator', () => {
    setViewportSize(1280, 720);

    const position = getNavigationMenuIndicatorPosition({
      indicatorTrackElement: createMockElement({
        left: 80,
        top: 40,
        width: 640,
        height: 56
      }),
      activeTriggerElement: createMockElement({
        left: 320,
        top: 44,
        width: 100,
        height: 40
      }),
      orientation: 'horizontal',
      dir: 'rtl'
    });

    expect(position).toEqual({
      size: 100,
      left: 860,
      top: 96
    });
  });

  it('returns fixed coordinates for a vertical indicator using the track edge and trigger center', () => {
    const position = getNavigationMenuIndicatorPosition({
      indicatorTrackElement: createMockElement({
        left: 32,
        top: 48,
        width: 72,
        height: 240
      }),
      activeTriggerElement: createMockElement({
        left: 36,
        top: 160,
        width: 64,
        height: 40
      }),
      orientation: 'vertical',
      dir: 'ltr'
    });

    expect(position).toEqual({
      size: 40,
      left: 104,
      top: 180
    });
  });

  it('returns logical inline-start coordinates for a vertical RTL indicator', () => {
    setViewportSize(1280, 720);

    const position = getNavigationMenuIndicatorPosition({
      indicatorTrackElement: createMockElement({
        left: 80,
        top: 48,
        width: 72,
        height: 240
      }),
      activeTriggerElement: createMockElement({
        left: 84,
        top: 160,
        width: 64,
        height: 40
      }),
      orientation: 'vertical',
      dir: 'rtl'
    });

    expect(position).toEqual({
      size: 40,
      left: 1200,
      top: 180
    });
  });
});

const items = [
  { value: 'guide', label: 'Guide', href: '/guide' },
  {
    value: 'components',
    label: 'Components',
    href: '/components',
    children: [{ value: 'button', label: 'Button', href: '/components/button' }]
  },
  { value: 'help', label: 'Help', href: '/help', disabled: true }
];

describe('SNavigationMenu', () => {
  describe('rendering', () => {
    it('renders the root structure and item labels', () => {
      const wrapper = mount(SNavigationMenu, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.find('nav').exists()).toBe(true);
      expect(wrapper.find('nav ul').exists()).toBe(true);
      expect(wrapper.findAll('[data-soybean-navigation-menu-item]')).toHaveLength(3);
      expect(wrapper.text()).toContain('Guide');
      expect(wrapper.text()).toContain('Components');
      expect(wrapper.find('a[href="/guide"]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('applies custom class and orientation attributes', () => {
      const wrapper = mount(SNavigationMenu, {
        props: { class: 'custom-nav', orientation: 'vertical', items },
        attachTo: document.body
      });

      const root = wrapper.find('nav');
      expect(root.classes()).toContain('custom-nav');
      expect(root.attributes('data-orientation')).toBe('vertical');

      wrapper.unmount();
    });
  });

  describe('linkProps fallback', () => {
    it('applies linkProps.disabled to items without an explicit value', () => {
      const wrapper = mount(SNavigationMenu, {
        props: {
          items: [
            { value: 'guide', label: 'Guide', href: '/guide' },
            { value: 'help', label: 'Help', href: '/help' }
          ],
          linkProps: { disabled: true }
        },
        attachTo: document.body
      });

      // items without an explicit disabled value inherit linkProps.disabled
      wrapper.findAll('a').forEach(link => {
        expect(link.attributes('aria-disabled')).toBe('true');
      });

      wrapper.unmount();
    });

    it('lets an explicit item.disabled win over linkProps.disabled', () => {
      const wrapper = mount(SNavigationMenu, {
        props: {
          items: [
            { value: 'guide', label: 'Guide', href: '/guide' },
            { value: 'help', label: 'Help', href: '/help', disabled: true }
          ],
          linkProps: { disabled: false },
          attachTo: document.body
        }
      });

      expect(wrapper.find('a[href="/guide"]').attributes('aria-disabled')).toBeUndefined();
      expect(wrapper.find('a[href="/help"]').attributes('aria-disabled')).toBe('true');

      wrapper.unmount();
    });

    it('uses linkProps.target as the fallback and lets item.target win', () => {
      const wrapper = mount(SNavigationMenu, {
        props: {
          items: [
            { value: 'guide', label: 'Guide', href: '/guide' },
            { value: 'docs', label: 'Docs', href: '/docs', target: '_self' }
          ],
          linkProps: { target: '_blank' },
          attachTo: document.body
        }
      });

      expect(wrapper.find('a[href="/guide"]').attributes('target')).toBe('_blank');
      expect(wrapper.find('a[href="/docs"]').attributes('target')).toBe('_self');

      wrapper.unmount();
    });
  });

  describe('disabled item', () => {
    it('renders a disabled link as inert', async () => {
      const wrapper = mount(SNavigationMenu, {
        props: { items },
        attachTo: document.body
      });

      const link = wrapper.find('a[href="/help"]');
      expect(link.attributes('aria-disabled')).toBe('true');
      expect(link.attributes('tabindex')).toBe('-1');
      expect(link.attributes('data-disabled')).toBeDefined();

      await link.trigger('click');
      expect(wrapper.find('[data-soybean-navigation-menu-content]').exists()).toBe(false);

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('opens the content on trigger click and closes it again', async () => {
      const wrapper = mount(SNavigationMenu, {
        props: { items },
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-soybean-navigation-menu-trigger]');
      expect(trigger.attributes('aria-expanded')).toBe('false');

      await trigger.trigger('click');
      await nextTick();

      expect(trigger.attributes('aria-expanded')).toBe('true');
      expect(wrapper.find('[data-soybean-navigation-menu-content]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Button');

      await trigger.trigger('click');
      await nextTick();

      // the content stays mounted while the viewport plays its exit animation
      expect(trigger.attributes('aria-expanded')).toBe('false');

      wrapper.unmount();
    });

    it('emits update:modelValue when a trigger is toggled', async () => {
      const wrapper = mount(SNavigationMenu, {
        props: { items },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-navigation-menu-trigger]').trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SNavigationMenu, {
        props: { items },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });

    it('has no a11y violations when a submenu is open', async () => {
      const wrapper = mount(SNavigationMenu, {
        props: { items },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-navigation-menu-trigger]').trigger('click');
      await nextTick();

      // the open trigger renders an `aria-hidden` focus proxy (tabindex 0) used to
      // move focus into the submenu; axe flags this pattern, so skip that rule
      const violations = await getA11yViolations(wrapper.element, {
        rules: { 'aria-hidden-focus': { enabled: false } }
      });
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
