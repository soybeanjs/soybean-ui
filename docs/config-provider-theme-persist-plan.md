# ConfigProvider 主题持久化与缓存方案

> 版本：v1.0（评审稿）
> 范围：`@soybeanjs/theme`（存储 API 扩展）+ `@soybeanjs/ui` ConfigProvider（解析管道 / 内存缓存 / 新增 props）+ `apps/nuxt`（SSR 落地示例）
> 前置：[theme-refactor-plan.md](theme-refactor-plan.md)、[theme-presets-plan.md](theme-presets-plan.md)、[ADR-7](adr/0007-theme-presets-positioning.md)
> 术语：[CONTEXT.md](../CONTEXT.md)

---

## 1. 背景与现状

- `@soybeanjs/theme` 已具备存储基础能力：`THEME_STORAGE_KEY` / `THEME_COOKIE_KEY`（均为 `soybean-ui-theme`）、`stringifyThemeConfig` / `parseThemeConfig`（含键枚举校验与未知字段忽略）、`get/set/removeStoredThemeConfig`（localStorage，SSR-safe）、`setThemeCookie` / `getThemeConfigFromCookie`（SSR）、`createThemeInitScript`（head 内联脚本，首帧前应用主题并把 localStorage 镜像到 cookie）。
- 现状缺口：
  1. 持久化读取发生在**应用层**（`apps/nuxt/app.vue` 读 cookie、`apps/playground/src/theme.ts` 用 `useStorage`），ConfigProvider 只消费显式 `theme` props，能力未下沉、每渲染重复反序列化。
  2. `ThemeConfigState` 明确「自定义 preset 颜色不持久化」（见 [types.ts](../packages/theme/src/types.ts) 注释），自定义 preset 只能内联传入，无法跨会话保存。
  3. 存储读取结果无内存缓存，重复渲染时反复 `JSON.parse`。

本方案把「存储读取 + 合并 + 缓存 + 自定义 preset 持久化」统一下沉到 ConfigProvider，三项功能共享同一解析管道，且默认关闭持久化以保证向后兼容。

## 2. 总体设计

### 2.1 解析管道

```
有效主题配置 = 合并(显式 props.theme, 存储配置, 默认值)
```

优先级（高 → 低）：

1. **显式 `props.theme`**（内联 preset > 存储 preset 引用 > 内置，见 §5.6）；
2. **存储配置**（SSR 场景：`themeConfig` 注入的 cookie 解析结果；客户端：localStorage），仅补齐未显式声明的键；
3. **`DEFAULT_PRESET_OPTIONS`** 默认值。

### 2.2 三项功能关系

| 功能                 | 载体                                                  | 依赖                                        |
| -------------------- | ----------------------------------------------------- | ------------------------------------------- |
| ① 存储态内存缓存     | `cacheThemeConfig` prop + 实例级记忆化                | 仅当持久化开启（`persistTheme`）时生效      |
| ② SSR cookie 读取    | `themeConfig` prop 注入 + `@soybeanjs/theme` 既有 API | 框架层（Nuxt）负责 `useRequestHeaders` 读取 |
| ③ 自定义 preset 存储 | `presetStorage` prop + `@soybeanjs/theme` 新增 API    | 本地存储为权威源，SSR 走注册表注入          |

`persistTheme` 为**总开关**（默认 `false`）：关闭时管道短路，直接走现状逻辑（仅合并显式 props 与默认值），新增属性全部被忽略、不产生任何行为变化。

## 3. 功能一：存储态内存缓存

### 3.1 属性定义

