export { default as AvatarRoot } from './avatar-root.vue';
export { default as AvatarImage } from './avatar-image.vue';
export { default as AvatarFallback } from './avatar-fallback.vue';

export { provideAvatarThemeContext } from './context';

export type {
  AvatarRootProps,
  AvatarImageProps,
  AvatarImageEmits,
  AvatarFallbackProps,
  AvatarThemeSlot,
  AvatarUi
} from './types';
