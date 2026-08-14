import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxActions from '@/components/actions/actions.vue';

const items = [
  { key: 'copy', label: 'Copy', icon: '📋' },
  { key: 'thumbs', label: 'Like', icon: '👍' }
];

describe('SxActions', () => {
  it('renders each action label', () => {
    const wrapper = mount(SxActions, { props: { items } });

    expect(wrapper.text()).toContain('Copy');
    expect(wrapper.text()).toContain('Like');
  });

  it('emits action with the clicked item', async () => {
    const wrapper = mount(SxActions, { props: { items } });

    await wrapper.findAll('button')[0].trigger('click');

    expect(wrapper.emitted('action')?.[0]).toEqual([items[0]]);
  });

  it('does not emit for a disabled action', async () => {
    const withDisabled = [{ key: 'x', label: 'X', disabled: true }];
    const wrapper = mount(SxActions, { props: { items: withDisabled } });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('action')).toBeUndefined();
  });
});
