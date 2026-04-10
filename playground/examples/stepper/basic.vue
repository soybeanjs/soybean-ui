<script setup lang="ts">
import { ref } from 'vue';
import { SStepper } from '@soybeanjs/ui';

const value = ref(2);

const items = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Complete your profile' },
  { title: 'Review', description: 'Confirm and submit' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Basic</h3>
    <SStepper v-model="value" :items="items" />
  </div>
</template>
