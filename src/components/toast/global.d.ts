import type { UseToastReturn } from './types';

declare global {
  interface Window {
    /**
     * Global toast instance
     *
     * Can be used outside of setup function to avoid provide/inject limitations
     */
    __Soybean__useToast?: UseToastReturn;
  }
}

export {};
