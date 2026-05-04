import type { SkeletonProps as _SkeletonProps } from '@soybeanjs/headless/skeleton';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';
import type { SkeletonShape } from './variants';

/**
 * Properties for the skeleton component.
 */
export interface SkeletonProps extends _SkeletonProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Whether the skeleton should have an animation effect. Defaults to `true`.
   */
  animated?: boolean;
  /**
   * Shape of the component.
   */
  shape?: SkeletonShape;
}

export type { SkeletonShape };