```ts
// packages/ui/src/components/config-provider/types.ts（新增）
export interface ConfigProviderProps extends _ConfigProviderProps {
  /**
   * 是否启用持久化主题读取（localStorage / cookie）。
   *
   * 关闭（默认）时 ConfigProvider 不读取任何存储，仅消费显式 `theme` props，
   * 与当前行为完全一致。开启后按 §2.1 管道合并存储配置。
   *
   * @defaultValue false
   */
  persistTheme?: boolean;
  /**
   * 是否启用「存储态内存缓存」。
   *
   * 开启（默认）后，从存储读取的主题配置在组件实例生命周期内只解析一次并缓存，
   * 后续渲染复用内存结果，避免重复 JSON 反序列化与存储 I/O。
   * 关闭后每次渲染重新读取存储。
   *
   * 仅当 `persistTheme` 为 `true` 时该属性有意义；否则被忽略。
   *
   * @defaultValue true
   */
  cacheThemeConfig?: boolean;
  /**
   * localStorage 存储键。仅在 `persistTheme` 开启时生效。
   *
   * @defaultValue THEME_STORAGE_KEY（'soybean-ui-theme'）
   */
  themeStorageKey?: string;
  /**
   * cookie 键名。仅在 `persistTheme` 开启时生效。
   *
   * @defaultValue THEME_COOKIE_KEY（'soybean-ui-theme'）
   */
  themeCookieKey?: string;
  /**
   * SSR 注入的持久化配置（应用层已从 cookie 解析的结果）。
   *
   * 客户端水合时该值来自服务端序列化，不参与存储回写。
   *
   * @type ThemeConfigState
   */
  themeConfig?: ThemeConfigState;
}
```

### 3.2 缓存语义

- **缓存作用域**：组件实例（setup 闭包变量），不跨 SSR 请求共享（服务端每请求隔离，天然安全）。
- **缓存对象**：存储读取结果 `ThemeConfigState | null`（解析后的内存态，非原始字符串）。
- **失效条件**：
  a) `theme` / `themeConfig` / `themeStorageKey` prop 变化；
  b) `cacheThemeConfig` 切换为 `false`；
  c) 写回存储（`commitPersistedConfig`）时同步更新缓存，保证读写一致；
  d) 跨标签页：监听 `storage` 事件，目标键变化时置脏（`persistedConfigDirty = true`）。

```ts
// config-provider.vue（UI 层，示意）
let persistedConfig: ThemeConfigState | null = null;
let persistedConfigDirty = true;

const readPersistedConfig = (): ThemeConfigState | null => {
  if (!props.persistTheme) return null;
  if (props.cacheThemeConfig && !persistedConfigDirty) return persistedConfig;
  persistedConfig = props.themeConfig ?? getStoredThemeConfig(props.themeStorageKey);
  persistedConfigDirty = false;
  return persistedConfig;
};

watch(
  () => [props.theme, props.themeConfig, props.themeStorageKey],
  () => {
    persistedConfigDirty = true;
  }
);

if (typeof window !== 'undefined' && props.cacheThemeConfig) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === props.themeStorageKey) persistedConfigDirty = true;
  };
  window.addEventListener('storage', onStorage);
  onUnmounted(() => window.removeEventListener('storage', onStorage));
}
```

- **写回同步**：`commitPersistedConfig(config)` 内 `setStoredThemeConfig` + `setThemeCookie` 后立即更新 `persistedConfig` 并复位脏标记，使下游 `createTheme` 无需重读存储。

### 3.3 默认值与使用场景限制

- **默认值**：`cacheThemeConfig = true`（性能优先，存储读取是 JSON 解析 + 存储 I/O，常态下应复用）。
- **使用场景限制**：
  1. **仅 `persistTheme = true` 时有意义**：未开启持久化时无存储读取，缓存无对象，属性被忽略（不报错）；
  2. **多标签页同步**：缓存依赖 `storage` 事件失效；若应用不关注跨标签页主题同步，可忽略；极端高并发写入场景建议关闭缓存；
  3. **SSR 隔离**：缓存绝不跨请求共享，服务端读取恒定走 `themeConfig` 注入；
  4. **超大自定义 preset 场景**：深比较/缓存命中有常量级开销，preset 表巨大（>100 项颜色键）且每帧变化时，关闭缓存（`false`）可避免无效存储 I/O 之外的额外成本；
  5. **调试期**：动态改存储键或手工改 localStorage 时，`false` 可保证实时读取（或依赖 storage 事件）。

## 4. 功能二：SSR cookie 主题读取

### 4.1 cookie 键名规范

