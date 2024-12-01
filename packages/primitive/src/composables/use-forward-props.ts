import { camelize, computed, getCurrentInstance, toRef } from 'vue';
import type { ComputedRef, MaybeRefOrGetter } from 'vue';
import type { SplitType } from '../types';

interface PropOptions {
  type?: any;
  required?: boolean;
  default?: any;
}

type GetSplitPropsType<T extends Record<string, any>, K extends keyof T, U extends SplitType> = U extends 'pick'
  ? Pick<T, K>
  : Omit<T, K>;

/**
 * The `useForwardProps` function in TypeScript takes in a set of props and returns a computed value that combines
 * default props with assigned props from the current instance.
 *
 * @param props - The `props` parameter is an object that represents the props passed to a component.
 * @param splitKeys - The `splitKeys` parameter is an optional array of strings that represent the keys to be picked or
 *   omitted from the props.
 * @param type - The `type` parameter is an optional string that represents the type of operation to be performed on the
 *   props. It can be either 'pick' or 'omit'.
 * @returns computed value that combines the default props, preserved props, and assigned props.
 */
export function useForwardProps<T extends Record<string, any>>(props: MaybeRefOrGetter<T>): ComputedRef<T>;
export function useForwardProps<T extends Record<string, any>, K extends keyof T, U extends SplitType>(
  props: MaybeRefOrGetter<T>,
  splitKeys?: K[],
  type?: U
): ComputedRef<GetSplitPropsType<T, K, U>>;
export function useForwardProps<T extends Record<string, any>, K extends keyof T>(
  props: MaybeRefOrGetter<T>,
  splitKeys: K[] = [],
  type: SplitType = 'pick'
) {
  const vm = getCurrentInstance();

  // Default value for declared props
  const defaultProps = Object.keys(vm?.type.props ?? {}).reduce((prev, curr) => {
    const defaultValue = (vm?.type.props[curr] as PropOptions).default;

    if (defaultValue !== undefined) {
      prev[curr as keyof T] = defaultValue;
    }

    return prev;
  }, {} as T);

  const refProps = toRef(props);

  return computed(() => {
    const preservedProps = {} as T;
    const assignedProps = vm?.vnode.props ?? {};

    Object.keys(assignedProps).forEach(key => {
      preservedProps[camelize(key) as keyof T] = assignedProps[key];
    });

    let propKeys = Object.keys({ ...defaultProps, ...preservedProps }) as (keyof T)[];

    if (splitKeys.length > 0) {
      propKeys = propKeys.filter(key => {
        if (type === 'pick') {
          return splitKeys.includes(key as K);
        }

        return !splitKeys.includes(key as K);
      });
    }

    // Only return value from the props parameter
    const result = propKeys.reduce((prev, curr) => {
      if (refProps.value[curr] !== undefined) {
        prev[curr as keyof T] = refProps.value[curr];
      }

      return prev;
    }, {} as T);

    return result;
  });
}

export function usePickForwardProps<T extends Record<string, any>, K extends keyof T>(
  props: MaybeRefOrGetter<T>,
  splitKeys: K[]
) {
  return useForwardProps(props, splitKeys, 'pick');
}

export function useOmitForwardProps<T extends Record<string, any>, K extends keyof T>(
  props: MaybeRefOrGetter<T>,
  splitKeys: K[]
) {
  return useForwardProps(props, splitKeys, 'omit');
}
