# Avatar

Source URL: https://ui.soybeanjs.cn/components/avatar
Markdown URL: https://ui.soybeanjs.cn/components/avatar.md
Category: Data Display
Description: An image element with a fallback for representing the user.

## Overview

An image element with a fallback for representing the user.

## Usage

Usage examples for avatar are rendered on the site.

## Demos

Interactive demos for avatar are rendered on the site.

## API

Structured API summary generated from build-time component metadata.
- Exported symbols (5): Avatar, AvatarCompact, AvatarFallback, AvatarImage, AvatarRoot.

### Avatar

#### Props
Properties for the Avatar component.
- `class`: root class (type `string | false | Record<string, any> | ClassValue[] | null`; optional)
- `size`: Visual size of the component. (type `ThemeSize`; optional)
- `ui`: Per-slot class overrides for the component. (type `Partial<AvatarUi>`; optional)
- `src`: The image source URL. (type `string`; required)
- `delayMs`: Useful for delaying fallback rendering so it only appears for those with slower connections. (type `number`; default `undefined`; optional)
- `fallbackLabel`: Fallback text rendered when no custom fallback slot is provided. (type `string`; optional)
- `imageProps`: Properties forwarded to the image element. (type `AvatarImageProps`; optional)
- `fallbackProps`: Properties forwarded to the fallback element. (type `AvatarFallbackProps`; optional)
#### Emits
Events for the Avatar component.
- `loadingStatusChange`: Event handler called when the image loading status changes. This is useful for controlling what to render as the image is loading. (type `[status: ImageLoadingStatus]`; parameters `status: ImageLoadingStatus`)

### AvatarCompact

#### Props
Properties for the AvatarCompact component.
- `src`: The image source URL. (type `string`; required)
- `delayMs`: Useful for delaying fallback rendering so it only appears for those with slower connections. (type `number`; default `undefined`; optional)
- `fallbackLabel`: Fallback text rendered when no custom fallback slot is provided. (type `string`; optional)
- `imageProps`: Properties forwarded to the image element. (type `AvatarImageProps`; optional)
- `fallbackProps`: Properties forwarded to the fallback element. (type `AvatarFallbackProps`; optional)
#### Emits
Events for the AvatarCompact component.
- `loadingStatusChange`: Event handler called when the image loading status changes. This is useful for controlling what to render as the image is loading. (type `[status: ImageLoadingStatus]`; parameters `status: ImageLoadingStatus`)
#### Slots
Slots for the AvatarCompact component.
- `default`: Custom content for the default slot. (type `(() => any) | undefined`)
- `image`: Custom content for the image slot. (type `(() => any) | undefined`)
- `fallback`: Custom content for the fallback slot. (type `(() => any) | undefined`)

### AvatarFallback

#### Props
Properties for the AvatarFallback component.
- `delayMs`: Useful for delaying rendering so it only appears for those with slower connections. (type `number`; default `undefined`; optional)

### AvatarImage

#### Props
Properties for the AvatarImage component.
- `src`: The image source URL (type `string`; required)
- `referrerpolicy`: The referrer policy for the image (type `('' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-...`; optional)
- `crossorigin`: The cross-origin setting for the image (type `'' | 'anonymous' | 'use-credentials'`; optional)
#### Emits
Events for the AvatarImage component.
- `loadingStatusChange`: Event handler called when the image loading status changes. This is useful for controlling what to render as the image is loading. (type `[status: ImageLoadingStatus]`; parameters `status: ImageLoadingStatus`)

### AvatarRoot

- No documented props, emits, slots, or slot props were available.
