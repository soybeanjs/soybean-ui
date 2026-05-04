import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';
import type { IconValue } from '../_icon/types';

/**
 * Properties for the EmptyRoot component.
 */
export interface EmptyRootProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the EmptyHeader component.
 */
export interface EmptyHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the EmptyMedia component.
 */
export interface EmptyMediaProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the EmptyContent component.
 */
export interface EmptyContentProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the EmptyTitle component.
 */
export interface EmptyTitleProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Properties for the EmptyDescription component.
 */
export interface EmptyDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

/**
 * Available UI slots for the Empty component.
 */
export type EmptyUiSlot = 'root' | 'header' | 'media' | 'content' | 'title' | 'description';

/**
 * UI class overrides for the Empty component.
 */
export type EmptyUi = UiClass<EmptyUiSlot>;

/**
 * Properties for the EmptyCompact component.
 */
export interface EmptyCompactProps extends EmptyRootProps {
  /**
   * Title text rendered by the component.
   */
  title?: string;
  /**
   * Description text rendered by the component.
   */
  description?: string;
  /**
   * Icon rendered by the component.
   */
  icon?: IconValue;
  /**
   * Properties forwarded to the header element.
   */
  headerProps?: EmptyHeaderProps;
  /**
   * Properties forwarded to the media element.
   */
  mediaProps?: EmptyMediaProps;
  /**
   * Properties forwarded to the content element.
   */
  contentProps?: EmptyContentProps;
  /**
   * Properties forwarded to the title element.
   */
  titleProps?: EmptyTitleProps;
  /**
   * Properties forwarded to the description element.
   */
  descriptionProps?: EmptyDescriptionProps;
}

/**
 * Slots for the EmptyCompact component.
 */
export type EmptyCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: () => any;
  /**
   * Custom content for the media slot.
   */
  media?: () => any;
  /**
   * Custom content for the title slot.
   */
  title?: () => any;
  /**
   * Custom content for the description slot.
   */
  description?: () => any;
  /**
   * Custom content for the content slot.
   */
  content?: () => any;
};
