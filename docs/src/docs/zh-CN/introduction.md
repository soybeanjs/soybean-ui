# 介绍

SoybeanUI 是一个优雅、现代、可访问且高质量的 UI 组件库，专为 Vue 3 设计，采用 shadcn-like 设计风格，构建在强大的 Headless 基础之上。它提供了一套全面、可访问、可定制且高性能的组件，帮助开发者快速构建现代化的 Web 应用。

## 为什么选择 SoybeanUI？

### 🎨 优雅的设计

SoybeanUI 采用现代化的设计语言，组件外观精美，交互流畅。每个组件都经过精心设计，确保在不同场景下都能提供出色的用户体验。

### ♿ 可访问性优先

所有组件都严格遵循 WAI-ARIA 设计模式，确保残障用户也能轻松使用。键盘导航、屏幕阅读器支持、焦点管理等可访问性特性都已内置，无需额外配置。

### 🏗️ 灵活的架构

SoybeanUI 采用 Headless 架构，将逻辑层和表现层完全分离。这意味着你可以：

- **使用现成的样式组件**：直接使用 `@soybeanjs/ui`，开箱即用
- **自定义样式**：使用 `@soybeanjs/headless` 构建完全属于自己的设计系统
- **混合使用**：在同一个项目中同时使用两种方式

### 🎯 类型安全

完全使用 TypeScript 编写，提供完整的类型定义和智能提示，让开发过程更加高效和可靠。

### 🎨 高度可定制

基于 UnoCSS 和 `tailwind-variants` 构建，支持灵活的主题定制。你可以轻松修改颜色、尺寸、圆角等样式属性，打造符合品牌特色的界面。

### 📦 轻量级

所有组件都支持 Tree-shaking，只打包你实际使用的代码，确保最终产物体积最小化。

## 架构设计

SoybeanUI 由两个核心包组成，每个包都有其独特的定位和价值：

### @soybeanjs/headless - 逻辑层

这是 SoybeanUI 的核心基础，负责处理所有业务逻辑：

- **状态管理**：组件内部状态的完整管理
- **可访问性 (A11y)**：完整的 WAI-ARIA 支持
- **键盘交互**：完整的键盘导航支持
- **焦点管理**：智能的焦点捕获和恢复
- **事件处理**：统一的事件处理机制

Headless 组件完全不包含任何样式，给你最大的自由度来构建自己的设计系统。如果你想要完全控制组件的外观，或者需要构建一个独特的设计系统，Headless 包是你的最佳选择。

### @soybeanjs/ui - 表现层

这是基于 Headless 构建的带样式组件库：

- **精美的样式**：使用 UnoCSS 和 `tailwind-variants` 构建的现代化样式
- **开箱即用**：无需额外配置即可使用
- **主题支持**：内置多种主题配置，支持亮色/暗色模式
- **响应式设计**：所有组件都针对不同屏幕尺寸进行了优化

如果你想要快速开始项目，或者喜欢 SoybeanUI 的默认设计风格，直接使用 `@soybeanjs/ui` 是最佳选择。

## 核心特性

### ✨ 丰富的组件生态

SoybeanUI 提供了 46+ 个高质量组件，覆盖了 Web 应用开发中的大部分场景：

- **基础组件**：Button、Input、Card、Badge 等
- **表单组件**：Form、Select、Checkbox、RadioGroup、Switch 等
- **反馈组件**：Alert、Dialog、Toast、Tooltip 等
- **导航组件**：Menu、Tabs、Breadcrumb、Pagination 等
- **数据展示**：Table、Tree、List、Avatar 等
- **布局组件**：Layout、Separator、AspectRatio 等

### 🎨 主题系统

SoybeanUI 内置了强大的主题系统，支持：

- **多种颜色方案**：primary、destructive、success、warning、info、carbon、secondary、accent 等
- **多种尺寸**：xs、sm、md、lg、xl、2xl
- **多种变体**：solid、outline、ghost、link、plain、dashed、soft、raw
- **暗色模式**：完整的暗色主题支持
- **自定义主题**：轻松扩展和定制主题配置

### 🚀 性能优化

- **Tree-shaking**：只打包使用的代码
- **按需加载**：支持按需引入组件
- **虚拟滚动**：大数据量场景下的性能优化
- **懒加载**：图片和内容的懒加载支持

### 🔧 开发体验

- **TypeScript 支持**：完整的类型定义
- **自动导入**：支持 `unplugin-vue-components` 自动导入
- **Nuxt 模块**：官方 Nuxt 模块支持
- **详细的文档**：每个组件都有详细的文档和示例

## 适用场景

SoybeanUI 适用于各种类型的 Vue 3 项目：

- **企业级应用**：提供完整的组件生态和可访问性支持
- **管理后台**：丰富的表单和数据展示组件
- **内容网站**：优雅的展示组件和布局系统
- **移动端应用**：响应式设计，适配各种屏幕尺寸
- **设计系统**：Headless 架构支持构建自定义设计系统

## 技术栈

SoybeanUI 基于以下技术构建：

- **Vue 3**：使用 Composition API 和 `<script setup>` 语法
- **TypeScript**：完整的类型支持
- **UnoCSS**：原子化 CSS 引擎
- **tailwind-variants**：变体管理工具

## 开始使用

如果你已经准备好开始使用 SoybeanUI，可以查看 [快速开始](./quick-start) 文档，了解如何安装和配置 SoybeanUI。

如果你想要了解更多关于组件的信息，可以浏览 [组件文档](/components/button)，每个组件都有详细的 API 文档和使用示例。

## 社区与支持

- **GitHub**：[soybeanjs/soybean-ui](https://github.com/soybeanjs/soybean-ui)
- **问题反馈**：欢迎在 GitHub Issues 中提出问题
- **功能建议**：欢迎提交 Pull Request

让我们一起构建更好的 Vue 3 UI 组件库！
