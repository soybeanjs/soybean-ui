<script setup lang="ts">
import { SCheckbox, SIcon } from '@soybeanjs/ui';
</script>

<template>
  <SCheckbox :default-value="true" shape="rounded" label="Rounded">
    <template #indicator>
      <SIcon icon="mdi:check-bold" class="size-full" />
    </template>
  </SCheckbox>
</template>
