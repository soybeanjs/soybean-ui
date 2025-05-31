import { arrow, flip, hide, limitShift, offset, shift, size } from '@floating-ui/vue';
import type { Middleware, Placement } from '@floating-ui/vue';
import { isNullish } from '../../shared';
import type { Align, InferDefaults, Side } from '../../types';
import type { PopperContentProps } from './types';

export const popperCssVars = {
  availableWidth: '--soybean-popper-available-width',
  availableHeight: '--soybean-popper-available-height',
  anchorWidth: '--soybean-popper-anchor-width',
  anchorHeight: '--soybean-popper-anchor-height',
  transformOrigin: '--soybean-popper-transform-origin'
};

// 对齐方式到百分比的映射
const ALIGN_TO_PERCENTAGE: Record<Align, string> = {
  start: '0%',
  center: '50%',
  end: '100%'
};

interface TransformOriginParams {
  isArrowHidden: boolean;
  noArrowAlign: string;
  arrowXCenter: number;
  arrowYCenter: number;
  arrowHeight: number;
  floatingWidth: number;
  floatingHeight: number;
}

/** 每个方向的变换原点计算策略 */
interface TransformOriginStrategy {
  getX: (params: TransformOriginParams) => string;
  getY: (params: TransformOriginParams) => string;
}

const TRANSFORM_ORIGIN_STRATEGIES: Record<Side, TransformOriginStrategy> = {
  bottom: {
    getX: ({ isArrowHidden, noArrowAlign, arrowXCenter }) => (isArrowHidden ? noArrowAlign : `${arrowXCenter}px`),
    getY: ({ arrowHeight }) => `${-arrowHeight}px`
  },
  top: {
    getX: ({ isArrowHidden, noArrowAlign, arrowXCenter }) => (isArrowHidden ? noArrowAlign : `${arrowXCenter}px`),
    getY: ({ floatingHeight, arrowHeight }) => `${floatingHeight + arrowHeight}px`
  },
  right: {
    getX: ({ arrowHeight }) => `${-arrowHeight}px`,
    getY: ({ isArrowHidden, noArrowAlign, arrowYCenter }) => (isArrowHidden ? noArrowAlign : `${arrowYCenter}px`)
  },
  left: {
    getX: ({ floatingWidth, arrowHeight }) => `${floatingWidth + arrowHeight}px`,
    getY: ({ isArrowHidden, noArrowAlign, arrowYCenter }) => (isArrowHidden ? noArrowAlign : `${arrowYCenter}px`)
  }
};

/**
 * Transform origin middleware for floating-ui Calculates the transform origin based on arrow position
 *
 * @param options - Arrow dimensions
 * @returns Middleware for floating-ui
 */
export function transformOrigin(options: { arrowWidth: number; arrowHeight: number }): Middleware {
  return {
    name: 'transformOrigin',
    options,
    fn(data) {
      const { placement, rects, middlewareData } = data;

      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;

      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = ALIGN_TO_PERCENTAGE[placedAlign];

      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;

      const strategy = TRANSFORM_ORIGIN_STRATEGIES[placedSide];
      const params: TransformOriginParams = {
        isArrowHidden,
        noArrowAlign,
        arrowXCenter,
        arrowYCenter,
        arrowHeight,
        floatingWidth: rects.floating.width,
        floatingHeight: rects.floating.height
      };

      const x = strategy.getX(params);
      const y = strategy.getY(params);

      return { data: { x, y } };
    }
  };
}

/**
 * Get side and align from floating-ui placement
 *
 * @param placement - The floating-ui placement
 * @returns Tuple of side and align
 */
export function getSideAndAlignFromPlacement(placement: Placement) {
  const [side, align = 'center'] = placement.split('-');
  return [side as Side, align as Align] as const;
}

/**
 * Get placement from side and align
 *
 * @param side - The side
 * @param align - The align
 * @returns The placement
 */
export function getPlacementFromSideAndAlign(side: Side, align: Align) {
  let placement: Placement = side;

  if (align !== 'center') {
    placement += `-${align}`;
  }

  return placement as Placement;
}

export function createPopperContentPropsDefaultValue() {
  const props: InferDefaults<PopperContentProps> = {
    side: 'bottom',
    sideOffset: 0,
    align: 'center',
    alignOffset: 0,
    arrowPadding: 0,
    avoidCollisions: true,
    collisionPadding: 0,
    collisionBoundary: () => [],
    sticky: 'partial',
    hideWhenDetached: false,
    positionStrategy: 'fixed',
    updatePositionStrategy: 'optimized',
    prioritizePosition: false
  };

  return props;
}

export function getFloatingUIMiddleware(
  props: PopperContentProps,
  arrowElement: HTMLElement | null | undefined,
  arrowWidth: number,
  arrowHeight: number
) {
  const detectOverflowOptions = getDetectOverflowOptions(props);

  const middlewares: (Middleware | false | null | undefined)[] = [
    offset({
      mainAxis: (props.sideOffset ?? 0) + arrowHeight,
      alignmentAxis: props.alignOffset
    }),
    props.prioritizePosition &&
      props.avoidCollisions &&
      flip({
        ...detectOverflowOptions
      }),
    props.avoidCollisions &&
      shift({
        mainAxis: true,
        crossAxis: Boolean(props.prioritizePosition),
        limiter: props.sticky === 'partial' ? limitShift() : undefined,
        ...detectOverflowOptions
      }),
    !props.prioritizePosition &&
      props.avoidCollisions &&
      flip({
        ...detectOverflowOptions
      }),
    size({
      ...detectOverflowOptions,
      apply: ({ elements, rects, availableWidth, availableHeight }) => {
        const { width: anchorWidth, height: anchorHeight } = rects.reference;
        const contentStyle = elements.floating.style;
        contentStyle.setProperty(popperCssVars.availableWidth, `${availableWidth}px`);
        contentStyle.setProperty(popperCssVars.availableHeight, `${availableHeight}px`);
        contentStyle.setProperty(popperCssVars.anchorWidth, `${anchorWidth}px`);
        contentStyle.setProperty(popperCssVars.anchorHeight, `${anchorHeight}px`);
      }
    }),
    arrowElement && arrow({ element: arrowElement, padding: props.arrowPadding }),
    transformOrigin({
      arrowWidth,
      arrowHeight
    }),
    props.hideWhenDetached && hide({ strategy: 'referenceHidden', ...detectOverflowOptions })
  ];

  return middlewares.filter(Boolean) as Middleware[];
}

function getDetectOverflowOptions(props: PopperContentProps) {
  const collisionPadding =
    typeof props.collisionPadding === 'number'
      ? props.collisionPadding
      : { top: 0, right: 0, bottom: 0, left: 0, ...props.collisionPadding };

  const boundary = Array.isArray(props.collisionBoundary) ? props.collisionBoundary : [props.collisionBoundary];
  const hasExplicitBoundaries = boundary.length > 0;

  return {
    padding: collisionPadding,
    boundary: boundary.filter(item => !isNullish(item)),
    // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
    altBoundary: hasExplicitBoundaries
  };
}
