# 通知

## 概述

`SToastProvider` 负责渲染通知视口，`toast` 是用于创建、更新、关闭和查询通知的命令式 API。

`toast(...)` 的第一个参数会作为通知的标题/主消息。你可以通过 `description`、`action`、`cancel`、`icon`、`ui` 和 `position` 来定制每条通知。

## 用法

在应用根部挂载一个 `SToastProvider`。如果你的应用已经被 `SConfigProvider` 包裹，那么默认会自动渲染一个 `SToastProvider`，除非将 `customToast` 设为 `true`。

```usage
basic
```

## 演示

```playground
basic
types
promise
action
control
appearance
stack
position
```

## API

<ComponentApi component="toast" />
