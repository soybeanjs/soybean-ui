import type {
  ClassValue,
  ClassValueProp,
  DialogDescriptionProps,
  DialogPortalProps,
  DialogTitleProps,
  DrawerRootEmits,
  DrawerRootProps,
  TeleportProps
} from '@soybean-ui/primitives';
import type { DrawerSlots } from '@soybean-ui/variants';

export interface DrawerOverlayProps extends ClassValueProp {}

export interface DrawerPortalProps extends DialogPortalProps {}

export interface DrawerContentProps extends ClassValueProp {}

export interface DrawerContentBodyProps extends ClassValueProp {}

export interface DrawerTitleProps extends DialogTitleProps {}

export interface DrawerDescriptionProps extends DialogDescriptionProps {}

export interface DrawerKnobProps extends ClassValueProp {}

export interface DrawerFooterProps extends ClassValueProp {}

export type DrawerUi = Partial<Record<DrawerSlots, ClassValue>>;

export type DrawerProps = ClassValueProp &
  DrawerRootProps &
  Pick<TeleportProps, 'to' | 'defer'> & {
    ui?: DrawerUi;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    title?: string;
    description?: string;
    showClose?: boolean;
  };

export type DrawerEmits = DrawerRootEmits;

export type { DrawerRootProps, DrawerRootEmits };
