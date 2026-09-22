import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils';
import SConfigProvider from '@/components/config-provider/config-provider.vue';
import SThemeModeSelect from '@/components/theme-mode-select/theme-mode-select.vue';
import { MockResizeObserver, setupMock } from '../../shared';

const mousePointerDown = {
  button: 0,
  ctrlKey: false,
  pageX: 0,
  pageY: 0,
  pointerId: 1,
  pointerType: 'mouse'
};

const mockHTMLElementProp = <K extends keyof HTMLElement>(property: K, value: HTMLElement[K]) => {
  const descriptor = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, property);

  Object.defineProperty(window.HTMLElement.prototype, property, {
    configurable: true,
    value
  });

  return () => {
    if (descriptor) {
      Object.defineProperty(window.HTMLElement.prototype, property, descriptor);
      return;
    }

    Reflect.deleteProperty(window.HTMLElement.prototype, property);
  };
};

let cleanupFunctions: Array<() => void> = [];

beforeEach(() => {
  cleanupFunctions = [
    mockHTMLElementProp('releasePointerCapture', vi.fn() as HTMLElement['releasePointerCapture']),
    mockHTMLElementProp('hasPointerCapture', vi.fn(() => false) as HTMLElement['hasPointerCapture']),
    mockHTMLElementProp('scrollIntoView', vi.fn() as HTMLElement['scrollIntoView'])
  ];
  cleanupFunctions.push(setupMock('ResizeObserver', MockResizeObserver as typeof ResizeObserver));
});

afterEach(() => {
  while (cleanupFunctions.length) {
    cleanupFunctions.pop()?.();
  }

  document.body.innerHTML = '';
  document.documentElement.classList.remove('dark');
  window.localStorage.clear();
});

const mountInProvider = () =>
  mount(
    {
      components: { SConfigProvider, SThemeModeSelect },
      template: '<SConfigProvider><SThemeModeSelect /></SConfigProvider>'
    },
    { attachTo: document.body }
  );

const openListbox = async (wrapper: ReturnType<typeof mount>) => {
  await wrapper.get('button').trigger('pointerdown', mousePointerDown);
  await nextTick();
};

const selectOption = async (label: string) => {
  const option = Array.from(document.body.querySelectorAll('[role="option"]')).find(node =>
    node.textContent?.includes(label)
  );

  expect(option, `option "${label}" should be rendered`).toBeTruthy();

  await new DOMWrapper(option as Element).trigger('keydown', { key: 'Enter' });
  await flushPromises();
  await nextTick();
  await nextTick();
};

describe('SThemeModeSelect', () => {
  describe('rendering', () => {
    it('renders a select trigger showing the current mode', () => {
      const wrapper = mountInProvider();
      expect(wrapper.get('button').text()).toContain('light');
      wrapper.unmount();
    });

    it('renders the three mode options when opened', async () => {
      const wrapper = mountInProvider();
      await openListbox(wrapper);

      const options = Array.from(document.body.querySelectorAll('[role="option"]'));
      const labels = options.map(node => node.textContent ?? '');

      expect(labels.some(text => text.includes('auto'))).toBe(true);
      expect(labels.some(text => text.includes('light'))).toBe(true);
      expect(labels.some(text => text.includes('dark'))).toBe(true);

      wrapper.unmount();
    });
  });

  describe('interaction', () => {
    it('switches the theme to dark when Dark is selected', async () => {
      const wrapper = mountInProvider();
      await openListbox(wrapper);

      await selectOption('dark');

      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(wrapper.get('button').text()).toContain('dark');

      wrapper.unmount();
    });

    /**
     * `color-scheme` must follow the toggle, not only the `.dark` class.
     *
     * The first-paint script writes it as an **inline** style on `<html>`, and an
     * inline style outranks every selector — so if the runtime only toggles the
     * class, the stale inline value wins over the `.dark` block forever and the
     * UA-drawn surfaces (scrollbars, form controls, canvas) stay light. The
     * emitted CSS is correct either way, which is why only a runtime test can
     * catch this.
     */
    it('keeps the inline color-scheme in step with the class toggle', async () => {
      const wrapper = mountInProvider();
      await openListbox(wrapper);

      await selectOption('dark');
      expect(document.documentElement.style.colorScheme).toBe('dark');

      await wrapper.get('button').trigger('pointerdown', mousePointerDown);
      await nextTick();

      await selectOption('light');
      expect(document.documentElement.style.colorScheme).toBe('light');

      wrapper.unmount();
    });

    it('switches back to light when Light is selected', async () => {
      const wrapper = mountInProvider();
      await openListbox(wrapper);
      await selectOption('dark');

      await wrapper.get('button').trigger('pointerdown', mousePointerDown);
      await nextTick();

      await selectOption('light');

      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(wrapper.get('button').text()).toContain('light');

      wrapper.unmount();
    });

    it('supports auto mode selection', async () => {
      const wrapper = mountInProvider();
      await openListbox(wrapper);
      await selectOption('auto');

      expect(wrapper.get('button').text()).toContain('auto');
      wrapper.unmount();
    });

    it('resolves auto to the OS scheme and follows OS changes', async () => {
      // 可控的 prefers-color-scheme mock：初始为 light
      let dark = false;
      const listeners = new Set<(event: MediaQueryListEvent) => void>();
      const mql = {
        get matches() {
          return dark;
        },
        media: '(prefers-color-scheme: dark)',
        addEventListener: (_type: string, cb: (event: MediaQueryListEvent) => void) => listeners.add(cb),
        removeEventListener: (_type: string, cb: (event: MediaQueryListEvent) => void) => listeners.delete(cb)
      } as unknown as MediaQueryList;
      const setDark = (value: boolean) => {
        dark = value;
        listeners.forEach(cb => cb({ matches: value } as MediaQueryListEvent));
      };

      const originalMatchMedia = window.matchMedia;
      window.matchMedia = vi.fn().mockReturnValue(mql) as unknown as typeof window.matchMedia;

      try {
        const wrapper = mountInProvider();

        expect(document.documentElement.classList.contains('dark')).toBe(false);

        await openListbox(wrapper);
        await selectOption('auto');

        // 系统仍为 light → 不应用 dark class
        expect(wrapper.get('button').text()).toContain('auto');
        expect(document.documentElement.classList.contains('dark')).toBe(false);

        // 系统切换到 dark → auto 跟随解析
        setDark(true);
        await nextTick();
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        // 系统切回 light → auto 跟随恢复
        setDark(false);
        await nextTick();
        expect(document.documentElement.classList.contains('dark')).toBe(false);

        wrapper.unmount();
      } finally {
        window.matchMedia = originalMatchMedia;
      }
    });
  });
});
