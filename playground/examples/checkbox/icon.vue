<script setup lang="ts">
import { SCard, SCheckbox, SIcon } from '@ui';
</script>

<template>
  <SCard title="Icon">
    <SCheckbox :default-value="true" shape="rounded" label="Rounded">
      <template #indicator>
        <SIcon icon="mdi:check-bold" class="size-full" />
      </template>
    </SCheckbox>
  </SCard>
</template>
