import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxConversations from '@/components/conversations/conversations.vue';

const items = [
  { id: '1', title: 'First', group: 'Today' },
  { id: '2', title: 'Second', group: 'Today' },
  { id: '3', title: 'Third', group: 'Yesterday' }
];

describe('SxConversations', () => {
  it('renders group titles and items', () => {
    const wrapper = mount(SxConversations, { props: { items } });

    expect(wrapper.text()).toContain('Today');
    expect(wrapper.text()).toContain('Yesterday');
    expect(wrapper.text()).toContain('First');
    expect(wrapper.text()).toContain('Third');
  });

  it('marks the active item', () => {
    const wrapper = mount(SxConversations, { props: { items, active: '2' } });

    const activeBtn = wrapper.find('[aria-current="true"]');
    expect(activeBtn.exists()).toBe(true);
    expect(activeBtn.text()).toContain('Second');
  });

  it('emits change with the selected item', async () => {
    const wrapper = mount(SxConversations, { props: { items } });

    await wrapper.findAll('button')[0].trigger('click');

    const emitted = wrapper.emitted('change');
    expect(emitted).toBeTruthy();
    expect(emitted?.[0]).toEqual([items[0]]);
  });
});
