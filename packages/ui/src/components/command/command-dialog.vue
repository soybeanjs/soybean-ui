<script setup lang="ts">
import { computed } from 'vue';
import { DialogContent, DialogRoot, useForwardPropsEmits } from '@soybean-ui/primitive';
import { cn, commandVariants } from '@soybean-ui/variants';
import SCommandRoot from './command-root.vue';
import type { CommandDialogEmits, CommandDialogProps } from './types';

defineOptions({
  name: 'SCommandDialog'
});

const { class: cls, ...delegatedProps } = defineProps<CommandDialogProps>();

const emit = defineEmits<CommandDialogEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { dialog } = commandVariants();

const mergedCls = computed(() => cn(dialog(), cls));
</script>

<template>
  <DialogRoot v-bind="forwarded">
    <DialogContent :class="mergedCls">
      <SCommandRoot>
        <slot />
      </SCommandRoot>
    </DialogContent>
  </DialogRoot>
</template>
