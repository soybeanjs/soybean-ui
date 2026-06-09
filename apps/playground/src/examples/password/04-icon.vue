<script setup lang="ts">
import { SButtonIcon, SPassword } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-60 lt-md:w-auto">
    <SPassword default-value="abc123">
      <template #visible="{ visible, toggle }">
        <SButtonIcon size="sm" :icon="visible ? 'lucide:lock-open' : 'lucide:lock'" @click="toggle" />
      </template>
    </SPassword>
  </div>
</template>
