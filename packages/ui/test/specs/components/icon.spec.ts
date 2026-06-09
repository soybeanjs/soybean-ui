import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SIcon from '@/components/icon/icon.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SIcon', () => {
  describe('rendering', () => {
    it('renders an icon from iconify string', () => {
      const wrapper = mount(SIcon, {
        props: { icon: 'lucide:check' },
        attachTo: document.body
      });

      expect(wrapper.find('svg').exists()).toBe(true);

      wrapper.unmount();
    });

    it('renders a custom component when icon is a VNode', () => {
      const CustomComp = {
        template: '<span data-custom-icon>Custom</span>'
      };

      const wrapper = mount(SIcon, {
        props: { icon: CustomComp },
        attachTo: document.body
      });

      expect(wrapper.find('[data-custom-icon]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('applies width and height props', () => {
      const wrapper = mount(SIcon, {
        props: { icon: 'lucide:check', width: '2rem', height: '2rem' },
        attachTo: document.body
      });

      const svg = wrapper.find('svg');
      expect(svg.exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations with aria-label', async () => {
      const wrapper = mount(SIcon, {
        props: { icon: 'lucide:check', 'aria-label': 'Check icon' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
