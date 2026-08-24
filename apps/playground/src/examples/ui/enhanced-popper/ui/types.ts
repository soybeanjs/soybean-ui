import type { ClassValue } from '@soybeanjs/headless/types';
import type { EpCompactEmits, EpCompactProps, EpCompactSlots, EpUi } from '../headless';

export type EpSize = 'sm' | 'md' | 'lg';

export interface EpProps extends EpCompactProps {
  class?: ClassValue;
  size?: EpSize;
  ui?: Partial<EpUi>;
}

export type EpEmits = EpCompactEmits;

export type EpSlots = EpCompactSlots;
