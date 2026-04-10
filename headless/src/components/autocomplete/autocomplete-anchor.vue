<script setup lang="ts">
import { watchEffect } from 'vue';
import { useForwardElement, useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { usePopoverRootContext } from '../popover/context';
import { usePopperRootContext } from '../popper/context';
import { useAutocompleteUi } from './context';
import type { AutocompleteAnchorProps } from './types';

defineOptions({
  name: 'AutocompleteAnchor'
});

const props = withDefaults(defineProps<AutocompleteAnchorProps>(), {
  as: 'div'
});

const forwardedProps = useOmitProps(props, ['reference']);

const cls = useAutocompleteUi('anchor');

const { onAnchorElementChange } = usePopperRootContext('AutocompleteAnchor');
const { onTriggerElementChange } = usePopoverRootContext('AutocompleteAnchor');

const [_, setAnchorElement] = useForwardElement(el => {
  if (props.reference) return;

  onAnchorElementChange(el);
  onTriggerElementChange(el as HTMLElement);
});

watchEffect(() => {
  if (!props.reference) return;

  onAnchorElementChange(props.reference);
  if (props.reference instanceof HTMLElement) {
    onTriggerElementChange(props.reference);
  }
});
</script>

<template>
  <Primitive v-bind="forwardedProps" :ref="setAnchorElement" :class="cls">
    <slot />
  </Primitive>
</template>
