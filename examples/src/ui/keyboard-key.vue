<script setup lang="ts">
import { SCard, SKeyboardKey, SKeyboardKeyGroup } from 'soy-ui';
import type { KeyboardKeyVariant } from 'soy-ui';

defineOptions({
  name: 'DemoKeyboardKey'
});

const variants: KeyboardKeyVariant[] = ['solid', 'outline', 'ghost'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Keyboard Key" split>
      <SKeyboardKey value="command" />
    </SCard>
    <SCard title="Variant" split>
      <div class="flex gap-4">
        <div v-for="variant in variants" :key="variant" class="flex-c-center gap-2">
          <SKeyboardKey :variant="variant" value="K" />
          <div>{{ variant }}</div>
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
