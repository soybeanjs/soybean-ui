import type { UseToastReturn } from './types';

declare global {
  interface Window {
    /**
     * Global toast instance
     *
     * Can be used outside of setup function to avoid provide/inject limitations
     */
    __SoybeanUI_useToast?: UseToastReturn;
  }
}

export {};
