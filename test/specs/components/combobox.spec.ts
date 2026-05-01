import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import SCombobox from '../../../src/components/combobox/combobox.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];

describe('SCombobox', () => {
  describe('rendering', () => {
    it('renders placeholder text', () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          placeholder: 'Select a fruit'
        },
        attachTo: document.body
      });

      expect(wrapper.get('button').text()).toContain('Select a fruit');
      wrapper.unmount();
    });

    it('applies custom class', () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          class: 'my-combobox'
        },
        attachTo: document.body
      });

      expect(wrapper.get('button').classes()).toContain('my-combobox');
      wrapper.unmount();
    });

    it('shows empty slot when there are no options', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items: [],
          emptyLabel: 'Nothing here'
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');

      expect(document.body.textContent).toContain('Nothing here');
      wrapper.unmount();
    });

    it('does not show empty state on first open when options exist', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          emptyLabel: 'Nothing here'
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(document.body.textContent).not.toContain('Nothing here');
      expect(document.body.querySelectorAll('[role="option"]')).toHaveLength(items.length);
      wrapper.unmount();
    });
  });

  describe('selection state', () => {
    it('reflects the selected label from modelValue', () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          modelValue: 'banana'
        },
        attachTo: document.body
      });

      expect(wrapper.get('button').text()).toContain('Banana');
      wrapper.unmount();
    });

    it('reflects the selected label from defaultValue in uncontrolled mode', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          defaultValue: 'banana'
        },
        attachTo: document.body
      });

      expect(wrapper.get('button').text()).toContain('Banana');

      await wrapper.get('button').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      const input = document.body.querySelector('input[role="combobox"]') as HTMLInputElement | null;

      expect(input?.value).toBe('Banana');
      wrapper.unmount();
    });

    it('shows the selected label inside the search input when opened', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          modelValue: 'banana'
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      const input = document.body.querySelector('input[role="combobox"]') as HTMLInputElement | null;

      expect(input?.value).toBe('Banana');
      wrapper.unmount();
    });

    it('does not show empty state when opened with an initial value', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          modelValue: 'banana',
          emptyLabel: 'Nothing here'
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      const input = document.body.querySelector('input[role="combobox"]') as HTMLInputElement | null;

      expect(input?.value).toBe('Banana');
      expect(document.body.textContent).not.toContain('Nothing here');
      expect(document.body.querySelectorAll('[role="option"]')).toHaveLength(items.length);
      wrapper.unmount();
    });

    it('emits update:modelValue and select on interaction', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          placeholder: 'Select a fruit'
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');
      await wrapper.vm.$nextTick();

      const option = document.body.querySelector('[role="option"]') as HTMLElement | null;
      expect(option).not.toBeNull();

      option?.click();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('select')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['apple']);
      wrapper.unmount();
    });

    it('emits undefined when clearable reset is enabled', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          modelValue: 'banana',
          clearable: true,
          resetModelValueOnClear: true,
          clearLabel: 'Clear selection'
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');
      await wrapper.vm.$nextTick();

      const clearButton = document.body.querySelector('[aria-label="Clear selection"]') as HTMLButtonElement | null;
      expect(clearButton).not.toBeNull();

      clearButton?.click();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([undefined]);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents interaction when disabled', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          disabled: true,
          placeholder: 'Disabled'
        },
        attachTo: document.body
      });

      const trigger = wrapper.get('button');
      expect(trigger.attributes('disabled')).toBeDefined();

      await trigger.trigger('click');
      expect(document.body.querySelector('[role="listbox"]')).toBeNull();
      expect(wrapper.emitted('update:open')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('does not hide the trigger tree or popup tree when opened', async () => {
      vi.stubEnv('MODE', 'development');

      const host = document.createElement('div');
      const sibling = document.createElement('div');

      sibling.textContent = 'Outside content';

      document.body.append(host, sibling);

      const wrapper = mount(SCombobox, {
        props: {
          items,
          placeholder: 'Select a fruit'
        },
        attachTo: host
      });

      await wrapper.get('button').trigger('click');
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      const popup = document.body.querySelector('[role="listbox"]');

      expect(wrapper.get('button').element.closest('[aria-hidden="true"]')).toBeNull();
      expect(popup?.closest('[aria-hidden="true"]')).toBeNull();
      expect(host.getAttribute('aria-hidden')).not.toBe('true');
      expect(sibling.getAttribute('aria-hidden')).toBe('true');

      wrapper.unmount();
      host.remove();
      sibling.remove();
      vi.unstubAllEnvs();
    });

    it('has no a11y violations', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          placeholder: 'Select a fruit'
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');

      const violations = await getA11yViolations(document.body, {
        rules: {
          region: { enabled: false }
        }
      });
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
