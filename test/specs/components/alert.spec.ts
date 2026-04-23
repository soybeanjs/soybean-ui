import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SAlert from '../../../src/components/alert/alert.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SAlert', () => {
  describe('rendering', () => {
    it('renders title and description props', () => {
      const wrapper = mount(SAlert, {
        props: {
          title: 'Heads up',
          description: 'This alert is rendered from props.'
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Heads up');
      expect(wrapper.text()).toContain('This alert is rendered from props.');
      wrapper.unmount();
    });

    it('applies a custom class to the root element', () => {
      const wrapper = mount(SAlert, {
        props: {
          class: 'custom-alert-class',
          title: 'Heads up'
        },
        attachTo: document.body
      });

      expect(wrapper.classes()).toContain('custom-alert-class');
      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('does not render when open is false', () => {
      const wrapper = mount(SAlert, {
        props: {
          open: false,
          title: 'Hidden alert'
        },
        attachTo: document.body
      });

      expect(wrapper.html()).toBe('<!--v-if-->');
      wrapper.unmount();
    });

    it('closes and emits update:open when the close button is clicked', async () => {
      const wrapper = mount(SAlert, {
        props: {
          closable: true,
          title: 'Dismissible alert'
        },
        attachTo: document.body
      });

      const closeButton = wrapper.find('button');

      expect(closeButton.attributes('aria-label')).toBe('Close alert');

      await closeButton.trigger('click');

      expect(wrapper.emitted('update:open')).toEqual([[false]]);
      expect(wrapper.html()).toBe('<!--v-if-->');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SAlert, {
        props: {
          closable: true,
          title: 'Accessible alert',
          description: 'Alert description'
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
