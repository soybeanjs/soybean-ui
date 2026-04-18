import type { ClassValue } from '@soybeanjs/headless';
import type {
  ClipboardEmits,
  ClipboardProps as _ClipboardProps,
  ClipboardSlotProps
} from '@soybeanjs/headless/clipboard';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { ClipboardShape, ClipboardVariant } from './variants';

export interface ClipboardProps extends _ClipboardProps {
  class?: ClassValue;
  color?: ThemeColor;
  size?: ThemeSize;
  variant?: ClipboardVariant;
  shape?: ClipboardShape;
  fitContent?: boolean;
}

export type { ClipboardEmits, ClipboardSlotProps, ClipboardVariant, ClipboardShape };
