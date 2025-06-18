import PaginationRoot from './pagination-root.vue';
import PaginationList from './pagination-list.vue';
import PaginationListItem from './pagination-list-item.vue';
import PaginationEllipsis from './pagination-ellipsis.vue';
import PaginationFirst from './pagination-first.vue';
import PaginationPrev from './pagination-prev.vue';
import PaginationNext from './pagination-next.vue';
import PaginationLast from './pagination-last.vue';

export {
  PaginationRoot,
  PaginationList,
  PaginationListItem,
  PaginationEllipsis,
  PaginationFirst,
  PaginationPrev,
  PaginationNext,
  PaginationLast
};

export { providePaginationThemeContext } from './context';

export type * from './types';
