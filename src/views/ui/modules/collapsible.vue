<script setup lang="ts">
import { SButtonIcon, SCollapsible, SCollapsibleTrigger } from 'soybean-ui';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-vue-next';

defineOptions({
  name: 'UiCollapsible'
});
</script>

<template>
  <SCollapsible class="w-350px lt-sm:w-auto space-y-2" content-class="space-y-2">
    <template #default="{ open }">
      <div class="flex-y-center justify-between px-2 space-x-4">
        <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <SCollapsibleTrigger as-child>
          <SButtonIcon>
            <ChevronsDownUp v-if="open" />
            <ChevronsUpDown v-else />
          </SButtonIcon>
        </SCollapsibleTrigger>
      </div>
      <div class="border rounded-md px-4 py-3 text-sm font-mono">@reka-ui/primitives</div>
    </template>
    <template #content>
      <div class="border rounded-md px-4 py-3 text-sm font-mono">@reka-ui/colors</div>
      <div class="border rounded-md px-4 py-3 text-sm font-mono">@stitches/react</div>
    </template>
  </SCollapsible>
</template>

<style scoped></style>
