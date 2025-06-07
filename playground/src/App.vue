<script setup lang="ts">
import AlertDialogExample from './examples/alert-dialog.vue';
import ArrowExample from './examples/arrow.vue';
import AspectRatioExample from './examples/aspect-ratio.vue';
import AvatarExample from './examples/avatar.vue';
import CardExample from './examples/card/index.vue';
import CheckboxExample from './examples/checkbox.vue';
import DialogExample from './examples/dialog.vue';
import DropdownMenuExample from './examples/dropdown-menu.vue';
import PopoverExample from './examples/popover.vue';
import RadioGroupExample from './examples/radio-group.vue';
import RovingFocusExample from './examples/roving-focus/demo.vue';
import SeparatorExample from './examples/separator.vue';
import TooltipExample from './examples/tooltip.vue';
</script>

<template>
  <div class="container p-4">
    <h1 class="py-4 text-center text-2xl font-bold">Soybean Primitives Examples</h1>
    <div class="flex flex-col gap-4">
      <AlertDialogExample />
      <ArrowExample />
      <AspectRatioExample />
      <AvatarExample />
      <CheckboxExample />
      <CardExample />
      <DialogExample />
      <DropdownMenuExample />
      <PopoverExample />
      <RadioGroupExample />
      <RovingFocusExample />
      <SeparatorExample />
      <TooltipExample />
    </div>
  </div>
</template>
