<script setup lang="ts">
import { SEditable } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
</script>

<template>
  <div>
    <h3 class="playground-title">Size</h3>
    <div class="flex-c gap-3 w-100 lt-md:w-auto">
      <SEditable
        v-for="item in themeSizeOptions"
        :key="item.value"
        :size="item.value"
        :default-value="`Editable ${item.label}`"
        :placeholder="`Editable ${item.label}`"
      />
    </div>
  </div>
</template>
