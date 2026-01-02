export { default as AvatarRoot } from './avatar-root.vue';
export { default as AvatarImage } from './avatar-image.vue';
export { default as AvatarFallback } from './avatar-fallback.vue';

export { provideAvatarUi } from './context';

export type {
  AvatarRootProps,
  AvatarImageProps,
  AvatarImageEmits,
  AvatarFallbackProps,
  AvatarUiSlot,
  AvatarUi
} from './types';