| 项       | 规范                                                         | 说明                                                                    |
| -------- | ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| 默认键名 | `soybean-ui-theme`（`THEME_COOKIE_KEY`）                     | kebab-case，与 `THEME_STORAGE_KEY` 同名，init script 镜像时无需改键     |
| 命名规则 | `{namespace}-{scope}`                                        | namespace = `soybean-ui`（防与其他库冲突），scope = `theme`（描述内容） |
| 定制     | `themeCookieKey` prop / `ThemeCookieOptions.key`             | 应用可整体替换                                                          |
| 值格式   | `encodeURIComponent(JSON.stringify(ThemeConfigState))`       | 单条 cookie 上限 4KB，主题配置 JSON 约 <200B，余量充足                  |
| 安全     | `SameSite=Lax`；仅颜色/尺寸偏好、无敏感信息；可扩展 `Secure` | 由 `setThemeCookie` 与 `createThemeInitScript` 统一保证                 |
| 体积边界 | **自定义 preset 定义绝不入 cookie**                          | 见 §5.1：preset 表走 localStorage + 服务端注册表，避免超限              |

### 4.2 读取时机

| 时机                           | 动作                                                                                   | 位置                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 服务端请求早期（组件树渲染前） | `useRequestHeaders(['cookie'])` → `getThemeConfigFromCookie` → 注入 `themeConfig` prop | Nuxt `app.vue` setup（现状已实现，本方案改为透传 prop）或 nitro 中间件 |
| 客户端首帧前                   | `createThemeInitScript` 读 localStorage → 设 `data-theme` / dark class → 镜像 cookie   | head 内联脚本（既有能力）                                              |
| 运行时写回                     | `commitPersistedConfig` 同步 `setThemeCookie`                                          | ConfigProvider（新增）                                                 |

**一致性链路**：客户端首帧前 localStorage → cookie；下一次 SSR 请求读到该 cookie → 渲染相同主题 → 客户端水合复用。两次首帧之间无主题闪烁。

### 4.3 异常处理机制

| 异常                                | 处理                                                                   | 位置                             |
| ----------------------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| cookie 缺失 / 空头                  | 返回 `null` → 走默认主题                                               | `getThemeConfigFromCookie`       |
| JSON 损坏                           | `try/catch` → `null`                                                   | `parseThemeConfig`               |
| `base` / `primary` 不在内置枚举     | 校验失败 → `null`                                                      | `parseThemeConfig`               |
| `decodeURIComponent` 失败           | `try/catch` → `null`                                                   | `getThemeConfigFromCookie`       |
| 未知字段（未来版本新增键）          | 忽略，仅提取已知键                                                     | `parseThemeConfig`（白名单提取） |
| 配置值类型非法（mode/size/radius…） | 单项跳过（`undefined` 即不覆盖）                                       | `parseThemeConfig`               |
| 体积超限                            | 设计约束避免（preset 不入 cookie）；读取侧 `split(';')` 天然忽略超限段 | §5.1                             |

所有异常路径均**静默回退默认主题**，保证 SSR 永不因主题解析抛错（500 已被本次 Nuxt 修复验证隔离于本机制之外）。

### 4.4 ConfigProvider 集成

- `persistTheme = true` 且 SSR 时：`readPersistedConfig()` 优先取 `props.themeConfig`（应用层 cookie 解析结果），客户端则取 localStorage；
- 服务端渲染的 CSS（内联 `<style id="__SoybeanUI_theme">`）基于合并后的有效配置生成，与客户端首帧一致；
- **不新增框架依赖**：ConfigProvider 保持框架无关，cookie 读取动作留在框架层（Nuxt 用 `useRequestHeaders`，其他 SSR 框架自行适配注入）。

## 5. 功能三：自定义 preset 存储

### 5.1 存储位置与格式

- **存储位置**：localStorage（客户端权威源）。**不入 cookie**：preset 定义可能包含数十个颜色键、体积超 cookie 4KB 上限，且 cookie 每次请求都会传输，不适合承载数据定义。
- **存储键**：`soybean-ui-theme-presets`（新常量 `THEME_PRESETS_STORAGE_KEY`）。
- **格式规范**（JSON）：

