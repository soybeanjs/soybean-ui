import type {
  BreadcrumbCompactEmits,
  BreadcrumbCompactProps,
  BreadcrumbCompactSlots,
  BreadcrumbOptionData,
  BreadcrumbUi
} from '@soybeanjs/headless/breadcrumb';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface BreadcrumbProps<T extends BreadcrumbOptionData = BreadcrumbOptionData> extends BreadcrumbCompactProps<T> {
  /**
   * root class
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<BreadcrumbUi>;
}

export type BreadcrumbEmits<T extends BreadcrumbOptionData = BreadcrumbOptionData> = BreadcrumbCompactEmits<T>;

export type BreadcrumbSlots<T extends BreadcrumbOptionData = BreadcrumbOptionData> = BreadcrumbCompactSlots<T>;

export type { BreadcrumbOptionData } from '@soybeanjs/headless/breadcrumb';
