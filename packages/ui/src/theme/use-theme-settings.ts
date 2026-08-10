import { computed, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { DEFAULT_PRESET_OPTIONS } from '@soybeanjs/theme';
import type { ColorKey, ColorValue, ThemeOptions, ThemeOverrides } from '@soybeanjs/theme';
import {
  getStoredThemeConfig,
  getStoredThemePresets,
  isValidColorValue,
  removeStoredThemePreset,
  setStoredThemeConfig,
  setStoredThemePreset,
  THEME_PRESETS_STORAGE_KEY,
  THEME_STORAGE_KEY
} from '@soybeanjs/theme/storage';
import type { StoredThemePreset, ThemeConfigState } from '@soybeanjs/theme/storage';

/**
 * the empty overrides object used when a config carries none.
 */
const EMPTY_OVERRIDES: ThemeOverrides = { light: {}, dark: {} };

/**
 * Options for `useThemeSettings`.
 */
export interface UseThemeSettingsOptions {
  /**
   * The initial configuration. When omitted, the persisted config is read from
   * storage (when `persist` is enabled).
   */
  initial?: ThemeConfigState;
  /**
   * Whether to read/write the persisted theme config from storage.
   *
   * @default true
   */
  persist?: boolean;
  /**
   * The localStorage key backing the persisted config.
   *
   * @default THEME_STORAGE_KEY
   */
  storageKey?: string;
  /**
   * The callback invoked by `commit()` to apply the config to the runtime
   * (e.g. `useTheme().setThemeState`).
   */
  apply?: (state: ThemeConfigState) => void;
}

/**
 * The named-preset manager exposed by `useThemeSettings`.
 */
export interface PresetManager {
  /** The persisted custom preset table (keyed by name). */
  list: Ref<Record<string, StoredThemePreset>>;
  /** The currently applied preset name, if any. */
  appliedName: Ref<string | null>;
  /** Save the current config as a named preset. */
  save: (name: string) => boolean;
  /** Apply a named preset. */
  apply: (name: string) => void;
  /** Remove a named preset. */
  remove: (name: string) => boolean;
}

/**
 * The return value of `useThemeSettings`.
 */
export interface UseThemeSettingsReturn {
  /** The complete writable config (a `ThemeConfigState` full field set). */
  state: Ref<ThemeConfigState>;
  /** Immutably patch the config (single field or object). */
  setState: (patch: Partial<ThemeConfigState>) => void;
  /** The editable light/dark single-token overrides. */
  overrides: ComputedRef<ThemeOverrides>;
  /** Set or clear a single override token. Empty/invalid values are removed. */
  setOverride: (mode: 'light' | 'dark', key: ColorKey, value: ColorValue | '') => void;
  /** The merged `ThemeOptions` derived from `state`, ready for `createTheme`. */
  resolved: ComputedRef<ThemeOptions>;
  /** Named-preset management (strategy Y). */
  presets: PresetManager;
  /** Persist the config and call `apply` to push it to the runtime. */
  commit: () => void;
  /** Reset to the engine defaults and clear overrides. */
  reset: () => void;
  /** Re-read the persisted tables from storage. */
  refreshPresets: () => void;
}

const hasAnyOverride = (overrides: ThemeOverrides | undefined): boolean =>
  overrides != null && (Object.keys(overrides.light ?? {}).length > 0 || Object.keys(overrides.dark ?? {}).length > 0);

/**
 * The UI-layer theme configuration state core.
 *
 * Owns the editable full `ThemeConfigState` (base/primary/feedback/chart/
 * sidebar/size/radius/menu/levels/overrides), immutable `setState`/`setOverride`
 * updates, a `resolved` `ThemeOptions` derived from the state, and named-preset
 * management. Used by both the in-app settings panel and the theme shop
 * customizer; pure logic and storage, no component rendering.
 */
export function useThemeSettings(options: UseThemeSettingsOptions = {}): UseThemeSettingsReturn {
  const { initial, persist = true, storageKey = THEME_STORAGE_KEY, apply } = options;

  const state = ref<ThemeConfigState>({
    ...(initial ?? (persist ? getStoredThemeConfig(storageKey) : null))
  });

  const setState = (patch: Partial<ThemeConfigState>): void => {
    state.value = { ...state.value, ...patch };
  };

  const overrides = computed<ThemeOverrides>(() => state.value.overrides ?? EMPTY_OVERRIDES);

  const setOverride = (mode: 'light' | 'dark', key: ColorKey, value: ColorValue | ''): void => {
    const current = state.value.overrides ?? EMPTY_OVERRIDES;
    const modeTokens = { ...current[mode] } as Record<string, ColorValue>;

    if (value === '' || !isValidColorValue(value)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete modeTokens[key];
    } else {
      modeTokens[key] = value;
    }

    const next: ThemeOverrides = { ...current, [mode]: modeTokens };

    if (!hasAnyOverride(next)) {
      setState({ overrides: undefined });
      return;
    }

    setState({ overrides: next });
  };

  const resolved = computed<ThemeOptions>(() => {
    const { mode: _mode, overrides: override, ...rest } = state.value;

    return {
      ...rest,
      ...(hasAnyOverride(override) ? { overrides: override } : {})
    };
  });

  // —— 命名预设管理（策略 Y）——
  const presets = ref<Record<string, StoredThemePreset>>({});
  const appliedName = ref<string | null>(null);

  const refreshPresets = (): void => {
    presets.value = getStoredThemePresets()?.presets ?? {};
  };

  const save = (name: string): boolean => {
    const { overrides: override } = state.value;
    const primary = state.value.primary ?? DEFAULT_PRESET_OPTIONS.primary;

    const preset: StoredThemePreset = {
      name,
      version: '1.0.0',
      light: {
        ...override?.light,
        primary: `${primary}.600` as ColorValue,
        ring: `${primary}.500` as ColorValue
      },
      ...(override?.dark && Object.keys(override.dark).length > 0 ? { dark: override.dark } : {})
    };

    const saved = setStoredThemePreset(preset);

    if (saved) {
      refreshPresets();
    }

    return saved;
  };

  const applyPreset = (name: string): void => {
    appliedName.value = name;
  };

  const removePreset = (name: string): boolean => {
    const removed = removeStoredThemePreset(name);

    if (removed) {
      refreshPresets();
      if (appliedName.value === name) {
        appliedName.value = null;
      }
    }

    return removed;
  };

  const commit = (): void => {
    if (persist) {
      setStoredThemeConfig(state.value, storageKey);
    }

    apply?.(state.value);
  };

  const reset = (): void => {
    state.value = {
      size: DEFAULT_PRESET_OPTIONS.size,
      radius: DEFAULT_PRESET_OPTIONS.radius,
      menuColor: DEFAULT_PRESET_OPTIONS.menuColor,
      menuAccent: DEFAULT_PRESET_OPTIONS.menuAccent,
      base: DEFAULT_PRESET_OPTIONS.base,
      primary: DEFAULT_PRESET_OPTIONS.primary,
      format: DEFAULT_PRESET_OPTIONS.format,
      lightLevel: DEFAULT_PRESET_OPTIONS.lightLevel,
      darkLevel: DEFAULT_PRESET_OPTIONS.darkLevel,
      sidebarDerive: DEFAULT_PRESET_OPTIONS.sidebarDerive,
      mode: 'light'
    };
  };

  return {
    state,
    setState,
    overrides,
    setOverride,
    resolved,
    presets: {
      list: presets,
      appliedName,
      save,
      apply: applyPreset,
      remove: removePreset
    },
    commit,
    reset,
    refreshPresets
  };
}

export { THEME_PRESETS_STORAGE_KEY };
