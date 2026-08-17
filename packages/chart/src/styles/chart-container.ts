// @unocss-include
import { cv } from '@soybeanjs/cva';

/**
 * Root chart container recipe.
 *
 * The arbitrary selectors override the chart library's internal SVG parts
 * (tick labels/lines, crosshair cursor, radial/polar sectors, surface) to match
 * the SoybeanUI theme, mirroring the upstream shadcn-vue chart recipe.
 */
export const chartContainerVariants = cv({
  base: `flex aspect-video h-full w-full flex-col justify-center text-xs
[&_.tick_text]:!fill-muted-foreground
[&_.tick_line]:!stroke-border/50
[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border
[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border
[&_.recharts-radial-bar-background-sector]:fill-muted
[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted
[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border
[&_.recharts-dot[stroke='#fff']]:stroke-transparent
[&_.recharts-layer]:outline-hidden
[&_.recharts-sector]:outline-hidden
[&_.recharts-sector[stroke='#fff']]:stroke-transparent
[&_.recharts-surface]:outline-hidden
[&_[data-vis-xy-container]]:h-full
[&_[data-vis-xy-container]]:w-full
[&_[data-vis-single-container]]:h-full
[&_[data-vis-single-container]]:w-full`
});
