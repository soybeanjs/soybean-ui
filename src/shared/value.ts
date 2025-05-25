import type { AcceptableValue, StringOrNumber } from '../types';

/**
 * 根据单选或多选模式检查值是否开启
 *
 * @param value - 要检查的值
 * @param modelValue - 模型值（可以是单个值或数组）
 * @param isSingle - 是否为单选模式
 * @returns 是否开启
 */
export function getOpenFromSingleOrMultiple(
  value: StringOrNumber,
  modelValue: AcceptableValue | AcceptableValue[],
  isSingle: boolean
) {
  if (isSingle) {
    return value === modelValue;
  }

  return Array.isArray(modelValue) && modelValue.includes(value);
}

/**
 * 根据开启状态返回对应的字符串
 *
 * @param open - 是否开启
 * @returns 'open' 或 'closed'
 */
export function getDisclosureState(open?: boolean) {
  return open ? 'open' : 'closed';
}
