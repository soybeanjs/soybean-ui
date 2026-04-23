import type {
  AcceptableValue,
  ClassValue,
  SegmentCompactEmits,
  SegmentCompactProps,
  SegmentCompactSlots,
  SegmentUi,
  SegmentOptionData
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { TabsFill as SegmentFill, TabsShape as SegmentShape } from '../tabs/variants';

export interface SegmentProps<T extends SegmentOptionData> extends SegmentCompactProps<T> {
  class?: ClassValue;
  ui?: Partial<SegmentUi>;
  size?: ThemeSize;
  shape?: SegmentShape;
  fill?: SegmentFill;
}

export type SegmentEmits<T extends AcceptableValue = AcceptableValue> = SegmentCompactEmits<T>;

export type SegmentSlots<T extends SegmentOptionData = SegmentOptionData> = SegmentCompactSlots<T>;

export type { SegmentOptionData, SegmentFill, SegmentShape };
