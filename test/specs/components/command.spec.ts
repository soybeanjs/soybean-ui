import { DOMWrapper, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import SCommand from '../../../src/components/command/command.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  {
    label: 'Suggestions',
    value: 'suggestions',
    separator: true,
    items: [
      { label: 'Calendar', value: 'calendar', icon: 'lucide:calendar' },
      { label: 'Search Emoji', value: 'search-emoji', icon: 'lucide:smile' }
    ]
  },
  { label: 'Help', value: 'help', icon: 'lucide:help-circle', shortcut: ['command', 'h'] }
];

afterEach(() => {
  document.body.innerHTML = '';
});

describe('SCommand', () => {
  describe('rendering', () => {
    it('renders an input element and placeholder', () => {
      const wrapper = mount(SCommand, {
        props: {
          items,
          placeholder: 'Type a command...'
        },
        attachTo: document.body
      });

      const input = wrapper.get('input');

      expect(input.attributes('placeholder')).toBe('Type a command...');
      wrapper.unmount();
    });

    it('applies a custom class to the root element', () => {
      const wrapper = mount(SCommand, {
        props: {
          items,
          class: 'my-command'
        },
        attachTo: document.body
      });

      expect(wrapper.html()).toContain('my-command');
      wrapper.unmount();
    });

    it('renders grouped options when provided', () => {
      const wrapper = mount(SCommand, {
        props: {
          items
        },
        attachTo: document.body
      });

      expect(document.body.textContent).toContain('Suggestions');
      expect(document.body.textContent).toContain('Calendar');
      expect(document.body.textContent).toContain('Help');
      wrapper.unmount();
    });
  });

  describe('state', () => {
    it('emits update:searchTerm and filters results when typing', async () => {
      const wrapper = mount(SCommand, {
        props: {
          items
        },
        attachTo: document.body
      });

      await wrapper.get('input').setValue('help');

      expect(wrapper.emitted('update:searchTerm')?.at(-1)).toEqual(['help']);
      expect(document.body.textContent).toContain('Help');
      expect(document.body.textContent).not.toContain('Calendar');
      wrapper.unmount();
    });

    it('emits update:modelValue and select when an item is clicked', async () => {
      const wrapper = mount(SCommand, {
        props: {
          items
        },
        attachTo: document.body
      });

      const option = Array.from(document.body.querySelectorAll('[role="option"]')).find(node =>
        node.textContent?.includes('Help')
      );

      expect(option).toBeTruthy();

      await new DOMWrapper(option as Element).trigger('click');

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['help']);
      expect(wrapper.emitted('select')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('disables the input and prevents selection', async () => {
      const wrapper = mount(SCommand, {
        props: {
          items,
          disabled: true
        },
        attachTo: document.body
      });

      const input = wrapper.get('input');
      const option = Array.from(document.body.querySelectorAll('[role="option"]')).find(node =>
        node.textContent?.includes('Help')
      );

      expect((input.element as HTMLInputElement).disabled).toBe(true);
      expect(option?.getAttribute('data-disabled')).toBe('');

      await new DOMWrapper(option as Element).trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when paired with a label', async () => {
      const wrapper = mount(
        {
          components: { SCommand },
          data() {
            return { items };
          },
          template: `
            <div>
              <label for="command-input">Command</label>
              <SCommand :items="items" :input-props="{ controlProps: { id: 'command-input' } }" />
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
