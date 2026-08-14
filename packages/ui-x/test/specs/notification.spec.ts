import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxNotification from '@/components/notification/notification.vue';

describe('SxNotification', () => {
  it('renders title and description', () => {
    const wrapper = mount(SxNotification, { props: { title: 'Saved', description: 'Done' } });

    expect(wrapper.text()).toContain('Saved');
    expect(wrapper.text()).toContain('Done');
  });

  it('emits close when the close button is clicked', async () => {
    const wrapper = mount(SxNotification, { props: { title: 'Saved' } });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('hides close button when not closable', () => {
    const wrapper = mount(SxNotification, { props: { title: 'Saved', closable: false } });

    expect(wrapper.find('button').exists()).toBe(false);
  });
});
