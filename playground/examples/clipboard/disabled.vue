<script setup lang="ts">
import { SClipboard, SIcon } from '@soybeanjs/ui';

const value = 'disabled-example';
</script>

<template>
  <h3 class="playground-title">Disabled</h3>
  <div class="flex flex-wrap gap-3">
    <SClipboard :value="value" color="accent" variant="soft">
      <template #leading="{ copied }">
        <SIcon :icon="copied ? 'lucide:check' : 'lucide:copy'" />
      </template>
      <template #default="{ copied }">
        {{ copied ? 'Copied' : 'Enabled' }}
      </template>
    </SClipboard>
    <SClipboard :value="value" color="accent" variant="soft" disabled>
      <template #leading="{ copied }">
        <SIcon :icon="copied ? 'lucide:check' : 'lucide:copy'" />
      </template>
      <template #default="{ copied }">
        {{ copied ? 'Copied' : 'Disabled' }}
      </template>
    </SClipboard>
  </div>
</template>
