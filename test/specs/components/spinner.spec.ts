import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SIcon from '../../../src/components/icon/icon.vue';
import SSpinner from '../../../src/components/spinner/spinner.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SSpinner', () => {
  describe('rendering', () => {
    it('renders with the default svg-spinners icon', () => {
      const wrapper = mount(SSpinner, { attachTo: document.body });

      const icon = wrapper.findComponent(SIcon);

      expect(icon.exists()).toBe(true);
      expect(icon.props('icon')).toBe('svg-spinners:270-ring');

      wrapper.unmount();
    });

    it('forwards custom icon props to SIcon', () => {
      const wrapper = mount(SSpinner, {
        props: {
          icon: 'svg-spinners:ring-resize',
          width: '2rem',
          height: '2rem'
        },
        attachTo: document.body
      });

      const icon = wrapper.findComponent(SIcon);

      expect(icon.props('icon')).toBe('svg-spinners:ring-resize');
      expect(icon.props('width')).toBe('2rem');
      expect(icon.props('height')).toBe('2rem');

      wrapper.unmount();
    });

    it('passes custom class to the underlying icon component', () => {
      const wrapper = mount(SSpinner, {
        props: {
          class: 'text-primary'
        },
        attachTo: document.body
      });

      const icon = wrapper.findComponent(SIcon);

      expect(icon.attributes('class')).toContain('text-primary');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SSpinner, {
        props: {
          'aria-label': 'Loading'
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
