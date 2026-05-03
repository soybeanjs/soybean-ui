import { onBeforeUnmount, shallowRef, toRef, unref, watch } from 'vue';
import type { MaybeRef, ShallowRef } from 'vue';
import EmblaCarousel from 'embla-carousel';
import { areOptionsEqual, arePluginsEqual } from 'embla-carousel-reactive-utils';
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from './types';

export function useEmblaCarousel(
  element: ShallowRef<HTMLElement | null | undefined>,
  options: MaybeRef<EmblaOptionsType> = {},
  plugins: MaybeRef<EmblaPluginType[]> = []
) {
  const optionsRef = toRef(() => unref(options));
  const pluginsRef = toRef(() => unref(plugins));

  let storedOptions = optionsRef.value;
  let storedPlugins = pluginsRef.value;

  const carousel = shallowRef<EmblaCarouselType>();

  function reInit(): void {
    if (!carousel.value) return;
    carousel.value.reInit(storedOptions, storedPlugins);
  }

  function destroy() {
    if (!carousel.value) return;
    carousel.value.destroy();
    carousel.value = undefined;
  }

  watch(
    element,
    node => {
      destroy();

      if (node) {
        carousel.value = EmblaCarousel(node, storedOptions, storedPlugins);
      }
    },
    { flush: 'post', immediate: true }
  );

  watch(optionsRef, newOptions => {
    if (areOptionsEqual(storedOptions, newOptions)) return;
    storedOptions = newOptions;
    reInit();
  });

  watch(pluginsRef, newPlugins => {
    if (arePluginsEqual(storedPlugins, newPlugins)) return;
    storedPlugins = newPlugins;
    reInit();
  });

  onBeforeUnmount(() => {
    destroy();
  });

  return carousel;
}
