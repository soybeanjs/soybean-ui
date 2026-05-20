<script setup lang="ts">
import { shallowRef } from 'vue';
import { STimeField } from '@soybeanjs/ui';
import { Time } from '@internationalized/date';

const value = shallowRef(new Time(18, 15, 0));
</script>

<template>
  <STimeField
    v-model="value"
    aria-label="Styled time"
    :ui="{
      root: 'rounded-xl border-primary/40 bg-primary/4',
      input: 'focus-visible:bg-primary/12'
    }"
  />
</template>
