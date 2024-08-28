<script setup lang="ts">
import { SButtonIcon, SCollapsible, SCollapsibleTrigger } from '@soybean-unify/ui';
import { ChevronsUpDown } from 'lucide-vue-next';

defineOptions({
  name: 'UiCollapsible'
});
</script>

<template>
  <SCollapsible class="w-350px space-y-2" content-class="space-y-2">
    <div class="flex-y-center justify-between px-2 space-x-4">
      <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
      <SCollapsibleTrigger as-child>
        <SButtonIcon>
          <ChevronsUpDown />
        </SButtonIcon>
      </SCollapsibleTrigger>
    </div>
    <div class="border rounded-md px-4 py-3 text-sm font-mono">@radix-ui/primitives</div>
    <template #content>
      <div class="border rounded-md px-4 py-3 text-sm font-mono">@radix-ui/colors</div>
      <div class="border rounded-md px-4 py-3 text-sm font-mono">@stitches/react</div>
    </template>
  </SCollapsible>
</template>

<style scoped></style>
