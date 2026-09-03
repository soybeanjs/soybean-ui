import type { ConfigProviderProps as _ConfigProviderProps } from '@soybeanjs/headless/config-provider';
import type { ProgressProviderProps } from '@soybeanjs/headless/progress';
import type { ToContext } from '@soybeanjs/headless/types';
import type { ThemeOptions } from '@soybeanjs/theme';
import type { CustomThemeColorPreset, ThemeConfigState, ThemePresetInput } from '@soybeanjs/theme/storage';
import type { ThemeSize } from '@/theme';
import type { ToastProviderProps } from '../toast/types';

/**
 * UI-level theme options accepted by `SConfigProvider`.
 *
 * The engine's `ThemeOptions` now carries `overrides` for inline token
 * overrides. The provider additionally accepts a legacy `preset` input — either
 * an inline mode-split override or a `{ name }` reference to a stored preset.
 * The provider resolves named references to their colors and materializes the
 * result as `overrides` before calling `createTheme`, so the engine only ever
 * receives resolved options.
 */
export type ConfigProviderThemeOptions = ThemeOptions & {
  /**
   * A custom color preset: either an inline mode-split override (light/dark
   * partial tokens) or a `{ name }` reference to a stored preset. Resolved to
   * `overrides` before `createTheme`.
   */
  preset?: ThemePresetInput;
};

export interface IconifyOptions {
  /**
   * The default width of the icon.
   *
   * @defaultValue '1.25em'
   */
  width?: string;
  /**
   * The default height of the icon.
   *
   * @defaultValue '1.25em'
   */
  height?: string;
}

/**
 * Properties for the ConfigProvider component.
 */
export interface ConfigProviderProps extends _ConfigProviderProps {
  /** The theme options. */
  theme?: ConfigProviderThemeOptions;
  /**
   * The size options.
   *
   * @deprecated Use `theme.size` instead.
   */
  size?: ThemeSize;
  /** The iconify options. */
  iconify?: IconifyOptions;
  /** The global top progress configuration of your application. */
  progress?: Partial<ProgressProviderProps>;
  /** The global toast configuration of your application. This will be inherited by the related components. */
  toast?: Partial<ToastProviderProps>;
  /**
   * Whether to use custom toast rendering. If set to `true`, the `ToastProvider` will not render the default toast UI, and you can import `ToastProvider` component to render custom toast UI.
   *
   * @default false
   */
  customToast?: boolean;
  /**
   * Whether to enable persisted theme reading from localStorage / cookie.
   *
   * When disabled (default), the ConfigProvider only consumes the explicit
   * `theme` prop and never reads any storage, keeping the current behavior.
   * When enabled, the persisted theme config fills in keys not explicitly
   * provided by `theme`.
   *
   * @defaultValue false
   */
  persistTheme?: boolean;
  /**
   * The persisted theme config injected from the server.
   *
   * Used during SSR to render the same theme the client persisted; on the
   * client the localStorage is the source of truth.
   *
   * @type ThemeConfigState
   */
  themeConfig?: ThemeConfigState;
  /**
   * The server-side custom theme preset registry resolver.
   *
   * Maps a stored preset name to its definition so SSR can render custom
   * presets without localStorage access. Only used when `persistTheme` is
   * enabled on the server; on the client the presets table is the source of
   * truth.
   *
   * @param name The stored preset name to resolve.
   */
  presetProvider?: (name: string) => CustomThemeColorPreset | null | undefined;
  /**
   * Whether the component is running in a server environment.
   *
   * The UI library is pre-built, so `import.meta.env.SSR` is baked at build
   * time and cannot detect the consumer's runtime. This defaults to runtime
   * detection (`typeof window === 'undefined'`), and can be overridden with
   * the app's own flag (e.g. Nuxt's `import.meta.server`) when the app is
   * bundled for both server and client.
   *
   * @defaultValue isServerRuntime()
   */
  isServer?: boolean;
}

/**
 * Context for the ConfigProvider component.
 */
export interface ConfigProviderContext
  extends
    ToContext<Omit<ConfigProviderProps, 'iconRender' | 'presetProvider' | 'persistTheme' | 'themeConfig' | 'isServer'>>,
    Pick<ConfigProviderProps, 'iconRender'> {}

export type { ThemeOptions };
