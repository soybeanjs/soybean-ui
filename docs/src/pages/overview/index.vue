<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onBeforeMount(() => {
  router.replace('/overview/introduction');
});
</script>

<template>
  <div></div>
</template>
