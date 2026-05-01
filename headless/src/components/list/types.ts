import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';

/**
 * Props for the list root component.
 */
export interface ListRootProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the list item component.
 */
export interface ListItemProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the list content component.
 */
export interface ListContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the list title component.
 */
export interface ListTitleProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Props for the list description component.
 */
export interface ListDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Available UI slots for the list component.
 */
export type ListUiSlot = 'root' | 'item' | 'content' | 'title' | 'description';

/**
 * UI class overrides for the list component.
 */
export type ListUi = UiClass<ListUiSlot>;
