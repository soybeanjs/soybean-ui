import { computed } from 'vue';
import { useDirection } from '../config-provider/context';
import { useContext, useUiContext } from '../../composables';
import type { DescriptionsRootContext, DescriptionsRootProps, DescriptionsUiSlot } from './types';

export const [provideDescriptionsRootContext, useDescriptionsRootContext] = useContext(
  'DescriptionsRoot',
  (props: DescriptionsRootProps): DescriptionsRootContext => {
    const layout = computed(() => props.layout ?? 'horizontal');
    const labelAlign = computed(() => props.labelAlign ?? 'start');
    const dir = useDirection(() => props.dir);

    return {
      layout,
      labelAlign,
      dir
    };
  }
);

export const [provideDescriptionsUi, useDescriptionsUi] = useUiContext<DescriptionsUiSlot>('DescriptionsUi');
