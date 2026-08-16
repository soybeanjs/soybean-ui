import type { BreadcrumbOptionData, BreadcrumbUi } from '@soybeanjs/headless/breadcrumb';
import type { ClassValue } from '@soybeanjs/headless/types';

/**
 * Breadcrumb data model with optional child dropdowns (采纳 §10.4-3).
 */
export interface AppBreadcrumbItem extends Omit<BreadcrumbOptionData, 'value' | 'children'> {
  /**
   * The value of the item. Required and string-typed so the item is assignable
   * to the `DefinedValue`-based option models of `SBreadcrumb`/`SDropdownMenu`.
   */
  value: string;
  /**
   * Child items rendered as a hover dropdown on the page node.
   */
  children?: AppBreadcrumbItem[];
}

/**
 * Properties for the AppBreadcrumb component.
 */
export interface AppBreadcrumbProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Items rendered by the component.
   */
  items: AppBreadcrumbItem[];
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<BreadcrumbUi>;
}

/**
 * Events for the AppBreadcrumb component.
 */
export interface AppBreadcrumbEmits {
  /**
   * Emitted when an item is clicked.
   */
  click: [item: AppBreadcrumbItem];
  /**
   * Emitted when a child dropdown item is selected.
   */
  'select-child': [item: AppBreadcrumbItem];
}
