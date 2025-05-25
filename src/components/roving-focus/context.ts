import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue';
import { getFocusIntent, isElementHasAttribute, isNullish, tryFocusFirst, wrapArray } from '../../shared';
import type { EmitsToHookProps, PropsToContext } from '../../types';
import { useCollection, useContext, useControllableState, useDirection } from '../../composables';
import type { RovingFocusGroupEmits, RovingFocusGroupProps, RovingFocusItemProps } from './types';

type RovingFocusGroupContextParams = PropsToContext<Omit<RovingFocusGroupProps, 'class' | 'as'>> &
  EmitsToHookProps<RovingFocusGroupEmits>;

type RovingFocusItemOptions = Partial<PropsToContext<Omit<RovingFocusItemProps, 'class' | 'as'>>>;

const ON_ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus';
const ROVING_FOCUS_EVENT_OPTIONS = { bubbles: false, cancelable: true };

const { provideCollectionContext, useCollectionContext, useCollectionItem } = useCollection('RovingFocusGroup');

const [provideRovingFocusGroupContext, useRovingFocusGroupContext] = useContext(
  'RovingFocusGroup',
  (params: RovingFocusGroupContextParams) => {
    const { collectionProps, getCollectionElements } = provideCollectionContext();

    const {
      loop,
      orientation,
      defaultCurrentTabStopId,
      preventScrollOnEntryFocus,
      onEntryFocus,
      onUpdateCurrentTabStopId
    } = params;

    const dir = useDirection(params.dir);

    const currentTabStopId = useControllableState(
      () => params.currentTabStopId.value,
      onUpdateCurrentTabStopId,
      defaultCurrentTabStopId.value
    );

    const onItemFocus = (tabStopId: string) => {
      currentTabStopId.value = tabStopId;
    };

    const isTabbingBackOut = ref(false);
    const isClickFocus = ref(false);

    const onItemShiftTab = () => {
      isTabbingBackOut.value = true;
    };

    const focusableItemsCount = ref(0);

    const onFocusableItemAdd = () => {
      focusableItemsCount.value++;
    };
    const onFocusableItemRemove = () => {
      focusableItemsCount.value--;
    };

    const onFocus = (event: FocusEvent) => {
      // We normally wouldn't need this check, because we already check
      // that the focus is on the current target and not bubbling to it.
      // We do this because Safari doesn't focus buttons when clicked, and
      // instead, the wrapper will get focused and not through a bubbling event.
      const isKeyboardFocus = !isClickFocus.value;

      if (!event.currentTarget || event.target !== event.currentTarget || !isKeyboardFocus || isTabbingBackOut.value) {
        isClickFocus.value = false;

        return;
      }

      const entryFocusEvent = new CustomEvent(ON_ENTRY_FOCUS, ROVING_FOCUS_EVENT_OPTIONS);
      event.currentTarget.dispatchEvent(entryFocusEvent);
      onEntryFocus?.(entryFocusEvent);

      if (entryFocusEvent.defaultPrevented) return;

      const items = getCollectionElements();
      const activeItem = items.find(item => isElementHasAttribute(item, 'active'));
      const currentItem = items.find(item => item.id === currentTabStopId.value);
      const candidateItems = [activeItem, currentItem, ...items].filter(Boolean) as HTMLElement[];

      tryFocusFirst(candidateItems, preventScrollOnEntryFocus.value);
    };

    const rovingFocusGroupProps = computed(() => {
      return {
        ...collectionProps,
        tabindex: isTabbingBackOut.value || focusableItemsCount.value === 0 ? '-1' : '0',
        dataOrientation: orientation.value,
        dir: dir.value,
        style: 'outline: none'
      };
    });

    const rovingFocusGroupEvents = {
      mousedown: () => {
        isClickFocus.value = true;
      },
      mouseup: () => {
        // reset `isClickFocus` after 1 tick because handleFocus might not triggered due to focused element
        setTimeout(() => {
          isClickFocus.value = false;
        }, 1);
      },
      focus: onFocus,
      blur: () => {
        isTabbingBackOut.value = false;
      }
    };

    return {
      loop,
      dir,
      orientation,
      currentTabStopId,
      onItemFocus,
      onItemShiftTab,
      onFocusableItemAdd,
      onFocusableItemRemove,
      rovingFocusGroupProps,
      rovingFocusGroupEvents
    };
  }
);

function useRovingFocusItem(options: RovingFocusItemOptions = {}) {
  const { getCollectionElements } = useCollectionContext('RovingFocusItem');
  const { collectionItemProps } = useCollectionItem();
  const {
    currentTabStopId,
    orientation,
    dir,
    loop,
    onItemFocus,
    onItemShiftTab,
    onFocusableItemAdd,
    onFocusableItemRemove
  } = useRovingFocusGroupContext('RovingFocusItem');

  const { active, allowShiftKey } = options;

  const tabStopId = computed(() => options.tabStopId?.value ?? useId());
  const focusable = computed(() => options.focusable?.value ?? true);

  const isCurrentTabStop = computed(() => currentTabStopId.value === tabStopId.value);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab' && event.shiftKey) {
      onItemShiftTab();
      return;
    }

    if (event.target !== event.currentTarget) return;

    const focusIntent = getFocusIntent(event, orientation.value, dir.value);

    if (isNullish(focusIntent)) return;

    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (!allowShiftKey?.value && event.shiftKey) return;

    event.preventDefault();

    let candidateNodes = getCollectionElements();
    if (focusIntent === 'last') {
      candidateNodes.reverse();
    }

    if (focusIntent === 'prev' || focusIntent === 'next') {
      if (focusIntent === 'prev') {
        candidateNodes.reverse();
      }

      const currentIndex = candidateNodes.indexOf(event.currentTarget as HTMLElement);

      candidateNodes = loop.value
        ? wrapArray(candidateNodes, currentIndex + 1)
        : candidateNodes.slice(currentIndex + 1);
    }

    nextTick(() => {
      tryFocusFirst(candidateNodes);
    });
  };

  const rovingFocusItemProps = computed(() => {
    return {
      ...collectionItemProps,
      tabindex: isCurrentTabStop.value ? '0' : '-1',
      dataOrientation: orientation.value,
      dataActive: active?.value ? '' : undefined,
      dataDisabled: !focusable.value ? '' : undefined
    };
  });

  const rovingFocusItemEvents = {
    mousedown: (event: MouseEvent) => {
      // We prevent focusing non-focusable items on `mousedown`.
      // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
      if (!focusable.value) {
        event.preventDefault();
      } else {
        // Safari doesn't focus a button when clicked so we run our logic on mousedown also
        onItemFocus(tabStopId.value);
      }
    },
    focus: () => {
      onItemFocus(tabStopId.value);
    },
    keydown: onKeyDown
  };

  onMounted(() => {
    onFocusableItemAdd();
  });

  onBeforeUnmount(() => {
    onFocusableItemRemove();
  });

  return {
    rovingFocusItemProps,
    rovingFocusItemEvents
  };
}

export { provideRovingFocusGroupContext, useRovingFocusItem };
