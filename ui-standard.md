# SoybeanUI 开发规范

## 1. 文件结构规范

### 1.1 命名规范
- 文件夹和文件名统一使用 kebab-case 命名方式
- 组件文件夹结构参考:
```
button/
├── button-content.vue
├── button-icon.vue
├── button.vue
├── index.ts
└── types.ts
```

### 1.2 组件导出规范
- 在 `index.ts` 中统一导出组件和类型
- 所有组件都需要在 `packages/ui/src/components/index.ts` 中导出
- 所有样式变体都需要在 `packages/ui-variants/src/index.ts` 中导出

## 2. 组件开发规范

### 2.1 基础规范
- 组件必须使用 `defineOptions` 定义组件名称
- 组件名称以 `S` 开头，如 `SButton`
- Props 类型定义统一在 `types.ts` 文件中
- 样式变体定义统一在 `packages/ui-variants/src/variants` 目录下

### 2.2 组件封装规范
根据 radix-vue 组件的使用场景，分为两种封装方式:

1. 直接导出:
- 当不需要修改原组件的样式和行为时
- 在 `index.ts` 中直接从 radix-vue 导出

2. 二次封装:
- 需要修改样式或添加新属性时
- 创建新的 .vue 文件进行封装
- 使用 `useForwardProps` 或 `useForwardPropsEmits` 继承原组件属性

### 2.3 类型规范
- 继承 radix-vue 组件类型时需要排除 `as` 和 `asChild` 属性:
```typescript
export type ButtonProps = ClassValueProp & Omit<_ButtonProps, 'as' | 'asChild'>;
```

### 2.4 样式规范
- 使用 computed 处理需要动态计算的样式
- 使用 `cn` 函数合并样式类名
- 样式变体统一使用 `@soybean-ui/variants` 中定义的工具函数

### 2.5 Props 规范
- 必须为所有 props 定义类型
- 可选的 props 使用可选操作符 `?`
- 使用 `ClassValueProp` 类型定义样式类名属性

### 2.6 组件结构规范
按照以下顺序组织组件代码:

1. import 导入语句顺序:
   - vue
   - vue-router
   - pinia
   - @vueuse/core
   - UI库
   - 其他依赖
   - 项目内部依赖(monorepo)
   - 别名导入
   - 相对路径导入

2. 类型导入:
   - 使用 `import type` 导入类型
   - 类型导入放在相同依赖的下面

3. defineOptions

4. Props 类型定义和声明:
```typescript
interface Props {
  prop1: string;
  prop2: number;
}

defineProps<Props>();
// 或
const props = defineProps<Props>(); // 用到props时
```

5. Emits 类型定义和声明:
```typescript
interface Emits {
  emit1: (arg1: string) => void;
  emit2: (arg1: number) => void;
}

// 或者
interface Emits {
  emit1: [arg1: string];
  emit2: [arg1: number];
}

defineEmits<Emits>();
// 或
const emit = defineEmits<Emits>(); // 用到emit时
```

6. Hooks 函数使用:
```typescript
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const { loading, startLoading, endLoading } = useLoading();
```

7. 组件逻辑定义

## 3. 样式开发规范

### 3.1 变体定义
- 在 `packages/ui-variants/src/variants` 下定义组件样式
- 使用 `tailwind-variants` 定义样式变体
- 遵循 shadcn-ui 的设计风格

### 3.2 主题规范
- 使用 `@soybean-ui/unocss-preset-shadcn` 定义主题变量
- 支持亮色和暗色主题切换
- 遵循 CSS 变量命名规范
