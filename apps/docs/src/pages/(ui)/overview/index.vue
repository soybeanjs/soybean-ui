<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { localizePath } from 'ubean/client';

definePage({ layout: 'default' });

const router = useRouter();

onBeforeMount(() => {
  router.replace(localizePath('/overview/introduction'));
});
</script>

<template>
  <div />
</template>
