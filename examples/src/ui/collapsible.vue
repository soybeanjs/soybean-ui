<script setup lang="ts">
import { SButtonIcon, SCard, SCollapsible, SCollapsibleTrigger } from 'soy-ui';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-vue-next';

defineOptions({
  name: 'DemoCollapsible'
});
</script>

<template>
  <SCard title="Collapsible" split>
    <SCollapsible
      class="w-350px lt-sm:w-auto space-y-2"
      :ui="{
        content: 'space-y-2'
      }"
    >
      <template #default="{ open }">
        <div class="flex-y-center justify-between px-2 space-x-4">
          <h4 class="text-sm font-semibold">@soybeanjs starred 3 repositories</h4>
          <SCollapsibleTrigger as-child>
            <SButtonIcon>
              <ChevronsDownUp v-if="open" />
              <ChevronsUpDown v-else />
            </SButtonIcon>
          </SCollapsibleTrigger>
        </div>
        <div class="border rounded-md px-4 py-3 text-sm font-mono">@soybean-ui/primitives</div>
      </template>
      <template #content>
        <div class="border rounded-md px-4 py-3 text-sm font-mono">@soybean-ui/colors</div>
        <div class="border rounded-md px-4 py-3 text-sm font-mono">soybean-ui</div>
      </template>
    </SCollapsible>
  </SCard>
</template>
