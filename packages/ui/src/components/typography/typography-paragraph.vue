<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { TypographyParagraph } from '@soybeanjs/headless/typography';
import { typographyParagraphVariants } from '@/styles/typography';
import { SIcon } from '../icon';
import type { TypographyParagraphEmits, TypographyParagraphProps, TypographyParagraphSlots } from './types';

defineOptions({
  name: 'STypographyParagraph'
});

const props = withDefaults(defineProps<TypographyParagraphProps>(), {
  copyable: false,
  copyText: undefined
});

const emit = defineEmits<TypographyParagraphEmits>();

defineSlots<TypographyParagraphSlots>();

const forwardedProps = useOmitProps(props, ['class', 'ui']);

const ui = computed(() => typographyParagraphVariants({}, props.ui, { root: props.class }));
</script>

<template>
  <TypographyParagraph
    v-slot="{ copied, copy }"
    v-bind="forwardedProps"
    :class="ui.root"
    @copied="emit('copied', $event)"
  >
    <slot :copied="copied" :copy="copy" />
    <button
      v-if="copyable"
      type="button"
      :class="ui.copyButton"
      :data-copied="copied ? '' : undefined"
      aria-label="Copy"
      @click="copy"
    >
      <SIcon :icon="copied ? 'lucide:check' : 'lucide:copy'" class="size-3.5" />
    </button>
  </TypographyParagraph>
</template>
