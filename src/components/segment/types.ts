import type {
  SegmentCompactEmits,
  SegmentCompactProps,
  SegmentCompactSlots,
  SegmentUi,
  SegmentOptionData
} from '@soybeanjs/headless/segment';
import type { AcceptableValue, ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';
import type { TabsFill as SegmentFill, TabsShape as SegmentShape } from '../tabs/variants';

/**
 * Properties for the segment component.
 */
export interface SegmentProps<T extends SegmentOptionData> extends SegmentCompactProps<T> {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<SegmentUi>;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Shape of the component.
   */
  shape?: SegmentShape;
  /**
   * Fill.
   */
  fill?: SegmentFill;
}

/**
 * Events for the segment component.
 */
export type SegmentEmits<T extends AcceptableValue = AcceptableValue> = SegmentCompactEmits<T>;

/**
 * Slots for the segment component.
 */
export type SegmentSlots<T extends SegmentOptionData = SegmentOptionData> = SegmentCompactSlots<T>;

export type { SegmentOptionData, SegmentFill, SegmentShape };
