import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { ShallowRef, Ref } from 'vue';
import type { Side } from '../../types';
import { TRANSITIONS, VELOCITY_THRESHOLD, isVertical, set } from './shared';
import type { DrawerSnapPoint } from './types';

interface UseSnapPointsProps {
  snapPoint: Ref<DrawerSnapPoint | null | undefined>;
  snapPoints: Ref<DrawerSnapPoint[] | undefined>;
  snapToSequentialPoints: Ref<boolean>;
  fadeFromIndex: Ref<number | undefined>;
  drawerRef: ShallowRef<HTMLElement | null | undefined>;
  overlayRef: ShallowRef<HTMLElement | null | undefined>;
  onSnapPointChange: (snapPointIndex: number, snapPointsOffset: number[]) => void;
  side: Ref<Side>;
}

export function useSnapPoints({
  snapPoint,
  snapPoints,
  snapToSequentialPoints,
  drawerRef,
  overlayRef,
  fadeFromIndex,
  onSnapPointChange,
  side
}: UseSnapPointsProps) {
  const windowDimensions = ref(
    typeof window !== 'undefined'
      ? {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight
        }
      : undefined
  );

  function onResize() {
    windowDimensions.value = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    };
  }

  onMounted(() => {
    if (typeof window !== 'undefined') window.addEventListener('resize', onResize);
  });

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') window.removeEventListener('resize', onResize);
  });

  const isLastSnapPoint = computed(
    () => (snapPoints.value && snapPoint.value === snapPoints.value[snapPoints.value.length - 1]) ?? null
  );

  const shouldFade = computed(
    () =>
      (snapPoints.value &&
        snapPoints.value.length > 0 &&
        (fadeFromIndex?.value || fadeFromIndex?.value === 0) &&
        !Number.isNaN(fadeFromIndex?.value) &&
        snapPoints.value[fadeFromIndex?.value ?? -1] === snapPoint.value) ||
      !snapPoints.value
  );

  const snapPointIndex = computed(() => snapPoints.value?.findIndex(point => point === snapPoint.value) ?? null);

  const snapPointsOffset = computed(
    () =>
      snapPoints.value?.map(point => {
        const isPx = typeof point === 'string';
        let snapPointAsNumber = 0;

        if (isPx) {
          snapPointAsNumber = Number.parseInt(point, 10);
        }

        if (isVertical(side.value)) {
          let height = snapPointAsNumber;
          if (!isPx) {
            height = windowDimensions.value ? point * windowDimensions.value.innerHeight : 0;
          }

          if (windowDimensions.value)
            return side.value === 'bottom'
              ? windowDimensions.value.innerHeight - height
              : -windowDimensions.value.innerHeight + height;

          return height;
        }

        let width = snapPointAsNumber;
        if (!isPx) {
          width = windowDimensions.value ? point * windowDimensions.value.innerWidth : 0;
        }

        if (windowDimensions.value)
          return side.value === 'right'
            ? windowDimensions.value.innerWidth - width
            : -windowDimensions.value.innerWidth + width;

        return width;
      }) ?? []
  );

  const snapPointOffset = computed(() =>
    snapPointIndex.value !== null ? snapPointsOffset.value?.[snapPointIndex.value] : null
  );

  const snapToPoint = (dimension: number) => {
    const newSnapPointIndex = snapPointsOffset.value?.findIndex(snapPointDim => snapPointDim === dimension) ?? null;

    // nextTick to allow el to be mounted before setting it.
    nextTick(() => {
      onSnapPointChange(newSnapPointIndex, snapPointsOffset.value);
      set(drawerRef.value, {
        transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
        transform: isVertical(side.value) ? `translate3d(0, ${dimension}px, 0)` : `translate3d(${dimension}px, 0, 0)`
      });
    });

    if (
      snapPointsOffset.value &&
      newSnapPointIndex !== snapPointsOffset.value.length - 1 &&
      newSnapPointIndex !== fadeFromIndex?.value
    ) {
      set(overlayRef.value, {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
        opacity: '0'
      });
    } else {
      set(overlayRef.value, {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
        opacity: '1'
      });
    }

    snapPoint.value = newSnapPointIndex !== null ? (snapPoints.value?.[newSnapPointIndex] ?? null) : null;
  };

  watch(
    [snapPoint, snapPointsOffset, snapPoints],
    () => {
      if (snapPoint.value !== null && snapPoint.value !== undefined) {
        const newIndex = snapPoints.value?.findIndex(point => point === snapPoint.value) ?? -1;

        if (snapPointsOffset.value && newIndex !== -1 && typeof snapPointsOffset.value[newIndex] === 'number')
          snapToPoint(snapPointsOffset.value[newIndex]);
      }
    },
    {
      immediate: true // if you want to run the effect immediately as well
    }
  );

  function handleVelocitySnap(velocity: number, hasDraggedUp: boolean, dismissible: boolean, closeDrawer: () => void) {
    if (velocity > 2 && !hasDraggedUp) {
      if (dismissible) closeDrawer();
      else snapToPoint(snapPointsOffset.value[0]);
      return true;
    }

    if (velocity > 2 && hasDraggedUp && snapPointsOffset && snapPoints.value) {
      snapToPoint(snapPointsOffset.value[snapPoints.value.length - 1] as number);
      return true;
    }
    return false;
  }

  function handleNormalSnap(params: {
    currentPosition: number;
    velocity: number;
    draggedDistance: number;
    isFirst: boolean;
    hasDraggedUp: boolean;
    dismissible: boolean;
    closeDrawer: () => void;
  }) {
    const { currentPosition, velocity, draggedDistance, isFirst, hasDraggedUp, dismissible, closeDrawer } = params;
    const closestSnapPoint = snapPointsOffset.value?.reduce((prev, curr) => {
      return Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev;
    });

    const dim = isVertical(side.value) ? window.innerHeight : window.innerWidth;
    if (velocity > VELOCITY_THRESHOLD && Math.abs(draggedDistance) < dim * 0.4) {
      const dragDirection = hasDraggedUp ? 1 : -1;
      if (dragDirection > 0 && isLastSnapPoint.value) {
        snapToPoint(snapPointsOffset.value[(snapPoints.value?.length ?? 0) - 1]);
        return;
      }
      if (isFirst && dragDirection < 0 && dismissible) closeDrawer();
      if (snapPointIndex.value === null) return;
      snapToPoint(snapPointsOffset.value[snapPointIndex.value + dragDirection]);
      return;
    }

    // `snapToSequentialPoints` walks one level at a time instead of jumping to the nearest point.
    if (snapToSequentialPoints.value && snapPointIndex.value !== null) {
      const step = hasDraggedUp ? 1 : -1;
      const lastIndex = (snapPoints.value?.length ?? 1) - 1;
      const nextIndex = Math.min(Math.max(snapPointIndex.value + step, 0), lastIndex);

      if (nextIndex !== snapPointIndex.value) {
        snapToPoint(snapPointsOffset.value[nextIndex]);
        return;
      }
    }

    snapToPoint(closestSnapPoint);
  }

  function onRelease({
    draggedDistance,
    closeDrawer,
    velocity,
    dismissible
  }: {
    draggedDistance: number;
    closeDrawer: () => void;
    velocity: number;
    dismissible: boolean;
  }) {
    if (fadeFromIndex === undefined) return;

    const currentPosition =
      side.value === 'bottom' || side.value === 'right'
        ? (snapPointOffset.value ?? 0) - draggedDistance
        : (snapPointOffset.value ?? 0) + draggedDistance;
    const isOverlaySnapPoint = snapPointIndex.value === (fadeFromIndex.value ?? 0) - 1;
    const isFirst = snapPointIndex.value === 0;
    const hasDraggedUp = draggedDistance > 0;

    if (isOverlaySnapPoint) {
      set(overlayRef.value, {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`
      });
    }

    if (handleVelocitySnap(velocity, hasDraggedUp, dismissible, closeDrawer)) return;

    handleNormalSnap({ currentPosition, velocity, draggedDistance, isFirst, hasDraggedUp, dismissible, closeDrawer });
  }

  function onDrag({ draggedDistance }: { draggedDistance: number }) {
    if (snapPointOffset.value === null) return;
    const newValue =
      side.value === 'bottom' || side.value === 'right'
        ? (snapPointOffset.value ?? 0) - draggedDistance
        : (snapPointOffset.value ?? 0) + draggedDistance;

    // Don't do anything if we exceed the last(biggest) snap point
    if (
      (side.value === 'bottom' || side.value === 'right') &&
      newValue < snapPointsOffset.value[snapPointsOffset.value.length - 1]
    )
      return;

    if (
      (side.value === 'top' || side.value === 'left') &&
      newValue > snapPointsOffset.value[snapPointsOffset.value.length - 1]
    )
      return;

    set(drawerRef.value, {
      transform: isVertical(side.value) ? `translate3d(0, ${newValue}px, 0)` : `translate3d(${newValue}px, 0, 0)`
    });
  }

  function getPercentageDragged(absDraggedDistance: number, isDraggingDown: boolean) {
    if (
      !snapPoints ||
      typeof snapPointIndex.value !== 'number' ||
      !snapPointsOffset.value ||
      fadeFromIndex === undefined
    )
      return null;

    // If this is true we are dragging to a snap point that is supposed to have an overlay
    const isOverlaySnapPoint = snapPointIndex.value === (fadeFromIndex.value ?? 0) - 1;
    const isOverlaySnapPointOrHigher = snapPointIndex.value >= (fadeFromIndex.value ?? 0);

    if (isOverlaySnapPointOrHigher && isDraggingDown) return 0;

    // Don't animate, but still use this one if we are dragging away from the overlaySnapPoint
    if (isOverlaySnapPoint && !isDraggingDown) return 1;
    if (!shouldFade.value && !isOverlaySnapPoint) return null;

    // Either fadeFrom index or the one before
    const targetSnapPointIndex = isOverlaySnapPoint ? snapPointIndex.value + 1 : snapPointIndex.value - 1;

    // Get the distance from overlaySnapPoint to the one before or vice-versa to calculate the opacity percentage accordingly
    const snapPointDistance = isOverlaySnapPoint
      ? snapPointsOffset.value[targetSnapPointIndex] - snapPointsOffset.value[targetSnapPointIndex - 1]
      : snapPointsOffset.value[targetSnapPointIndex + 1] - snapPointsOffset.value[targetSnapPointIndex];

    const percentageDragged = absDraggedDistance / Math.abs(snapPointDistance);

    if (isOverlaySnapPoint) return 1 - percentageDragged;
    return percentageDragged;
  }

  return {
    isLastSnapPoint,
    shouldFade,
    getPercentageDragged,
    snapPointIndex,
    onRelease,
    onDrag,
    snapPointsOffset
  };
}
