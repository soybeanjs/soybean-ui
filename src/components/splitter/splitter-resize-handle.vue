<script lang="ts">
import { computed, defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { SplitterResizeHandle } from '@soybeanjs/headless';
import type { SplitterResizeHandleProps } from './types';

export default defineComponent({
  name: 'SSplitterResizeHandle',
  inheritAttrs: false,
  props: {
    withHandle: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Number,
      default: 0
    },
    asChild: {
      type: Boolean,
      default: undefined
    },
    as: {
      type: [String, Object, Function],
      default: undefined
    },
    class: {
      type: null as unknown as PropType<SplitterResizeHandleProps['class']>,
      default: undefined
    }
  },
  emits: {
    dragging: (_value: boolean) => true
  },
  setup(props: SplitterResizeHandleProps, { attrs, emit, slots }) {
    const forwardedProps = computed(() => ({
      ...attrs,
      disabled: props.disabled,
      tabindex: props.tabindex,
      asChild: props.asChild,
      as: props.as
    }));

    const defaultHandle = computed(() =>
      h(
        'div',
        {
          class: 'bg-background z-10 flex h-4 w-3 items-center justify-center rounded-xs border border-border',
          'aria-hidden': 'true'
        },
        [
          h('div', { class: 'flex flex-col items-center gap-0.5' }, [
            h('span', { class: 'h-0.75 w-0.75 rounded-full bg-muted-foreground/70' }),
            h('span', { class: 'h-0.75 w-0.75 rounded-full bg-muted-foreground/70' }),
            h('span', { class: 'h-0.75 w-0.75 rounded-full bg-muted-foreground/70' })
          ])
        ]
      )
    );

    return () =>
      h(
        SplitterResizeHandle,
        {
          'data-slot': 'splitter-resize-handle',
          ...forwardedProps.value,
          class: props.class,
          onDragging: (value: boolean) => emit('dragging', value)
        },
        {
          default: () => {
            if (slots.default) {
              return slots.default();
            }

            if (props.withHandle) {
              return [defaultHandle.value];
            }

            return undefined;
          }
        }
      );
  }
});
</script>
