import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { SDescriptions, SDescriptionsItem } from '@/components/descriptions';
import { getA11yViolations } from '../../shared/a11y';

describe('SDescriptions', () => {
  const mountDescriptions = (props = {}, itemProps = []) =>
    mount(SDescriptions, {
      props,
      slots: {
        default: `
          <SDescriptionsItem label="Name"><span class="value">Soybean</span></SDescriptionsItem>
          <SDescriptionsItem label="Role"><span class="value">Admin</span></SDescriptionsItem>
          ${itemProps.map(p => `<SDescriptionsItem ${p}><span class="value">Value</span></SDescriptionsItem>`).join('')}
        `
      },
      global: { components: { SDescriptionsItem } },
      attachTo: document.body
    });

  describe('rendering', () => {
    it('renders item labels and content', () => {
      const wrapper = mountDescriptions();

      expect(wrapper.find('[data-soybean-descriptions-label]').text()).toBe('Name');
      expect(wrapper.findAll('.value')).toHaveLength(2);

      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mountDescriptions({ class: 'my-descriptions' });

      expect(wrapper.find('[data-soybean-descriptions-root]').classes()).toContain('my-descriptions');

      wrapper.unmount();
    });

    it('renders the title', () => {
      const wrapper = mountDescriptions({ title: 'Profile' });

      expect(wrapper.text()).toContain('Profile');

      wrapper.unmount();
    });

    it('reflects layout and bordered state on the root', () => {
      const wrapper = mountDescriptions({ layout: 'vertical', bordered: true });

      const root = wrapper.find('[data-soybean-descriptions-root]');

      expect(root.attributes('data-layout')).toBe('vertical');
      expect(root.attributes('data-bordered')).toBe('');

      wrapper.unmount();
    });
  });

  describe('grid', () => {
    it('applies the column count as a grid template style', () => {
      const wrapper = mountDescriptions({ column: 2 });

      const rootStyle = wrapper.find('[data-soybean-descriptions-root]').attributes('style');

      expect(rootStyle).toContain('grid-template-columns');
      expect(rootStyle).toContain('repeat(2');

      wrapper.unmount();
    });

    it('sets a span style on items with span greater than 1', () => {
      const wrapper = mountDescriptions({}, ['span="2"']);

      const spanItem = wrapper.findAll('[data-soybean-descriptions-item]').at(-1);

      expect(spanItem?.attributes('data-span')).toBe('2');
      expect(spanItem?.attributes('style')).toContain('span 2');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mountDescriptions({ bordered: true });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
