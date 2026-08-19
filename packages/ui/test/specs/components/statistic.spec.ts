import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SStatistic from '@/components/statistic/statistic.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SStatistic', () => {
  describe('rendering', () => {
    it('renders label, value, prefix, and suffix', () => {
      const wrapper = mount(SStatistic, {
        props: { label: 'Total', value: 1000, prefix: '¥', suffix: 'CNY' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-statistic-label]').text()).toBe('Total');
      expect(wrapper.find('[data-soybean-statistic-prefix]').text()).toBe('¥');
      expect(wrapper.find('[data-soybean-statistic-suffix]').text()).toBe('CNY');
      expect(wrapper.find('[data-soybean-statistic-value]').text()).toBe('1000');

      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mount(SStatistic, {
        props: { label: 'Total', value: 1, class: 'my-statistic' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-statistic-root]').classes()).toContain('my-statistic');

      wrapper.unmount();
    });

    it('renders value row between label and suffix', () => {
      const wrapper = mount(SStatistic, {
        props: { label: 'Total', value: 1, suffix: '%' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-statistic-value-row]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('does not render label when not provided', () => {
      const wrapper = mount(SStatistic, {
        props: { value: 1 },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-statistic-label]').exists()).toBe(false);

      wrapper.unmount();
    });
  });

  describe('value formatting', () => {
    it('formats value with precision and thousands separator', () => {
      const wrapper = mount(SStatistic, {
        props: { value: 1234567.891, precision: 2 },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-statistic-value]').text()).toBe('1,234,567.89');

      wrapper.unmount();
    });

    it('respects custom separators', () => {
      const wrapper = mount(SStatistic, {
        props: { value: 1234567.891, precision: 2, groupSeparator: ' ', decimalSeparator: ',' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-statistic-value]').text()).toBe('1 234 567,89');

      wrapper.unmount();
    });

    it('applies a custom formatter when provided', () => {
      const wrapper = mount(SStatistic, {
        props: { value: 5, formatter: (value: number) => `${value}%` },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-statistic-value]').text()).toBe('5%');

      wrapper.unmount();
    });

    it('recomputes the formatted value when the value prop changes', async () => {
      const wrapper = mount(SStatistic, {
        props: { value: 1000 },
        attachTo: document.body
      });

      await wrapper.setProps({ value: 2500 });

      expect(wrapper.find('[data-soybean-statistic-value]').text()).toBe('2500');

      wrapper.unmount();
    });
  });

  describe('trend state', () => {
    it('renders a default trend prefix when trend is up', () => {
      const wrapper = mount(SStatistic, {
        props: { value: 12, trend: 'up' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-statistic-root]').attributes('data-trend')).toBe('up');
      expect(wrapper.find('[data-soybean-statistic-prefix]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('prefers a user prefix over the trend icon', () => {
      const wrapper = mount(SStatistic, {
        props: { value: 12, trend: 'up', prefix: '↑' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-statistic-prefix]').text()).toBe('↑');

      wrapper.unmount();
    });
  });

  describe('slots', () => {
    it('renders custom value slot content', () => {
      const wrapper = mount(SStatistic, {
        props: { value: 10 },
        slots: { value: '<span class="custom-value">Custom</span>' },
        attachTo: document.body
      });

      expect(wrapper.find('.custom-value').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SStatistic, {
        props: { label: 'Total', value: 1000, suffix: 'CNY' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
