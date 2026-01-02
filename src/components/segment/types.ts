import type {
  AcceptableValue,
  ClassValue,
  DefinedValue,
  TabsIndicatorProps,
  TabsListProps,
  TabsRootProps,
  TabsTriggerProps
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { TabsFill as SegmentFill, TabsShape as SegmentShape } from '@/variants/tabs';
import type { TabsExtendedUi } from '../tabs/types';

export interface SegmentOptionData<T extends DefinedValue = DefinedValue> {
  value: T;
  label: string;
  disabled?: boolean;
}

export type SegmentExtendedUi = TabsExtendedUi;

export interface SegmentProps<
  T extends AcceptableValue,
  S extends SegmentOptionData<NonNullable<T>> = SegmentOptionData<NonNullable<T>>
> extends TabsRootProps<T> {
  class?: ClassValue;
  ui?: Partial<SegmentExtendedUi>;
  size?: ThemeSize;
  shape?: SegmentShape;
  items: S[];
  fill?: SegmentFill;
  enableIndicator?: boolean;
  listProps?: TabsListProps;
  triggerProps?: TabsTriggerProps;
  indicatorProps?: TabsIndicatorProps;
}
