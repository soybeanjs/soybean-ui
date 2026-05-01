import type { HTMLAttributes } from 'vue';
import type { UiClass } from '../../types';
import type {
  CollapsibleRootProps,
  CollapsibleRootEmits,
  CollapsibleContentProps,
  CollapsibleTriggerProps
} from '../collapsible/types';

export interface CardRootProps extends CollapsibleRootProps {}

export type CardRootEmits = CollapsibleRootEmits;

export interface CardHeaderProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardContentProps extends CollapsibleContentProps {}

export interface CardFooterProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardTitleRootProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardTitleProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardDescriptionProps extends /** @vue-ignore */ HTMLAttributes {}

export interface CardCollapsibleTriggerProps extends CollapsibleTriggerProps {}

export type CardUiSlot = 'root' | 'header' | 'content' | 'footer' | 'titleRoot' | 'title' | 'description' | 'trigger';

export type CardUi = UiClass<CardUiSlot>;

export interface CardCompactProps extends CardRootProps {
  title?: string;
  description?: string;
  headerProps?: CardHeaderProps;
  contentProps?: CardContentProps;
  footerProps?: CardFooterProps;
  titleRootProps?: CardTitleRootProps;
  titleProps?: CardTitleProps;
  descriptionProps?: CardDescriptionProps;
}

export type CardCompactEmits = CardRootEmits;

export interface CardCompactSlots {
  default?: () => any;
  header?: () => any;
  title?: () => any;
  'title-leading'?: () => any;
  'title-trailing'?: () => any;
  extra?: () => any;
  footer?: () => any;
  description?: () => any;
}
