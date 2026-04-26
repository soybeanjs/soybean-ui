import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import SConfigProvider from '../../../src/components/config-provider/config-provider.vue';
import { SMenubar } from '../../../src/components/menubar';
import type { MenuOptionData } from '../../../src/components/menu';

const items: MenuOptionData<string>[] = [
  {
    value: 'file',
    label: 'File',
    children: [{ value: 'new-tab', label: 'New Tab' }]
  },
  {
    value: 'github',
    label: 'GitHub',
    href: 'https://github.com/soybeanjs/soybean-ui'
  }
];

function mountMenubar() {
  return mount(
    {
      components: {
        SConfigProvider,
        SMenubar
      },
      setup() {
        return {
          items
        };
      },
      template: `
        <SConfigProvider>
          <SMenubar :items="items" :portal-props="{ disabled: true }" />
        </SConfigProvider>
      `
    },
    {
      attachTo: document.body
    }
  );
}

describe('SMenubar link trigger', () => {
  it('does not prevent default on pointerdown for link triggers', async () => {
    const wrapper = mountMenubar();
    const linkTrigger = wrapper.find('[data-slot="trigger"][data-value="github"]');
    const event = new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0 });

    linkTrigger.element.dispatchEvent(event);
    await nextTick();

    expect(event.defaultPrevented).toBe(false);
    expect(wrapper.find('[role="menu"][data-state="open"]').exists()).toBe(false);
    wrapper.unmount();
  });
});
