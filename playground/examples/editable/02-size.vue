<script setup lang="ts">
import { SEditable } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div class="flex-c gap-3">
    <SEditable
      v-for="item in themeSizeOptions"
      :key="item.value"
      :size="item.value"
      :default-value="`Editable ${item.label}`"
      :placeholder="`Editable ${item.label}`"
      class="w-100 lt-md:w-auto"
    />
  </div>
</template>
