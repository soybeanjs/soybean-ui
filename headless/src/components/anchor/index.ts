export { default as AnchorCompact } from './anchor-compact.vue';
export { default as AnchorLink } from './anchor-link.vue';
export { default as AnchorRoot } from './anchor-root.vue';

export { provideAnchorUi } from './context';

export type {
  AnchorCompactEmits,
  AnchorCompactProps,
  AnchorContainer,
  AnchorCompactItemProps,
  AnchorItemData,
  AnchorLinkProps,
  AnchorRootEmits,
  AnchorRootProps,
  AnchorUi,
  AnchorUiSlot
} from './types';
