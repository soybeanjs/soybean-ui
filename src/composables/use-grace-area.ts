import { nextTick, onBeforeUnmount, shallowRef, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { GRACE_AREA_TRIGGER_ATTR } from '../constants';
import type { Point, Polygon } from '../types';
import {
  createDebounce,
  getExitSideFromRect,
  getHull,
  getPaddedExitPoints,
  getPointsFromRect,
  isClient,
  isPointInPolygon
} from '../shared';

export interface UseGraceAreaOptions {
  triggerElement: ShallowRef<HTMLElement | undefined>;
  contentElement: ShallowRef<HTMLElement | undefined>;
  onPointerInTransitChange?: (v: boolean) => void;
  onPointerExit: () => void;
  disabled?: ShallowRef<boolean | undefined>;
  /** 防抖延迟时间（毫秒），默认16ms（约60fps） */
  debounceMs?: number;
  /** 最大grace area检测时间（毫秒），默认1000ms */
  maxGraceTime?: number;
}

export function useGraceArea(options: UseGraceAreaOptions) {
  const {
    triggerElement,
    contentElement,
    onPointerInTransitChange,
    onPointerExit,
    disabled,
    maxGraceTime = 1000
  } = options;

  const pointerGraceArea = shallowRef<Polygon>();
  let graceTimeoutTimer: number | undefined;

  // 延迟创建防抖器，只在需要时创建
  let debounce: ReturnType<typeof createDebounce> | undefined;

  function handleRemoveGraceArea() {
    try {
      pointerGraceArea.value = undefined;
      onPointerInTransitChange?.(false);

      if (graceTimeoutTimer) {
        clearTimeout(graceTimeoutTimer);
        graceTimeoutTimer = undefined;
      }
    } catch {}
  }

  // 元素引用变化监听
  watchEffect(cleanup => {
    const isEnabled = disabled?.value !== true;
    if (!isClient || !isEnabled) {
      return;
    }

    const trigger = triggerElement.value;
    const content = contentElement.value;

    if (!trigger || !content) {
      return;
    }

    // 条件性创建函数，只在需要时创建
    function createGraceAreaSafely(event: PointerEvent, hoverTarget: HTMLElement) {
      try {
        const { currentTarget, clientX: x, clientY: y } = event;
        if (!(currentTarget instanceof HTMLElement)) return;

        const exitPoint: Point = { x, y };
        const graceArea = createGraceAreaGeometry(exitPoint, currentTarget, hoverTarget);

        pointerGraceArea.value = graceArea;
        onPointerInTransitChange?.(true);

        if (graceTimeoutTimer) {
          clearTimeout(graceTimeoutTimer);
        }
        graceTimeoutTimer = window.setTimeout(() => {
          handleRemoveGraceArea();
          onPointerExit();
        }, maxGraceTime);
      } catch {
        handleRemoveGraceArea();
      }
    }

    // 使用箭头函数避免函数声明提升，减少内存占用
    const handleTriggerLeave = (event: PointerEvent) => createGraceAreaSafely(event, content);
    const handleContentLeave = (event: PointerEvent) => createGraceAreaSafely(event, trigger);

    const eventOptions: AddEventListenerOptions = { passive: true };

    trigger.addEventListener('pointerleave', handleTriggerLeave, eventOptions);
    content.addEventListener('pointerleave', handleContentLeave, eventOptions);

    cleanup(() => {
      trigger.removeEventListener('pointerleave', handleTriggerLeave);
      content.removeEventListener('pointerleave', handleContentLeave);
    });
  });

  // Grace area 跟踪监听
  watchEffect(cleanup => {
    const isEnabled = disabled?.value !== true;
    if (!isClient || !isEnabled || !pointerGraceArea.value) {
      return;
    }

    const trigger = triggerElement.value;
    const document = trigger?.ownerDocument;

    if (!document) return;

    // 延迟创建防抖器，只有在真正需要时才创建
    if (!debounce) {
      debounce = createDebounce();
    }

    // 条件性创建跟踪函数
    function trackPointerGrace(event: PointerEvent) {
      if (!pointerGraceArea.value) return;

      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const { clientX: x, clientY: y } = event;
      const currentTrigger = triggerElement.value;
      const currentContent = contentElement.value;

      const hasEnteredTarget =
        (currentTrigger?.contains(target) ?? false) || (currentContent?.contains(target) ?? false);

      if (hasEnteredTarget) {
        handleRemoveGraceArea();
        return;
      }

      try {
        const pointerPosition: Point = { x, y };
        const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea.value);
        const isAnotherGraceAreaTrigger = Boolean(target.closest(`[${GRACE_AREA_TRIGGER_ATTR}]`));

        if (isPointerOutsideGraceArea || isAnotherGraceAreaTrigger) {
          handleRemoveGraceArea();
          nextTick(() => {
            onPointerExit();
          });
        }
      } catch {
        handleRemoveGraceArea();
      }
    }

    const handleTrackPointerGrace = debounce.debounce(trackPointerGrace);
    const eventOptions: AddEventListenerOptions = { passive: true };
    document.addEventListener('pointermove', handleTrackPointerGrace, eventOptions);

    cleanup(() => {
      document.removeEventListener('pointermove', handleTrackPointerGrace);
      debounce?.cancel();
    });
  });

  onBeforeUnmount(() => {
    handleRemoveGraceArea();
    debounce?.cancel();

    if (graceTimeoutTimer) {
      clearTimeout(graceTimeoutTimer);
    }
  });
}

function createGraceAreaGeometry(exitPoint: Point, currentTarget: HTMLElement, hoverTarget: HTMLElement): Polygon {
  const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
  const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
  const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
  return getHull([...paddedExitPoints, ...hoverTargetPoints]);
}
