import { computed, nextTick, onUnmounted, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { isClient } from '@vueuse/shared';
import { useStateMachine } from './use-state-machine';

export function usePresence(present: Ref<boolean>, node: Ref<HTMLElement | undefined>) {
  const stylesRef = ref<CSSStyleDeclaration>({} as any);
  const prevAnimationNameRef = ref<string>('none');
  const initialState = present.value ? 'mounted' : 'unmounted';

  const { state, dispatch } = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: 'unmounted',
      ANIMATION_OUT: 'unmountSuspended'
    },
    unmountSuspended: {
      MOUNT: 'mounted',
      ANIMATION_END: 'unmounted'
    },
    unmounted: {
      MOUNT: 'mounted'
    }
  });

  function handleOnStateChange() {
    const currentAnimationName = getAnimationName(node.value);
    prevAnimationNameRef.value = state.value === 'mounted' ? currentAnimationName : 'none';
  }

  const isPresent = computed(() => ['mounted', 'unmountSuspended'].includes(state.value));

  function dispatchCustomEvent(name: 'enter' | 'after-enter' | 'leave' | 'after-leave') {
    if (!isClient) return;

    // We only dispatch this event because CustomEvent is not available in Node18
    // https://github.com/unovue/reka-ui/issues/930
    const customEvent = new CustomEvent(name, { bubbles: false, cancelable: false });
    node.value?.dispatchEvent(customEvent);
  }

  function getAnimationName(element?: HTMLElement) {
    return element ? getComputedStyle(element).animationName || 'none' : 'none';
  }

  async function handleOnPresentChange(currentPresent: boolean, prevPresent?: boolean) {
    const hasPresentChanged = prevPresent !== currentPresent;
    await nextTick();
    if (!hasPresentChanged) return;

    const prevAnimationName = prevAnimationNameRef.value;
    const currentAnimationName = getAnimationName(node.value);

    if (currentPresent) {
      dispatch('MOUNT');
      dispatchCustomEvent('enter');
      if (currentAnimationName === 'none') dispatchCustomEvent('after-enter');
    } else if (currentAnimationName === 'none' || stylesRef.value?.display === 'none') {
      // If there is no exit animation or the element is hidden, animations won't run
      // so we unmount instantly rv
      dispatch('UNMOUNT');
      dispatchCustomEvent('leave');
      dispatchCustomEvent('after-leave');
    } else {
      /**
       * When `present` changes to `false`, we check changes to animation-name to determine whether an animation has
       * started. We chose this approach (reading computed styles) because there is no `animationrun` event and
       * `animationstart` fires after `animation-delay` has expired which would be too late.
       */
      const isAnimating = prevAnimationName !== currentAnimationName;
      if (prevPresent && isAnimating) {
        dispatch('ANIMATION_OUT');
        dispatchCustomEvent('leave');
      } else {
        dispatch('UNMOUNT');
        dispatchCustomEvent('after-leave');
      }
    }
  }

  function handleAnimationStart(event: AnimationEvent) {
    if (event.target !== node.value) return;

    // if animation occurred, store its name as the previous animation.
    prevAnimationNameRef.value = getAnimationName(node.value);
  }

  /**
   * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel` event for ANIMATION_IN after we
   * have entered `unmountSuspended` state. So, we make sure we only trigger ANIMATION_END for the currently active
   * animation.
   */
  function handleAnimationEnd(event: AnimationEvent) {
    const currentAnimationName = getAnimationName(node.value);
    const isCurrentAnimation = currentAnimationName.includes(event.animationName);
    const directionName = state.value === 'mounted' ? 'enter' : 'leave';

    if (event.target === node.value && isCurrentAnimation) {
      dispatchCustomEvent(`after-${directionName}`);
      dispatch('ANIMATION_END');
    }

    // if no animation, immediately trigger 'ANIMATION_END'
    if (event.target === node.value && currentAnimationName === 'none') {
      dispatch('ANIMATION_END');
    }
  }

  function handleOnNodeChange(newNode: HTMLElement | undefined, oldNode: HTMLElement | undefined) {
    if (newNode) {
      stylesRef.value = getComputedStyle(newNode);
      newNode.addEventListener('animationstart', handleAnimationStart);
      newNode.addEventListener('animationcancel', handleAnimationEnd);
      newNode.addEventListener('animationend', handleAnimationEnd);
    } else {
      // Transition to the unmounted state if the node is removed prematurely.
      // We avoid doing so during cleanup as the node may change but still exist.
      dispatch('ANIMATION_END');

      oldNode?.removeEventListener('animationstart', handleAnimationStart);
      oldNode?.removeEventListener('animationcancel', handleAnimationEnd);
      oldNode?.removeEventListener('animationend', handleAnimationEnd);
    }
  }

  const stateWatcher = watch(state, handleOnStateChange);

  const presentWatcher = watch(
    present,
    async (currentPresent, prevPresent) => {
      handleOnPresentChange(currentPresent, prevPresent);
    },
    { immediate: true }
  );

  const nodeWatcher = watch(
    node,
    (newNode, oldNode) => {
      handleOnNodeChange(newNode, oldNode);
    },
    { immediate: true }
  );

  onUnmounted(() => {
    nodeWatcher();
    stateWatcher();
    presentWatcher();
  });

  return {
    isPresent
  };
}
