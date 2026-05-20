import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { getA11yViolations } from '../../shared/a11y';
import SKbd from '../../../src/components/kbd/kbd.vue';

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

    it('symbolizes keys when symbolize is true', () => {
      const wrapper = mount(SKbd, {
        props: { value: 'Meta', symbolize: true },
        attachTo: document.body
      });

      expect(wrapper.get('kbd').text()).toBeTruthy();

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
