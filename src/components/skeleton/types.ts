import type { ClassValue, SkeletonProps as _SkeletonProps } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { SkeletonShape } from './variants';

export interface SkeletonProps extends _SkeletonProps {
  class?: ClassValue;
  size?: ThemeSize;
  animated?: boolean;
  shape?: SkeletonShape;
}

export type { SkeletonShape };
