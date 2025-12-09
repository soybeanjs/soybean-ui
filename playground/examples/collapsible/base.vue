<script setup lang="ts">
import { SButtonIcon, SCollapsible, SCollapsibleContent, SCollapsibleTrigger } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <SCollapsible
      v-slot="{ open }"
      class="w-350px lt-md:w-auto space-y-2"
      :ui="{
        content: 'space-y-2'
      }"
    >
      <div class="flex-y-center justify-between px-2 space-x-4">
        <h4 class="text-sm font-semibold">@soybeanjs starred 3 repositories</h4>
        <SCollapsibleTrigger as-child>
          <SButtonIcon :icon="open ? 'lucide:chevron-up' : 'lucide:chevron-down'" />
        </SCollapsibleTrigger>
      </div>
      <div class="border rounded-md px-4 py-3 text-sm font-mono">soybean-headless</div>
      <SCollapsibleContent>
        <div class="border rounded-md px-4 py-3 text-sm font-mono">soybean-ui</div>
        <div class="border rounded-md px-4 py-3 text-sm font-mono">soybean-market</div>
      </SCollapsibleContent>
    </SCollapsible>
  </div>
</template>
