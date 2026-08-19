# 上传

## 概述

带拖拽区域、可配置校验与可插拔请求适配器的文件选择与上传组件。`SUpload` 通过 `UploadCompact` 组合 headless `UploadRoot`（文件状态、accept/大小/数量校验、拖拽事件与请求生命周期）与 `UploadTrigger`/`UploadFileList`/`UploadFileItem`，并应用 `uploadVariants` 配方（6 种尺寸）。适用于头像上传、附件列表、导入向导等需要将文件带入应用的流程。简单的单文件浏览请使用原生 `<input type="file">`；仅需图片预览时与 `image` 组合。

## 用法

<UsageCode component="upload" />

## 特性

- 🧩 headless/styled 分离 — `UploadRoot` 负责文件状态、校验、拖拽状态与请求生命周期；`SUpload` 仅注入样式
- 📥 通过隐藏原生 input 点击选择，并支持完整拖拽（`dragenter`/`dragleave`/`drop`）与 `data-drag-over` 状态
- 🔌 `customRequest` — 可插拔的 `({ file, onProgress, onSuccess, onError }) => void` 适配器（XHR、fetch 或第三方存储）
- 🔢 校验 — `accept`（扩展名/MIME）、`max-size`（字节）与 `max-count` 过滤传入文件
- 🔄 `auto-upload` 在选择后自动发起请求；进度更新到每个文件的 `percent`/`status`
- 🧩 `#item` 插槽接收 `{ file, remove, retry }` 实现完全自定义列表行；默认行显示名称、大小、状态与移除按钮
- 📦 `v-model:file-list` 暴露跟踪的 `UploadFile[]`（`{ uid, name, size, type, status, percent, raw }`）
- ♿ 触发器支持键盘操作（`role="button"`），隐藏 input 带无障碍标签

## 演示

<PlaygroundGallery component="upload" />

## API

<ComponentApi component="upload" />

## 注意事项

### 架构与行业对标

SoybeanUI 将完整上传状态机保留在 headless（`UploadRoot`）：文件校验、拖拽状态与请求生命周期属于逻辑，样式包装仅注入 `uploadVariants`。上传传输层刻意不内置——`customRequest` 适配器允许你使用 XHR、fetch 或 SDK（类似 Ant Design 的 `customRequest` 或 Element Plus 的 `http-request`）。与 Ant Design `Upload`、Element Plus `el-upload`、Mantine `Dropzone` 相比，SoybeanUI 是唯一同时具备 headless/styled 分离、逐插槽 `ui` 类覆盖与完整 RTL 支持的对标库；Mantine `Dropzone` 仅选择不处理请求生命周期，Ant Design 内置的 XHR action 在此被适配器取代。

| 能力                 | SoybeanUI | Ant Design | Element Plus | Mantine Dropzone |
| :------------------- | :-------: | :--------: | :----------: | :--------------: |
| headless/styled 分离 |    ✅     |     —      |      —       |        —         |
| 点击选择             |    ✅     |     ✅     |      ✅      |        ✅        |
| 拖拽上传             |    ✅     |     ✅     |      ✅      |        ✅        |
| accept/大小/数量     |    ✅     |     ✅     |      ✅      |        ✅        |
| 请求生命周期         |    ✅     |     ✅     |      ✅      |        —         |
| 自定义请求适配器     |    ✅     |     ✅     |      ✅      |        —         |
| 进度/状态            |    ✅     |     ✅     |      ✅      |        —         |
| 自定义条目插槽       |    ✅     |     ✅     |      ✅      |        —         |
| RTL 支持             |    ✅     |     —      |      —       |        —         |
| 逐插槽 `ui` 覆盖     |    ✅     |     —      |      —       |        —         |

### 使用注意

- 未提供 `customRequest` 时，文件立即以 `status: 'success'` 加入（视为文件选择器）。
- `max-size`/`accept`/`max-count` 会静默丢弃不合规文件；通过 `v-model:file-list` 感知保留结果。
- 拖拽事件在根元素上处理；在根内任意位置放置即添加文件。

## 常见问题

### 如何上传到后端？

传入 `customRequest`：`({ file, onProgress, onSuccess, onError }) => uploadWithXhr(file, ...)`，并在传输过程中调用相应回调。

### 如何限制文件类型与大小？

使用 `accept=".png,.jpg"` 与 `max-size`（字节）。`max-count` 限制文件总数。

### 如何自定义文件列表行？

使用 `#item` 插槽，接收 `{ file, remove, retry }`。可按需渲染名称、进度或自定义预览。

### 如何获取当前上传状态？

绑定 `v-model:file-list`。每个文件暴露 `status`（`ready`/`uploading`/`success`/`error`）与 `percent`。
