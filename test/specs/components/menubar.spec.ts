import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import {
  SMenubar,
  SMenubarContent,
  SMenubarItem,
  SMenubarMenu,
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
