<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { Icon } from '@iconify/vue';
import { SSwitch } from '@soybean-ui/vue';

defineOptions({
  name: 'ThemeToggle'
});

const isDark = useDark();
</script>

<template>
  <SSwitch id="theme-toggle" v-model="isDark" color="accent" size="lg" thumb-class="text-xs">
    <Icon v-if="isDark" icon="lucide:moon-star" />
    <Icon v-else icon="lucide:sun" />
  </SSwitch>
</template>

<style scoped></style>
