import type {
  AcceptableValue,
  ClassValue
} from '@soybeanjs/headless';
import type { SegmentCompactEmits, SegmentCompactProps, SegmentCompactSlots, SegmentOptionData, TabsUi } from '@soybeanjs/headless/tabs';
import type { ThemeSize } from '@/theme';
import type { TabsFill as SegmentFill, TabsShape as SegmentShape } from '../tabs/variants';

export type SegmentExtendedUi = Pick<TabsUi, 'root' | 'list' | 'trigger' | 'indicator' | 'indicatorContent'>;

export interface SegmentProps<
  T extends AcceptableValue,
  S extends SegmentOptionData<NonNullable<T>> = SegmentOptionData<NonNullable<T>>
> extends SegmentCompactProps<T, S> {
  class?: ClassValue;
  ui?: Partial<SegmentExtendedUi>;
  size?: ThemeSize;
  shape?: SegmentShape;
  fill?: SegmentFill;
}

export type SegmentEmits<T = AcceptableValue> = SegmentCompactEmits<T>;

export type SegmentSlots<S extends SegmentOptionData = SegmentOptionData> = Pick<SegmentCompactSlots<S>, 'item'>;

export type { SegmentOptionData } from '@soybeanjs/headless/tabs';
