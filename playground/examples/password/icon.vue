<script setup lang="ts">
import { SIcon, SPassword } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <h3 class="playground-title">Visible Icon</h3>
    <div class="w-60 lt-md:w-auto">
      <SPassword default-value="abc123">
        <template #visible="{ visible, toggle }">
          <SIcon :icon="visible ? 'lucide:lock-open' : 'lucide:lock'" class="cursor-pointer" @click="toggle" />
        </template>
      </SPassword>
    </div>
  </div>
</template>
