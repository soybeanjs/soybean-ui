---
description: 安装 SoybeanUI skills，让 AI 编码代理理解样式层与 headless 包、组件模式、主题配置以及生成的参考资料。
---

# Skills

> 安装 SoybeanUI skills，让 AI 编码代理能够更稳定地理解组件用法、主题系统、headless 组合模式以及生成式参考资料。

## 什么是 Skills？

Skills 是提供给 AI 编码代理的结构化知识文件。它们会把特定库的指导、流程和参考资料打包起来，让代理在任务命中时按需加载正确上下文。

它和 MCP server 不同。Skills 不提供实时工具调用，而是把整理好的说明和参考内容直接放进模型上下文。

SoybeanUI 目前公开提供两个 skill：

- **soybean-ui**：面向样式层包的使用方式、主题配置、文档导航与生成组件参考
- **soybean-headless**：面向 headless primitives、Compact 模式、组合方式与共享组件参考

## SoybeanUI skills 覆盖什么

这些 skill 可以帮助 AI 代理处理下列问题：

- 什么时候该使用 `@soybeanjs/ui`，什么时候该使用 `@soybeanjs/headless`
- 如何配置主题、语言和方向
- 如何高效使用组件 API 与生成参考资料
- 如何把 headless primitives 组合成自定义样式包装层
- 如何在不加载整站文档的前提下导航文档与参考内容

## 使用方式

### Skills CLI

最直接的安装方式是使用 `skills` CLI：

```bash
npx skills add @soybeanjs/ui-skills
```

你也可以指定目标代理：

```bash
npx skills add @soybeanjs/ui-skills --agent cursor
npx skills add @soybeanjs/ui-skills --agent claude-code
```

如果希望全局安装，使其在多个项目里都可用：

```bash
npx skills add @soybeanjs/ui-skills --global
```

安装这个包会同时提供 `soybean-ui` 和 `soybean-headless`。

### Skills URL

如果你的工具支持直接添加 skill URL，可以直接指向公开的 GitHub skill 目录。

样式层 skill：

```text
https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-ui
```

Headless skill：

```text
https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-headless
```

### Claude Code

Claude Code 也可以直接从 GitHub 目录安装单个 skill：

```bash
claude skill add https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-ui
claude skill add https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-headless
```

发布出来的 skills 包中也包含 Claude marketplace 所需的元数据。

### 其它 AI 工具

任何支持 GitHub skill 目录或自定义说明目录的 AI 工具，都可以复用同一套来源。

- **SoybeanUI skill 入口**：https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-ui/SKILL.md
- **SoybeanUI skill 目录**：https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-ui
- **SoybeanHeadless skill 入口**：https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-headless/SKILL.md
- **SoybeanHeadless skill 目录**：https://github.com/soybeanjs/soybean-ui/tree/main/ui-skills/skills/soybean-headless

## 实际建议

1. 如果你同时会用样式层与 headless 包，优先安装完整的 `@soybeanjs/ui-skills`。
2. 需要组件用法、主题配置和文档导航时，使用 `soybean-ui`。
3. 需要组合模式或自定义样式包装方案时，使用 `soybean-headless`。
4. 当你需要文档全局上下文而不是技能包上下文时，再把 `llms.txt` 当作补充来源。

## 相关页面

- [介绍](/overview/introduction)
- [快速开始](/overview/quick-start)
- [主题](/overview/theming)
- [LLMs.txt](/overview/llms)
- [组件](/components)
