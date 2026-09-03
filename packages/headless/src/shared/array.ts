import { isNullish } from './guard';

export function filterNullish<T>(list: readonly (T | null | undefined)[]): T[] {
  return list.filter(value => !isNullish(value)) as T[];
}
