import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxFolder from '@/components/folder/folder.vue';

describe('SxFolder', () => {
  it('renders the folder name and badge', () => {
    const wrapper = mount(SxFolder, { props: { name: 'Docs', count: 3 } });

    expect(wrapper.text()).toContain('Docs');
    expect(wrapper.text()).toContain('3');
  });

  it('is collapsed by default and hides content', async () => {
    const wrapper = mount(SxFolder, { props: { name: 'Docs' }, slots: { default: 'nested file' } });

    expect(wrapper.find('[aria-expanded="false"]').exists()).toBe(true);

    await wrapper.find('button').trigger('click');
    expect(wrapper.find('[aria-expanded="true"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('nested file');
  });
});
