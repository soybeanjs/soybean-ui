# 主题

## 概览

Soybean UI 提供了灵活的主题系统，允许你根据应用的设计需求自定义组件外观。你可以轻松调整颜色、圆角以及全局尺寸等设置。

## 实现原理

使用 [shadcn-theme](https://github.com/soybeanjs/shadcn-theme) 来创建丰富的主题。

## 主题配置

你可以在应用根节点使用 `SConfigProvider`，通过传入 `theme` 对象来配置主题。

```vue
<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';
</script>

<template>
  <SConfigProvider
    :theme="{
      base: 'gray',
      primary: 'violet',
      feedback: 'modern',
      radius: '0.625rem'
    }"
  >
    <App />
  </SConfigProvider>
</template>
```

### 可自定义的主题

```ts
{
	base: 'demoBase',
	primary: 'demoPrimary',
	feedback: 'demoFeedback',
	preset: {
		base: {
			demoBase: {
				light: {
					background: 'oklch(100% 0 0)',
					foreground: 'stone.950',
					card: 'oklch(100% 0 0)',
					cardForeground: 'stone.950',
					popover: 'oklch(100% 0 0)',
					popoverForeground: 'stone.950',
					primaryForeground: 'stone.50',
					secondary: 'stone.100',
					secondaryForeground: 'stone.900',
					muted: 'stone.100',
					mutedForeground: 'stone.500',
					accent: 'stone.100',
					accentForeground: 'stone.900',
					destructiveForeground: 'stone.50',
					successForeground: 'stone.50',
					warningForeground: 'stone.50',
					infoForeground: 'stone.50',
					carbon: 'stone.800',
					carbonForeground: 'stone.50',
					border: 'stone.200',
					input: 'stone.200'
				},
				dark: {
					background: 'stone.950',
					foreground: 'stone.50',
					card: 'stone.900',
					cardForeground: 'stone.50',
					popover: 'stone.900',
					popoverForeground: 'stone.50',
					primaryForeground: 'stone.900',
					secondary: 'stone.800',
					secondaryForeground: 'stone.50',
					muted: 'stone.800',
					mutedForeground: 'stone.400',
					accent: 'stone.800',
					accentForeground: 'stone.50',
					destructiveForeground: 'stone.900',
					successForeground: 'stone.900',
					warningForeground: 'stone.900',
					infoForeground: 'stone.900',
					carbon: 'stone.100',
					carbonForeground: 'stone.900',
					border: 'oklch(100% 0 0 / 0.1)',
					input: 'oklch(100% 0 0 / 0.15)'
				}
			}
		},
		primary: {
			demoPrimary: {
				light: {
					primary: 'stone.800',
					ring: 'stone.400',
					chart1: 'orange.600',
					chart2: 'teal.600',
					chart3: 'cyan.900',
					chart4: 'amber.400',
					chart5: 'amber.500'
				},
				dark: {
					primary: 'stone.200',
					ring: 'stone.500',
					chart1: 'blue.700',
					chart2: 'emerald.500',
					chart3: 'amber.500',
					chart4: 'purple.500',
					chart5: 'rose.500'
				}
			}
		},
		feedback: {
			demoFeedback: {
				light: {
					destructive: 'red.500',
					success: 'green.500',
					warning: 'yellow.500',
					info: 'blue.500'
				},
				dark: {
					destructive: 'red.400',
					success: 'green.400',
					warning: 'yellow.400',
					info: 'blue.400'
				}
			}
		}
	}
};
```

### 颜色

主题系统使用 Tailwind CSS 的颜色预设。

<TailwindPalette />
