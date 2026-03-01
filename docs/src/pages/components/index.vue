<script setup lang="ts">
const router = useRouter();

onBeforeMount(() => {
  router.replace('/components/button');
});
</script>

<template>
  <div />
</template>
