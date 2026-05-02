<script setup lang="ts">
import { useDark } from '@vueuse/core';

const isDark = useDark();
</script>

<template>
  <SSwitch
    v-model="isDark"
    color="accent"
    size="lg"
    :ui="{ control: 'docs-theme-schema-switch-control', thumb: 'docs-theme-schema-switch-thumb' }"
  >
    <SIcon :icon="isDark ? 'lucide:moon' : 'lucide:sun'" />
  </SSwitch>
</template>
