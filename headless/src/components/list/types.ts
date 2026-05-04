import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';

/**
 * Properties for the ListRoot component.
 */
export interface ListRootProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the ListItem component.
 */
export interface ListItemProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the ListContent component.
 */
export interface ListContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the ListTitle component.
 */
export interface ListTitleProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the ListDescription component.
 */
export interface ListDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Available UI slots for the List component.
 */
export type ListUiSlot = 'root' | 'item' | 'content' | 'title' | 'description';

/**
 * UI class overrides for the List component.
 */
export type ListUi = UiClass<ListUiSlot>;
