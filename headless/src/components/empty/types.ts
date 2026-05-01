import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';

/**
 * Props for the empty root component.
 */
export interface EmptyRootProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the empty header component.
 */
export interface EmptyHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the empty media component.
 */
export interface EmptyMediaProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the empty content component.
 */
export interface EmptyContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the empty title component.
 */
export interface EmptyTitleProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the empty description component.
 */
export interface EmptyDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Available UI slots for the empty component.
 */
export type EmptyUiSlot = 'root' | 'header' | 'media' | 'content' | 'title' | 'description';

/**
 * UI class overrides for the empty component.
 */
export type EmptyUi = UiClass<EmptyUiSlot>;