```jsonc
{
  "version": 1, // 存储 schema 版本（整数，用于迁移）
  "presets": {
    "my-brand": {
      // 对象键 = preset name（唯一标识）
      "name": "my-brand",
      "version": "1.0.0", // preset 自身语义化版本
      "light": { "primary": "hsl(210 80% 55%)", "ring": "hsl(210 80% 55%)" },
      "dark": { "primary": "hsl(210 80% 70%)" }
    }
  }
}
```

- `StoredThemePreset = CustomThemeColorPreset + { name, version }`（`light` 必填 ≥1 合法键，`dark` 可选）。

### 5.2 读写 API（`@soybeanjs/theme` 新增，SSR-safe）

```ts
// packages/theme/src/storage.ts（新增）
export const THEME_PRESETS_STORAGE_KEY = 'soybean-ui-theme-presets';

export interface StoredThemePreset extends CustomThemeColorPreset {
  /** 预设唯一标识（也是存储对象键） */
  name: string;
  /** 预设数据版本（semver，用于展示与更新判断） */
  version: string;
}

export interface StoredThemePresets {
  /** 存储 schema 版本，当前 1 */
  version: number;
  presets: Record<string, StoredThemePreset>;
}

/** 读取全部预设（容错：损坏 → null）。SSR 环境返回 null 不抛错。 */
export function getStoredThemePresets(key: string = THEME_PRESETS_STORAGE_KEY): StoredThemePresets | null;

/** 写入单个预设（整表原子更新）。返回是否成功。 */
export function setStoredThemePreset(preset: StoredThemePreset, key: string = THEME_PRESETS_STORAGE_KEY): boolean;

/** 删除单个预设。返回是否存在被删除项。 */
export function removeStoredThemePreset(name: string, key: string = THEME_PRESETS_STORAGE_KEY): boolean;

/** 解析并校验 + 版本迁移。非法 → null。 */
export function parseThemePresets(raw: string | null | undefined): StoredThemePresets | null;

/** 版本迁移（内部）：vN → 当前 schema 版本；未知高版本拒绝读取。 */
function migrateThemePresets(data: unknown, fromVersion: number): StoredThemePresets | null;
```

**校验规则**（`parseThemePresets`）：

- `version` 必须为正整数；大于当前版本 → 整体返回 `null`（未知未来格式，避免误读）；
- 每个 preset：`name` 与对象键一致、`version` 存在、`light` 至少 1 个合法颜色键（复用引擎色值解析器校验 `ColorValue`）、`dark` 可选；
- **非法条目丢弃该条，不丢弃整个表**（容错粒度到条目）。

### 5.3 客户端 / 服务端同步

| 端     | 数据源                         | 说明                       |
| ------ | ------------------------------ | -------------------------- |
| 客户端 | localStorage（唯一权威存储点） | 保存 / 读取 / 删除均落这里 |
| 服务端 | 注入的 preset 注册表           | 不读 localStorage          |

**SSR 一致性策略**（推荐 A，备选 B）：

- **方案 A（推荐）——服务端注册表**：应用把与 localStorage 同源的 preset 定义注册到服务端（构建时从 `@soybeanjs/theme-presets` 数据包导入，或服务端自定义注册），通过新增 `presetProvider` 注入 ConfigProvider → SSR HTML 完整渲染自定义 preset，**无闪烁**。
- **方案 B——cookie 存引用**：持久化配置只存 `presetName` 引用（体积小可入 cookie）；SSR 若无该 preset 定义则回退内置 → 首帧内置、水合后切换（轻微闪烁，作为已知取舍文档化）。

```ts
// ConfigProvider 新增（服务端注册表注入）
/**
 * 服务端自定义 preset 注册表：name → CustomThemeColorPreset。
 * 仅在 `persistTheme` 开启且 SSR 场景使用；客户端忽略（以 localStorage 为准）。
 */
presetProvider?: (name: string) => CustomThemeColorPreset | null | undefined;
```

### 5.4 缓存策略

- **持久层即缓存**：localStorage 本身承担跨会话缓存；
- **解析结果记忆化**：`createTheme` 的 CSS 派生由功能一的 `cacheThemeConfig` 记忆化，preset 表解析（`getStoredThemePresets`）仅在失效后重读；
- **写入即失效**：`setStoredThemePreset` / `removeStoredThemePreset` 成功后触发 `persistedConfigDirty = true`，下一渲染重新派生；
- **跨标签页**：`storage` 事件驱动失效（与功能一共享同一监听）。

