<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import { shallowRef } from 'vue';

import { SCalendar } from '@soybeanjs/ui';

const value = shallowRef(new CalendarDate(2026, 4, 18));
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SCalendar v-model="value" :default-placeholder="value" />
  </div>
</template>
