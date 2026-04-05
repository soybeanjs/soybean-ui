<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoSliderBasic from './basic.vue';
import DemoSliderRange from './range.vue';
import DemoSliderSize from './size.vue';
import DemoSliderColor from './color.vue';
import DemoSliderDisabled from './disabled.vue';
import DemoSliderOrientation from './orientation.vue';
</script>

<template>
  <SCard title="Slider" split :ui="{ content: 'flex-c gap-4' }">
    <DemoSliderBasic />
    <DemoSliderRange />
    <DemoSliderSize />
    <DemoSliderColor />
    <DemoSliderDisabled />
    <DemoSliderOrientation />
  </SCard>
</template>
