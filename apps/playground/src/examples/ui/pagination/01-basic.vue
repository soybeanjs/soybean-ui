<script setup lang="ts">
import { ref } from 'vue';
import { SPagination } from '@soybeanjs/ui';

const page = ref(1);
</script>

<template>
  <SPagination v-model:page="page" :total="100" :items-per-page="10" />
</template>
