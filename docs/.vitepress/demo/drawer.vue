<script setup lang="ts">
import { SButton, SDrawer, SDrawerClose } from 'soy-ui';

defineOptions({
  name: 'UiDrawer'
});
</script>

<template>
  <div class="py-12px text-18px">Default</div>
  <SDrawer title="Drawer Title" show-close content-body-class="mx-auto max-w-sm w-full">
    <template #trigger>
      <SButton variant="outline">Open</SButton>
    </template>
    <p class="pb-4">
      This is a basic drawer with a title and description.
      <br />
      For some strange reason the Vaul won't pull to close when a form i s present inside it
    </p>
    <template #footer>
      <SDrawerClose as-child>
        <SButton variant="outline">Cancel</SButton>
      </SDrawerClose>
      <SButton>Submit</SButton>
    </template>
  </SDrawer>
</template>
