<script setup lang="ts">
import { ref } from 'vue';
import type { ColorValue } from '@soybeanjs/theme';
import { SPalettePicker } from '@soybeanjs/ui';
import type { PaletteChangePayload } from '@soybeanjs/ui';

const value = ref<ColorValue>('indigo.500');
const payload = ref<PaletteChangePayload | null>(null);
</script>

<template>
  <div class="space-y-4 p-6">
    <SPalettePicker v-model="value" class="w-62" @palette-change="payload = $event" />
    <p class="text-xs text-muted-foreground">value: {{ value }}</p>
    <p class="text-xs text-muted-foreground">
      palette levels: {{ payload ? Object.keys(payload.palette).join(', ') : '—' }}
    </p>
  </div>
</template>
