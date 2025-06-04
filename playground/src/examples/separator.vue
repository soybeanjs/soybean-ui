<script setup lang="ts">
import { Separator } from '@/components/separator';
import { separatorVariants } from '../variants/separator';
import SectionWrapper from '../components/section-wrapper.vue';

const { root, label } = separatorVariants();
</script>

<template>
  <SectionWrapper title="Separator">
    <div>Horizontal</div>
    <Separator :class="root()" :label-props="{ class: label() }">Label</Separator>
    <div>Vertical</div>
    <div class="flex items-center gap-2 h-6">
      <div>Vue</div>
      <Separator :class="root({ orientation: 'vertical' })" />
      <div>Soybean Primitives</div>
    </div>
  </SectionWrapper>
</template>
