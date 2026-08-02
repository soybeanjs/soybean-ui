import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SIcon from '@/components/icon/icon.vue';
import SSpinner from '@/components/spinner/spinner.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SSpinner', () => {
  describe('rendering', () => {
    it('renders with the default svg-spinners icon', () => {
      const wrapper = mount(SSpinner, { attachTo: document.body });

      const icon = wrapper.findComponent(SIcon);

      expect(icon.exists()).toBe(true);
      expect(icon.props('icon')).toBe('svg-spinners:270-ring');
      expect(icon.attributes('class')).toContain('text-current');
      expect(icon.attributes('class')).toContain('size-5');

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

    it('applies theme color and size classes and omits color from forwarded props', () => {
      const wrapper = mount(SSpinner, {
        props: {
          color: 'success',
          size: 'lg'
        },
        attachTo: document.body
      });

      const icon = wrapper.findComponent(SIcon);

      expect(icon.attributes('class')).toContain('text-success');
      expect(icon.attributes('class')).toContain('size-6');
      expect(icon.attributes('color')).toBeUndefined();

      wrapper.unmount();
    });
  });

  describe('color variants', () => {
    it('applies current color by default', () => {
      const wrapper = mount(SSpinner, { attachTo: document.body });
      expect(wrapper.findComponent(SIcon).attributes('class')).toContain('text-current');
      wrapper.unmount();
    });

    it('applies primary color class', () => {
      const wrapper = mount(SSpinner, {
        props: { color: 'primary' },
        attachTo: document.body
      });
      expect(wrapper.findComponent(SIcon).attributes('class')).toContain('text-primary');
      wrapper.unmount();
    });

    it('applies destructive color class', () => {
      const wrapper = mount(SSpinner, {
        props: { color: 'destructive' },
        attachTo: document.body
      });
      expect(wrapper.findComponent(SIcon).attributes('class')).toContain('text-destructive');
      wrapper.unmount();
    });

    it('applies success color class', () => {
      const wrapper = mount(SSpinner, {
        props: { color: 'success' },
        attachTo: document.body
      });
      expect(wrapper.findComponent(SIcon).attributes('class')).toContain('text-success');
      wrapper.unmount();
    });
  });

  describe('size variants', () => {
    it('applies md size by default', () => {
      const wrapper = mount(SSpinner, { attachTo: document.body });
      expect(wrapper.findComponent(SIcon).attributes('class')).toContain('size-5');
      wrapper.unmount();
    });

    it('applies xs size class', () => {
      const wrapper = mount(SSpinner, {
        props: { size: 'xs' },
        attachTo: document.body
      });
      expect(wrapper.findComponent(SIcon).attributes('class')).toContain('size-3');
      wrapper.unmount();
    });

    it('applies 2xl size class', () => {
      const wrapper = mount(SSpinner, {
        props: { size: '2xl' },
        attachTo: document.body
      });
      expect(wrapper.findComponent(SIcon).attributes('class')).toContain('size-10');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('forwards aria-label to SIcon', () => {
      const wrapper = mount(SSpinner, {
        props: { 'aria-label': 'Loading data' },
        attachTo: document.body
      });

      expect(wrapper.findComponent(SIcon).props('ariaLabel')).toBe('Loading data');
      wrapper.unmount();
    });

    it('has no a11y violations with aria-label', async () => {
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
