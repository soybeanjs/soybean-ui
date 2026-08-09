<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';
import PlaygroundHome from '../../playground/src/pages/index.vue';
import { provideThemeContext } from '../../playground/src/theme';

// dir / locale 由 playground 的 UiPageContext 提供（PlaygroundHome 内的
// DirectionToggler / LocaleToggler 依赖它），主题状态则由库内 SConfigProvider
// 管理，只需传入环境参数（isServer）即可。主题持久化走 localStorage，首帧
// 由 createThemeInitScript 内联脚本应用，无需 cookie。
const { configProviderProps } = provideThemeContext();
const isServer = import.meta.server;
</script>

<template>
  <SConfigProvider v-bind="configProviderProps" :is-server="isServer">
    <PlaygroundHome />
    <DemoPresetButton />
  </SConfigProvider>
</template>
