<script setup lang="ts">
import { SSeparator } from 'soybean-ui';
import type { ThemeAlign } from '@soybean-ui/variants';

defineOptions({
  name: 'UiSeparator'
});

const align: ThemeAlign[] = ['center', 'start', 'end'];
</script>

<template>
  <div class="py-12px text-18px">Horizontal</div>
  <SSeparator class="my-4" label="Horizontal" />

  <div class="py-12px text-18px">Vertical</div>
  <div class="h-5 flex-center text-sm space-x-4">
    <div>Soybean</div>
    <SSeparator orientation="vertical" />
    <div>Ui</div>
    <SSeparator orientation="vertical" />
    <div>Vue</div>
  </div>

  <div class="py-12px text-18px">Dashed</div>
  <SSeparator class="my-4" dashed label="Dashed" />

  <div class="py-12px text-18px">Orientation</div>
  <SSeparator v-for="item in align" :key="item" class="my-4" :align="item" :label="`${item}-text`" />

  <div class="py-12px text-18px">orientationMargin</div>
  <SSeparator class="my-4" align="start" label-class="left-0" label="Left 0" />

  <div class="py-12px text-18px">Plain</div>
  <SSeparator class="my-4" plain label="Plain" />
</template>

<style scoped></style>
