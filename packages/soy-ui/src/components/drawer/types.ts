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
import type { DialogSlots, DrawerSlots, ThemeSize } from '@soybean-ui/variants';

export interface DrawerOverlayProps extends ClassValueProp {}

export interface DrawerPortalProps extends DialogPortalProps {}

export interface DrawerContentProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface DrawerContentBodyProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface DrawerTitleProps extends DialogTitleProps {
  size?: ThemeSize;
}

export interface DrawerDescriptionProps extends DialogDescriptionProps {
  size?: ThemeSize;
}

export interface DrawerKnobProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface DrawerFooterProps extends ClassValueProp {
  size?: ThemeSize;
}

export type DrawerUi = Partial<Record<DrawerSlots | DialogSlots, ClassValue>>;

export type DrawerProps = ClassValueProp &
  DrawerRootProps &
  Pick<TeleportProps, 'to' | 'defer'> & {
    size?: ThemeSize;
    ui?: DrawerUi;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    title?: string;
    description?: string;
    showClose?: boolean;
  };

export type DrawerEmits = DrawerRootEmits;

export type { DrawerRootProps, DrawerRootEmits };
