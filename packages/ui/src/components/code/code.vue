<script setup lang="ts">
import { computed } from 'vue';
import { CodeRoot, provideCodeUi } from '@soybeanjs/headless/code';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { codeVariants } from '@/styles/code';
import { SIcon } from '../icon';
import type { CodeProps } from './types';

defineOptions({
  name: 'SCode'
});

const props = withDefaults(defineProps<CodeProps>(), {
  code: '',
  language: undefined,
  lineNumbers: false,
  copyable: false,
  copyText: undefined,
  highlight: undefined,
  variant: 'block'
});

const emit = defineEmits<{ copied: [text: string] }>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'variant']);

const ui = computed(() => codeVariants({ variant: props.variant }, props.ui, { root: props.class }));

provideCodeUi(ui);
</script>

<template>
  <CodeRoot
    v-bind="forwardedProps"
    :line-numbers="variant === 'inline' ? false : lineNumbers"
    :class="ui.root"
    @copied="emit('copied', $event)"
  >
    <template #copyButton="{ copied, copy }">
      <button
        type="button"
        :class="ui.copyButton"
        :data-copied="copied ? '' : undefined"
        aria-label="Copy code"
        @click="copy"
      >
        <SIcon :icon="copied ? 'lucide:check' : 'lucide:copy'" class="size-3.5" />
      </button>
    </template>
  </CodeRoot>
</template>
