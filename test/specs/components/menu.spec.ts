import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import SConfigProvider from '../../../src/components/config-provider/config-provider.vue';
import { SDropdownMenuWrapper } from '../../../src/components/dropdown-menu';
import { SMenuOptions } from '../../../src/components/menu';
import type { MenuOptionData } from '../../../src/components/menu';

const items: MenuOptionData<string>[] = [
  { value: 'new-tab', label: 'New Tab' },
  {
    value: 'share',
    label: 'Share',
    children: [{ value: 'mail', label: 'Email' }]
  }
];

function mountMenu() {
  return mount(
    {
      components: {
        SConfigProvider,
        SDropdownMenuWrapper,
        SMenuOptions
      },
      setup() {
        return {
          items
        };
      },
      template: `
        <SConfigProvider>
          <SDropdownMenuWrapper :portal-props="{ disabled: true }">
            <template #trigger>
              <button type="button">Open menu</button>
            </template>
            <SMenuOptions :items="items" :portal-props="{ disabled: true }" />
          </SDropdownMenuWrapper>
        </SConfigProvider>
      `
    },
    {
      attachTo: document.body
    }
  );
}

describe('SMenuOptions', () => {
  it('focuses the first submenu item when opening a submenu with keyboard navigation', async () => {
    const wrapper = mountMenu();
    const trigger = wrapper.find('button');

    await trigger.trigger('click', { button: 0, ctrlKey: false });
    await nextTick();
    await nextTick();

    const rootMenu = wrapper.find('[role="menu"][data-state="open"]');

    expect(rootMenu.exists()).toBe(true);

    await rootMenu.trigger('keydown', { key: 'ArrowDown' });
    await nextTick();

    const rootMenuItems = rootMenu.findAll('[role="menuitem"]');

    expect(document.activeElement).toBe(rootMenuItems[0]?.element);

    await rootMenuItems[0].trigger('keydown', { key: 'ArrowDown' });
    await nextTick();

    expect(document.activeElement).toBe(rootMenuItems[1]?.element);
    expect(document.activeElement?.textContent).toContain('Share');

    await rootMenuItems[1].trigger('keydown', { key: 'ArrowRight' });
    await nextTick();
    await nextTick();

    const openMenus = wrapper.findAll('[role="menu"][data-state="open"]');
    const subMenuItems = openMenus[1]?.findAll('[role="menuitem"]') ?? [];

    expect(openMenus).toHaveLength(2);
    expect(document.activeElement).toBe(subMenuItems[0]?.element);
    expect(document.activeElement?.textContent).toContain('Email');
    wrapper.unmount();
  });
});
