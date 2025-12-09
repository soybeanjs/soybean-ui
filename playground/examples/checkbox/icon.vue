<script setup lang="ts">
import { SCheckbox, SIcon } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Icon</h3>
    <SCheckbox :default-value="true" shape="rounded" label="Rounded">
      <template #indicator>
        <SIcon icon="mdi:check-bold" class="size-full" />
      </template>
    </SCheckbox>
  </div>
</template>
