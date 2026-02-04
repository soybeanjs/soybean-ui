import type { UseDialogReturn } from './types';

declare global {
  interface Window {
    /**
     * Global dialog instance
     *
     * Can be used outside of setup function to avoid provide/inject limitations
     */
    __Soybean__useDialog?: UseDialogReturn;
  }
}

export {};
