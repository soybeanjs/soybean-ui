<script setup lang="ts">
import { SButton, SDrawer, SDrawerClose, SDrawerDescription, SDrawerTitle } from 'soybean-ui';

defineOptions({
  name: 'UiDrawer'
});
</script>

<template>
  <div class="py-12px text-18px">Default</div>
  <SDrawer>
    <template #trigger>
      <SButton variant="outline">Open</SButton>
    </template>
    <div class="mx-auto max-w-sm w-full p-4">
      <SDrawerTitle class="mb-1.5">Drawer Title</SDrawerTitle>
      <SDrawerDescription>
        This is a basic drawer with a title and description.
        <br />
        For some strange reason the Vaul won't pull to close when a form i s present inside it
      </SDrawerDescription>
      <div class="mt-8">
        <SButton class="mb-3 w-full">Submit</SButton>
        <SDrawerClose as-child>
          <SButton class="w-full" variant="outline">Cancel</SButton>
        </SDrawerClose>
      </div>
    </div>
  </SDrawer>
</template>

<style scoped></style>
