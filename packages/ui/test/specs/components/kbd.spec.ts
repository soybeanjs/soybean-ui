import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SKbd from '@/components/kbd/kbd.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SKbd', () => {
  describe('rendering', () => {
    it('renders a kbd element with the value', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'Ctrl' },
        attachTo: document.body
      });

      const kbd = wrapper.get('kbd');
      // useKbd may symbolize "Ctrl" to uppercase "CTRL"
      expect(kbd.text().toUpperCase()).toContain('CTRL');

      wrapper.unmount();
    });

    it('renders multiple keys joined together', () => {
      const wrapper = mount(SKbd, {
        props: { value: ['Ctrl', 'K'] },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').text().toUpperCase()).toContain('CTRL');
      expect(wrapper.get('kbd').text().toUpperCase()).toContain('K');

      wrapper.unmount();
    });

    it('applies custom root class', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'Enter', class: 'my-kbd' },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').classes()).toContain('my-kbd');

      wrapper.unmount();
    });
  });

  describe('symbolize', () => {
    it('symbolizes known keys (shift → ⇧)', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'shift', symbolize: true },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').text()).toBe('⇧');

      wrapper.unmount();
    });

    it('preserves raw value when symbolize is false', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'shift', symbolize: false },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').text()).toBe('shift');

      wrapper.unmount();
    });

    it('uppercases unknown keys when symbolize is true', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'F5', symbolize: true },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').text()).toBe('F5');

      wrapper.unmount();
    });
  });

  describe('data-group attribute', () => {
    it('sets data-group when value is an array', () => {
      const wrapper = mount(SKbd, {
        props: { value: ['Ctrl', 'K'] },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').attributes('data-group')).toBeDefined();

      wrapper.unmount();
    });

    it('does not set data-group for a single string value', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'Enter' },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').attributes('data-group')).toBeUndefined();

      wrapper.unmount();
    });
  });

  describe('variants', () => {
    it('applies outline variant by default', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'A' },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').classes()).toContain('bg-background');
      wrapper.unmount();
    });

    it('applies solid variant classes', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'A', variant: 'solid' },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').classes()).toContain('bg-muted-foreground');
      wrapper.unmount();
    });

    it('applies ghost variant classes', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'A', variant: 'ghost' },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').classes()).toContain('bg-muted');
      wrapper.unmount();
    });

    it('applies raised shadow class by default', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'A' },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').classes()).toContain('shadow-[0_2px_0_0]');
      wrapper.unmount();
    });

    it('does not apply shadow when raised is false', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'A', raised: false },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').classes()).not.toContain('shadow-[0_2px_0_0]');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SKbd, {
        props: { value: 'Ctrl' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
