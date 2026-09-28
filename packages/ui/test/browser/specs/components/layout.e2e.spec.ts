import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';
import { page } from 'vitest/browser';
import SLayout from '@/components/layout/layout.vue';
import type { LayoutProps } from '@/components/layout/types';
import { renderComponent } from '../../shared/render';

/**
 * Layout mobile geometry e2e — real CSS cascade, real custom-property
 * inheritance.
 *
 * The happy-dom unit spec asserts the CSS variables the headless root writes.
 * That is not enough for the mobile fix: the sidebar-derived gaps reach the
 * slots through a second layer of `--sl-*` aliases owned by the `scv()` recipe,
 * and only a real browser resolves that chain (inline custom property → alias →
 * `margin-inline-start`). Together the two specs cover both the value the root
 * emits and the geometry it produces.
 *
 * The critical scene is `isMobile` at a *desktop-width* viewport: the CSS
 * `lt-md:hidden` fallback can never see it, so only the prop-driven collapse
 * keeps the content from reserving room for a sidebar that is now a drawer.
 */
const SIDEBAR_WIDTH_PX = 240;
const SPACING_PX = 16;
const HALF_SPACING_PX = SPACING_PX / 2;

function createHarness(props: LayoutProps) {
  return defineComponent({
    name: 'LayoutGeometryHarness',
    setup() {
      return () =>
        h(
          'div',
          { style: 'height: 700px' },
          h(SLayout, props, {
            sidebar: () => h('div', 'Sidebar'),
            default: () => h('div', 'Main')
          })
        );
    }
  });
}

function element(selector: string): HTMLElement {
  const found = document.querySelector<HTMLElement>(selector);

  if (!found) {
    throw new Error(`expected "${selector}" to be rendered`);
  }

  return found;
}

/**
 * The layout animates its first paint (theme default → derived width), so a gap
 * measured immediately after mount can read a half-applied value.
 */
async function expectMainGap(startPx: number, endPx: number) {
  await vi.waitFor(() => {
    const style = getComputedStyle(element('[data-soybean-layout-main]'));

    expect(style.marginInlineStart).toBe(`${startPx}px`);
    expect(style.marginInlineEnd).toBe(`${endPx}px`);
  });
}

async function renderLayout(props: LayoutProps) {
  const { unmount } = await renderComponent(createHarness(props));

  return unmount;
}

describe('SLayout geometry', () => {
  beforeEach(async () => {
    await page.viewport(1280, 800);
  });

  it('reserves the sidebar width for the content on desktop', async () => {
    const unmount = await renderLayout({});

    await expectMainGap(SIDEBAR_WIDTH_PX, 0);

    unmount();
  });

  /**
   * The default path: no `isMobile` prop at all, just a phone-width viewport.
   * Real `matchMedia` drives it, so this proves the `useMediaQuery` fallback
   * needs no host wiring.
   */
  it('follows the viewport by default on a phone viewport', async () => {
    await page.viewport(390, 800);

    const unmount = await renderLayout({});

    await expectMainGap(0, 0);
    expect(document.querySelector('[data-soybean-layout-sidebar]')).toBeNull();

    unmount();
  });

  /**
   * The scene a media query cannot cover: a mobile layout on a wide viewport.
   * The sidebar is a drawer, so nothing may be reserved for it.
   */
  it('reserves no space for the drawer when isMobile is true at a desktop width', async () => {
    const unmount = await renderLayout({ isMobile: true });

    await expectMainGap(0, 0);

    // The desktop sidebar is replaced by the drawer, not merely hidden.
    expect(document.querySelector('[data-soybean-layout-sidebar]')).toBeNull();

    await vi.waitFor(() => {
      const main = element('[data-soybean-layout-main]');
      const root = element('[data-soybean-layout-root]');

      expect(Math.abs(main.getBoundingClientRect().width - root.getBoundingClientRect().width)).toBeLessThanOrEqual(1);
    });

    unmount();
  });

  it('reserves no space for the drawer on a phone viewport', async () => {
    await page.viewport(390, 800);

    const unmount = await renderLayout({ isMobile: true });

    await expectMainGap(0, 0);

    unmount();
  });

  /**
   * `inset` keeps its identity on mobile by insetting the shell symmetrically:
   * the start gap falls back to the end gap instead of to the sidebar width.
   */
  it('insets the shell symmetrically for the inset variant on mobile', async () => {
    const unmount = await renderLayout({ isMobile: true, variant: 'inset' });

    await expectMainGap(HALF_SPACING_PX, HALF_SPACING_PX);

    unmount();
  });

  /**
   * Guards the desktop half of the fix: the sidebar-adjacent spacing `floating`
   * adds on top of the sidebar width must survive the mobile gating.
   */
  it('keeps the sidebar-adjacent spacing for the floating variant on desktop', async () => {
    const unmount = await renderLayout({ isMobile: false, variant: 'floating' });

    await expectMainGap(SIDEBAR_WIDTH_PX + SPACING_PX, 0);

    unmount();
  });
});