### 5.5 版本兼容

- **存储 schema `version`**（当前 1）：`migrateThemePresets` 做 vN → v1 迁移（当前仅兼容 v1，预留扩展位）；**未知高版本拒绝读取**（安全回退默认，不猜测未来格式）；
- **字段向前兼容**：解析器只提取已知键，新增字段不影响旧解析器；
- **preset 内 `version`**（semver）：用于更新判断与展示，不参与 schema 迁移；
- **键删除**：已存旧键无副作用（解析时白名单提取，未知键忽略）。

### 5.6 与主题配置的集成（优先级）

- 扩展 `ThemeOptions.preset` 支持按名引用：

```ts
// packages/theme/src/types.ts（新增）
export type ThemePresetRef = { presetName: string };
export type ThemePresetInput = CustomThemeColorPreset | ThemePresetRef;

export interface PresetConfig {
  preset?: ThemePresetInput;
}
```

- **解析优先级**：内联 `CustomThemeColorPreset` > 存储 `{ presetName }` 查表命中 > 内置派生；
- 存储未命中 `{ presetName }`：回退内置 + 开发态 `console.warn`；
- **引擎保持纯净**：`createTheme` 仍只接收完整 `CustomThemeColorPreset`（见 [core.ts](../packages/theme/src/core.ts#L25)），preset 引用解析发生在 ConfigProvider 管道内，引擎零改动。

## 6. 实现步骤

1. **`@soybeanjs/theme` 存储层**：`storage.ts` 新增 `THEME_PRESETS_STORAGE_KEY`、`StoredThemePreset` / `StoredThemePresets` 类型、`parseThemePresets`（含校验 + 迁移）、`get/set/removeStoredThemePreset`；复用既有色值解析器做 `ColorValue` 校验。
2. **`@soybeanjs/theme` 类型层**：`types.ts` 新增 `ThemePresetRef` / `ThemePresetInput`，`PresetConfig.preset` 放宽为该联合类型（引擎消费前先由调用方解析，`createTheme` 签名不变）。
3. **`@soybeanjs/ui` ConfigProvider**：
   - `types.ts` 新增 `persistTheme` / `cacheThemeConfig` / `themeStorageKey` / `themeCookieKey` / `themeConfig` / `presetProvider`；
   - `config-provider.vue` 实现 §2.1 解析管道：`readPersistedConfig`（含缓存）+ `effectiveTheme`（合并）+ preset 引用解析 + `commitPersistedConfig` 写回；
   - 注册 `storage` 事件监听（`cacheThemeConfig` 开启时）。
4. **`apps/nuxt` 落地**：`app.vue` 已有 cookie 读取，改为透传 `:theme-config`；补充自定义 preset 保存/应用示例。
5. **`apps/playground` 落地**：主题面板新增「保存为自定义 preset」与 preset 列表管理。
6. **文档**：更新 `CONTEXT.md` 术语（`persistTheme` / `cacheThemeConfig` / `StoredThemePreset`）与组件 API 注释。

## 7. 测试用例

### 7.1 `@soybeanjs/theme`（vitest 单元测试）

| 用例                                                  | 断言                                               |
| ----------------------------------------------------- | -------------------------------------------------- |
| `parseThemePresets` 合法样本（多个 preset）           | 正确返回全部条目                                   |
| 损坏 JSON                                             | 返回 `null`                                        |
| 含非法颜色值条目                                      | 丢弃该条目，其余保留                               |
| schema 版本为未知高版本（如 99）                      | 返回 `null`                                        |
| 缺失 `version` 字段（旧格式）                         | 迁移为 v1 默认                                     |
| `getStoredThemePresets` 在无 `window` 环境（SSR）     | 返回 `null` 不抛错                                 |
| `setStoredThemePreset` → `getStoredThemePresets` 往返 | 数据一致                                           |
| `removeStoredThemePreset` 不存在的 name               | 返回 `false`，无副作用                             |
| 与既有 `parseThemeConfig` 互不干扰                    | 键/常量独立，`soybean-ui-theme` 不受 preset 键影响 |

### 7.2 ConfigProvider（vue-test-utils 组件测试）

| 用例                                                 | 断言                               |
| ---------------------------------------------------- | ---------------------------------- |
| `cacheThemeConfig=true`，相同 `theme` props 渲染两次 | `createTheme` 仅调用 1 次（spy）   |
| `theme` prop 变化                                    | 缓存失效，重新派生                 |
| 触发 `storage` 事件（目标键）                        | 缓存失效                           |
| `cacheThemeConfig=false`，渲染两次                   | `createTheme` 每次调用             |
| `persistTheme=true` + `themeConfig` 注入（模拟 SSR） | 存储配置参与合并，未显式键被补齐   |
| 内联 `preset` 与存储 `{ presetName }` 同时存在       | 内联优先                           |
| `presetName` 在存储中未命中                          | 回退内置 + 开发态 warn             |
| `persistTheme=false`                                 | 新增属性全部被忽略，行为与现状一致 |

### 7.3 `apps/nuxt`（e2e）

| 用例                                      | 断言                                     |
| ----------------------------------------- | ---------------------------------------- |
| 携带主题 cookie 请求首页                  | SSR HTML 含对应 `data-theme` 与 CSS 变量 |
| 无 cookie 请求首页                        | 默认主题渲染，无 500                     |
| 保存自定义 preset 后刷新（方案 A 注册表） | 首帧即应用自定义 preset，无闪烁          |

## 8. 向后兼容与开放问题

- **向后兼容**：所有新增 props 默认值（`persistTheme=false`、`cacheThemeConfig=true`）保证现有行为不变；`@soybeanjs/theme` 新增 API 为纯增量；引擎 `createTheme` 签名不变。
- **开放问题**：
  1. 是否暴露实例方法 `clearThemeCache()`（`defineExpose`）用于手动失效缓存；
  2. 服务端 preset 注册表的注入形态：`presetProvider` prop vs 全局注册表（`@soybeanjs/theme` 导出 register 函数）；
  3. preset 表是否需要跨标签页实时同步（`storage` 事件目前只触发失效，不主动重算）。

## 9. SSR 存储优化：`createThemeStore` 统一门面

### 9.1 背景：`import.meta.env.SSR` 固化问题

`@soybeanjs/theme` 与 UI 库均为**预构建产物**，构建时 `import.meta.env.SSR` 会被求值并固化为常量（通常为 `false`），因此**无法在消费方真实 SSR 运行时反映服务端环境**，导致 `config-provider.vue` 中基于它的 SSR 分支成为死代码。

### 9.2 解决方案（三要素）

| 要素                | 实现                                                                                                                                                      | 说明                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| a) 环境无关核心     | `@soybeanjs/theme` 的纯 TS 函数（`parseThemeConfig` / `getThemeConfigFromCookie` / `getStoredThemePresets` 等）均不读取 `import.meta.env`，只消费显式输入 | 可在任意环境安全调用                                            |
| b) 显式环境判断接口 | `isServerRuntime()`（运行时检测）为兜底；`ThemeStoreOptions.isServer` 允许应用显式注入（如 Nuxt `import.meta.server`）                                    | 应用 Bundle 下 `import.meta.server` 可靠，主动驱动 SSR 专用路径 |
| c) 跨环境一致性     | cookie 作为同步通道：客户端 `commitConfig` / `applyPreset` 写 cookie，服务端 `readConfig` / `readAppliedPreset` 从 `cookieHeader` 读                      | 服务端首帧与客户端后续状态一致，无闪烁                          |

