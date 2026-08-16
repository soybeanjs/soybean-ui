import { defineComponent, h } from 'vue';
import type { Component } from 'vue';
import { SConfigProvider } from '@soybeanjs/ui';
import type { ConfigProviderProps } from '@soybeanjs/ui';
import { render } from 'vitest-browser-vue';

export interface AdminRenderOptions {
  props?: Record<string, unknown>;
  slots?: Record<string, unknown>;
  /**
   * Wrap the component in `SConfigProvider` so theme CSS variables are injected
   * into the document as a `<style>` tag — required for real color-contrast a11y.
   */
  withTheme?: boolean | Partial<ConfigProviderProps['theme']>;
}

/**
 * Render an `@soybeanjs/ui` component (or an admin shell) into the real browser
 * DOM using `vitest-browser-vue`. Use `page` / `userEvent` from `vitest/browser`
 * for locators and interactions, and `expect.element(locator)` for assertions.
 */
export function renderComponent<T extends Component>(component: T, options: AdminRenderOptions = {}) {
  const { withTheme, props, slots } = options;

  if (!withTheme) {
    return render(component, { props, slots } as Parameters<typeof render<T>>[1]);
  }

  const theme = typeof withTheme === 'object' ? withTheme : {};

  const Wrapper = defineComponent({
    name: 'SoybeanAdminTestThemeProvider',
    setup() {
      return () =>
        h(
          SConfigProvider,
          { theme },
          {
            default: () => h(component as Component, props as Record<string, unknown>, slots as Record<string, unknown>)
          }
        );
    }
  });

  return render(Wrapper);
}
