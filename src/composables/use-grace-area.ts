import { onWatcherCleanup, ref, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { refAutoReset } from '@vueuse/core';
import {
  getExitSideFromRect,
  getHull,
  getPaddedExitPoints,
  getPointsFromRect,
  isClient,
  isPointInPolygon
} from '../shared';
import { GRACE_AREA_TRIGGER_ATTR } from '../constants';
import type { Point, Polygon } from '../types';

export interface UseGraceAreaOptions {
  /** 触发元素的响应式引用 */
  triggerElement: ShallowRef<HTMLElement | undefined>;
  /** 内容元素的响应式引用 */
  contentElement: ShallowRef<HTMLElement | undefined>;
  /** 指针在过渡状态变化时的回调函数 */
  onPointerInTransitChange?: (v: boolean) => void;
  /** 指针退出 grace area 时的回调函数 */
  onPointerExit: () => void;
  /** 是否禁用 grace area 功能 */
  disabled?: ShallowRef<boolean | undefined>;
  /** 二级区域的 DOM 属性名，用于识别子区域元素 */
  subAreaAttribute?: string;
  /** 进入二级区域时的回调函数 */
  onSubAreaEnter?: (subArea: HTMLElement) => void;
  /** 离开二级区域时的回调函数 */
  onSubAreaExit?: (subArea: HTMLElement) => void;
}

/**
 * 使用 Grace Area 组合函数，用于创建智能的悬浮区域管理
 *
 * Grace Area 是一个几何区域，允许用户在从触发器移动到内容区域时
 * 不会意外关闭悬浮内容。现已支持二级区域功能。
 *
 * @param options - 配置选项
 *
 * 功能特性：
 * - 自动创建从触发器到内容区域的安全过渡区域
 * - 支持二级悬浮区域的检测和管理
 * - 智能的指针跟踪和状态管理
 * - 自动清理和性能优化
 */
export function useGraceArea(options: UseGraceAreaOptions) {
  const {
    triggerElement,
    contentElement,
    onPointerInTransitChange,
    onPointerExit,
    disabled,
    subAreaAttribute,
    onSubAreaEnter,
    onSubAreaExit
  } = options;

  // Reset the inTransit state if idle/scrolled.
  const isPointerInTransit = refAutoReset(false, 300);
  const pointerGraceArea = ref<Polygon>();
  const currentSubArea = ref<HTMLElement>();

  const cleanupGraceArea = () => {
    pointerGraceArea.value = undefined;
    currentSubArea.value = undefined;
    onPointerInTransitChange?.(false);
  };

  // Element reference change listener
  watchEffect(() => {
    if (!isClient || disabled?.value === true) {
      return;
    }

    const trigger = triggerElement.value;
    const content = contentElement.value;

    if (!trigger || !content) {
      return;
    }

    // Conditional function creation, only create when needed
    function createGraceAreaSafely(event: PointerEvent, hoverTarget: HTMLElement) {
      const { currentTarget, clientX: x, clientY: y } = event;
      if (!(currentTarget instanceof HTMLElement)) return;

      const exitPoint: Point = { x, y };
      const graceArea = createGraceAreaGeometry(exitPoint, currentTarget, hoverTarget);

      pointerGraceArea.value = graceArea;
      isPointerInTransit.value = true;
    }

    // Handle sub-area detection and grace area creation
    function handleSubAreaInteraction(event: PointerEvent) {
      if (!subAreaAttribute) return;

      const target = event.target as HTMLElement;
      const subArea = target.closest(`[${subAreaAttribute}]`) as HTMLElement;

      if (subArea && contentElement.value?.contains(subArea)) {
        // 进入二级区域
        if (currentSubArea.value !== subArea) {
          if (currentSubArea.value) {
            onSubAreaExit?.(currentSubArea.value);
          }
          currentSubArea.value = subArea;
          onSubAreaEnter?.(subArea);

          // 为二级区域创建 grace area
          const { clientX: x, clientY: y } = event;
          const exitPoint: Point = { x, y };
          const graceArea = createGraceAreaGeometry(exitPoint, trigger!, subArea);

          pointerGraceArea.value = graceArea;
          isPointerInTransit.value = true;
        }
      } else if (currentSubArea.value) {
        // 离开二级区域
        onSubAreaExit?.(currentSubArea.value);
        currentSubArea.value = undefined;
      }
    }

    // Setup event listeners with consistent pattern
    const handleTriggerLeave = (event: PointerEvent) => createGraceAreaSafely(event, content);
    const handleContentLeave = (event: PointerEvent) => createGraceAreaSafely(event, trigger);
    const handleSubContentMove = (event: PointerEvent) => handleSubAreaInteraction(event);

    trigger.addEventListener('pointerleave', handleTriggerLeave);
    content.addEventListener('pointerleave', handleContentLeave);

    // 监听内容区域的鼠标移动以处理二级区域
    if (subAreaAttribute) {
      content.addEventListener('pointermove', handleSubContentMove);
    }

    onWatcherCleanup(() => {
      trigger.removeEventListener('pointerleave', handleTriggerLeave);
      content.removeEventListener('pointerleave', handleContentLeave);
      if (subAreaAttribute) {
        content.removeEventListener('pointermove', handleSubContentMove);
      }
    });
  });

  // Grace area tracking listener
  watchEffect(() => {
    if (!isClient || disabled?.value === true || !pointerGraceArea.value) {
      return;
    }

    // Conditional creation of tracking function
    const trackPointerGrace = (event: PointerEvent) => {
      if (!pointerGraceArea.value) return;

      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const { clientX: x, clientY: y } = event;
      const hasEnteredTarget = triggerElement.value?.contains(target) || contentElement.value?.contains(target);

      // 检查是否进入了二级区域
      const hasEnteredSubArea =
        subAreaAttribute && target.closest(`[${subAreaAttribute}]`) && contentElement.value?.contains(target);

      if (hasEnteredTarget || hasEnteredSubArea) {
        // 如果进入了主要目标区域或二级区域，清理当前的 grace area
        if (hasEnteredTarget) {
          cleanupGraceArea();
        }
        return;
      }

      const pointerPosition: Point = { x, y };
      const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea.value);
      const isAnotherGraceAreaTrigger = Boolean(target.closest(`[${GRACE_AREA_TRIGGER_ATTR}]`));

      // 检查是否离开了所有相关区域（包括二级区域）
      const isOutsideAllAreas =
        !triggerElement.value?.contains(target) &&
        !contentElement.value?.contains(target) &&
        !(subAreaAttribute && target.closest(`[${subAreaAttribute}]`));

      if ((isPointerOutsideGraceArea && isOutsideAllAreas) || isAnotherGraceAreaTrigger) {
        cleanupGraceArea();
        onPointerExit();
      }
    };

    triggerElement.value?.ownerDocument.addEventListener('pointermove', trackPointerGrace);

    onWatcherCleanup(() => {
      triggerElement.value?.ownerDocument.removeEventListener('pointermove', trackPointerGrace);
    });
  });

  watchEffect(() => {
    const updated = isPointerInTransit.value;
    onPointerInTransitChange?.(updated);
  });
}

function createGraceAreaGeometry(exitPoint: Point, currentTarget: HTMLElement, hoverTarget: HTMLElement): Polygon {
  const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
  const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
  const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
  return getHull([...paddedExitPoints, ...hoverTargetPoints]);
}
