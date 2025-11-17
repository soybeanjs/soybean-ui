import type { VNode } from 'vue';
import type {
  DialogContentEmits,
  EmitsToHookProps,
  MaybePromise,
  PropsToContext,
  ConfigProviderProps as _ConfigProviderProps
} from '@soybeanjs/headless';
import type { ThemeOptions } from '@soybeanjs/unocss-shadcn';
import type { ThemeColor, ThemeSize } from '@/theme';
import type { DialogProps } from '../dialog/types';

export interface ConfigProviderProps extends _ConfigProviderProps {
  /** The theme options. */
  theme?: ThemeOptions;
  /** The size options. */
  size?: ThemeSize;
  /** The iconify options. */
  iconify?: {
    /**
     * The default width of the icon.
     *
     * @defaultValue '1.2em'
     */
    width?: string;
    /**
     * The default height of the icon.
     *
     * @defaultValue '1.2em'
     */
    height?: string;
  };
}

export interface ConfigProviderContextParams extends PropsToContext<ConfigProviderProps> {}

export type UseDialogType = Extract<ThemeColor, 'destructive' | 'success' | 'warning' | 'info'>;

export interface DialogInfo {
  id: number;
  type: UseDialogType;
  options: UseDialogOptions;
}

export interface UseDialogOptions
  extends Pick<DialogProps, 'size' | 'ui'>,
    Partial<EmitsToHookProps<DialogContentEmits>> {
  title?: string | VNode;
  showIcon?: boolean;
  description?: string | VNode;
  content?: VNode;
  footer?: VNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => MaybePromise<boolean | void>;
  onCancel?: () => MaybePromise<boolean | void>;
}

export type UseDialogReturn = {
  create: (options: UseDialogOptions & { type: UseDialogType }) => void;
  destroyAll: () => void;
} & Record<UseDialogType, (options: UseDialogOptions) => void>;
