import { createContext } from '@soybean-ui/primitives';
import type { LayoutContext } from './types';

export const [provideLayoutContext, useLayout] = createContext<LayoutContext>('Layout');
