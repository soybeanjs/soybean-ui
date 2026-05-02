<script setup lang="ts">
const router = useRouter();

function onLoaded(isSuccess: boolean) {
  if (isSuccess) return;
  router.replace('/404');
}
</script>

<template>
  <DocMd path="releases" @loaded="onLoaded" />
</template>
