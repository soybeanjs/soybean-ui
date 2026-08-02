import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SAccordion from '@/components/accordion/accordion.vue';
import SConfigProvider from '@/components/config-provider/config-provider.vue';
import SIcon from '@/components/icon/icon.vue';
import { getA11yViolations } from '../../shared/a11y';

const accordionItems = [{ value: 'item-1', title: 'Section One', description: 'Content for section one.' }];

function getStyleEl(id: string): HTMLStyleElement | null {
  return document.getElementById(id) as HTMLStyleElement | null;
}

describe('SConfigProvider', () => {
  afterEach(() => {
    // useStyleTag leaves style elements in <head>; clear them between tests so
    // assertions about presence/content are not polluted by prior mounts.
    getStyleEl('__SoybeanUI_theme')?.remove();
    getStyleEl('__SoybeanHeadless_Styles')?.remove();
    getStyleEl('__SoybeanUI_toastStyle')?.remove();
  });

  describe('rendering', () => {
    it('renders default slot content', () => {
      const wrapper = mount(SConfigProvider, {
        slots: { default: '<div data-child>Child content</div>' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-child]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('renders nested components', () => {
      const wrapper = mount(SConfigProvider, {
        slots: {
          default: '<button type="button" data-testid="btn">Click</button>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-testid="btn"]').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('theme injection', () => {
    it('injects theme CSS variables into the document head', () => {
      const wrapper = mount(SConfigProvider, {
        props: { theme: { base: 'gray', primary: 'violet' } },
        slots: { default: '<div />' },
        attachTo: document.body
      });

      const styleEl = getStyleEl('__SoybeanUI_theme');
      expect(styleEl).toBeTruthy();
      expect(styleEl!.textContent).toContain('--');

      wrapper.unmount();
    });

    it('updates theme CSS when theme prop changes', async () => {
      const wrapper = mount(SConfigProvider, {
        props: { theme: { base: 'gray', primary: 'violet' } },
        slots: { default: '<div />' },
        attachTo: document.body
      });

      const firstCss = getStyleEl('__SoybeanUI_theme')?.textContent ?? '';

      await wrapper.setProps({ theme: { base: 'slate', primary: 'blue' } });

      const secondCss = getStyleEl('__SoybeanUI_theme')?.textContent ?? '';
      expect(secondCss).toBeTruthy();
      expect(secondCss).not.toBe(firstCss);

      wrapper.unmount();
    });

    it('injects headless utility CSS classes', () => {
      const wrapper = mount(SConfigProvider, {
        slots: { default: '<div />' },
        attachTo: document.body
      });

      const styleEl = getStyleEl('__SoybeanHeadless_Styles');
      expect(styleEl).toBeTruthy();
      expect(styleEl!.textContent).toContain('soybean-headless-sr-only');
      expect(styleEl!.textContent).toContain('soybean-headless-scrollbar-hidden');

      wrapper.unmount();
    });
  });

  describe('direction and locale', () => {
    it('derives dir from locale (ar → rtl)', () => {
      const wrapper = mount(
        {
          components: { SConfigProvider, SAccordion },
          data: () => ({ accordionItems }),
          template: '<SConfigProvider locale="ar"><SAccordion :items="accordionItems" /></SConfigProvider>'
        },
        { attachTo: document.body }
      );

      expect(wrapper.find('[data-soybean-accordion-root]').attributes('dir')).toBe('rtl');

      wrapper.unmount();
    });

    it('derives dir from locale (en → ltr)', () => {
      const wrapper = mount(
        {
          components: { SConfigProvider, SAccordion },
          data: () => ({ accordionItems }),
          template: '<SConfigProvider locale="en"><SAccordion :items="accordionItems" /></SConfigProvider>'
        },
        { attachTo: document.body }
      );

      expect(wrapper.find('[data-soybean-accordion-root]').attributes('dir')).toBe('ltr');

      wrapper.unmount();
    });

    it('explicit dir overrides locale-derived direction', () => {
      const wrapper = mount(
        {
          components: { SConfigProvider, SAccordion },
          data: () => ({ accordionItems }),
          template: '<SConfigProvider locale="ar" dir="ltr"><SAccordion :items="accordionItems" /></SConfigProvider>'
        },
        { attachTo: document.body }
      );

      expect(wrapper.find('[data-soybean-accordion-root]').attributes('dir')).toBe('ltr');

      wrapper.unmount();
    });

    it('defaults to ltr when locale is unknown', () => {
      const wrapper = mount(
        {
          components: { SConfigProvider, SAccordion },
          data: () => ({ accordionItems }),
          template: '<SConfigProvider locale="unknown-xx"><SAccordion :items="accordionItems" /></SConfigProvider>'
        },
        { attachTo: document.body }
      );

      expect(wrapper.find('[data-soybean-accordion-root]').attributes('dir')).toBe('ltr');

      wrapper.unmount();
    });
  });

  describe('provider composition', () => {
    it('renders ToastProvider by default', () => {
      const wrapper = mount(SConfigProvider, {
        slots: { default: '<div />' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-toast-provider]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('does not render ToastProvider when customToast is true', () => {
      const wrapper = mount(SConfigProvider, {
        props: { customToast: true },
        slots: { default: '<div />' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-toast-provider]').exists()).toBe(false);

      wrapper.unmount();
    });
  });

  describe('context propagation', () => {
    it('provides default iconify size to child SIcon', () => {
      const wrapper = mount(
        {
          components: { SConfigProvider, SIcon },
          template: '<SConfigProvider><SIcon icon="mdi:home" /></SConfigProvider>'
        },
        { attachTo: document.body }
      );

      const svg = wrapper.find('svg');
      expect(svg.exists()).toBe(true);
      expect(svg.attributes('width')).toBe('1.25em');
      expect(svg.attributes('height')).toBe('1.25em');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SConfigProvider, {
        slots: { default: '<div>Accessible provider content</div>' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
