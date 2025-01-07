import { createContext } from '../../composables';
import type { PaginationRootContext } from './types';

export const [providePaginationRootContext, injectPaginationRootContext] =
  createContext<PaginationRootContext>('PaginationRoot');
