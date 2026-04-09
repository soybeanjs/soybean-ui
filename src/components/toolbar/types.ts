import type {
  ClassValue,
  DefinedValue,
  ToolbarButtonEmits as HeadlessToolbarButtonEmits,
  ToolbarButtonProps as HeadlessToolbarButtonProps,
  ToolbarLinkProps as HeadlessToolbarLinkProps,
  ToolbarRootProps as HeadlessToolbarRootProps,
  ToolbarSeparatorProps as HeadlessToolbarSeparatorProps,
  ToolbarToggleGroupEmits as HeadlessToolbarToggleGroupEmits,
  ToolbarToggleGroupProps as HeadlessToolbarToggleGroupProps,
  ToolbarToggleItemProps as HeadlessToolbarToggleItemProps
} from '@soybeanjs/headless';

export interface ToolbarProps extends HeadlessToolbarRootProps {
  class?: ClassValue;
}

export interface ToolbarButtonProps extends HeadlessToolbarButtonProps {
  class?: ClassValue;
}

export type ToolbarButtonEmits = HeadlessToolbarButtonEmits;

export interface ToolbarLinkProps extends HeadlessToolbarLinkProps {
  class?: ClassValue;
}

export interface ToolbarSeparatorProps extends HeadlessToolbarSeparatorProps {
  class?: ClassValue;
}

export interface ToolbarToggleGroupProps<M extends boolean = false, T extends DefinedValue = string>
  extends HeadlessToolbarToggleGroupProps<M, T> {
  class?: ClassValue;
}

export type ToolbarToggleGroupEmits<M extends boolean = false, T extends DefinedValue = string> =
  HeadlessToolbarToggleGroupEmits<M, T>;

export interface ToolbarToggleItemProps<T extends DefinedValue = string> extends HeadlessToolbarToggleItemProps<T> {
  class?: ClassValue;
}
