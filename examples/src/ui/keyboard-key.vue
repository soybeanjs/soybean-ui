<script setup lang="ts">
import { SCard, SKeyboardKey, SKeyboardKeyGroup } from 'soy-ui';
import type { KeyboardKeyVariant, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoKeyboardKey'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const variants: KeyboardKeyVariant[] = ['solid', 'outline', 'ghost'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Size" split>
      <div class="flex flex-wrap gap-2">
        <div v-for="size in sizes" :key="size" class="flex-c justify-between">
          <div>{{ size }}</div>
          <SKeyboardKey :size="size" value="command" />
        </div>
      </div>
    </SCard>
    <SCard title="Variant" split>
      <div class="flex-c gap-2">
        <div v-for="variant in variants" :key="variant" class="flex-c">
          <div>{{ variant }}</div>
          <div class="flex items-end gap-2">
            <SKeyboardKey v-for="size in sizes" :key="size" :variant="variant" value="K" :size="size" />
          </div>
        </div>
      </div>
    </SCard>
    <SCard title="Combination" split>
      <div class="flex flex-wrap gap-2">
        <SKeyboardKey :value="['command', 'k']" variant="solid" />
        <SKeyboardKey :value="['shift', 's']" variant="outline" />
        <SKeyboardKey :value="['ctrl', 'alt', 'a']" variant="ghost" />
      </div>
    </SCard>
    <SCard title="Group" split>
      <div class="flex-c gap-2">
        <SKeyboardKeyGroup :values="['command', 'shift', 'alt']" variant="solid" />
        <SKeyboardKeyGroup :values="['command', 'shift', 'alt']" variant="outline" separator=" " />
        <SKeyboardKeyGroup :values="['command', 'shift', 'alt']" variant="ghost" separator=" " />
      </div>
    </SCard>
  </div>
</template>
