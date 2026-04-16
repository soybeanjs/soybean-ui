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
    children: [
      { value: 'new-tab', label: 'New Tab' },
      {
        value: 'share',
        label: 'Share',
        children: [{ value: 'email', label: 'Email' }]
      }
    ]
  },
  {
    value: 'edit',
    label: 'Edit',
    children: [{ value: 'undo', label: 'Undo' }]
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

describe('SMenubar submenu keyboard navigation', () => {
  it('switches to the next trigger when ArrowRight is pressed inside an open submenu', async () => {
    const wrapper = mountMenubar();
    const triggers = wrapper.findAll('[role="menuitem"]');

    await triggers[0].trigger('pointerdown', { button: 0, ctrlKey: false });
    await nextTick();
    await nextTick();

    const rootMenu = wrapper.find('[role="menu"][data-state="open"]');

    expect(rootMenu.exists()).toBe(true);

    await rootMenu.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();

    const rootMenuItems = rootMenu.findAll('[role="menuitem"]');

    await rootMenuItems[0].trigger('keydown', { key: 'ArrowDown' });
    await nextTick();

    expect(document.activeElement).toBe(rootMenuItems[1]?.element);
    expect(document.activeElement?.textContent).toContain('Share');

    await rootMenuItems[1].trigger('keydown', { key: 'ArrowRight' });
    await nextTick();
    await nextTick();

    let openMenus = wrapper.findAll('[role="menu"][data-state="open"]');
    const subMenuItems = openMenus[1]?.findAll('[role="menuitem"]') ?? [];

    expect(openMenus).toHaveLength(2);
    expect(document.activeElement).toBe(subMenuItems[0]?.element);
    expect(document.activeElement?.textContent).toContain('Email');

    await subMenuItems[0].trigger('keydown', { key: 'ArrowRight' });
    await nextTick();
    await nextTick();

    openMenus = wrapper.findAll('[role="menu"][data-state="open"]');

    expect(openMenus).toHaveLength(1);
    expect(openMenus[0]?.text()).toContain('Undo');
    expect(openMenus[0]?.text()).not.toContain('Email');
    wrapper.unmount();
  });
});
