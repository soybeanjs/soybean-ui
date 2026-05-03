<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';

import { STimePicker } from '@soybeanjs/ui';

const value = shallowRef(new Time(14, 0, 0));
</script>

<template>
  <STimePicker
    v-model="value"
    class="w-60 lt-md:w-auto"
    aria-label="Styled meeting time"
    :ui="{
      trigger: 'border-primary/40 bg-primary/4',
      popup: 'border-primary/30',
      cellTrigger: 'data-[selected]:bg-primary/90'
    }"
  />
</template>
