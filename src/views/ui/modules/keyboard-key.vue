<script setup lang="ts">
import type { ThemeSize } from '@soybean-ui/vue';
import { SKeyboardKey } from '@soybean-ui/vue';

defineOptions({
  name: 'UiKeyboardKey'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
</script>

<template>
  <div class="py-12px text-18px">KeyboardKey Size</div>
  <div class="flex flex-wrap gap-2">
    <div v-for="size in sizes" :key="size">
      <div>{{ size }}</div>
      <SKeyboardKey :size="size" :keys="['ctrl', 'shift', 'alt']" />
    </div>
  </div>

  <div class="py-12px text-18px">KeyboardKey Separator</div>
  <div class="flex flex-wrap gap-2">
    <SKeyboardKey :keys="['ctrl', 'shift', 'alt']" separator=" + " />
    <SKeyboardKey :keys="['ctrl', 'shift', 'alt']" separator=" - " />
    <SKeyboardKey :keys="['ctrl', 'shift', 'alt']" separator=" * " />
    <SKeyboardKey :keys="['ctrl', 'shift', 'alt']" separator=" / " />
  </div>

  <div class="py-12px text-18px">KeyboardKey Slot</div>
  <SKeyboardKey :keys="['ctrl', 'shift', 'alt']">
    <template #content="{ value }">
      {{ value?.join(' + ') }}
    </template>
  </SKeyboardKey>
</template>