### 9.3 API 一览

#### 环境判断

| 函数              | 签名                                 | 说明                                                  |
| ----------------- | ------------------------------------ | ----------------------------------------------------- |
| `isServerRuntime` | `() => boolean`                      | 运行时检查 `window` / `document` 是否存在，判断服务端 |
| `getCookieValue`  | `(rawCookie, key) => string \| null` | 从原始 cookie 字符串读取普通值（空值视为未设置）      |

#### 统一门面

```ts
createThemeStore(options?: ThemeStoreOptions): ThemeStore
```

`ThemeStoreOptions`：

| 字段                     | 默认                          | 说明                                                              |
| ------------------------ | ----------------------------- | ----------------------------------------------------------------- |
| `storageKey`             | `'soybean-ui-theme'`          | 主题配置 localStorage 键                                          |
| `cookieKey`              | `'soybean-ui-theme'`          | 主题配置 cookie 键（SSR 同步）                                    |
| `presetsKey`             | `'soybean-ui-theme-presets'`  | 自定义 presets 表 localStorage 键                                 |
| `appliedPresetCookieKey` | `'soybean-ui-applied-preset'` | 已应用 preset 引用 cookie 键                                      |
| `isServer`               | `isServerRuntime()`           | 显式运行时环境，**应用应主动传**                                  |
| `cookieHeader`           | `null`                        | 服务端原始 cookie 头（如 `useRequestHeaders(['cookie']).cookie`） |
| `presetProvider`         | `undefined`                   | 服务端 preset 注册表：`(name) => CustomThemeColorPreset`          |

