<script setup lang="ts">
import { shallowRef } from 'vue';
import { createDate } from '@soybeanjs/headless/date';
import { SDateField } from '@soybeanjs/ui';

const value = shallowRef(createDate(2026, 4, 19));
</script>

<template>
  <SDateField
    v-model="value"
    aria-label="Custom styled date"
    class="w-fit"
    :ui="{
      root: 'rounded-xl border-primary/50 bg-primary/5',
      input: 'font-semibold data-[segment=literal]:font-normal data-[placeholder]:text-primary/50'
    }"
  />
</template>
