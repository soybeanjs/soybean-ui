<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';
import { STimeField } from '@soybeanjs/ui';

const value = shallowRef(new Time(18, 15, 0));
</script>

<template>
  <div class="flex-c gap-3">
    <h3 class="playground-title">Custom styling</h3>
    <STimeField
      v-model="value"
      class="w-60 lt-md:w-auto"
      aria-label="Styled time"
      :ui="{
        root: 'rounded-xl border-primary/40 bg-primary/4',
        input: 'focus-visible:bg-primary/12'
      }"
    />
  </div>
</template>
