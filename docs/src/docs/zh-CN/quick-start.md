# 快速开始

本指南将帮助你快速在项目中集成 SoybeanUI，让你在几分钟内开始使用我们的组件。

## 环境要求

在开始之前，请确保你的项目满足以下要求：

- **Node.js** >= 16.0.0
- **Vue** >= 3.3.0
- **包管理器**：pnpm（推荐）、npm 或 yarn

## 安装

### 使用带样式的 UI 库（推荐）

如果你想要直接使用带有精美样式的组件，安装 `@soybeanjs/ui`：

```bash
# 使用 pnpm（推荐）
pnpm add @soybeanjs/ui

# 或使用 npm
npm install @soybeanjs/ui

# 或使用 yarn
yarn add @soybeanjs/ui
```

### 使用 Headless 库

如果你想要构建自己的设计系统，安装 `@soybeanjs/headless`：

```bash
pnpm add @soybeanjs/headless
```

## 基础配置

### 1. 引入样式

如果使用 `@soybeanjs/ui`，需要在项目入口文件中引入样式文件：

```ts
// main.ts 或 main.js
import '@soybeanjs/ui/styles.css';
```

## 使用方式

### 方式一：自动导入（推荐）

使用 `unplugin-vue-components` 可以自动导入组件，无需手动导入。

#### 安装依赖

```bash
pnpm add -D unplugin-vue-components
```

#### 配置 Vite

在 `vite.config.ts` 中配置：

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { UiResolver } from '@soybeanjs/ui/resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [UiResolver()]
    })
  ]
});
```

#### 使用组件

配置完成后，你可以在任何 Vue 组件中直接使用 SoybeanUI 组件，无需手动导入：

```vue
<template>
  <SButton>点击我</SButton>
  <SInput placeholder="请输入内容" />
  <SCard>
    <p>这是一张卡片</p>
  </SCard>
</template>
```

### 方式二：手动导入

你也可以手动导入需要的组件：

```vue
<script setup>
import { SButton, SInput, SCard } from '@soybeanjs/ui';
</script>

<template>
  <SButton>点击我</SButton>
  <SInput placeholder="请输入内容" />
  <SCard>
    <p>这是一张卡片</p>
  </SCard>
</template>
```

## Nuxt 集成

如果你使用 Nuxt 3，可以使用官方提供的 Nuxt 模块，配置更加简单：

### 安装

```bash
pnpm add @soybeanjs/ui
```

### 配置

在 `nuxt.config.ts` 中添加模块：

```ts
export default defineNuxtConfig({
  modules: ['@soybeanjs/ui/nuxt']
});
```

配置完成后，你可以在 Nuxt 项目中直接使用所有 SoybeanUI 组件，无需额外配置。

## 使用 Headless 组件

如果你选择使用 `@soybeanjs/headless`，你需要自己编写样式。以下是一个简单的示例：

```vue
<script setup>
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from '@soybeanjs/headless';
</script>

<template>
  <AccordionRoot>
    <AccordionItem value="item-1">
      <AccordionTrigger>这是标题</AccordionTrigger>
      <AccordionContent>这是内容区域，你可以在这里放置任何内容。</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>另一个标题</AccordionTrigger>
      <AccordionContent>另一个内容区域。</AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<style scoped>
/* 在这里添加你的自定义样式 */
</style>
```

## 主题配置

SoybeanUI 支持灵活的主题配置。你可以通过 `ConfigProvider` 组件来配置全局主题：

```vue
<script setup>
import { SConfigProvider } from '@soybeanjs/ui';

const themeConfig = {
  theme: {
    base: 'gray',
    primary: 'indigo',
    feedback: 'classic',
    radius: '0.625rem'
  },
  size: 'md'
};
</script>

<template>
  <SConfigProvider :theme="themeConfig">
    <YourApp />
  </SConfigProvider>
</template>
```

## 第一个示例

让我们创建一个简单的示例来验证安装是否成功：

```vue
<template>
  <div class="p-4 space-y-4">
    <h1 class="text-2xl font-bold">SoybeanUI 示例</h1>

    <SButton color="primary" @click="handleClick">点击按钮</SButton>

    <SInput v-model="inputValue" placeholder="请输入内容" class="w-64" />

    <SCard>
      <template #header>
        <h3>卡片标题</h3>
      </template>
      <p>这是卡片的内容区域。</p>
      <template #footer>
        <SButton size="small">操作</SButton>
      </template>
    </SCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');

function handleClick() {
  alert('按钮被点击了！');
}
</script>
```

## 常见问题

### 样式没有生效？

1. 确保已经引入了样式文件：`import '@soybeanjs/ui/styles.css'`
2. 检查浏览器控制台是否有错误信息

### TypeScript 类型错误？

1. 确保安装了 `@soybeanjs/ui` 的最新版本
2. 检查 `tsconfig.json` 中的类型配置
3. 重启 TypeScript 服务器

### 组件无法自动导入？

1. 确保已正确配置 `unplugin-vue-components`
2. 检查 `vite.config.ts` 中的配置是否正确
3. 重启开发服务器

### 在 Nuxt 中使用时出现问题？

1. 确保使用的是 Nuxt 3
2. 检查 `nuxt.config.ts` 中的模块配置
3. 清除 `.nuxt` 缓存目录后重新启动

## 下一步

现在你已经成功安装了 SoybeanUI，可以：

1. 浏览 [组件文档](/components)，了解所有可用组件
2. 查看 [主题配置](../theme) 文档，学习如何自定义主题
3. 阅读 [最佳实践](../best-practices) 指南，了解使用建议
4. 访问 [GitHub](https://github.com/soybeanjs/soybean-ui) 查看源码和示例

祝你使用愉快！如果遇到任何问题，欢迎在 GitHub Issues 中提出。
