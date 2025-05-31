<script setup lang="ts">
import AccordionExample from './examples/accordion.vue';
import AlertDialogExample from './examples/alert-dialog.vue';
import ArrowExample from './examples/arrow.vue';
import AspectRatioExample from './examples/aspect-ratio.vue';
import AvatarExample from './examples/avatar.vue';
import CheckboxExample from './examples/checkbox.vue';
import DialogExample from './examples/dialog.vue';
import PopoverExample from './examples/popover.vue';
import RadioGroupExample from './examples/radio-group.vue';
import RovingFocusExample from './examples/roving-focus/demo.vue';
</script>

<template>
  <div class="container p-4">
    <h1 class="py-4 text-center text-2xl font-bold">Soybean Primitives Examples</h1>
    <div class="flex flex-col gap-4">
      <AccordionExample />
      <AlertDialogExample />
      <ArrowExample />
      <AspectRatioExample />
      <AvatarExample />
      <CheckboxExample />
      <DialogExample />
      <PopoverExample />
      <RadioGroupExample />
      <RovingFocusExample />
    </div>
  </div>
</template>
