# Upload

## Overview

A file-selection and upload component with a drag-and-drop dropzone, configurable validation, and a pluggable request adapter. `SUpload` composes the headless `UploadRoot` (file state, accept/size/count validation, drag events, and the request lifecycle) with `UploadTrigger`/`UploadFileList`/`UploadFileItem` through `UploadCompact`, and applies the `uploadVariants` recipe (6 sizes). Use it for avatar uploads, attachment lists, import wizards, or any flow where users bring files into the app. For simple single-file browsing prefer a native `<input type="file">`; for image-only previews combine with `image`.

## Usage

<UsageCode component="upload" />

## Features

- 🧩 Headless/styled split — `UploadRoot` owns file state, validation, drag state, and the request lifecycle; `SUpload` only injects styles
- 📥 Click-to-select via a hidden native input, plus full drag-and-drop (`dragenter`/`dragleave`/`drop`) with a `data-drag-over` state
- 🔌 `customRequest` — a pluggable `({ file, onProgress, onSuccess, onError }) => void` adapter (XHR, fetch, or third-party storage)
- 🔢 Validation — `accept` (extension/MIME), `max-size` (bytes), and `max-count` filters incoming files
- 🔄 `auto-upload` starts the request on selection; progress updates flow into each file's `percent`/`status`
- 🧩 `#item` slot receives `{ file, remove, retry }` for fully custom list rows; the default row shows name, size, status, and a remove button
- 📦 `v-model:file-list` exposes the tracked `UploadFile[]` (`{ uid, name, size, type, status, percent, raw }`)
- ♿ The trigger is keyboard-operable (`role="button"`) and the hidden input carries an accessible label

## Demos

<PlaygroundGallery component="upload" />

## API

<ComponentApi component="upload" />

## Notes

### Architecture and benchmark differences

SoybeanUI keeps the entire upload state machine in headless (`UploadRoot`): file validation, drag state, and the request lifecycle are logic, while the styled wrapper only injects `uploadVariants`. The upload transport is deliberately not bundled — a `customRequest` adapter lets you use XHR, fetch, or an SDK (like Ant Design's `customRequest` or Element Plus's `http-request`). Compared with Ant Design `Upload`, Element Plus `el-upload`, and Mantine `Dropzone`, SoybeanUI is the only benchmarked library with a headless/styled split, per-slot `ui` class overrides, and full RTL support; Mantine's `Dropzone` is selection-only (no request lifecycle), while Ant Design's built-in XHR action is replaced here by the adapter.

| Capability             | SoybeanUI | Ant Design | Element Plus | Mantine Dropzone |
| :--------------------- | :-------: | :--------: | :----------: | :--------------: |
| headless/styled split  |    ✅     |     —      |      —       |        —         |
| Click-to-select        |    ✅     |     ✅     |      ✅      |        ✅        |
| Drag-and-drop          |    ✅     |     ✅     |      ✅      |        ✅        |
| Accept / size / count  |    ✅     |     ✅     |      ✅      |        ✅        |
| Request lifecycle      |    ✅     |     ✅     |      ✅      |        —         |
| Custom request adapter |    ✅     |     ✅     |      ✅      |        —         |
| Progress / status      |    ✅     |     ✅     |      ✅      |        —         |
| Custom item slot       |    ✅     |     ✅     |      ✅      |        —         |
| RTL support            |    ✅     |     —      |      —       |        —         |
| Per-slot `ui` override |    ✅     |     —      |      —       |        —         |

### Cautions

- Without a `customRequest`, files are added with `status: 'success'` immediately (treat the component as a file picker).
- `max-size`/`accept`/`max-count` silently drop non-conforming files; wire `v-model:file-list` to react to what was kept.
- Drag events are handled on the root; a drop anywhere inside the root adds the files.

## FAQ

### How do I upload to my backend?

Pass a `customRequest`: `({ file, onProgress, onSuccess, onError }) => uploadWithXhr(file, ...)` and call the callbacks as the transfer progresses.

### How do I limit file types and sizes?

Use `accept=".png,.jpg"` and `max-size` (bytes). `max-count` caps the total number of files.

### How do I customize the file list rows?

Use the `#item` slot, which receives `{ file, remove, retry }`. Render name, progress, or custom previews as needed.

### How do I get the current upload state?

Bind `v-model:file-list`. Each file exposes `status` (`ready`/`uploading`/`success`/`error`) and `percent`.
