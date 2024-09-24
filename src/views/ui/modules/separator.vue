<script setup lang="ts">
import { SSeparator } from 'soybean-ui';
import type { SeparatorOrientation } from 'soybean-ui';

defineOptions({
  name: 'UiSeparator'
});

const orientation: SeparatorOrientation[] = ['center', 'left', 'right'];
</script>

<template>
  <div class="py-12px text-18px">Horizontal</div>
  <SSeparator class="my-4" label="Horizontal" />

  <div class="py-12px text-18px">Vertical</div>
  <div class="h-5 flex-center text-sm space-x-4">
    <div>Soybean</div>
    <SSeparator type="vertical" />
    <div>Ui</div>
    <SSeparator type="vertical" />
    <div>Vue</div>
  </div>

  <div class="py-12px text-18px">Dashed</div>
  <SSeparator class="my-4" dashed label="Dashed" />

  <div class="py-12px text-18px">Orientation</div>
  <SSeparator v-for="item in orientation" :key="item" class="my-4" :orientation="item" :label="`${item}-text`" />

  <div class="py-12px text-18px">orientationMargin</div>
  <SSeparator class="my-4" orientation="left" :orientation-margin="0" label="Left 0" />

  <div class="py-12px text-18px">Plain</div>
  <SSeparator class="my-4" plain label="Plain" />
</template>

<style scoped></style>
