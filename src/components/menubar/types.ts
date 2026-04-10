import type {
  CheckedState,
  ClassValue,
  MenubarCheckboxItemProps as HeadlessMenubarCheckboxItemProps,
  MenubarContentProps as HeadlessMenubarContentProps,
  MenubarGroupLabelProps as HeadlessMenubarGroupLabelProps,
  MenubarItemProps as HeadlessMenubarItemProps,
  MenubarPortalProps,
  MenubarRadioItemProps as HeadlessMenubarRadioItemProps,
  MenubarRootProps as HeadlessMenubarRootProps,
  MenubarSeparatorProps as HeadlessMenubarSeparatorProps,
  MenubarSubContentProps as HeadlessMenubarSubContentProps,
  MenubarSubTriggerProps as HeadlessMenubarSubTriggerProps,
  MenubarTriggerProps as HeadlessMenubarTriggerProps
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface MenubarProps extends /** @vue-ignore */ HeadlessMenubarRootProps {
  class?: ClassValue;
  size?: ThemeSize;
}

export interface MenubarTriggerProps extends /** @vue-ignore */ HeadlessMenubarTriggerProps {
  class?: ClassValue;
  size?: ThemeSize;
}

export interface MenubarContentProps extends /** @vue-ignore */ HeadlessMenubarContentProps {
  class?: ClassValue;
  portalProps?: MenubarPortalProps;
  size?: ThemeSize;
}

export interface MenubarItemProps extends /** @vue-ignore */ HeadlessMenubarItemProps {
  class?: ClassValue;
  inset?: boolean;
  size?: ThemeSize;
  variant?: 'default' | 'destructive';
}

export type MenubarItemEmits = {
  select: [event: Event];
};

export interface MenubarCheckboxItemProps extends /** @vue-ignore */ HeadlessMenubarCheckboxItemProps {
  class?: ClassValue;
  size?: ThemeSize;
}

export type MenubarCheckboxItemEmits = MenubarItemEmits & {
  'update:modelValue': [value: CheckedState];
};

export interface MenubarRadioItemProps extends /** @vue-ignore */ HeadlessMenubarRadioItemProps {
  class?: ClassValue;
  size?: ThemeSize;
}

export type MenubarRadioItemEmits = MenubarItemEmits;

export interface MenubarLabelProps extends /** @vue-ignore */ HeadlessMenubarGroupLabelProps {
  class?: ClassValue;
  inset?: boolean;
  size?: ThemeSize;
}

export interface MenubarSeparatorProps extends /** @vue-ignore */ HeadlessMenubarSeparatorProps {
  class?: ClassValue;
  size?: ThemeSize;
}

export interface MenubarSubTriggerProps extends /** @vue-ignore */ HeadlessMenubarSubTriggerProps {
  class?: ClassValue;
  inset?: boolean;
  size?: ThemeSize;
}

export interface MenubarSubContentProps extends /** @vue-ignore */ HeadlessMenubarSubContentProps {
  class?: ClassValue;
  portalProps?: MenubarPortalProps;
  size?: ThemeSize;
}

export interface MenubarShortcutProps {
  class?: ClassValue;
  size?: ThemeSize;
}
