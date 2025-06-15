<script setup lang="ts">
import { SCard } from '@ui';
import { Separator } from '@headless';
import { separatorVariants } from '@variants/separator';

const { root, label } = separatorVariants();
</script>

<template>
  <SCard title="Separator">
    <div>Horizontal</div>
    <Separator :class="root()" :label-props="{ class: label() }">Label</Separator>
    <div>Vertical</div>
    <div class="flex items-center gap-2 h-6">
      <div>Vue</div>
      <Separator :class="root({ orientation: 'vertical' })" />
      <div>SoybeanHeadless</div>
    </div>
  </SCard>
</template>
