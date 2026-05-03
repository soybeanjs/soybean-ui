<script setup lang="ts">
import { Time } from '@internationalized/date';
import { shallowRef } from 'vue';

import { STimePicker } from '@soybeanjs/ui';

const value = shallowRef(new Time(9, 30, 0));
</script>

<template>
  <STimePicker v-model="value" class="w-60 lt-md:w-auto" aria-label="Meeting time" />
</template>
