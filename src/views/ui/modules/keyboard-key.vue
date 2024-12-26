<script setup lang="ts">
import { SKeyboardKey, SKeyboardKeyGroup } from '@soybean-ui/vue';
import type { KeyboardKeyVariant, ThemeSize } from '@soybean-ui/vue';

defineOptions({
  name: 'UiKeyboardKey'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const variants: KeyboardKeyVariant[] = ['solid', 'outline', 'subtle'];
</script>

<template>
  <div class="py-12px text-18px">KeyboardKey Size</div>
  <div class="flex flex-wrap gap-2">
    <div v-for="size in sizes" :key="size">
      <div>{{ size }}</div>
      <SKeyboardKey :size="size" value="command" />
    </div>
  </div>

  <div class="py-12px text-18px">KeyboardKey Variant</div>
  <div class="flex flex-wrap gap-2">
    <div v-for="variant in variants" :key="variant">
      <div>{{ variant }}</div>
      <SKeyboardKey :variant="variant" value="command" />
    </div>
  </div>
  <div class="py-12px text-18px">KeyboardKey Group</div>
  <div class="flex-c gap-2">
    <SKeyboardKeyGroup :values="['command', 'shift', 'alt']" variant="solid" />
    <SKeyboardKeyGroup :values="['command', 'shift', 'alt']" variant="outline" separator="" />
    <SKeyboardKeyGroup :values="['command', 'shift', 'alt']" variant="subtle" separator=" " />
  </div>
</template>
