<script setup lang="ts">
import { onBeforeUnmount, shallowRef, watch } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import { isClient, transformPropsToContext } from '../../shared';
import { useDirection } from '../config-provider/context';
import { provideAnchorRootContext, useAnchorUi } from './context';
import type { AnchorContainer, AnchorRootEmits, AnchorRootProps } from './types';

defineOptions({
  name: 'AnchorRoot'
});

const props = withDefaults(defineProps<AnchorRootProps>(), {
  bounds: 5,
  dir: undefined,
  getContainer: undefined,
  getCurrentAnchor: undefined,
  modelValue: undefined,
  offsetTop: 0,
  orientation: 'vertical',
  replace: false,
  targetOffset: undefined
});

const emit = defineEmits<AnchorRootEmits>();

type Slots = {
  default: (props: { modelValue: string | undefined }) => any;
};

defineSlots<Slots>();

const cls = useAnchorUi('root');
const dir = useDirection(() => props.dir);
const forwardedProps = useOmitProps(props, [
  'bounds',
  'dir',
  'getContainer',
  'getCurrentAnchor',
  'modelValue',
  'offsetTop',
  'orientation',
  'replace',
  'targetOffset'
]);

const activeHref = useControllableState(
  () => props.modelValue,
  value => emit('update:modelValue', value ?? ''),
  ''
);

const registeredLinks = shallowRef<string[]>([]);
const isAnimating = shallowRef(false);
const animationTimer = shallowRef<number>();

function getCurrentContainer(): AnchorContainer | null {
  if (!isClient) {
    return null;
  }

  return props.getContainer?.() ?? window;
}

function getContainerScrollTop(container: AnchorContainer) {
  if (isWindowContainer(container)) {
    return window.scrollY || window.pageYOffset || 0;
  }

  return container.scrollTop;
}

function getElementOffsetTop(element: HTMLElement, container: AnchorContainer) {
  if (!element.getClientRects().length) {
    return 0;
  }

  const rect = element.getBoundingClientRect();

  if (isWindowContainer(container)) {
    return rect.top - element.ownerDocument.documentElement.clientTop;
  }

  return rect.top - container.getBoundingClientRect().top;
}

function isWindowContainer(container: AnchorContainer): container is Window {
  return container === window;
}

function isAnchorSection(
  section: { href: string; top: number } | null
): section is { href: string; top: number } {
  return Boolean(section);
}

function resolveTargetElement(href: string) {
  if (!isClient) {
    return null;
  }

  if (!href.startsWith('#')) {
    return null;
  }

  const id = decodeURIComponent(href.slice(1));
  if (!id) {
    return null;
  }

  return document.getElementById(id);
}

function setActiveHref(href: string) {
  const nextHref = props.getCurrentAnchor?.(href) ?? href;

  if (activeHref.value === nextHref) {
    return;
  }

  activeHref.value = nextHref;
  emit('activeChange', href);
}

function getCurrentAnchor() {
  const offsetTop = props.targetOffset ?? props.offsetTop;
  const sections = registeredLinks.value
    .map(href => {
      const element = resolveTargetElement(href);
      if (!element) {
        return null;
      }

      const container = getCurrentContainer();
      if (!container) {
        return null;
      }

      return {
        href,
        top: getElementOffsetTop(element, container)
      };
    })
    .filter(isAnchorSection)
    .filter(section => section.top <= offsetTop + props.bounds);

  if (!sections.length) {
    return '';
  }

  return sections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev)).href;
}

function handleScroll() {
  if (isAnimating.value) {
    return;
  }

  setActiveHref(getCurrentAnchor());
}

function scrollContainerTo(container: AnchorContainer, top: number) {
  const options = {
    behavior: 'smooth' as const,
    top
  };

  if (container === window) {
    window.scrollTo(options);
    return;
  }

  container.scrollTo(options);
}

function scrollTo(href: string) {
  if (!isClient) {
    return;
  }

  const element = resolveTargetElement(href);
  if (!element) {
    return;
  }

  const container = getCurrentContainer();
  if (!container) {
    return;
  }

  const offsetTop = props.targetOffset ?? props.offsetTop;
  const top = getContainerScrollTop(container) + getElementOffsetTop(element, container) - offsetTop;

  setActiveHref(href);
  isAnimating.value = true;

  if (animationTimer.value) {
    window.clearTimeout(animationTimer.value);
  }

  scrollContainerTo(container, top);

  animationTimer.value = window.setTimeout(() => {
    isAnimating.value = false;
    handleScroll();
  }, 300);

  if (href.startsWith('#')) {
    const method = props.replace ? 'replaceState' : 'pushState';
    window.history[method](null, '', href);
  }
}

function registerLink(href: string) {
  if (registeredLinks.value.includes(href)) {
    return;
  }

  registeredLinks.value = [...registeredLinks.value, href];
}

function unregisterLink(href: string) {
  registeredLinks.value = registeredLinks.value.filter(link => link !== href);
}

provideAnchorRootContext({
  activeHref,
  onLinkClick: (event, payload) => {
    emit('itemSelect', event, payload);
  },
  registerLink,
  scrollTo,
  unregisterLink,
  ...transformPropsToContext(props, ['dir'])
});

watch(
  () => [registeredLinks.value, props.getContainer?.()] as const,
  (_, __, onCleanup) => {
    const container = getCurrentContainer();
    if (!container) {
      return;
    }

    handleScroll();
    container.addEventListener('scroll', handleScroll, { passive: true });

    onCleanup(() => {
      container.removeEventListener('scroll', handleScroll);
    });
  },
  {
    deep: true,
    immediate: true
  }
);

onBeforeUnmount(() => {
  if (isClient && animationTimer.value) {
    window.clearTimeout(animationTimer.value);
  }
});
</script>

<template>
  <nav v-bind="forwardedProps" :class="cls" :dir="dir" :data-orientation="orientation" aria-label="Anchor">
    <slot :model-value="activeHref" />
  </nav>
</template>
