import {
  CardContent as SCardContent,
  CardDescription as SCardDescription,
  CardFooter as SCardFooter,
  CardHeader as SCardHeader,
  CardRoot as SCardRoot,
  CardTitle as SCardTitle,
  CardTitleRoot as SCardTitleRoot
} from '@headless';
import SCard from './card.vue';

export { SCard, SCardRoot, SCardHeader, SCardContent, SCardFooter, SCardTitleRoot, SCardTitle, SCardDescription };

export type {
  CardProps,
  CardRootProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardTitleRootProps,
  CardTitleProps,
  CardDescriptionProps
} from './types';
