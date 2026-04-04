import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SButton from '../../../src/components/button/button.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SButton', () => {
  describe('rendering', () => {
    it('renders default slot content', () => {
      const wrapper = mount(SButton, { slots: { default: 'Click me' } });
      expect(wrapper.text()).toContain('Click me');
    });

    it('renders as a button element by default', () => {
      const wrapper = mount(SButton);
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('applies custom class', () => {
      const wrapper = mount(SButton, { props: { class: 'my-custom-class' } });
      expect(wrapper.find('button').classes()).toContain('my-custom-class');
    });

    it('renders leading and trailing slots', () => {
      const wrapper = mount(SButton, {
        slots: {
          leading: '<span data-testid="leading">L</span>',
          default: 'Text',
          trailing: '<span data-testid="trailing">R</span>'
        }
      });
      expect(wrapper.find('[data-testid="leading"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="trailing"]').exists()).toBe(true);
    });
  });

  describe('disabled state', () => {
    it('is not disabled by default', () => {
      const wrapper = mount(SButton);
      expect(wrapper.find('button').attributes('disabled')).toBeUndefined();
    });

    it('applies aria-disabled when disabled prop is true', () => {
      const wrapper = mount(SButton, { props: { disabled: true } });
      // Headless Button uses aria-disabled (not native disabled) to preserve focusability
      expect(wrapper.find('button').attributes('aria-disabled')).toBe('true');
    });

    it('does not emit click event when disabled', async () => {
      const wrapper = mount(SButton, { props: { disabled: true } });
      await wrapper.find('button').trigger('click');
      // SButton emits 'click' only when headless Button is not disabled
      expect(wrapper.emitted('click')).toBeFalsy();
    });
  });

  describe('events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(SButton);
      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations for a default button', async () => {
      const wrapper = mount(SButton, {
        slots: { default: 'Submit' },
        attachTo: document.body
      });
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });

    it('has no a11y violations when disabled', async () => {
      const wrapper = mount(SButton, {
        props: { disabled: true },
        slots: { default: 'Submit' },
        attachTo: document.body
      });
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
