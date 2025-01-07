import PaginationRoot from './pagination-root.vue';
import PaginationEllipsis from './pagination-ellipsis.vue';
import PaginationFirst from './pagination-first.vue';
import PaginationLast from './pagination-last.vue';
import PaginationList from './pagination-list.vue';
import PaginationListItem from './pagination-list-item.vue';
import PaginationNext from './pagination-next.vue';
import PaginationPrev from './pagination-prev.vue';

export {
  PaginationRoot,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
};

export { injectPaginationRootContext } from './context';
export * from './types';
