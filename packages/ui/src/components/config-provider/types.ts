import type { ConfigProviderProps as _ConfigProviderProps } from '@soybeanjs/headless/config-provider';
import type { ProgressProviderProps } from '@soybeanjs/headless/progress';
import type { PropsToContext } from '@soybeanjs/headless/types';
import type { ThemeOptions } from '@soybeanjs/theme';
import type { CustomThemeColorPreset, ThemeConfigState, ThemePresetInput } from '@soybeanjs/theme/storage';
import type { ThemeSize } from '@/theme';
import type { ToastProviderProps } from '../toast/types';

/**
 * UI-level theme options accepted by `SConfigProvider`.
 *
 * Unlike the engine's `ThemeOptions`, the `preset` may be either an inline
 * color preset or a `{ name }` reference to a stored preset. The provider
 * resolves named references to their colors before calling `createTheme`, so
 * the engine only ever receives a materialized preset.
 */
export type ConfigProviderThemeOptions = Omit<ThemeOptions, 'preset'> & {
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
   * Whether to enable the in-memory cache of the storage-derived theme config.
   *
   * When enabled (default), the theme config read from storage is parsed once
   * per component instance and reused on later renders, avoiding repeated JSON
   * deserialization and storage I/O. When disabled, the storage is re-read on
   * every render.
   *
   * Only takes effect when `persistTheme` is enabled; otherwise it is ignored.
   *
   * @defaultValue true
   */
  cacheThemeConfig?: boolean;
  /**
   * The localStorage key of the persisted theme config.
   *
   * Only takes effect when `persistTheme` is enabled.
   *
   * @defaultValue THEME_STORAGE_KEY ('soybean-ui-theme')
   */
  themeStorageKey?: string;
  /**
   * The cookie key of the persisted theme config.
   *
   * Only takes effect when `persistTheme` is enabled.
   *
   * @defaultValue THEME_COOKIE_KEY ('soybean-ui-theme')
   */
  themeCookieKey?: string;
  /**
   * The persisted theme config injected from the server (already resolved from
   * the cookie by the app layer, e.g. via `useRequestHeaders` in Nuxt).
   *
   * Used during SSR to render the same theme the client persisted; on the
   * client the localStorage is the source of truth.
   *
   * @type ThemeConfigState
   */
  themeConfig?: ThemeConfigState;
  /**
   * The raw cookie header (e.g. `useRequestHeaders(['cookie']).cookie` in Nuxt)
   * used to resolve the persisted theme config on the server.
   *
   * When provided on the server, the ConfigProvider resolves `themeConfig`
   * from the cookie itself, so the app does not need to read the cookie and
   * pass it via `themeConfig`. Only takes effect when `persistTheme` is
   * enabled and `isServer` is `true`.
   */
  cookieHeader?: string;
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
    PropsToContext<
      Omit<
        ConfigProviderProps,
        | 'iconRender'
        | 'presetProvider'
        | 'persistTheme'
        | 'cacheThemeConfig'
        | 'themeStorageKey'
        | 'themeCookieKey'
        | 'themeConfig'
        | 'cookieHeader'
        | 'isServer'
      >
    >,
    Pick<ConfigProviderProps, 'iconRender'> {}

export type { ThemeOptions };
