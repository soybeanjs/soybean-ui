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

export interface MenubarProps extends /** @vue-ignore */ HeadlessMenubarRootProps {
  class?: ClassValue;
}

export interface MenubarTriggerProps extends /** @vue-ignore */ HeadlessMenubarTriggerProps {
  class?: ClassValue;
}

export interface MenubarContentProps extends /** @vue-ignore */ HeadlessMenubarContentProps {
  class?: ClassValue;
  portalProps?: MenubarPortalProps;
}

export interface MenubarItemProps extends /** @vue-ignore */ HeadlessMenubarItemProps {
  class?: ClassValue;
  inset?: boolean;
  variant?: 'default' | 'destructive';
}

export type MenubarItemEmits = {
  select: [event: Event];
};

export interface MenubarCheckboxItemProps extends /** @vue-ignore */ HeadlessMenubarCheckboxItemProps {
  class?: ClassValue;
}

export type MenubarCheckboxItemEmits = MenubarItemEmits & {
  'update:modelValue': [value: CheckedState];
};

export interface MenubarRadioItemProps extends /** @vue-ignore */ HeadlessMenubarRadioItemProps {
  class?: ClassValue;
}

export type MenubarRadioItemEmits = MenubarItemEmits;

export interface MenubarLabelProps extends /** @vue-ignore */ HeadlessMenubarGroupLabelProps {
  class?: ClassValue;
  inset?: boolean;
}

export interface MenubarSeparatorProps extends /** @vue-ignore */ HeadlessMenubarSeparatorProps {
  class?: ClassValue;
}

export interface MenubarSubTriggerProps extends /** @vue-ignore */ HeadlessMenubarSubTriggerProps {
  class?: ClassValue;
  inset?: boolean;
}

export interface MenubarSubContentProps extends /** @vue-ignore */ HeadlessMenubarSubContentProps {
  class?: ClassValue;
}

export interface MenubarShortcutProps {
  class?: ClassValue;
}
