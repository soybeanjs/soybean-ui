import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import SToolbar from '../../../src/components/toolbar/toolbar.vue';
import SToolbarButton from '../../../src/components/toolbar/toolbar-button.vue';
import SToolbarLink from '../../../src/components/toolbar/toolbar-link.vue';
import SToolbarSeparator from '../../../src/components/toolbar/toolbar-separator.vue';
import SToolbarToggleGroup from '../../../src/components/toolbar/toolbar-toggle-group.vue';
import SToolbarToggleItem from '../../../src/components/toolbar/toolbar-toggle-item.vue';
import { getA11yViolations } from '../../shared/a11y';

function mountToolbar(props?: Record<string, unknown>) {
  return mount(SToolbar, {
    props,
    slots: {
      default: `
        <SToolbarButton>Cut</SToolbarButton>
        <SToolbarLink href="#">Website</SToolbarLink>
        <SToolbarSeparator />
        <SToolbarToggleGroup model-value="bold">
          <SToolbarToggleItem value="bold">Bold</SToolbarToggleItem>
          <SToolbarToggleItem value="italic">Italic</SToolbarToggleItem>
        </SToolbarToggleGroup>
      `
    },
    global: {
      components: {
        SToolbarButton,
        SToolbarLink,
        SToolbarSeparator,
        SToolbarToggleGroup,
        SToolbarToggleItem
      }
    },
    attachTo: document.body
  });
}

describe('SToolbar', () => {
  describe('rendering', () => {
    it('renders toolbar role and default orientation', () => {
      const wrapper = mountToolbar();
      expect(wrapper.attributes('role')).toBe('toolbar');
      expect(wrapper.attributes('aria-orientation')).toBe('horizontal');
      wrapper.unmount();
    });

    it('renders vertical separators inside a horizontal toolbar', () => {
      const wrapper = mountToolbar();
      expect(wrapper.find('[role="separator"]').attributes('data-orientation')).toBe('vertical');
      wrapper.unmount();
    });

    it('renders a vertical toolbar', () => {
      const wrapper = mountToolbar({ orientation: 'vertical' });
      expect(wrapper.attributes('aria-orientation')).toBe('vertical');
      expect(wrapper.find('[role="separator"]').attributes('data-orientation')).toBe('horizontal');
      wrapper.unmount();
    });
  });

  describe('button and link interaction', () => {
    it('emits click when a toolbar button is clicked', async () => {
      const wrapper = mount(SToolbarButton, {
        slots: { default: 'Cut' },
        attachTo: document.body
      });
      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
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
            <SToolbar>
              <SToolbarToggleGroup v-model="value">
                <SToolbarToggleItem value="bold">Bold</SToolbarToggleItem>
                <SToolbarToggleItem value="italic">Italic</SToolbarToggleItem>
              </SToolbarToggleGroup>
            </SToolbar>
          `
        },
        {
          attachTo: document.body
        }
      );

      const buttons = wrapper.findAll('button');

      await buttons[1].trigger('click');

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
