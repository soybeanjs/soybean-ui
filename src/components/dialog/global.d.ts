import type { UseDialogReturn } from './types';

declare global {
  interface Window {
    /**
     * Global dialog instance
     *
     * Can be used outside of setup function to avoid provide/inject limitations
     */
    __SoybeanUI_useDialog?: UseDialogReturn;
  }
}

export {};
