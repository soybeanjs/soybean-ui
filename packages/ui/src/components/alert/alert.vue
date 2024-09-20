<script setup lang="ts">
import { computed } from 'vue';
import { useForwardProps } from 'radix-vue';
import { alertVariants, cn } from '@soybean-ui/variants';
import { X } from 'lucide-vue-next';
import { computedPick } from '../../shared';
import SButtonIcon from '../button/button-icon.vue';
import SAlertRoot from './alert-root.vue';
import SAlertHeader from './alert-header.vue';
import SAlertTitleRoot from './alert-title-root.vue';
import SAlertTitle from './alert-title.vue';
import SAlertDescription from './alert-description.vue';
import type { AlertProps } from './types';

defineOptions({
  name: 'SAlert'
});

const props = defineProps<AlertProps>();

const close = defineModel<boolean>('close', { default: false });

const delegatedProps = computedPick(props, ['color', 'variant', 'class']);

const forwarded = useForwardProps(delegatedProps);

const { titleRoot } = alertVariants();

const titleRootCls = computed(() => cn(titleRoot({ color: props.color }), props.titleRootClass));

function closeAlert() {
  close.value = true;
}
</script>

<template>
  <SAlertRoot v-show="!close" v-bind="forwarded">
    <SAlertHeader :class="headerClass">
      <SAlertTitleRoot :class="titleRootCls">
        <slot name="icon" />
        <SAlertTitle :class="titleClass">
          <slot>{{ title }}</slot>
        </SAlertTitle>
      </SAlertTitleRoot>
      <slot name="extra" :closable="closable">
        <SButtonIcon v-if="closable" size="xs" fit-content @click="closeAlert">
          <X />
        </SButtonIcon>
      </slot>
    </SAlertHeader>
    <SAlertDescription v-if="$slots.description || description" :class="descriptionClass">
      <slot name="description">{{ description }}</slot>
    </SAlertDescription>
  </SAlertRoot>
</template>

<style scoped></style>
