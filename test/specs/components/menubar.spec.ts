import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import {
  SMenubar,
  SMenubarContent,
  SMenubarItem,
  SMenubarMenu,
  SMenubarSub,
  SMenubarSubContent,
  SMenubarSubTrigger,
  SMenubarTrigger
} from '../../../src/components/menubar';
import { getA11yViolations } from '../../shared/a11y';

const MenubarExample = {
  components: {
    SMenubar,
    SMenubarContent,
    SMenubarItem,
    SMenubarMenu,
    SMenubarTrigger
  },
  template: `
    <SMenubar>
      <SMenubarMenu value="file">
        <SMenubarTrigger>File</SMenubarTrigger>
        <SMenubarContent>
          <SMenubarItem>New Tab</SMenubarItem>
        </SMenubarContent>
      </SMenubarMenu>
      <SMenubarMenu value="edit">
        <SMenubarTrigger>Edit</SMenubarTrigger>
        <SMenubarContent>
          <SMenubarItem>Undo</SMenubarItem>
        </SMenubarContent>
      </SMenubarMenu>
    </SMenubar>
  `
};

const MenubarSubmenuExample = {
  components: {
    SMenubar,
    SMenubarContent,
    SMenubarItem,
    SMenubarMenu,
    SMenubarSub,
    SMenubarSubContent,
    SMenubarSubTrigger,
    SMenubarTrigger
  },
  template: `
    <SMenubar>
      <SMenubarMenu value="file">
        <SMenubarTrigger>File</SMenubarTrigger>
        <SMenubarContent>
          <SMenubarSub>
            <SMenubarSubTrigger>Share</SMenubarSubTrigger>
            <SMenubarSubContent>
              <SMenubarItem>Email Link</SMenubarItem>
            </SMenubarSubContent>
          </SMenubarSub>
        </SMenubarContent>
      </SMenubarMenu>
      <SMenubarMenu value="edit">
        <SMenubarTrigger>Edit</SMenubarTrigger>
        <SMenubarContent>
          <SMenubarItem>Undo</SMenubarItem>
        </SMenubarContent>
      </SMenubarMenu>
    </SMenubar>
  `
};

describe('SMenubar', () => {
  describe('rendering', () => {
    it('renders a menubar with top-level triggers', () => {
      const wrapper = mount(MenubarExample, {
        attachTo: document.body
      });

      expect(wrapper.find('[role="menubar"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('File');
      expect(wrapper.text()).toContain('Edit');

      wrapper.unmount();
    });

    it('applies size variants', () => {
      const wrapper = mount(
        {
          components: {
            SMenubar,
            SMenubarContent,
            SMenubarItem,
            SMenubarMenu,
            SMenubarTrigger
          },
          template: `
            <SMenubar size="xs">
              <SMenubarMenu value="file">
                <SMenubarTrigger size="xs">File</SMenubarTrigger>
                <SMenubarContent size="xs">
                  <SMenubarItem size="xs">New Tab</SMenubarItem>
                </SMenubarContent>
              </SMenubarMenu>
            </SMenubar>
          `
        },
        {
          attachTo: document.body
        }
      );

      expect(wrapper.find('[role="menubar"]').classes()).toContain('min-h-7');
      expect(wrapper.find('[role="menuitem"]').classes()).toContain('text-2xs');

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('opens content from the trigger and moves across menus with arrow navigation', async () => {
      const wrapper = mount(MenubarExample, {
        attachTo: document.body
      });

      const triggers = wrapper.findAll('[role="menuitem"]');
      const fileTrigger = triggers[0]!;
      const editTrigger = triggers[1]!;

      await fileTrigger.trigger('pointerdown', { button: 0, ctrlKey: false });

      expect(fileTrigger.attributes('aria-expanded')).toBe('true');
      expect(document.body.textContent).toContain('New Tab');

      document.body.querySelector('[role="menu"]')?.dispatchEvent(
        new KeyboardEvent('keydown', {
          bubbles: true,
          key: 'ArrowRight'
        })
      );

      await wrapper.vm.$nextTick();

      expect(editTrigger.attributes('aria-expanded')).toBe('true');
      expect(document.body.textContent).toContain('Undo');

      wrapper.unmount();
    });

    it('switches to the next menu when hovering another trigger while one menu is open', async () => {
      const wrapper = mount(MenubarExample, {
        attachTo: document.body
      });

      const triggers = wrapper.findAll('[role="menuitem"]');
      const fileTrigger = triggers[0]!;
      const editTrigger = triggers[1]!;

      await fileTrigger.trigger('pointerdown', { button: 0, ctrlKey: false });
      await editTrigger.trigger('pointermove', { pointerType: 'mouse', clientX: 1, clientY: 1 });
      await wrapper.vm.$nextTick();

      expect(editTrigger.attributes('aria-expanded')).toBe('true');
      expect(fileTrigger.attributes('aria-expanded')).toBe('false');
      expect(document.body.textContent).toContain('Undo');

      wrapper.unmount();
    });

    it('renders submenu content in a portal so it is not clipped by the parent menu', async () => {
      const wrapper = mount(MenubarSubmenuExample, {
        attachTo: document.body
      });

      await wrapper.find('[role="menuitem"][aria-haspopup="menu"]').trigger('pointerdown', { button: 0, ctrlKey: false });
      await wrapper.vm.$nextTick();

      const subTrigger = document.body.querySelector('[data-soybean-menubar-subtrigger]') as HTMLElement | null;

      expect(subTrigger).toBeTruthy();

      subTrigger?.click();
      await wrapper.vm.$nextTick();

      const menus = Array.from(document.body.querySelectorAll('[role="menu"]'));
      const parentMenu = menus.find(menu => menu.textContent?.includes('Share'));
      const submenu = menus.find(menu => menu.textContent?.includes('Email Link'));

      expect(parentMenu).toBeTruthy();
      expect(submenu).toBeTruthy();
      expect(parentMenu?.contains(submenu as Node)).toBe(false);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(MenubarExample, {
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
