<script setup lang="ts">
import { computed } from 'vue';
import { LayoutClassicCompact, provideLayoutClassicUi } from '@soybeanjs/headless/layout';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants, themeSizeMap, themeSizeRatio } from '@/theme';
import { drawerVariants } from '../drawer/variants';
import { buttonIconVariants } from '../button/variants';
import { layoutClassicVariants } from './variants';
import type { LayoutClassicProps, LayoutClassicEmits, LayoutClassicSlots } from './types';

defineOptions({
  name: 'SLayoutClassic'
});

const props = withDefaults(defineProps<LayoutClassicProps>(), {
  open: undefined,
  size: 'md',
  defaultOpen: true,
  sidebarVisible: true,
  headerVisible: true,
  tabVisible: true,
  footerVisible: true,
  fixedTop: true,
  stretchFooter: true
});

const emit = defineEmits<LayoutClassicEmits>();

const slots = defineSlots<LayoutClassicSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'pxToRem']);

const slotNames = computed(() => keysOf(slots).filter(name => name !== 'sidebar'));

const pxToRem = (px: number) => {
  if (props.pxToRem) {
    return props.pxToRem(px);
  }

  return (px * themeSizeRatio[props.size]) / themeSizeMap.md;
};

const ui = computed(() => {
  const variants = Object.assign(
    layoutClassicVariants({
      size: props.size,
      side: props.side,
      fullContent: props.fullContent
    }),
    {
      $base: {
        trigger: buttonIconVariants({
          size: props.size
        })
      },
      $alias: {
        variants: {
          ...drawerVariants({
            size: props.size,
            side: props.side
          })
        },
        map: {
          popup: 'mobileDrawer'
        }
      }
    }
  );

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideLayoutClassicUi(ui);
</script>

<template>
  <LayoutClassicCompact v-bind="forwardedProps" :px-to-rem="pxToRem" @update:open="emit('update:open', $event)">
    <template #sidebar="slotProps">
      <slot name="sidebar" v-bind="slotProps" />
    </template>
    <template v-for="name in slotNames" #[name]>
      <slot :name="name" />
    </template>
  </LayoutClassicCompact>
</template>
