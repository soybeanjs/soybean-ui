import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SHoverCard from '../../../src/components/hover-card/hover-card.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SHoverCard', () => {
  const slots = {
    trigger: '<button type="button">Trigger</button>',
    default: '<div>Hover card content</div>'
  };

  describe('rendering', () => {
    it('renders the trigger slot', () => {
      const wrapper = mount(SHoverCard, {
        slots,
        attachTo: document.body
      });

      expect(wrapper.find('button').text()).toBe('Trigger');
      expect(document.body.textContent).not.toContain('Hover card content');
      wrapper.unmount();
    });

    it('renders popup content when open is true', async () => {
      const wrapper = mount(SHoverCard, {
        props: { open: true, portalProps: { disabled: true } },
        slots,
        attachTo: document.body
      });

      await new Promise(resolve => window.setTimeout(resolve));

      expect(wrapper.text()).toContain('Hover card content');
      wrapper.unmount();
    });

    it('applies custom class to popup', async () => {
      const wrapper = mount(SHoverCard, {
        props: { open: true, class: 'my-popup-class', portalProps: { disabled: true } },
        slots,
        attachTo: document.body
      });

      await new Promise(resolve => window.setTimeout(resolve));

      expect(wrapper.find('.my-popup-class').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('emits update:open when the trigger receives focus', async () => {
      const wrapper = mount(SHoverCard, {
        props: { openDelay: 0 },
        slots,
        attachTo: document.body
      });

      await wrapper.find('button').trigger('focus');
      await new Promise(resolve => window.setTimeout(resolve));

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')![0][0]).toBe(true);
      wrapper.unmount();
    });

    it('emits update:open when the trigger loses focus', async () => {
      const wrapper = mount(SHoverCard, {
        props: { defaultOpen: true, closeDelay: 0 },
        slots,
        attachTo: document.body
      });

      await wrapper.find('button').trigger('blur');
      await new Promise(resolve => window.setTimeout(resolve));

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')!.at(-1)?.[0]).toBe(false);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when closed', async () => {
      const wrapper = mount(SHoverCard, {
        slots,
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });

    it('has no a11y violations when open', async () => {
      const wrapper = mount(SHoverCard, {
        props: { open: true, portalProps: { disabled: true } },
        slots,
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
