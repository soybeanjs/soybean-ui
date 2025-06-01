import type { Point, Polygon, Side } from '../types';

export function isPointInPolygon(point: Point, polygon: Polygon): boolean {
  const { x, y } = point;

  // 快速排除：边界框检查
  if (polygon.length < 3) return false;

  let { x: minX, y: minY } = polygon[0];
  let { x: maxX, y: maxY } = polygon[0];

  // 计算边界框
  for (let i = 1; i < polygon.length; i++) {
    const vertex = polygon[i];
    minX = Math.min(minX, vertex.x);
    maxX = Math.max(maxX, vertex.x);
    minY = Math.min(minY, vertex.y);
    maxY = Math.max(maxY, vertex.y);
  }

  // 点在边界框外，直接返回false
  if (x < minX || x > maxX || y < minY || y > maxY) {
    return false;
  }

  // 射线投射算法 - 从点向右发射射线，计算与多边形边的交点数
  let intersectionCount = 0;

  for (let i = 0; i < polygon.length; i++) {
    const currentVertex = polygon[i];
    const nextVertex = polygon[(i + 1) % polygon.length];

    const { x: x1, y: y1 } = currentVertex;
    const { x: x2, y: y2 } = nextVertex;

    // 检查射线是否与当前边相交
    // 1. 边必须跨越水平射线（一个端点在射线上方，另一个在下方）
    // 2. 射线必须在边的右侧
    if (y1 > y !== y2 > y) {
      // 计算射线与边的交点的x坐标
      const intersectionX = x1 + ((y - y1) * (x2 - x1)) / (y2 - y1);

      // 如果交点在点的右侧，计数加1
      if (x < intersectionX) {
        intersectionCount++;
      }
    }
  }

  // 奇数个交点表示点在多边形内部
  return intersectionCount % 2 === 1;
}

/**
 * 确定点离矩形哪一边最近
 *
 * @param point 目标点
 * @param rect DOM矩形
 * @returns 最近的边
 */
export function getExitSideFromRect(point: Point, rect: DOMRect): Side {
  const { x, y } = point;
  const { top, right, bottom, left } = rect;

  // 计算到各边的距离
  const distanceToTop = Math.abs(top - y);
  const distanceToBottom = Math.abs(bottom - y);
  const distanceToLeft = Math.abs(left - x);
  const distanceToRight = Math.abs(right - x);

  // 先比较水平和垂直方向的最小距离，减少比较次数
  const minHorizontal = Math.min(distanceToLeft, distanceToRight);
  const minVertical = Math.min(distanceToTop, distanceToBottom);

  if (minHorizontal < minVertical) {
    return distanceToLeft < distanceToRight ? 'left' : 'right';
  }
  return distanceToTop < distanceToBottom ? 'top' : 'bottom';
}

/**
 * 根据退出点和退出边创建带填充的点
 *
 * @param exitPoint 退出点
 * @param exitSide 退出边
 * @param padding 填充距离，默认5
 * @returns 填充后的点数组
 */
export function getPaddedExitPoints(exitPoint: Point, exitSide: Side, padding = 5): Point[] {
  const { x, y } = exitPoint;

  // 使用对象映射来简化switch逻辑并提高性能
  const paddingMap: Record<Side, [Point, Point]> = {
    top: [
      { x: x - padding, y: y + padding },
      { x: x + padding, y: y + padding }
    ],
    bottom: [
      { x: x - padding, y: y - padding },
      { x: x + padding, y: y - padding }
    ],
    left: [
      { x: x + padding, y: y - padding },
      { x: x + padding, y: y + padding }
    ],
    right: [
      { x: x - padding, y: y - padding },
      { x: x - padding, y: y + padding }
    ]
  };

  return paddingMap[exitSide];
}

/**
 * 从DOMRect获取四个角点
 *
 * @param rect DOM矩形
 * @returns 点数组（顺时针从左上角开始）
 */
export function getPointsFromRect(rect: DOMRect): Point[] {
  const { top, right, bottom, left } = rect;
  return [
    { x: left, y: top }, // 左上
    { x: right, y: top }, // 右上
    { x: right, y: bottom }, // 右下
    { x: left, y: bottom } // 左下
  ];
}

/**
 * 计算两点之间的欧几里得距离的平方（避免开方运算以提高性能）
 *
 * @param a 点A
 * @param b 点B
 * @returns 距离的平方
 */
function getDistanceSquared(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

/**
 * 计算叉积用于判断点的方向
 *
 * @param o 原点
 * @param a 点A
 * @param b 点B
 * @returns 叉积值
 */
function crossProduct(o: Point, a: Point, b: Point): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

/**
 * 使用Graham扫描算法计算凸包 优化版本，性能更好
 *
 * @param points 点集合
 * @returns 凸包点数组
 */
export function getHull<P extends Point>(points: Readonly<Array<P>>): Array<P> {
  if (points.length <= 1) return [...points];
  if (points.length === 2) return [...points];
  if (points.length === 3) {
    // 对于三点，检查是否共线，如果共线则返回端点
    const [p1, p2, p3] = points;
    const cross = crossProduct(p1, p2, p3);
    if (Math.abs(cross) < 1e-10) {
      // 共线，返回距离最远的两点
      const dist12 = getDistanceSquared(p1, p2);
      const dist13 = getDistanceSquared(p1, p3);
      const dist23 = getDistanceSquared(p2, p3);
      const maxDist = Math.max(dist12, dist13, dist23);
      if (maxDist === dist12) return [p1, p2];
      if (maxDist === dist13) return [p1, p3];
      return [p2, p3];
    }
    return [...points];
  }

  // 复制并排序点
  const sortedPoints = [...points].sort((a, b) => {
    if (a.x !== b.x) return a.x - b.x;
    return a.y - b.y;
  });

  return getHullPresorted(sortedPoints);
}

/**
 * 对已排序的点计算凸包
 *
 * @param points 已排序的点数组
 * @returns 凸包点数组
 */
function getHullPresorted<P extends Point>(points: Readonly<Array<P>>): Array<P> {
  if (points.length <= 1) return [...points];

  // 构建下凸包
  const lower: P[] = [];
  for (const point of points) {
    while (lower.length >= 2 && crossProduct(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
      lower.pop();
    }
    lower.push(point);
  }

  // 构建上凸包
  const upper: P[] = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const point = points[i];
    while (upper.length >= 2 && crossProduct(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
      upper.pop();
    }
    upper.push(point);
  }

  // 移除最后一个点（重复）并合并
  lower.pop();
  upper.pop();

  // 如果只有一个点，避免重复
  if (lower.length === 1 && upper.length === 1 && lower[0].x === upper[0].x && lower[0].y === upper[0].y) {
    return lower;
  }

  return lower.concat(upper);
}
