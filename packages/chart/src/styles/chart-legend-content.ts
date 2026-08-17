// @unocss-include
import { scv } from '@soybeanjs/cva';

/**
 * Chart legend content recipe.
 *
 * `verticalAlign` controls top/bottom padding relative to the chart area.
 */
export const chartLegendContentVariants = scv({
  slots: {
    root: 'flex items-center justify-center gap-4',
    item: 'flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground',
    indicator: 'h-2 w-2 shrink-0 rounded-xs',
    label: ''
  },
  variants: {
    verticalAlign: {
      top: {
        root: 'pb-3'
      },
      bottom: {
        root: 'pt-3'
      }
    }
  },
  defaultVariants: {
    verticalAlign: 'bottom'
  }
});