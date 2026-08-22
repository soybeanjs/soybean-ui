<script setup lang="ts">
import { ref } from 'vue';
import { SSplitMenu } from '@soybeanjs/ui';
import { splitMenuItems } from './data';

const active = ref('');
</script>

<template>
  <div class="h-110">
    <SSplitMenu
      v-model="active"
      mode="horizontal-dual-vertical"
      :items="splitMenuItems"
      class="bg-sidebar border rounded-md"
    />
  </div>
</template>
