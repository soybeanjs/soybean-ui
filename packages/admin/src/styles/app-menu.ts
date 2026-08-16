// @unocss-include
import { scv } from '@soybeanjs/cva';
import type { AppMenuMode } from '../types';

export const appMenuVariants = scv({
  slots: {
    root: 'flex h-full w-full'
  },
  variants: {
    mode: {
      vertical: {
        root: 'flex-col'
      },
      'vertical-mix': {
        root: 'flex-row'
      },
      'vertical-hybrid': {
        root: 'flex-row'
      },
      horizontal: {
        root: 'flex-row'
      },
      'top-sidebar': {
        root: 'flex-col'
      },
      'top-header': {
        root: 'flex-col'
      }
    },
    inverted: {
      true: {
        root: 'bg-sidebar text-sidebar-foreground'
      },
      false: {}
    }
  },
  defaultVariants: {
    mode: 'vertical',
    inverted: false
  }
});

export type AppMenuVariant = NonNullable<AppMenuMode>;

/**
 * Variants for the icon rail used by mix/hybrid modes (`FirstLevelMenu`).
 */
export const appMenuFirstLevelVariants = scv({
  slots: {
    root: 'flex h-full min-w-0 flex-1 flex-col items-center gap-1 overflow-hidden py-2',
    item: 'flex flex-col items-center justify-center gap-1 px-1 py-2 text-xs font-medium transition-colors cursor-pointer',
    itemDefault: 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent',
    itemActive: 'bg-primary/10 text-primary',
    collapseButton:
      'mt-auto flex flex-col items-center justify-center py-2 text-sidebar-foreground/70 hover:text-sidebar-foreground cursor-pointer'
  },
  variants: {
    inverted: {
      true: {
        itemDefault: 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-primary/10',
        itemActive: '!bg-primary !text-primary-foreground',
        collapseButton: 'text-sidebar-foreground/60 hover:text-sidebar-foreground'
      },
      false: {}
    }
  }
});
