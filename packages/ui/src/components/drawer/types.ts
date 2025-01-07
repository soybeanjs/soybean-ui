import type {
  ClassValue,
  ClassValueProp,
  DialogDescriptionProps,
  DialogPortalProps,
  DialogTitleProps,
  DrawerRootEmits,
  DrawerRootProps
} from '@soybean-ui/primitives';

export interface DrawerOverlayProps extends ClassValueProp {}

export interface DrawerPortalProps extends DialogPortalProps {}

export interface DrawerContentProps extends ClassValueProp {}

export interface DrawerContentBodyProps extends ClassValueProp {}

export interface DrawerTitleProps extends DialogTitleProps {}

export interface DrawerDescriptionProps extends DialogDescriptionProps {}

export interface DrawerKnobProps extends ClassValueProp {}

export interface DrawerFooterProps extends ClassValueProp {}

export type DrawerProps = DrawerRootProps &
  DrawerContentProps &
  Pick<DrawerPortalProps, 'to'> & {
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    overlayClass?: ClassValue;
    contentBodyClass?: ClassValue;
    headerClass?: ClassValue;
    title?: string;
    titleClass?: ClassValue;
    description?: string;
    descriptionClass?: ClassValue;
    showClose?: boolean;
    closeClass?: ClassValue;
    footerClass?: ClassValue;
  };

export type DrawerEmits = DrawerRootEmits;

export type { DrawerRootProps, DrawerRootEmits };