`ThemeStore` 方法：

| 方法                   | 环境                          | 行为                                           |
| ---------------------- | ----------------------------- | ---------------------------------------------- |
| `readConfig()`         | server / client               | 服务端读 cookie；客户端读 localStorage         |
| `commitConfig(config)` | client（server no-op）        | 写 localStorage + 镜像 cookie                  |
| `resolvePreset(name)`  | server / client               | 服务端经 `presetProvider`；客户端读 presets 表 |
| `savePreset(preset)`   | client（server 返回 `false`） | 写入 presets 表                                |
| `removePreset(name)`   | client（server 返回 `false`） | 从 presets 表删除                              |
| `readAppliedPreset()`  | server / client               | 读已应用 preset 引用 cookie                    |
| `applyPreset(name)`    | client（server no-op）        | 写已应用 preset 引用 cookie                    |
| `resetPreset()`        | client（server no-op）        | 清除已应用 preset 引用 cookie                  |

### 9.4 使用条件与环境限制

- **`isServer` 必须显式传**：库无法自判消费方环境，应用应传 `import.meta.server`（Nuxt）或等价的 SSR 标志；不传时回退 `isServerRuntime()` 运行时检测。
- **写方法仅客户端生效**：服务端无 `localStorage` / `document`，`commitConfig` / `savePreset` / `removePreset` / `applyPreset` / `resetPreset` 均为 no-op 或返回 `false`。
- **cookie 是唯一跨环境通道**：客户端写、服务端读，保证水合一致；服务端无法写 cookie，只能在客户端持久化后由后续请求携带。

### 9.5 应用侧简化示例

```ts
// apps/nuxt 在改造前需手写 ~60 行 cookie 读取 / localStorage / 状态同步；
// 改造后收敛为：
const themeStore = createThemeStore({
  isServer: import.meta.server,
  cookieHeader: import.meta.server ? useRequestHeaders(['cookie']).cookie : undefined,
  presetProvider: name => (name === 'brand-demo' ? demoPreset : undefined)
});

const themeConfig = themeStore.readConfig(); // SSR 读 cookie / CSR 读 localStorage
const appliedPresetName = shallowRef(themeStore.readAppliedPreset());

const savePreset = () => {
  if (themeStore.savePreset({ name, version: '1.0.0', ...demoPreset })) {
    themeStore.applyPreset(name);
    appliedPresetName.value = name;
  }
};
```

### 9.6 测试覆盖（`packages/theme/test/store.spec.ts`）

- `isServerRuntime`：浏览器环境 `false` / 无 `window` 时 `true`；
- `getCookieValue`：命中 / 缺失 / 空值；
- CSR 门面：读 localStorage、`commitConfig` 双写、preset 解析、save/remove、apply/reset cookie 往返；
- SSR 门面：读 `cookieHeader`、`commitConfig` / save/remove no-op、`presetProvider` 解析、apply/reset no-op；
- 跨环境一致性：客户端应用后服务端从同一 cookie 读到一致引用。
