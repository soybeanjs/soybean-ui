import type { UseLoadingBarReturn } from './types';

declare global {
  interface Window {
    /**
     * Global loading bar instance
     *
     * Can be used outside of setup function to avoid provide/inject limitations
     */
    __SoybeanUI_useLoadingBar?: UseLoadingBarReturn;
  }
}

export {};
