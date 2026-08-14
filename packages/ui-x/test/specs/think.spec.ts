import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxThink from '@/components/think/think.vue';

describe('SxThink', () => {
  it('is collapsed by default and toggles on trigger click', async () => {
    const wrapper = mount(SxThink, { props: { title: 'Thinking' }, slots: { default: 'step detail' } });

    expect(wrapper.find('[aria-expanded="false"]').exists()).toBe(true);
    expect(wrapper.find('[aria-expanded="true"]').exists()).toBe(false);
    // collapsed content is hidden via v-show
    expect(wrapper.find('[aria-expanded="true"]').exists()).toBe(false);

    await wrapper.find('button').trigger('click');

    expect(wrapper.find('[aria-expanded="true"]').exists()).toBe(true);
  });

  it('emits toggleChange with the new open state', async () => {
    const wrapper = mount(SxThink);

    await wrapper.find('button').trigger('click');

    const emitted = wrapper.emitted('toggleChange');
    expect(emitted).toBeTruthy();
    expect(emitted?.[0]).toEqual([true]);
  });

  it('respects defaultOpen', () => {
    const wrapper = mount(SxThink, { props: { defaultOpen: true } });

    expect(wrapper.find('[aria-expanded="true"]').exists()).toBe(true);
  });
});
