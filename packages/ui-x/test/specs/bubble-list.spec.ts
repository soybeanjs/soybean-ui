import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxBubbleList from '@/components/bubble-list/bubble-list.vue';

const items = [
  { id: '1', role: 'user' as const, content: 'Hello', status: 'success' as const },
  { id: '2', role: 'ai' as const, content: 'Hi there', status: 'success' as const }
];

describe('SxBubbleList', () => {
  it('renders message content for each item', () => {
    const wrapper = mount(SxBubbleList, { props: { items } });

    expect(wrapper.text()).toContain('Hello');
    expect(wrapper.text()).toContain('Hi there');
  });

  it('applies the log role when scrollable', () => {
    const wrapper = mount(SxBubbleList, { props: { items, scrollable: true } });

    expect(wrapper.attributes('role')).toBe('log');
  });

  it('omits the log role when not scrollable', () => {
    const wrapper = mount(SxBubbleList, { props: { items, scrollable: false } });

    expect(wrapper.attributes('role')).toBeUndefined();
  });
});
