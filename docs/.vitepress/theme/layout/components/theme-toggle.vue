<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { SSwitch } from 'soy-ui';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'ThemeToggle'
});

const isDark = useDark();
</script>

<template>
  <SSwitch id="theme-toggle" v-model="isDark" color="accent" size="lg" :ui="{ thumb: 'text-xs' }">
    <Icon v-if="isDark" icon="lucide:moon-star" />
    <Icon v-else icon="lucide:sun" />
  </SSwitch>
</template>
