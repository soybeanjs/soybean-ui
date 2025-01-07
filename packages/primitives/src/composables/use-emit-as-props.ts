import { camelize, getCurrentInstance, toHandlerKey } from 'vue';
import type { SplitType } from '../types';

// Vue doesn't have emits forwarding, in order to bind the emits we have to convert events into `onXXX` handlers
// issue: https://github.com/vuejs/core/issues/5917
/**
 * The `useEmitAsProps` function is a TypeScript utility that converts emitted events into props for a Vue component.
 *
 * @param emit - The `emit` parameter is a function that is used to emit events from a component. It takes two
 *   parameters: `name` which is the name of the event to be emitted, and `...args` which are the arguments to be passed
 *   along with the event.
 * @param splitEvents - The `splitEvents` parameter is an optional array of strings that represent the events to be
 *   picked or omitted from the emitted events.
 * @param type - The `type` parameter is an optional string that represents the type of operation to be performed on the
 *   emitted events. It can be either 'pick' or 'omit'.
 * @returns The function `useEmitAsProps` returns an object that maps event names to functions that call the `emit`
 *   function with the corresponding event name and arguments.
 */
export function useEmitAsProps<Name extends string>(
  emit: (name: Name, ...args: any[]) => void,
  splitEvents: Name[] = [],
  type: SplitType = 'pick'
) {
  const vm = getCurrentInstance();

  let events = vm?.type.emits as Name[];

  if (splitEvents.length) {
    events = type === 'pick' ? splitEvents : events?.filter(ev => !splitEvents.includes(ev));
  }

  const result: Record<string, any> = {};

  if (!events?.length) {
    console.warn(`No emitted event found. Please check component: ${vm?.type.__name}`);
  }

  events?.forEach(ev => {
    const handlerName = toHandlerKey(camelize(ev));

    result[handlerName] = (...arg: any) => emit(ev, ...arg);
  });

  return result;
}

export function usePickEmitAsProps<T extends Record<string, any>>(
  emit: (...args: any[]) => void,
  splitEvents: (keyof T)[]
) {
  return useEmitAsProps(emit, splitEvents, 'pick');
}

export function useOmitEmitAsProps<T extends Record<string, any>>(
  emit: (...args: any[]) => void,
  splitEvents: (keyof T)[]
) {
  return useEmitAsProps(emit, splitEvents, 'omit');
}
