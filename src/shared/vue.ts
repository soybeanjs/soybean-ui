import {
  Comment,
  Fragment,
  computed,
  customRef,
  getCurrentInstance,
  getCurrentScope,
  onScopeDispose,
  toValue
} from 'vue';
import type { ComponentPublicInstance, MaybeRefOrGetter, Ref, VNode } from 'vue';
import { PatchFlags } from '@vue/shared';
import type { Fn, PropsToContext, VNodeRef } from '../types';

export function getLifeCycleTarget(target?: any) {
  return target || getCurrentInstance();
}

export function getRawChildren(children: VNode[]): VNode[] {
  let ret: VNode[] = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i]!;
    // handle fragment children case, e.g. v-for
    if (child.type === Fragment) {
      if ((child.patchFlag ?? 0) === PatchFlags.KEYED_FRAGMENT) {
        keyedFragmentCount++;
      }
      ret = ret.concat(getRawChildren(child.children as VNode[]));
    }
    // comment placeholders should be skipped, e.g. v-if
    else if (child.type !== Comment) {
      ret.push(child);
    }
  }

  // bail if there are multiple keyed fragments
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = PatchFlags.BAIL;
    }
  }

  return ret;
}

export function getElFromTemplateRef<T extends HTMLElement>(nodeRef: VNodeRef) {
  let node: T | undefined = (nodeRef as ComponentPublicInstance)?.$el ?? nodeRef;

  if (node && node.nodeType !== 1) {
    node = undefined;
  }

  return node;
}

export function transformPropsToContext<T extends Record<string, any>, K extends keyof T = keyof T>(
  props: T,
  keys?: K[]
) {
  const $keys = keys ?? (Object.keys(props) as K[]);

  return $keys.reduce(
    (acc, key) => {
      acc[key] = computed(() => (typeof props[key] === 'function' ? props[key]() : props[key]));
      return acc;
    },
    {} as PropsToContext<T, K>
  );
}

export function isFormControl(el?: HTMLElement | null) {
  // We set this to true by default so that events bubble to forms without JS (SSR)
  if (!el) return true;

  return el.classList.contains('form');
}

/**
 * Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}

/**
 * Create a ref which will be reset to the default value after some time.
 *
 * @param defaultValue The value which will be set.
 * @param afterMs A zero-or-greater delay in milliseconds.
 * @see https://vueuse.org/refAutoReset
 */
export function refAutoReset<T>(defaultValue: MaybeRefOrGetter<T>, afterMs: MaybeRefOrGetter<number> = 10000): Ref<T> {
  return customRef<T>((track, trigger) => {
    let value: T = toValue(defaultValue);
    let timer: any;

    const resetAfter = () =>
      setTimeout(() => {
        value = toValue(defaultValue);
        trigger();
      }, toValue(afterMs));

    tryOnScopeDispose(() => {
      clearTimeout(timer);
    });

    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        value = newValue;
        trigger();

        clearTimeout(timer);
        timer = resetAfter();
      }
    };
  });
}
