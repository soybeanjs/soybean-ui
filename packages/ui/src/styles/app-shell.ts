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
    logo: [
      'flex shrink-0 items-center gap-2 h-[--vean-layout-header-height] px-[--sl-spacing] overflow-hidden',
      // Aligned to the sidebar's columns: the cells carry the width and the
      // centering, so the row contributes no gap or padding of its own.
      'data-[aligned=true]:gap-0 data-[aligned=true]:px-0',
      // A collapsed sidebar without a rail keeps room for the mark alone.
      'data-[centered=true]:justify-center data-[centered=true]:px-0'
    ],
    logoMark: [
      'flex h-full shrink-0 items-center justify-center',
      // Aligned to the rail, the mark cell continues the rail's own divider, so
      // the first column reads as one strip from the brand down through the menu.
      'data-[divider=true]:border-e data-[divider=true]:border-sidebar-border'
    ],
    logoTitle: 'flex h-full min-w-0 items-center justify-center',
    menuSidebar: 'flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden',
    // Mount target of the menu panes that teleport out of their renderer: it has
    // to stretch, or the pane inside it sizes to its content and the column
    // dividers stop where the items do.
    menuMount: 'flex-1 min-h-0 min-w-0 flex',
    trigger: 'shrink-0',
    triggerRow: 'flex shrink-0 items-stretch',
    // Empty cell: it only continues the rail's divider into the row.
    triggerRail: 'shrink-0 border-e border-sidebar-border',
    triggerCell: [
      'flex min-w-0 flex-1 items-center justify-end px-[--sl-spacing] pt-[--sl-half-spacing] pb-[--sl-spacing]',
      // A folded column is as wide as its icons: center there instead of hugging
      // an edge the trigger would run past.
      'data-[centered=true]:justify-center data-[centered=true]:px-0'
    ],
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
    layoutHeader: 'bg-card border-b border-border',
    layoutTab: 'bg-card border-b border-border',
    layoutContent: 'bg-card',
    layoutFooter: 'bg-card border-t border-border'
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
