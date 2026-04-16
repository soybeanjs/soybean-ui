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
    value: 'edit',
    label: 'Edit',
    children: [{ value: 'undo', label: 'Undo' }]
  }
];

function waitForDismissableLayer() {
  return new Promise(resolve => {
    window.setTimeout(resolve, 0);
  });
}

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

describe('SMenubar focus recovery', () => {
  it.each(['Enter', ' '])(
    'refocuses the current trigger after closing a keyboard-opened menu with %s click',
    async key => {
      const wrapper = mountMenubar();
      const trigger = wrapper.findAll('[role="menuitem"]')[0];

      trigger.element.focus();

      await trigger.trigger('keydown', { key });
      await nextTick();
      await nextTick();
      await waitForDismissableLayer();

      expect(wrapper.find('[role="menu"][data-state="open"]').exists()).toBe(true);

      await trigger.trigger('pointerdown', { button: 0, ctrlKey: false });
      await trigger.trigger('pointerup', { button: 0, ctrlKey: false });
      await trigger.trigger('click', { button: 0, ctrlKey: false });
      await nextTick();
      await nextTick();
      await waitForDismissableLayer();

      expect(wrapper.find('[role="menu"][data-state="open"]').exists()).toBe(false);
      expect(document.activeElement).toBe(trigger.element);
      wrapper.unmount();
    }
  );
});
