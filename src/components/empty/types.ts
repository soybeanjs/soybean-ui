import type {
  ClassValue,
  EmptyContentProps,
  EmptyDescriptionProps,
  EmptyHeaderProps,
  EmptyMediaProps,
  EmptyRootProps,
  EmptyTitleProps,
  EmptyUi
} from '@soybeanjs/headless';
import type { IconValue } from '../icon/types';
import type { EmptyMediaVariant } from './variants';

export interface EmptyProps extends EmptyRootProps {
  class?: ClassValue;
  ui?: Partial<EmptyUi>;
  title?: string;
  description?: string;
  icon?: IconValue;
  mediaVariant?: EmptyMediaVariant;
  headerProps?: EmptyHeaderProps;
  mediaProps?: EmptyMediaProps;
  contentProps?: EmptyContentProps;
  titleProps?: EmptyTitleProps;
  descriptionProps?: EmptyDescriptionProps;
}

export type { EmptyMediaVariant };
