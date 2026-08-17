// @unocss-include
import { scv } from '@soybeanjs/cva';

/**
 * Chart tooltip content recipe.
 *
 * Indicator variants drive both the row alignment and the indicator size/shape;
 * `nestLabel` switches the value column to end-alignment when a single nested
 * series is rendered.
 */
export const chartTooltipContentVariants = scv({
  slots: {
    root: 'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
    label: 'font-medium',
    items: 'grid gap-1.5',
    item: 'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground',
    indicator: 'shrink-0 rounded-xs border-[var(--color-border)] bg-[var(--color-bg)]',
    itemContent: 'flex flex-1 justify-between leading-none',
    itemLabelWrap: 'grid gap-1.5',
    itemTitle: 'font-medium',
    itemLabel: 'text-muted-foreground',
    itemValue: 'font-mono font-medium tabular-nums text-foreground'
  },
  variants: {
    indicator: {
      dot: {
        item: 'items-center',
        indicator: 'h-2.5 w-2.5'
      },
      line: {
        indicator: 'w-1'
      },
      dashed: {
        indicator: 'w-0 border-[1.5px] border-dashed bg-transparent'
      }
    },
    nestLabel: {
      true: {
        item: 'items-end',
        indicator: 'my-0.5'
      },
      false: {
        item: 'items-center'
      }
    }
  },
  defaultVariants: {
    indicator: 'dot',
    nestLabel: false
  }
});
