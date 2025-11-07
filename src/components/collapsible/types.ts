import type { CollapsibleRootEmits, CollapsibleRootProps, CollapsibleUi } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface CollapsibleProps extends CollapsibleRootProps {
  size?: ThemeSize;
  ui?: Partial<CollapsibleUi>;
}

export type CollapsibleEmits = CollapsibleRootEmits;
