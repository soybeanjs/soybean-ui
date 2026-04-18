import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SConfigProvider from '../../../src/components/config-provider/config-provider.vue';
import SClipboard from '../../../src/components/clipboard/clipboard.vue';
import type { ClipboardProps } from '../../../src/components/clipboard/types';
import { getA11yViolations } from '../../shared/a11y';

const writeText = vi.fn(async () => undefined);
const execCommand = vi.fn(() => true);
const createPermissionStatus = () => ({
  state: 'granted' as const,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn()
});

type ClipboardTestSlotValue = string | ((props: Record<string, unknown>) => string);

type ClipboardTestSlots = Record<string, ClipboardTestSlotValue> & {
  leading?: ClipboardTestSlotValue;
  default?: ClipboardTestSlotValue;
  trailing?: ClipboardTestSlotValue;
};

function mountClipboard(props: Partial<ClipboardProps> = {}, slots: ClipboardTestSlots = {}) {
  return mount(SClipboard, {
    attachTo: document.body,
    props: {
      value: 'soybean-ui',
      ...props
    },
    slots
  });
}

beforeEach(() => {
  writeText.mockClear();
  execCommand.mockClear();

  Object.defineProperty(window.navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText
    }
  });

  Object.defineProperty(window.navigator, 'permissions', {
    configurable: true,
    value: {
      query: vi.fn(async () => createPermissionStatus())
    }
  });

  Object.defineProperty(window, 'isSecureContext', {
    configurable: true,
    value: true
  });

  Object.defineProperty(document, 'execCommand', {
    configurable: true,
    value: execCommand
  });
});

describe('SClipboard', () => {
  describe('rendering', () => {
    it('renders default icon/text content from the headless layer', () => {
      const wrapper = mount(
        {
          components: {
            SClipboard,
            SConfigProvider
          },
          setup() {
            return {
              iconRender: (icon: string) => h('span', { 'data-testid': 'icon' }, icon)
            };
          },
          template: `
            <SConfigProvider :icon-render="iconRender">
              <SClipboard value="soybean-ui" />
            </SConfigProvider>
          `
        },
        {
          attachTo: document.body
        }
      );

      expect(wrapper.text()).toContain('Copy');
      expect(wrapper.find('[data-testid="icon"]').text()).toBe('lucide:copy');
      wrapper.unmount();
    });

    it('applies custom class', () => {
      const wrapper = mountClipboard({ class: 'my-clipboard-class' }, { default: 'Copy' });

      expect(wrapper.find('button').classes()).toContain('my-clipboard-class');
      wrapper.unmount();
    });

    it('renders leading and trailing slots', () => {
      const wrapper = mountClipboard(
        {},
        {
          leading: '<span data-testid="leading">L</span>',
          default: 'Copy',
          trailing: '<span data-testid="trailing">T</span>'
        }
      );

      expect(wrapper.find('[data-testid="leading"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="trailing"]').exists()).toBe(true);
      wrapper.unmount();
    });

    it('allows overriding the default icon and text via slots', () => {
      const wrapper = mountClipboard(
        {},
        {
          leading: '<span data-testid="leading">override-icon</span>',
          default: 'override-text'
        }
      );

      expect(wrapper.find('[data-testid="leading"]').text()).toBe('override-icon');
      expect(wrapper.text()).toContain('override-text');
      wrapper.unmount();
    });
  });

  describe('copied state', () => {
    it('copies the value and reflects copied state', async () => {
      const wrapper = mountClipboard();

      expect(wrapper.find('button').attributes('data-state')).toBe('ready');

      await wrapper.find('button').trigger('click');
      await Promise.resolve();
      await nextTick();

      expect(wrapper.find('button').attributes('data-state')).toBe('copied');
      expect(wrapper.text()).toContain('Copied');
      expect(wrapper.emitted('copied')?.[0]).toEqual(['soybean-ui']);
      wrapper.unmount();
    });

    it('falls back to legacy copy when clipboard writing is unavailable', async () => {
      Object.defineProperty(window.navigator, 'clipboard', {
        configurable: true,
        value: undefined
      });

      const wrapper = mountClipboard({}, { default: 'Copy' });

      await wrapper.find('button').trigger('click');
      await Promise.resolve();
      await nextTick();

      expect(execCommand).toHaveBeenCalledWith('copy');
      expect(wrapper.find('button').attributes('data-state')).toBe('copied');
      expect(wrapper.emitted('copied')?.[0]).toEqual(['soybean-ui']);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents copy interaction when disabled', async () => {
      const wrapper = mountClipboard({ disabled: true }, { default: 'Copy' });

      const button = wrapper.find('button');

      expect(button.attributes('aria-disabled')).toBe('true');
      await button.trigger('click');

      expect(writeText).not.toHaveBeenCalled();
      expect(wrapper.emitted('click')).toBeFalsy();
      expect(wrapper.emitted('copied')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mountClipboard({}, { default: 'Copy command' });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
