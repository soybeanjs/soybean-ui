# Toast

## Overview

`SToastProvider` renders the toast viewports and `toast` is the imperative API used to create, update, dismiss, and inspect notifications.

The first argument of `toast(...)` becomes the toast title/message. Use `description`, `action`, `cancel`, `icon`, `ui`, and `position` to customize each notification.

## Usage

Mount one `SToastProvider` near your app root. If your app is already wrapped with `SConfigProvider`, a default `SToastProvider` is rendered automatically unless `customToast` is set to `true`.

<UsageCode component="toast" />

## Demos

<PlaygroundGallery component="toast" />

## API

<ComponentApi component="toast" />
