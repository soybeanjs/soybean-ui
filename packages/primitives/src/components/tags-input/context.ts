import { createContext } from '../../composables';
import type { TagsInputItemContext, TagsInputRootContext } from './types';

export const [provideTagsInputRootContext, injectTagsInputRootContext] =
  createContext<TagsInputRootContext>('TagsInputRoot');

export const [provideTagsInputItemContext, injectTagsInputItemContext] =
  createContext<TagsInputItemContext>('TagsInputItem');
