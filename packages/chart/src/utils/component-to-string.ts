import { h, render } from 'vue';
import type { Component } from 'vue';
import type { ChartConfig } from '../types';

/**
 * Module-level render cache keyed by the serialized data payload.
 *
 * Bounded by the number of distinct hovered datum per chart; avoids re-rendering
 * a tooltip/legend Vue component to an HTML string on every pointer move.
 */
const cache = new Map<string, string>();

let counter = 0;

/** Stable string key for a data payload, order-independent for top-level keys. */
function serializeKey(key: Record<string, unknown>): string {
  return JSON.stringify(key, Object.keys(key).sort());
}

/**
 * Render a Vue component to an HTML string for chart-library `template` props.
 *
 * Unovis tooltips/crosshairs accept a string template; this renders
 * `SChartTooltipContent` (with `payload`/`config`/`x`) into the DOM once per
 * datum and caches the result. Returns `undefined` on the server.
 */
export function componentToString(config: ChartConfig, component: Component, props?: object) {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const id = `chart-cache-${++counter}`;

  return (_data: unknown, x: number | Date) => {
    const data = 'data' in (_data as Record<string, unknown>) ? (_data as { data: unknown }).data : _data;
    const serializedKey = `${id}-${serializeKey(data as Record<string, unknown>)}`;
    const cachedContent = cache.get(serializedKey);
    if (cachedContent) {
      return cachedContent;
    }

    const vnode = h(component, { ...props, payload: data, config, x });
    const div = document.createElement('div');
    render(vnode, div);
    const content = div.innerHTML;
    cache.set(serializedKey, content);
    return content;
  };
}
