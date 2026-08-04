<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';
import { useRequestHeaders } from 'nuxt/app';
import PlaygroundHome from '../../playground/src/pages/index.vue';
import { provideThemeContext } from '../../playground/src/theme';

// dir / locale 由 playground 的 UiPageContext 提供（PlaygroundHome 内的
// DirectionToggler / LocaleToggler 依赖它），主题状态则由库内 SConfigProvider
// 管理，只需传入环境参数（isServer + cookieHeader）即可完成 SSR 解析。
const { configProviderProps } = provideThemeContext();
const isServer = import.meta.server;
const cookieHeader = isServer ? useRequestHeaders(['cookie']).cookie : undefined;
</script>

<template>
  <SConfigProvider v-bind="configProviderProps" :is-server="isServer" :cookie-header="cookieHeader">
    <PlaygroundHome />
    <DemoPresetButton />
  </SConfigProvider>
</template>
