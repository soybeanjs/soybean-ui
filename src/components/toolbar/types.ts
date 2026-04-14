import type { ClassValue, ToolbarRootProps as HeadlessToolbarRootProps, ToolbarUi } from '@soybeanjs/headless';

export interface ToolbarProps extends HeadlessToolbarRootProps {
  class?: ClassValue;
  ui?: Partial<ToolbarUi>;
}
