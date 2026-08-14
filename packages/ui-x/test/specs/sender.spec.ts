import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxAttachments from '@/components/attachments/attachments.vue';
import SxFileCard from '@/components/file-card/file-card.vue';
import SxSender from '@/components/sender/sender.vue';

const attachment = { id: 'a1', name: 'report.pdf', kind: 'file' as const, size: '1.2 MB' };

describe('SxFileCard', () => {
  it('renders the attachment name', () => {
    const wrapper = mount(SxFileCard, { props: { attachment } });
    expect(wrapper.text()).toContain('report.pdf');
  });
});

describe('SxAttachments', () => {
  it('renders all attachments and emits remove', async () => {
    const wrapper = mount(SxAttachments, { props: { attachments: [attachment] } });
    expect(wrapper.text()).toContain('report.pdf');

    await wrapper.find('button[aria-label="Remove attachment"]').trigger('click');
    expect(wrapper.emitted('remove')).toBeTruthy();
    expect(wrapper.emitted('remove')![0]).toEqual([attachment]);
  });
});

describe('SxSender', () => {
  it('emits submit with the typed value', async () => {
    const wrapper = mount(SxSender, { props: { slashSuggestions: [], mentionSuggestions: [] } });
    const textarea = wrapper.find('textarea');

    await textarea.setValue('Hello AI');
    await wrapper.find('button[aria-label="Send"]').trigger('click');

    expect(wrapper.emitted('submit')![0]).toEqual(['Hello AI']);
  });

  it('shows slash suggestions after typing a slash', async () => {
    const wrapper = mount(SxSender, {
      props: { slashSuggestions: [{ key: 'summarize', label: '/summarize' }], mentionSuggestions: [] }
    });
    const textarea = wrapper.find('textarea');

    await textarea.setValue('Please ');
    await textarea.setValue('Please /sum');
    await textarea.trigger('input');

    expect(wrapper.find('[role="listbox"]').exists()).toBe(true);
  });
});
