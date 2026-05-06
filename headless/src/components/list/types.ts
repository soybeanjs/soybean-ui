import type { BaseProps, UiClass } from '../../types';

/**
 * Properties for the ListRoot component.
 */
export interface ListRootProps extends BaseProps {}

/**
 * Properties for the ListItem component.
 */
export interface ListItemProps extends BaseProps {}

/**
 * Properties for the ListContent component.
 */
export interface ListContentProps extends BaseProps {}

/**
 * Properties for the ListTitle component.
 */
export interface ListTitleProps extends BaseProps {}

/**
 * Properties for the ListDescription component.
 */
export interface ListDescriptionProps extends BaseProps {}

/**
 * Available UI slots for the List component.
 */
export type ListUiSlot = 'root' | 'item' | 'content' | 'title' | 'description';

/**
 * UI class overrides for the List component.
 */
export type ListUi = UiClass<ListUiSlot>;
