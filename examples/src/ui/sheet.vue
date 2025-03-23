<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SScrollArea, SSheet } from 'soy-ui';
import type { SheetSide, ThemeSize } from 'soy-ui';
import ThemeSizeToggler from '../components/theme-size-toggler.vue';

defineOptions({
  name: 'UiSheet'
});

const size = ref<ThemeSize>('md');
const sides: SheetSide[] = ['left', 'right', 'top', 'bottom'];
</script>

<template>
  <SCard title="Sheet">
    <template #extra>
      <ThemeSizeToggler v-model:size="size" class="w-40" />
    </template>
    <div class="flex-c gap-4">
      <SCard title="Side" split>
        <div class="flex gap-3">
          <SSheet v-for="side in sides" :key="side" title="Sheet Title" :side="side" :size="size">
            <template #trigger>
              <SButton variant="outline">{{ side }}</SButton>
            </template>
            <div>Sheet Content</div>
            <template #footer>
              <SButton :size="size">Confirm</SButton>
            </template>
          </SSheet>
        </div>
      </SCard>
      <SCard title="Content Scrollable">
        <SSheet title="Sheet Title" :size="size">
          <template #trigger>
            <SButton variant="outline">Scrollable</SButton>
          </template>
          <SScrollArea>
            <div v-for="i in 100" :key="i">Sheet Content</div>
          </SScrollArea>
          <template #footer>
            <SButton :size="size">Confirm</SButton>
          </template>
        </SSheet>
      </SCard>
    </div>
  </SCard>
</template>
