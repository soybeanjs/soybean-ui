// @unocss-include
import { scv } from '@soybeanjs/cva';

/**
 * Style recipe for `SAppShell`.
 *
 * `layout*` slots are not rendered by the shell itself: they are merged into
 * the `SLayout` `ui` map so the shell can theme regions it does not own the
 * markup of. Every other slot maps to a node the shell renders.
 *
 * Mode differences are expressed through the `data-mode` attribute on the
 * shell root (see the wrapper), so no mode variant is needed here.
 */
export const appShellVariants = scv({
  slots: {
    root: 'h-full',
    sidebar: 'flex flex-col w-full h-full min-h-0',
    logo: 'flex shrink-0 items-center gap-2 h-[--soybean-layout-header-height] px-[--sl-spacing] overflow-hidden',
    menuSidebar: [
      'flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden',
      // The nested pane leaves the flow when the sidebar is collapsed, so the
      // region must stop clipping it: it anchors to the sidebar wrapper instead.
      'data-[overlay=true]:overflow-visible'
    ],
    menuOverlay:
      'absolute inset-y-0 start-full z-[--soybean-layout-sidebar-z-index] bg-sidebar border-e border-border shadow-lg',
    menuPaneHidden: 'hidden',
    trigger: 'shrink-0',
    header: 'flex items-center w-full h-full gap-2 px-[--sl-spacing]',
    headerStart: 'flex items-center gap-2 min-w-0 shrink-0',
    // A menu bar that does not fit is clipped instead of overlapping the
    // trailing actions; its flyouts are portaled, so clipping is safe.
    headerCenter: 'flex items-center gap-2 min-w-0 flex-1 overflow-hidden',
    headerEnd: 'flex items-center gap-2 min-w-0 shrink-0',
    breadcrumb: 'min-w-0',
    breadcrumbTrigger: 'inline-flex items-center gap-1',
    breadcrumbTriggerIcon: 'size-3 shrink-0 opacity-70',
    tab: 'flex justify-between h-full',
    content: 'w-full',
    footer: 'flex items-center h-full w-full px-[--sl-spacing]',
    layoutHeader: 'bg-background border-b border-border',
    layoutTab: 'bg-background border-b border-border',
    layoutContent: 'bg-background',
    layoutFooter: 'bg-background border-t border-border'
  },
  variants: {
    size: {
      xs: {
        root: 'text-2xs'
      },
      sm: {
        root: 'text-xs'
      },
      md: {
        root: 'text-sm'
      },
      lg: {
        root: 'text-base'
      },
      xl: {
        root: 'text-lg'
      },
      '2xl': {
        root: 'text-xl'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
