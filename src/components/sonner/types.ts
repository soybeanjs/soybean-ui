import type { ClassValue } from '@soybeanjs/headless';
import type { SonnerToasterProps, SonnerUi } from '@soybeanjs/headless/sonner';

export interface SonnerProps extends SonnerToasterProps {
  class?: ClassValue;
  ui?: Partial<SonnerUi>;
}

export type { SonnerToasterProps, SonnerUi };
