export { default as CardRoot } from './card-root.vue';
export { default as CardHeader } from './card-header.vue';
export { default as CardContent } from './card-content.vue';
export { default as CardFooter } from './card-footer.vue';
export { default as CardTitleRoot } from './card-title-root.vue';
export { default as CardTitle } from './card-title.vue';
export { default as CardDescription } from './card-description.vue';

export { provideCardUi } from './context';

export type {
  CardRootProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardTitleRootProps,
  CardTitleProps,
  CardDescriptionProps,
  CardUiSlot,
  CardUi
} from './types';
