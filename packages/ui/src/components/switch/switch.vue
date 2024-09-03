<script setup lang="ts">
import { SwitchRoot, useForwardPropsEmits } from 'radix-vue';
import type { SwitchRootEmits } from 'radix-vue';

import { nanoid } from 'nanoid';
import { computed } from 'vue';
import { cn, switchVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';

import SSwitchThumb from './switch-thumb.vue';
import SSwitchLoading from './switch-loading.vue';
import type { SwitchRootProps } from './types';

defineOptions({
  name: 'SSwitch'
});

const props = withDefaults(defineProps<SwitchRootProps>(), {
  defaultChecked: false,
  loading: false
});
const emit = defineEmits<SwitchRootEmits>();
const delegatedProps = computedOmit(props, ['class', 'thumbClass', 'round', 'id', 'name']);
const forwarded = useForwardPropsEmits(delegatedProps, emit);
const switchboxId = computed(() => props.id || `switchbox-${nanoid(8)}`);
const cls = computed(() => {
  const { root } = switchVariants();
  return cn(
    root({ color: props.bgColor, size: props.size, round: props.round, status: props.loading ? 'loading' : 'default' }),
    props.class
  );
});
</script>

<template>
  <SwitchRoot v-bind="forwarded" :id="switchboxId" :class="cls">
    <SSwitchThumb :size="props.size" :round="round" :class="props.thumbClass">
      <div>
        <SSwitchLoading v-if="props.loading" :bg-color="bgColor" :loading="loading" />
        <slot name="switch-icon" />
      </div>
    </SSwitchThumb>
  </SwitchRoot>
</template>

<style lang="scss" scoped></style>
