import { computed, mergeProps, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { wrapArray } from '../../shared';
import type { MenuSubTriggerProps, MenuSubContentProps } from '../menu';
import { useMenubarCollectionContext, useMenubarMenuContext, useMenubarRootContext } from './context';

export const useMenubarSubProps = (
  subTriggerProps: MaybeRefOrGetter<MenuSubTriggerProps | undefined>,
  subContentProps: MaybeRefOrGetter<MenuSubContentProps | undefined>
) => {
  const { loop, onMenuOpen } = useMenubarRootContext('MenubarSubContent');
  const { value } = useMenubarMenuContext('MenubarSubContent');
  const { getOrderedItems } = useMenubarCollectionContext('MenubarSubContent');

  const onArrowNavigation = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.hasAttribute('data-soybean-menubar-subtrigger')) return;

    const candidateValues = getOrderedItems().map(item => item.data.value);

    const currentIndex = candidateValues.findIndex(v => v === value.value);
    const nextValues = loop.value
      ? wrapArray(candidateValues, currentIndex + 1)
      : candidateValues.slice(currentIndex + 1);
    const nextValue = nextValues[0];

    if (!nextValue) return;

    onMenuOpen(nextValue);
  };

  const mergedSubTriggerProps = computed(() => ({
    ...toValue(subTriggerProps),
    'data-soybean-menubar-subtrigger': ''
  }));

  const mergedSubContentProps = computed(() =>
    mergeProps(
      { ...toValue(subContentProps) },
      {
        onKeydown: onArrowNavigation
      }
    )
  );

  return {
    subTriggerProps: mergedSubTriggerProps,
    subContentProps: mergedSubContentProps
  };
};
