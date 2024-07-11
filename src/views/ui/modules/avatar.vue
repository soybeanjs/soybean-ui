<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@soybean-unify/shadcn-ui';

defineOptions({
  name: 'AvatarDemo'
});
</script>

<template>
  <Avatar>
    <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
