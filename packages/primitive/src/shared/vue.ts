import { Fragment } from 'vue';
import type { VNode } from 'vue';

export function renderSlotFragments(children?: VNode[]): VNode[] {
  if (!children) return [];

  return children.flatMap(child => {
    if (child.type === Fragment) {
      return renderSlotFragments(child.children as VNode[]);
    }

    return [child];
  });
}

/** Checks whether a given VNode is a render-viable element. */
export function isValidVNodeElement(input: any): boolean {
  const types = ['string', 'object', 'function'];

  return input && types.includes(typeof input.type);
}

export function handleAndDispatchCustomEvent<E extends CustomEvent, OriginalEvent extends Event>(
  name: string,
  handler: ((event: E) => void) | undefined,
  detail: { originalEvent: OriginalEvent } & (E extends CustomEvent<infer D> ? D : never)
) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail
  });
  if (handler) target.addEventListener(name, handler as EventListener, { once: true });

  target.dispatchEvent(event);
}
