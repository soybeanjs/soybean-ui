import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SNavMenu from '@/components/nav-menu/nav-menu.vue';
import { getA11yViolations } from '../../shared/a11y';

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

const hoverItems = [
  {
    value: 'one',
    label: 'One',
    href: '/one',
    children: [{ value: 'one-a', label: 'One A', href: '/one-a' }]
  },
  {
    value: 'two',
    label: 'Two',
    href: '/two',
    children: [{ value: 'two-a', label: 'Two A', href: '/two-a' }]
  }
];

describe('SNavMenu', () => {
  describe('rendering', () => {
    it('renders the root structure and item labels', () => {
      const wrapper = mount(SNavMenu, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.find('nav').exists()).toBe(true);
      expect(wrapper.find('nav ul').exists()).toBe(true);
      expect(wrapper.findAll('[data-soybean-nav-menu-item]')).toHaveLength(3);
      expect(wrapper.text()).toContain('Guide');
      expect(wrapper.find('a[href="/guide"]').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('opens the submenu on trigger click and toggles it closed again', async () => {
      const wrapper = mount(SNavMenu, {
        props: { items },
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-soybean-nav-menu-trigger]');
      expect(trigger.attributes('aria-expanded')).toBe('false');

      await trigger.trigger('click');
      await nextTick();

      expect(trigger.attributes('aria-expanded')).toBe('true');
      expect(wrapper.find('[data-soybean-nav-menu-content]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Button');

      await trigger.trigger('click');
      await nextTick();

      expect(trigger.attributes('aria-expanded')).toBe('false');
      expect(wrapper.find('[data-soybean-nav-menu-content]').exists()).toBe(false);

      wrapper.unmount();
    });

    it('emits update:modelValue when a trigger is toggled', async () => {
      const wrapper = mount(SNavMenu, {
        props: { items },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-nav-menu-trigger]').trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();

      wrapper.unmount();
    });

    it('applies the subLink UI slot to submenu links', async () => {
      const wrapper = mount(SNavMenu, {
        props: { items, ui: { subLink: 'w-60' } },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-nav-menu-trigger]').trigger('click');
      await nextTick();

      const subLink = wrapper.find('[data-soybean-nav-menu-content] [data-soybean-nav-menu-link]');
      expect(subLink.exists()).toBe(true);
      expect(subLink.classes()).toContain('w-60');

      wrapper.unmount();
    });

    it('flags the positioner as settled via data-settled after placed', async () => {
      const wrapper = mount(SNavMenu, {
        props: { items },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-nav-menu-trigger]').trigger('click');
      await nextTick();

      // wait for the positioner's post-flush `placed` effect (+ its deferred rAF) to run
      const viewport = document.querySelector('[data-soybean-nav-menu-viewport]');
      await vi.waitFor(() => {
        expect(viewport?.getAttribute('data-settled')).toBe('');
      });

      wrapper.unmount();
    });

    it('closes the menu on Escape', async () => {
      const wrapper = mount(SNavMenu, {
        props: { items },
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-soybean-nav-menu-trigger]');

      await trigger.trigger('click');
      await nextTick();
      expect(wrapper.find('[data-soybean-nav-menu-content]').exists()).toBe(true);

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await nextTick();

      expect(trigger.attributes('aria-expanded')).toBe('false');

      wrapper.unmount();
    });
  });

  describe('hover open/close (single shared Popper machine)', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it('opens after the open delay and switches instantly between triggers', async () => {
      vi.useFakeTimers();

      const wrapper = mount(SNavMenu, {
        props: { items: hoverItems },
        attachTo: document.body
      });

      const triggers = wrapper.findAll('[data-soybean-nav-menu-trigger]');

      await triggers[0].trigger('pointerenter', { pointerType: 'mouse' });
      await vi.advanceTimersByTimeAsync(200);
      await nextTick();

      expect(triggers[0].attributes('data-state')).toBe('open');
      expect(wrapper.find('[data-soybean-nav-menu-content]').exists()).toBe(true);

      // the shared-surface grace override means leaving a trigger does not close it
      await triggers[0].trigger('pointerleave', { pointerType: 'mouse' });
      await vi.advanceTimersByTimeAsync(300);
      await nextTick();
      expect(triggers[0].attributes('data-state')).toBe('open');

      // entering the second trigger switches instantly (shared machine already open)
      await triggers[1].trigger('pointerenter', { pointerType: 'mouse' });
      await nextTick();

      expect(triggers[1].attributes('data-state')).toBe('open');
      expect(wrapper.find('[data-soybean-nav-menu-content]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('closes an open menu when hovering a root-level leaf link', async () => {
      vi.useFakeTimers();

      const wrapper = mount(SNavMenu, {
        props: {
          items: [...hoverItems, { value: 'leaf', label: 'Leaf', href: '/leaf' }]
        },
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-soybean-nav-menu-trigger]');

      await trigger.trigger('pointerenter', { pointerType: 'mouse' });
      await vi.advanceTimersByTimeAsync(200);
      await nextTick();

      expect(wrapper.find('[data-soybean-nav-menu-content]').exists()).toBe(true);

      // a root-level link without children has no flyout: entering it dismisses the open menu
      await wrapper.find('a[href="/leaf"]').trigger('pointerenter', { pointerType: 'mouse' });
      await nextTick();

      expect(wrapper.find('[data-soybean-nav-menu-content]').exists()).toBe(false);
      expect(trigger.attributes('data-state')).not.toBe('open');

      wrapper.unmount();
    });

    it('does not open on hover when disableHoverTrigger is set, but still opens on click', async () => {
      vi.useFakeTimers();

      const wrapper = mount(SNavMenu, {
        props: { items: hoverItems, disableHoverTrigger: true },
        attachTo: document.body
      });

      const triggers = wrapper.findAll('[data-soybean-nav-menu-trigger]');

      await triggers[0].trigger('pointerenter', { pointerType: 'mouse' });
      await vi.advanceTimersByTimeAsync(300);
      await nextTick();

      expect(triggers[0].attributes('aria-expanded')).toBe('false');

      await triggers[0].trigger('click');
      await nextTick();

      expect(triggers[0].attributes('aria-expanded')).toBe('true');

      wrapper.unmount();
    });

    it('does not open on click when disableClickTrigger is set, but still opens on hover', async () => {
      vi.useFakeTimers();

      const wrapper = mount(SNavMenu, {
        props: { items: hoverItems, disableClickTrigger: true },
        attachTo: document.body
      });

      const triggers = wrapper.findAll('[data-soybean-nav-menu-trigger]');

      await triggers[0].trigger('click');
      await nextTick();

      expect(wrapper.find('[data-soybean-nav-menu-content]').exists()).toBe(false);

      await triggers[0].trigger('pointerenter', { pointerType: 'mouse' });
      await vi.advanceTimersByTimeAsync(200);
      await nextTick();

      expect(triggers[0].attributes('aria-expanded')).toBe('true');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SNavMenu, {
        props: { items },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
