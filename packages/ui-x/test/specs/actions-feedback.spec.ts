import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxActionsFeedback from '@/components/actions-feedback/actions-feedback.vue';

describe('SxActionsFeedback', () => {
  it('emits like', async () => {
    const wrapper = mount(SxActionsFeedback);

    await wrapper.findAll('button')[0].trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual(['like']);
  });

  it('emits null to clear when the active like is clicked again', async () => {
    const wrapper = mount(SxActionsFeedback, { props: { value: 'like' } });

    await wrapper.findAll('button')[0].trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual([null]);
  });

  it('emits dislike', async () => {
    const wrapper = mount(SxActionsFeedback);

    await wrapper.findAll('button')[1].trigger('click');
    expect(wrapper.emitted('change')?.[0]).toEqual(['dislike']);
  });

  it('reflects active state via aria-pressed', () => {
    const wrapper = mount(SxActionsFeedback, { props: { value: 'like' } });

    const likeBtn = wrapper.findAll('button')[0];
    expect(likeBtn.attributes('aria-pressed')).toBe('true');
  });
});
