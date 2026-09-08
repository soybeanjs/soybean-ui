<script setup lang="ts">
import { ref } from 'vue';
import { SStepper } from '@soybeanjs/ui';

const value = ref(1);

const items = [
  { title: 'Project', description: 'Choose a workspace' },
  { title: 'Members', description: 'Invite collaborators' },
  { title: 'Launch', description: 'Start your project' }
];
</script>

<template>
  <SStepper v-model="value" orientation="vertical" :items="items" class="max-w-md" />
</template>
