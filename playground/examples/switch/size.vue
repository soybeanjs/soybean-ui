<script setup lang="ts">
import { SSwitch } from '@soybeanjs/ui';
import { themeColorOptions, themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <SSwitch
      v-for="(size, index) in themeSizeOptions"
      :key="size.value"
      :default-value="true"
      :size="size.value"
      :color="themeColorOptions[index].value"
    />
  </div>
</template>
