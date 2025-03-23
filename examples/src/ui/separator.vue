<script setup lang="ts">
import { SCard, SSeparator } from 'soy-ui';
import type { SeparatorBorder, ThemeAlign } from 'soy-ui';

defineOptions({
  name: 'DemoSeparator'
});

const aligns: ThemeAlign[] = ['start', 'center', 'end'];

const borders: SeparatorBorder[] = ['solid', 'dashed', 'dotted'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Horizontal">
      <SSeparator class="mb-6">Horizontal</SSeparator>
    </SCard>
    <SCard title="Vertical">
      <div class="h-5 flex-center space-x-4">
        <div>Soybean</div>
        <SSeparator orientation="vertical" />
        <div>UI</div>
        <SSeparator orientation="vertical" />
        <div>Vue</div>
      </div>
    </SCard>
    <SCard title="Align">
      <SSeparator v-for="align in aligns" :key="align" :align="align" class="mb-6">{{ align }}</SSeparator>
    </SCard>
    <SCard title="Custom Align">
      <SSeparator class="mb-6" :ui="{ label: 'left-1/3' }">Custom Align</SSeparator>
    </SCard>
    <SCard title="Border">
      <SSeparator v-for="border in borders" :key="border" :border="border" class="mb-6">{{ border }}</SSeparator>
    </SCard>
    <SCard title="Border Width">
      <SSeparator border="solid" class="mb-6 border-2px">2 px</SSeparator>
    </SCard>
  </div>
</template>
