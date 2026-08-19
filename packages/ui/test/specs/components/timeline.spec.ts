import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { STimeline, STimelineItem } from '@/components/timeline';
import { getA11yViolations } from '../../shared/a11y';

describe('STimeline', () => {
  describe('rendering', () => {
    it('renders the root as an ordered list', () => {
      const wrapper = mount(STimeline, {
        slots: {
          default: '<STimelineItem>Item 1</STimelineItem><STimelineItem>Item 2</STimelineItem>'
        },
        global: { components: { STimelineItem } },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-timeline-root]').element.tagName).toBe('OL');

      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mount(STimeline, {
        props: { class: 'my-timeline' },
        slots: { default: '<STimelineItem>Content</STimelineItem>' },
        global: { components: { STimelineItem } },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-timeline-root]').classes()).toContain('my-timeline');

      wrapper.unmount();
    });
  });

  describe('items', () => {
    const mountItems = (props = {}) =>
      mount(STimeline, {
        props,
        slots: {
          default: `
            <STimelineItem label="2024-01-01"><div class="item">First</div></STimelineItem>
            <STimelineItem color="success"><div class="item">Second</div></STimelineItem>
            <STimelineItem><div class="item">Third</div></STimelineItem>
          `
        },
        global: { components: { STimelineItem } },
        attachTo: document.body
      });

    it('renders item content and labels', () => {
      const wrapper = mountItems();

      expect(wrapper.findAll('.item')).toHaveLength(3);
      expect(wrapper.find('[data-soybean-timeline-label]').text()).toBe('2024-01-01');

      wrapper.unmount();
    });

    it('reflects orientation on the root', () => {
      const wrapper = mountItems({ orientation: 'horizontal' });

      expect(wrapper.find('[data-soybean-timeline-root]').attributes('data-orientation')).toBe('horizontal');

      wrapper.unmount();
    });

    it('sets data-color on the item', () => {
      const wrapper = mountItems();

      expect(wrapper.findAll('[data-soybean-timeline-item]')[1]?.attributes('data-color')).toBe('success');

      wrapper.unmount();
    });

    it('alternates data-position in alternate mode', () => {
      const wrapper = mountItems({ mode: 'alternate' });

      const positions = wrapper.findAll('[data-soybean-timeline-item]').map(item => item.attributes('data-position'));

      expect(positions).toEqual(['left', 'right', 'left']);

      wrapper.unmount();
    });

    it('renders custom dot slot content', () => {
      const wrapper = mount(STimeline, {
        slots: {
          default: `
            <STimelineItem>
              <template #dot><span class="custom-dot" /></template>
              <div>Content</div>
            </STimelineItem>
          `
        },
        global: { components: { STimelineItem } },
        attachTo: document.body
      });

      expect(wrapper.find('.custom-dot').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(STimeline, {
        slots: {
          default: `
            <STimelineItem label="2024-01-01"><div>First event</div></STimelineItem>
            <STimelineItem><div>Second event</div></STimelineItem>
          `
        },
        global: { components: { STimelineItem } },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
