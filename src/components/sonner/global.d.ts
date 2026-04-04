import type { UseSonnerReturn } from '@soybeanjs/headless/sonner';

declare global {
  interface Window {
    /**
     * Global sonner instance
     *
     * Can be used outside of setup function to avoid provide/inject limitations
     */
    __SoybeanUI_useSonner?: UseSonnerReturn;
  }
}

export {};
