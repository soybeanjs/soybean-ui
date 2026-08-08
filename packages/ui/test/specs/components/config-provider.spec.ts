import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { createTheme } from '@soybeanjs/theme';
import { THEME_STORAGE_KEY, getStoredThemeConfig } from '@soybeanjs/theme/storage';
import SAccordion from '@/components/accordion/accordion.vue';
import SConfigProvider from '@/components/config-provider/config-provider.vue';
import SIcon from '@/components/icon/icon.vue';
import { getA11yViolations } from '../../shared/a11y';

// 部分 mock 主题引擎：保留真实实现，仅包装 createTheme / getStoredThemeConfig
// 以便断言派生与存储读取的次数。
vi.mock('@soybeanjs/theme', async importOriginal => {
  const actual = await importOriginal<typeof import('@soybeanjs/theme')>();

  return {
    ...actual,
    createTheme: vi.fn(actual.createTheme)
  };
});

vi.mock('@soybeanjs/theme/storage', async importOriginal => {
  const actual = await importOriginal<typeof import('@soybeanjs/theme/storage')>();

  return {
    ...actual,
    getStoredThemeConfig: vi.fn(actual.getStoredThemeConfig)
  };
});

const accordionItems = [{ value: 'item-1', title: 'Section One', description: 'Content for section one.' }];

function getStyleEl(id: string): HTMLStyleElement | null {
  return document.getElementById(id) as HTMLStyleElement | null;
}

describe('SConfigProvider', () => {
  afterEach(() => {
    // useStyleTag (headless utilities) leaves style elements in <head>; the
    // inline theme <style> is removed with the component tree on unmount. Clear
    // leftovers between tests so assertions are not polluted by prior mounts.
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
    it('renders inline theme CSS variables', () => {
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

  describe('theme persistence', () => {
    const createThemeMock = vi.mocked(createTheme);
    const getStoredThemeConfigMock = vi.mocked(getStoredThemeConfig);

    beforeEach(() => {
      createThemeMock.mockClear();
      getStoredThemeConfigMock.mockClear();
      window.localStorage.clear();
    });

    it('reuses the derived theme when props stay stable', async () => {
      const wrapper = mount(SConfigProvider, {
        props: { persistTheme: true, theme: { base: 'gray' } },
        slots: { default: '<div />' },
        attachTo: document.body
      });

      expect(createThemeMock).toHaveBeenCalledTimes(1);

      // 无关 prop 变化触发重渲染，但不重新派生主题（内存缓存命中）
      await wrapper.setProps({ dir: 'rtl' });

      expect(createThemeMock).toHaveBeenCalledTimes(1);

      wrapper.unmount();
    });

    it('invalidates the derived theme when the theme prop changes', async () => {
      const wrapper = mount(SConfigProvider, {
        props: { persistTheme: true, theme: { base: 'gray' } },
        slots: { default: '<div />' },
        attachTo: document.body
      });

      expect(createThemeMock).toHaveBeenCalledTimes(1);

      await wrapper.setProps({ theme: { base: 'slate' } });

      expect(createThemeMock).toHaveBeenCalledTimes(2);

      wrapper.unmount();
    });

    it('invalidates the cache on a storage event for the theme key', async () => {
      const wrapper = mount(SConfigProvider, {
        props: { persistTheme: true, theme: { base: 'gray' } },
        slots: { default: '<div />' },
        attachTo: document.body
      });

      expect(createThemeMock).toHaveBeenCalledTimes(1);

      // 跨标签页写入：storage 事件置脏缓存，下一渲染重读存储并重新派生
      window.dispatchEvent(new StorageEvent('storage', { key: THEME_STORAGE_KEY }));

      await nextTick();

      expect(createThemeMock).toHaveBeenCalledTimes(2);

      wrapper.unmount();
    });

    it('fills keys not provided by theme from the injected themeConfig (SSR)', () => {
      const wrapper = mount(SConfigProvider, {
        props: {
          persistTheme: true,
          theme: { base: 'gray' },
          themeConfig: { base: 'slate', format: 'oklch' }
        },
        slots: { default: '<div />' },
        attachTo: document.body
      });

      // 显式 base 优先（gray）；themeConfig 的 format 补位（oklch）
      const lastTheme = createThemeMock.mock.calls.at(-1)?.[0];
      expect(lastTheme?.base).toBe('gray');
      expect(lastTheme?.format).toBe('oklch');

      // themeConfig 注入时无需读取 localStorage
      expect(getStoredThemeConfigMock).not.toHaveBeenCalled();

      wrapper.unmount();
    });

    it('prefers an inline preset over a stored { name } reference', () => {
      window.localStorage.setItem(
        'soybean-ui-theme-presets',
        JSON.stringify({
          version: 1,
          presets: {
            stored: { name: 'stored', version: '1.0.0', light: { primary: 'red.600' } }
          }
        })
      );

      const wrapper = mount(SConfigProvider, {
        props: {
          persistTheme: true,
          theme: { preset: { light: { primary: 'blue.600' } } }
        },
        slots: { default: '<div />' },
        attachTo: document.body
      });

      // 内联 preset 直接使用，解析为 overrides；base tokens 取默认值回落到顶层字段
      expect(createThemeMock.mock.calls.at(-1)?.[0]).toMatchObject({
        base: 'zinc',
        primary: 'indigo',
        size: 'md',
        radius: 'md',
        overrides: { light: { primary: 'blue.600' } }
      });

      wrapper.unmount();
    });

    it('falls back to built-in colors and warns on the server when a preset reference is missing', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const wrapper = mount(SConfigProvider, {
        props: {
          persistTheme: true,
          // SSR 语义：preset 缺失是真实问题（会与客户端产生主题闪烁），故告警
          isServer: true,
          theme: { preset: { name: 'missing' } }
        },
        slots: { default: '<div />' },
        attachTo: document.body
      });

      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('preset "missing" not found'));

      // 回退内置：仍生成主题 CSS
      expect(getStyleEl('__SoybeanUI_theme')?.textContent).toContain('--');

      warnSpy.mockRestore();
      wrapper.unmount();
    });

    it('ignores persistence props when persistTheme is disabled', () => {
      const wrapper = mount(SConfigProvider, {
        props: {
          persistTheme: false,
          theme: { base: 'gray' },
          themeConfig: { base: 'slate', format: 'oklch' }
        },
        slots: { default: '<div />' },
        attachTo: document.body
      });

      const lastTheme = createThemeMock.mock.calls.at(-1)?.[0];
      expect(lastTheme?.base).toBe('gray');
      expect(lastTheme?.format).toBeUndefined();

      // 持久化管道短路：不读取任何存储
      expect(getStoredThemeConfigMock).not.toHaveBeenCalled();

      wrapper.unmount();
    });
  });
});
