import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SEditable from '../../../src/components/editable/editable.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SEditable', () => {
  describe('rendering', () => {
    it('renders preview content', () => {
      const wrapper = mount(SEditable, {
        props: { defaultValue: 'Editable value' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Editable value');

      wrapper.unmount();
    });

    it('applies custom class to root element', () => {
      const wrapper = mount(SEditable, {
        props: { class: 'my-editable' },
        attachTo: document.body
      });

      expect(wrapper.html()).toContain('my-editable');

      wrapper.unmount();
    });
  });

  describe('editing state', () => {
    it('enters edit mode on focus by default', async () => {
      const wrapper = mount(SEditable, {
        props: { defaultValue: 'Editable value' },
        attachTo: document.body
      });

      const preview = wrapper.find('span[tabindex="0"]');

      await preview.trigger('focusin');
      await nextTick();

      expect(wrapper.find('input').element.hidden).toBe(false);

      wrapper.unmount();
    });

    it('supports double click activation mode', async () => {
      const wrapper = mount(SEditable, {
        props: { activationMode: 'dblclick', defaultValue: 'Editable value' },
        attachTo: document.body
      });

      const preview = wrapper.find('span[tabindex="0"]');
      const input = wrapper.find('input');

      await preview.trigger('focusin');
      expect(input.element.hidden).toBe(true);

      await preview.trigger('dblclick');
      await nextTick();

      expect(input.element.hidden).toBe(false);

      wrapper.unmount();
    });

    it('submits on enter and emits changes', async () => {
      const wrapper = mount(SEditable, {
        props: { defaultValue: 'Editable value', submitMode: 'enter' },
        attachTo: document.body
      });

      const preview = wrapper.find('span[tabindex="0"]');

      await preview.trigger('focusin');
      await nextTick();

      const input = wrapper.find('input');

      await input.setValue('Updated value');
      await input.trigger('keydown', { key: 'Enter' });

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Updated value']);
      expect(wrapper.emitted('submit')?.[0]).toEqual(['Updated value']);

      wrapper.unmount();
    });

    it('cancels on escape without emitting value changes', async () => {
      const wrapper = mount(SEditable, {
        props: { defaultValue: 'Editable value' },
        attachTo: document.body
      });

      const preview = wrapper.find('span[tabindex="0"]');

      await preview.trigger('focusin');
      await nextTick();

      const input = wrapper.find('input');

      await input.setValue('Updated value');
      await input.trigger('keydown', { key: 'Escape' });
      await nextTick();

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      expect(input.element.hidden).toBe(true);

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents editing when disabled', async () => {
      const wrapper = mount(SEditable, {
        props: { defaultValue: 'Editable value', disabled: true },
        attachTo: document.body
      });

      const preview = wrapper.find('span[tabindex="-1"]');
      const editTrigger = wrapper.find('button[aria-label="Edit"]');

      await preview.trigger('focusin');
      await nextTick();

      expect(wrapper.find('input').element.hidden).toBe(true);
      expect((editTrigger.element as HTMLButtonElement).disabled).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when paired with a label', async () => {
      const wrapper = mount(
        {
          components: { SEditable },
          template: `
            <div>
              <label for="editable-input">Display name</label>
              <SEditable id="editable-input" start-with-edit-mode />
            </div>
          `
        },
        { attachTo: document.body }
      );

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
