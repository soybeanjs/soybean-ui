import { computed, onMounted, reactive, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { useContext } from '@soybeanjs/headless/composables';
import type {
  BuiltinBasePresetKey,
  BuiltinPrimaryPresetKey,
  CustomThemeColorPreset,
  ThemeConfigState,
  ThemeOptions,
  ThemeRadius
} from '@soybeanjs/theme';
import { getCookieValue, getThemeConfigFromCookie, isServerRuntime } from '@soybeanjs/theme/ssr';
import {
  getStoredThemeConfig,
  getStoredThemePresets,
  removeStoredThemePreset,
  setStoredThemeConfig,
  setStoredThemePreset,
  setThemeCookie
} from '@soybeanjs/theme/storage';
import type { StoredThemePreset } from '@soybeanjs/theme/storage';
import type { ThemeSize } from '@/theme';
import type { ConfigProviderProps } from './types';

const DEFAULT_BASE: BuiltinBasePresetKey = 'zinc';
const DEFAULT_PRIMARY: BuiltinPrimaryPresetKey = 'indigo';
const DEFAULT_RADIUS: ThemeRadius = 'md';
const DEFAULT_SIZE: ThemeSize = 'md';
const DEFAULT_MODE: 'light' | 'dark' = 'light';

/** the cookie / localStorage key carrying the currently applied custom preset name */
const APPLIED_PRESET_KEY = 'soybean-ui-applied-preset';

/**
 * The reactive theme context exposed by `SConfigProvider`.
 *
 * It owns the persistable theme state (`base` / `primary` / `radius` / `size` /
 * `mode`), the custom preset management, and the effective `theme` derived for
 * the provider. Consumers read it via `useTheme()` to drive their own theme UI
 * without prop drilling or app-level state stores.
 */
export interface ThemeContext {
  /** The base color preset key. */
  base: Ref<BuiltinBasePresetKey>;
  /** The primary color preset key. */
  primary: Ref<BuiltinPrimaryPresetKey>;
  /** The border radius. */
  radius: Ref<ThemeRadius | (string & {})>;
  /** The component size / density. */
  size: Ref<ThemeSize | (string & {})>;
  /** The color scheme preference (`light` / `dark`). */
  mode: Ref<'light' | 'dark'>;
  /** Set the border radius. */
  setRadius: (value: ThemeRadius) => void;
  /** Set the component size / density. */
  setSize: (value: ThemeSize) => void;
  /** Set the color scheme preference. */
  setMode: (value: 'light' | 'dark') => void;
  /** The persisted custom theme presets table. */
  customPresets: Ref<Record<string, StoredThemePreset>>;
  /** The currently applied custom preset name, if any. */
  appliedPresetName: Ref<string | null>;
  /** Save the current primary color as a custom preset. */
  savePreset: (name: string) => boolean;
  /** Remove a custom preset. */
  removePreset: (name: string) => boolean;
  /** Apply a custom preset by name. */
  applyPreset: (name: string) => void;
  /** Clear the applied custom preset. */
  resetPreset: () => void;
  /** The effective theme merged from the internal state and the `theme` prop. */
  theme: ComputedRef<ThemeOptions>;
}

export const [provideThemeContext, useTheme] = useContext<ThemeContext>('UiThemeContext');

/** The internal theme context held by `SConfigProvider` (adds storage helpers). */
export type ConfigProviderThemeContext = ThemeContext & {
  /** Overwrite the internal theme state (used by cross-tab sync and `commitThemeConfig`). */
  setThemeState: (config: ThemeConfigState) => void;
  /** Re-read the persisted theme config from storage and force a re-derive (cross-tab sync). */
  refreshThemeConfig: () => void;
  /** Re-read the custom presets table from localStorage. */
  refreshPresetsSnapshot: () => void;
};

const getStoredPresetColors = (presetName: string): CustomThemeColorPreset | undefined => {
  const preset = getStoredThemePresets()?.presets[presetName];

  return preset ? { light: preset.light, ...(preset.dark ? { dark: preset.dark } : {}) } : undefined;
};

const setAppliedPresetCookie = (name: string | null): void => {
  if (typeof document === 'undefined') {
    return;
  }

  if (name) {
    document.cookie = `${APPLIED_PRESET_KEY}=${name}; Max-Age=31536000; Path=/; SameSite=Lax`;
  } else {
    document.cookie = `${APPLIED_PRESET_KEY}=; Max-Age=0; Path=/; SameSite=Lax`;
  }
};

/**
 * Create the theme context for a `SConfigProvider` instance.
 *
 * The persistable theme state is initialized once from the persisted source
 * (the SSR cookie on the server, localStorage on the client) and kept in sync
 * on every change, so the theme survives across refreshes and matches between
 * server and client rendering.
 */
export function createThemeContext(props: ConfigProviderProps): ConfigProviderThemeContext {
  const isServer = props.isServer ?? isServerRuntime();
  const cookieHeader = props.cookieHeader ?? null;

  // —— 初始主题状态：persistTheme 关闭时不读任何存储；开启时优先注入的
  //    themeConfig（SSR），否则服务端从 cookie、客户端从 localStorage 解析 ——
  let persisted: ThemeConfigState | null = null;

  if (props.persistTheme) {
    if (props.themeConfig) {
      // 显式注入的 themeConfig（SSR）优先，避免读取 localStorage
      persisted = props.themeConfig;
    } else if (isServer) {
      persisted = getThemeConfigFromCookie(cookieHeader, props.themeCookieKey);
    } else {
      persisted = getStoredThemeConfig(props.themeStorageKey);
    }
  }

  const themeState = reactive<ThemeConfigState>({
    ...persisted,
    base: persisted?.base ?? DEFAULT_BASE,
    primary: persisted?.primary ?? DEFAULT_PRIMARY,
    radius: persisted?.radius ?? DEFAULT_RADIUS,
    size: persisted?.size ?? DEFAULT_SIZE,
    mode: persisted?.mode ?? DEFAULT_MODE
  });

  const base = computed<BuiltinBasePresetKey>({
    get: () => themeState.base ?? DEFAULT_BASE,
    set: value => {
      themeState.base = value;
    }
  });
  const primary = computed<BuiltinPrimaryPresetKey>({
    get: () => themeState.primary ?? DEFAULT_PRIMARY,
    set: value => {
      themeState.primary = value;
    }
  });
  const radius = computed<ThemeRadius | (string & {})>({
    get: () => themeState.radius ?? DEFAULT_RADIUS,
    set: value => {
      themeState.radius = value;
    }
  });
  const size = computed<ThemeSize | (string & {})>({
    get: () => themeState.size ?? DEFAULT_SIZE,
    set: value => {
      themeState.size = value;
    }
  });
  const mode = computed<'light' | 'dark'>({
    get: () => themeState.mode ?? DEFAULT_MODE,
    set: value => {
      themeState.mode = value;
    }
  });

  // —— 持久化：state 变化时写 localStorage + cookie，保证 SSR 复用同一主题 ——
  watch(
    themeState,
    value => {
      if (!props.persistTheme) {
        return;
      }

      setStoredThemeConfig(value, props.themeStorageKey);
      setThemeCookie(value, { key: props.themeCookieKey });
    },
    { deep: true }
  );

  // —— 暗色模式 class 同步（首帧前由 createThemeInitScript 应用，此处幂等并负责运行中切换）——
  watch(
    mode,
    value => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', value === 'dark');
      }
    },
    { immediate: true }
  );

  // —— 缓存失效版本：storage 事件触发后递增，强制主题重派生（createTheme）——
  const cacheVersion = ref(0);

  // —— 自定义 preset ——
  const customPresets = ref<Record<string, StoredThemePreset>>({});
  const appliedPresetName = ref<string | null>(
    isServer
      ? getCookieValue(cookieHeader, APPLIED_PRESET_KEY)
      : typeof document !== 'undefined'
        ? (localStorage.getItem(APPLIED_PRESET_KEY) ?? getCookieValue(document.cookie, APPLIED_PRESET_KEY))
        : null
  );

  const refreshPresets = (): void => {
    customPresets.value = getStoredThemePresets()?.presets ?? {};
  };

  /**
   * 跨标签页同步：另开标签页写入 stored theme 后，重读并同步到内存状态，
   * 递增缓存版本强制主题重派生。`themeConfig` 注入（SSR）时不重读 localStorage。
   */
  const refreshThemeConfig = (): void => {
    if (!props.persistTheme || props.themeConfig) {
      return;
    }

    const stored = getStoredThemeConfig(props.themeStorageKey);

    if (stored) {
      Object.assign(themeState, stored);
    }

    cacheVersion.value++;
  };

  onMounted(refreshPresets);

  const setAppliedPreset = (name: string | null): void => {
    appliedPresetName.value = name;

    if (typeof document === 'undefined') {
      return;
    }

    setAppliedPresetCookie(name);

    if (name) {
      localStorage.setItem(APPLIED_PRESET_KEY, name);
    } else {
      localStorage.removeItem(APPLIED_PRESET_KEY);
    }
  };

  const savePreset = (name: string): boolean => {
    const preset: StoredThemePreset = {
      name,
      version: '1.0.0',
      light: { primary: `${primary.value}.600`, ring: `${primary.value}.500` },
      dark: { primary: `${primary.value}.400`, ring: `${primary.value}.300` }
    };

    const saved = setStoredThemePreset(preset);

    if (saved) {
      refreshPresets();
    }

    return saved;
  };

  const removePreset = (name: string): boolean => {
    const removed = removeStoredThemePreset(name);

    if (removed) {
      refreshPresets();
      if (appliedPresetName.value === name) {
        setAppliedPreset(null);
      }
    }

    return removed;
  };

  const applyPreset = (name: string): void => {
    setAppliedPreset(name);
  };

  const resetPreset = (): void => {
    setAppliedPreset(null);
  };

  // —— 有效主题：显式 theme prop 覆盖内部状态 ——
  const resolvePreset = (): CustomThemeColorPreset | undefined => {
    const input = props.theme?.preset;

    // 内联 preset（自定义颜色）直接使用，不受 persistTheme 限制
    if (input && !('presetName' in input)) {
      return input;
    }

    const name = appliedPresetName.value ?? (input && 'presetName' in input ? input.presetName : undefined);

    if (!name) {
      return undefined;
    }

    if (!props.persistTheme) {
      return undefined;
    }

    // SSR：走注入的 presetProvider（应用层注册表）；客户端：读本地 presets 表。
    const preset = isServer ? (props.presetProvider?.(name) ?? undefined) : getStoredPresetColors(name);

    if (!preset && isServer) {
      console.warn(`[SConfigProvider] theme preset "${name}" not found, falling back to built-in colors.`);
    }

    return preset;
  };

  const theme = computed<ThemeOptions>(() => {
    // 依赖缓存版本：storage 事件置脏后强制重派生（createTheme 重新执行）
    void cacheVersion.value;

    const t = props.theme ?? {};

    return {
      size: t.size ?? themeState.size ?? props.size ?? DEFAULT_SIZE,
      radius: t.radius ?? themeState.radius ?? DEFAULT_RADIUS,
      base: t.base ?? themeState.base ?? DEFAULT_BASE,
      primary: t.primary ?? themeState.primary ?? DEFAULT_PRIMARY,
      menuColor: t.menuColor ?? themeState.menuColor,
      menuAccent: t.menuAccent ?? themeState.menuAccent,
      format: t.format ?? themeState.format,
      lightLevel: t.lightLevel ?? themeState.lightLevel,
      darkLevel: t.darkLevel ?? themeState.darkLevel,
      styleTarget: t.styleTarget,
      darkSelector: t.darkSelector,
      preset: resolvePreset()
    };
  });

  return {
    base,
    primary,
    radius,
    size,
    mode,
    setRadius: value => {
      radius.value = value;
    },
    setSize: value => {
      size.value = value;
    },
    setMode: value => {
      mode.value = value;
    },
    customPresets,
    appliedPresetName,
    savePreset,
    removePreset,
    applyPreset,
    resetPreset,
    theme,
    setThemeState: (config: ThemeConfigState) => {
      Object.assign(themeState, config);
    },
    refreshThemeConfig,
    refreshPresetsSnapshot: refreshPresets
  };
}
