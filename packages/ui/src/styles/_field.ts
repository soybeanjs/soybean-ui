// @unocss-include
import type { ThemeSize } from '@/theme';

/** Border / fill only. Use when the node is not the focus surface (OTP cells). */
export const fieldSurface = 'rounded-md border border-solid border-input bg-card transition-all-150';

/** Focus-within ring shared by field roots. */
export const fieldFocusRing = `outline-none focus-within:ring-3 focus-within:ring-offset-card focus-within:ring-primary/30`;

/** Shared chrome for single-line form fields and triggers. Layout stays per component. */
export const fieldChrome = [fieldSurface, fieldFocusRing];

/**
 * Disabled fade on the outer surface only. Applies to both `data-disabled`
 * (div roots) and native `:disabled` (button triggers) without nesting.
 */
export const fieldDisabled = [
  'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
  'disabled:cursor-not-allowed disabled:opacity-50'
];

/** Extra ring when the field node itself receives focus (Select / Combobox / Cascader). */
export const fieldTriggerFocus = [
  'focus-visible:ring-3 focus-visible:ring-offset-card focus-visible:ring-primary/30',
  'focus:ring-3 focus:ring-offset-card focus:ring-primary/30'
];

export const fieldSize: Record<ThemeSize, string> = {
  xs: 'h-6 px-1.5 gap-1 text-2xs',
  sm: 'h-7 px-2 gap-1.5 text-xs',
  md: 'h-8 px-2.5 gap-2 text-sm',
  lg: 'h-9 px-3 gap-2.5 text-base',
  xl: 'h-10 px-3.5 gap-3 text-lg',
  '2xl': 'h-12 px-4 gap-3.5 text-xl'
};

/** Same ladder as `fieldSize`, for wrapping / multi-value surfaces. */
export const fieldMinSize: Record<ThemeSize, string> = {
  xs: 'min-h-6 px-1.5 gap-1 text-2xs',
  sm: 'min-h-7 px-2 gap-1.5 text-xs',
  md: 'min-h-8 px-2.5 gap-2 text-sm',
  lg: 'min-h-9 px-3 gap-2.5 text-base',
  xl: 'min-h-10 px-3.5 gap-3 text-lg',
  '2xl': 'min-h-12 px-4 gap-3.5 text-xl'
};

/** Always-wrapping surfaces (TagsInput). Pair with `fieldMinSize`; no `h-*` lock. */
export const fieldWrap: Record<ThemeSize, string> = {
  xs: 'h-auto py-0.5',
  sm: 'h-auto py-0.75',
  md: 'h-auto py-1',
  lg: 'h-auto py-1.25',
  xl: 'h-auto py-1.5',
  '2xl': 'h-auto py-1.75'
};

/** Extra rules so a wrapping trigger can grow past the single-line `h-*`. */
export const fieldMultiple: Record<ThemeSize, string> = {
  xs: 'data-[multiple]:h-auto data-[multiple]:min-h-6 data-[multiple]:py-0.5 data-[multiple]:pr-9',
  sm: 'data-[multiple]:h-auto data-[multiple]:min-h-7 data-[multiple]:py-0.75 data-[multiple]:pr-11.5',
  md: 'data-[multiple]:h-auto data-[multiple]:min-h-8 data-[multiple]:py-1 data-[multiple]:pr-13.5',
  lg: 'data-[multiple]:h-auto data-[multiple]:min-h-9 data-[multiple]:py-1.25 data-[multiple]:pr-16',
  xl: 'data-[multiple]:h-auto data-[multiple]:min-h-10 data-[multiple]:py-1.5 data-[multiple]:pr-18',
  '2xl': 'data-[multiple]:h-auto data-[multiple]:min-h-12 data-[multiple]:py-1.75 data-[multiple]:pr-20.5'
};

export const fieldAffordanceIcon = 'shrink-0 text-muted-foreground opacity-70';

/**
 * Nested `miniButtonIconVariants` already fade on `data-disabled`.
 * Neutralize that so only the outer field surface fades.
 */
export const fieldNestedAction = 'data-[disabled]:opacity-100!';

/** Hover-reveal clear control, used with `group` on the field surface. */
export const fieldClearReveal = [
  'hidden shrink-0 opacity-50',
  'group-hover:inline-flex group-focus-within:inline-flex hover:opacity-100 focus-visible:opacity-100',
  fieldNestedAction
];

/** Same as `fieldClearReveal`, gated on the field `data-has-value`. */
export const fieldClearRevealValue = [
  'hidden shrink-0 opacity-50',
  'group-data-[has-value]:group-hover:inline-flex group-data-[has-value]:group-focus-within:inline-flex',
  'hover:opacity-100 focus-visible:opacity-100',
  fieldNestedAction
];
