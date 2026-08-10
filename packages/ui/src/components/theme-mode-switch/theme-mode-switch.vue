<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '../config-provider/use-theme';
import SIcon from '../icon/icon.vue';
import SSwitch from '../switch/switch.vue';
import type { ThemeModeSwitchProps } from './types';

defineOptions({
  name: 'SThemeModeSwitch'
});

const props = withDefaults(defineProps<ThemeModeSwitchProps>(), {
  size: 'md',
  color: 'accent',
  showIcon: true
});

const { effectiveMode, setMode } = useTheme('ThemeModeSwitch');

/** Accessible label for the switch control (falls back to a sensible default). */
const ariaLabel = computed(() => props['aria-label'] ?? 'Toggle color scheme');

/**
 * Reflect the *effective* scheme so an `auto` preference shows the currently
 * resolved OS light/dark state.
 */
const isDark = computed(() => effectiveMode.value === 'dark');

/** Toggling pins an explicit preference, overriding any `auto` resolution. */
const onToggle = (checked: boolean): void => {
  setMode(checked ? 'dark' : 'light');
};
</script>

<template>
  <SSwitch
    :model-value="isDark"
    :color="color"
    :size="size"
    :control-props="{ 'aria-label': ariaLabel }"
    @update:model-value="onToggle"
  >
    <SIcon v-if="showIcon" :icon="isDark ? 'lucide:moon' : 'lucide:sun'" />
  </SSwitch>
</template>
