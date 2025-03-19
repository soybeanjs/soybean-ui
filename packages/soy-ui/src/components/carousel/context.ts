import { onMounted, ref } from 'vue';
import { useContext } from '@soybean-ui/primitives';
import emblaCarouselVue from 'embla-carousel-vue';
import type { CarouselContext, CarouselContextParams, CarouselRootEmits, UnwrapRefCarouselApi } from './types';

const [provideCarouselContext, injectCarouselContext] = useContext(
  'Carousel',
  (params: CarouselContextParams, emit: CarouselRootEmits) => {
    const { orientation, opts, plugins } = params;

    const [carouselRef, carouselApi] = emblaCarouselVue(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y'
      },
      plugins
    );

    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);

    function onSelect(api: UnwrapRefCarouselApi) {
      canScrollNext.value = api?.canScrollNext() || false;
      canScrollPrev.value = api?.canScrollPrev() || false;
    }

    function init() {
      if (!carouselApi.value) return;

      carouselApi.value?.on('init', onSelect);
      carouselApi.value?.on('reInit', onSelect);
      carouselApi.value?.on('select', onSelect);

      emit('initApi', carouselApi.value);
    }

    const context: CarouselContext = {
      carouselRef,
      carouselApi,
      canScrollPrev,
      canScrollNext,
      scrollNext: () => {
        carouselApi.value?.scrollNext();
      },
      scrollPrev: () => {
        carouselApi.value?.scrollPrev();
      },
      orientation
    };

    onMounted(() => {
      init();
    });

    return context;
  }
);

function useCarousel() {
  const carouselContext = injectCarouselContext();

  if (!carouselContext) throw new Error('useCarousel must be used within a <CarouselRoot />');

  return carouselContext;
}

export { useCarousel, provideCarouselContext };
