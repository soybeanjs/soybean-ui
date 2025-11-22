<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onBeforeMount(() => {
  router.replace('/components/button');
});
</script>

<template>
  <div></div>
</template>
