<script setup lang="ts">
import { computed, onUnmounted, ref, toRefs, useTemplateRef, watch } from 'vue';
import {
  useArrowNavigation,
  useBodyScrollLock,
  useFocusGuards,
  useForwardExpose,
  useTypeahead
} from '../../composables';
import type { GraceIntent, HorizontalSide } from '../../types';
import { DismissableLayer } from '../dismissable-layer';
import { FocusScope } from '../focus-scope';
import { PopperContent } from '../popper';
import { createPopperContentPropsDefaultValue } from '../popper/shared';
import { RovingFocusGroup } from '../roving-focus';
import { injectMenuContext, injectMenuRootContext, provideMenuContentContext } from './context';
import { FIRST_LAST_KEYS, LAST_KEYS, focusFirst, getOpenState, isMouseEvent, isPointerInGraceArea } from './shared';
import type { MenuContentImplPrivateEmits, MenuContentImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuContentImpl'
});

const props = withDefaults(defineProps<MenuContentImplPropsWithPrimitive>(), createPopperContentPropsDefaultValue());

const emit = defineEmits<MenuContentImplPrivateEmits>();

const { dir, isUsingKeyboardRef } = injectMenuRootContext();
const { open, onContentChange } = injectMenuContext();

const { trapFocus, disableOutsidePointerEvents, loop } = toRefs(props);

useFocusGuards();
useBodyScrollLock(disableOutsidePointerEvents.value);

const searchRef = ref('');
const timerRef = ref(0);
const pointerGraceTimerRef = ref(0);
const pointerGraceIntentRef = ref<GraceIntent | null>(null);
const pointerDirRef = ref<HorizontalSide>('right');
const lastPointerXRef = ref(0);
const currentItemId = ref<string | null>(null);

const rovingFocusGroupRef = useTemplateRef('rovingFocusGroupRef');
const { forwardRef, currentElement: contentElement } = useForwardExpose();
const { handleTypeaheadSearch } = useTypeahead();

const dataState = computed(() => getOpenState(open.value));

function isPointerMovingToSubmenu(event: PointerEvent) {
  const isMovingTowards = pointerDirRef.value === pointerGraceIntentRef.value?.side;

  return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef.value?.area);
}

async function onMountAutoFocus(event: Event) {
  emit('openAutoFocus', event);
  if (event.defaultPrevented) return;
  // when opening, explicitly focus the content area only and leave
  // `onEntryFocus` in  control of focusing first item
  event.preventDefault();
  contentElement.value?.focus({
    preventScroll: true
  });
}

function onKeyDown(event: KeyboardEvent) {
  if (event.defaultPrevented) return;
  // submenu key events bubble through portals. We only care about keys in this menu.
  const target = event.target as HTMLElement;
  const isKeyDownInside = target.closest('[data-soybean-menu-content]') === event.currentTarget;
  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
  const isCharacterKey = event.key.length === 1;

  const el = useArrowNavigation(event, document.activeElement as HTMLElement, contentElement.value, {
    loop: loop.value,
    arrowKeyOptions: 'vertical',
    dir: dir.value,
    focus: true,
    attributeName: '[data-soybean-collection-item]:not([data-disabled])'
  });
  if (el) return el?.focus();

  // prevent "Space" taken account into handleTypeahead
  if (event.code === 'Space') return;

  const collectionItems = rovingFocusGroupRef.value?.getItems() ?? [];

  if (isKeyDownInside) {
    // menus should not be navigated using tab key so we prevent it
    if (event.key === 'Tab') event.preventDefault();
    if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key, collectionItems);
  }

  // focus first/last item based on key pressed
  if (event.target !== contentElement.value) return;
  if (!FIRST_LAST_KEYS.includes(event.key)) return;
  event.preventDefault();
  const candidateNodes = [...collectionItems.map(item => item.ref)];
  if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
  focusFirst(candidateNodes);
}

function onBlur(event: FocusEvent) {
  // clear search buffer when leaving the menu
  // @ts-expect-error the provided currentTarget and target should be HTMLElement
  if (!event?.currentTarget?.contains?.(event.target)) {
    window.clearTimeout(timerRef.value);
    searchRef.value = '';
  }
}

function onPointerMove(event: PointerEvent) {
  if (!isMouseEvent(event)) return;
  const target = event.target as HTMLElement;
  const pointerXHasChanged = lastPointerXRef.value !== event.clientX;

  // We don't use `event.movementX` for this check because Safari will
  // always return `0` on a pointer event.
  if ((event?.currentTarget as HTMLElement)?.contains(target) && pointerXHasChanged) {
    const newDir = event.clientX > lastPointerXRef.value ? 'right' : 'left';
    pointerDirRef.value = newDir;
    lastPointerXRef.value = event.clientX;
  }
}

function onEntryFocus(event: Event) {
  emit('entryFocus', event);
  // only focus first item when using keyboard
  if (!isUsingKeyboardRef.value) event.preventDefault();
}

watch(contentElement, el => {
  onContentChange(el);
});

onUnmounted(() => {
  window.clearTimeout(timerRef.value);
});

provideMenuContentContext({
  onItemEnter: event => {
    // event.preventDefault() we can't prevent pointerMove event
    return isPointerMovingToSubmenu(event);
  },
  onItemLeave: event => {
    if (isPointerMovingToSubmenu(event)) return;
    contentElement.value?.focus();
    currentItemId.value = null;
  },
  onTriggerLeave: event => {
    // event.preventDefault() we can't prevent pointerLeave event
    return isPointerMovingToSubmenu(event);
  },
  searchRef,
  pointerGraceTimerRef,
  onPointerGraceIntentChange: intent => {
    pointerGraceIntentRef.value = intent;
  }
});
</script>

<template>
  <FocusScope
    as-child
    :trapped="trapFocus"
    @mount-auto-focus="onMountAutoFocus"
    @unmount-auto-focus="emit('closeAutoFocus', $event)"
  >
    <DismissableLayer
      as-child
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @escape-key-down="emit('escapeKeyDown', $event)"
      @pointer-down-outside="emit('pointerDownOutside', $event)"
      @focus-outside="emit('focusOutside', $event)"
      @interact-outside="emit('interactOutside', $event)"
      @dismiss="emit('dismiss')"
    >
      <RovingFocusGroup
        ref="rovingFocusGroupRef"
        v-model:current-tab-stop-id="currentItemId"
        as-child
        orientation="vertical"
        :dir="dir"
        :loop="loop"
        @entry-focus="onEntryFocus"
      >
        <PopperContent
          :ref="forwardRef"
          role="menu"
          :class="props.class"
          :as="as"
          :as-child="asChild"
          aria-orientation="vertical"
          data-soybean-menu-content
          :data-state="dataState"
          :dir="dir"
          :side="side"
          :side-offset="sideOffset"
          :align="align"
          :align-offset="alignOffset"
          :avoid-collisions="avoidCollisions"
          :collision-boundary="collisionBoundary"
          :collision-padding="collisionPadding"
          :arrow-padding="arrowPadding"
          :position-strategy="positionStrategy"
          :prioritize-position="prioritizePosition"
          :reference="reference"
          :sticky="sticky"
          :hide-when-detached="hideWhenDetached"
          :update-position-strategy="updatePositionStrategy"
          @keydown="onKeyDown"
          @blur="onBlur"
          @pointermove="onPointerMove"
        >
          <slot />
        </PopperContent>
      </RovingFocusGroup>
    </DismissableLayer>
  </FocusScope>
</template>
