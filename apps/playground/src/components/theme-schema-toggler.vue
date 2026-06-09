<script setup lang="ts">
import { useDark } from '@vueuse/core';
import { SIcon, SSwitch } from '@soybeanjs/ui';

const isDark = useDark();
</script>

<template>
  <SSwitch v-model="isDark" color="accent" size="lg">
    <SIcon :icon="isDark ? 'lucide:moon' : 'lucide:sun'" />
  </SSwitch>
</template>
