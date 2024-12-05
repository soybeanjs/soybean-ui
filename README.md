# soybean-ui

## 开发组件流程

### 启动项目

安装依赖
```bash
pnpm i
```

执行`stub`命令
```bash
pnpm stub
```
启动项目
```bash
pnpm dev
```
启动文档
```bash
pnpm dev:docs
```

### 新增组件

- 在 `packages/ui/src/components` 下新增组件文件夹，以 kebab-case(小写+短横线) 方式命名，如 `card`。
> 组件参照 `https://www.shadcn-vue.com/`。

- 组件文件夹结构如下：

以`card`组件为例:
组件文件分为组成组件的各个部分，以及完整组件，其中`index.ts`文件中将各个部分组件和完整组件进行导出，`types.ts`文件中定义组件的类型。

```
card
├── card-content.vue
├── card-footer.vue
├── card-header.vue
├── card-root.vue
├── card-title-root.vue
├── card-title.vue
├── card.vue // 完整组件(api式，上面的组件均为组件的各个组成部分)
├── index.ts // 导出组件
└── types.ts // 组件类型定义
```

> 注意统一在 `packages/ui/src/components/index.ts` 中导出新增的组件。

### 组件样式

在 `packages/ui-variants/src/variants/` 下新增组件样式文件，如 `card.ts`。

> 注意统一在 `packages/ui-variants/src/index.ts` 中导出新增的组件样式。

### 组件示例

- 在 `src/views/ui/modules` 下新增组件示例文件，如 `card.vue`。
- 在 `src/views/ui/index.vue` 中引入组件示例文件，并添加对应的tab配置。


## 组件规范

参考文件 [`ui-standard.md`](./ui-standard.md)。
