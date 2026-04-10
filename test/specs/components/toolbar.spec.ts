import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import SConfigProvider from '../../../src/components/config-provider/config-provider.vue';
import {
  SToolbar,
  SToolbarButton,
  SToolbarLink,
  SToolbarSeparator,
  SToolbarToggleGroup,
  SToolbarToggleItem
} from '../../../src/components/toolbar';
import { getA11yViolations } from '../../shared/a11y';

function mountToolbar(props?: Record<string, unknown>) {
  return mount(
    {
      components: {
        SConfigProvider,
        SToolbar,
        SToolbarButton,
        SToolbarLink,
        SToolbarSeparator,
        SToolbarToggleGroup,
        SToolbarToggleItem
      },
      setup() {
        return {
          toolbarProps: props ?? {}
        };
      },
      template: `
        <SConfigProvider>
          <SToolbar v-bind="toolbarProps">
            <SToolbarButton>Cut</SToolbarButton>
            <SToolbarLink href="#">Website</SToolbarLink>
            <SToolbarSeparator />
            <SToolbarToggleGroup model-value="bold">
              <SToolbarToggleItem value="bold">Bold</SToolbarToggleItem>
              <SToolbarToggleItem value="italic">Italic</SToolbarToggleItem>
            </SToolbarToggleGroup>
          </SToolbar>
        </SConfigProvider>
      `
    },
    {
      attachTo: document.body
    }
  );
}

describe('SToolbar', () => {
  describe('rendering', () => {
    it('renders toolbar role and default orientation', () => {
      const wrapper = mountToolbar();
      const toolbar = wrapper.find('[role="toolbar"]');

      expect(toolbar.attributes('aria-orientation')).toBe('horizontal');
      wrapper.unmount();
    });

    it('injects toolbar slot classes from the root ui prop', () => {
      const wrapper = mountToolbar({
        class: 'toolbar-root',
        ui: {
          button: 'toolbar-button',
          toggleItem: 'toolbar-toggle-item'
        }
      });

      expect(wrapper.find('[role="toolbar"]').classes()).toContain('toolbar-root');
      expect(wrapper.find('button').classes()).toContain('toolbar-button');
      expect(wrapper.findAll('button')[1].classes()).toContain('toolbar-toggle-item');
      wrapper.unmount();
    });

    it('renders vertical separators inside a horizontal toolbar', () => {
      const wrapper = mountToolbar();
      expect(wrapper.find('[role="separator"]').attributes('data-orientation')).toBe('vertical');
      wrapper.unmount();
    });

    it('renders a vertical toolbar', () => {
      const wrapper = mountToolbar({ orientation: 'vertical' });
      const toolbar = wrapper.find('[role="toolbar"]');

      expect(toolbar.attributes('aria-orientation')).toBe('vertical');
      expect(wrapper.find('[role="separator"]').attributes('data-orientation')).toBe('horizontal');
      wrapper.unmount();
    });
  });

  describe('button and link interaction', () => {
    it('emits click when a toolbar button is clicked', async () => {
      const onClick = vi.fn();
      const wrapper = mount(
        {
          components: {
            SConfigProvider,
            SToolbar,
            SToolbarButton
          },
          setup() {
            return {
              onClick
            };
          },
          template: `
            <SConfigProvider>
              <SToolbar>
                <SToolbarButton @click="onClick">Cut</SToolbarButton>
              </SToolbar>
            </SConfigProvider>
          `
        },
        {
          attachTo: document.body
        }
      );

      await wrapper.find('button').trigger('click');

      expect(onClick).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it('clicks the toolbar link when pressing space', async () => {
      const wrapper = mountToolbar();
      const link = wrapper.find('a');
      const onClick = vi.fn((event: Event) => event.preventDefault());
      link.element.addEventListener('click', onClick);

      await link.trigger('keydown', { key: ' ' });

      expect(onClick).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });
  });

  describe('toggle state', () => {
    it('updates modelValue for toolbar toggle groups', async () => {
      const wrapper = mount(
        {
          components: {
            SConfigProvider,
            SToolbar,
            SToolbarToggleGroup,
            SToolbarToggleItem
          },
          data() {
            return {
              value: 'bold'
            };
          },
          template: `
            <SConfigProvider>
              <SToolbar>
                <SToolbarToggleGroup v-model="value">
                  <SToolbarToggleItem value="bold">Bold</SToolbarToggleItem>
                  <SToolbarToggleItem value="italic">Italic</SToolbarToggleItem>
                </SToolbarToggleGroup>
              </SToolbar>
            </SConfigProvider>
          `
        },
        {
          attachTo: document.body
        }
      );

      await wrapper.findAll('button')[1].trigger('click');

      const buttons = wrapper.findAll('button');

      expect(buttons[0].attributes('aria-pressed')).toBe('false');
      expect(buttons[1].attributes('aria-pressed')).toBe('true');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mountToolbar();
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
