import type { Component } from 'vue';

/**
 * Contract that lets one example keep part of itself out of the device frame.
 *
 * `PlaygroundViewport` publishes a simulated viewport and wraps the example in a
 * frame sized for the picked device, so everything an example renders is
 * constrained to that frame. An example that has a part which is *not* the thing
 * being simulated — its own control panel, a full-bleed panel — opts out by
 * declaring this prop:
 *
 * ```vue
 * interface Props {
 *   playgroundRegion?: string;
 * }
 *
 * defineProps<Props>();
 * ```
 *
 * The gallery renders a target element outside the frame and hands its selector
 * over; the example teleports into it:
 *
 * ```vue
 * <Teleport defer :to="playgroundRegion ?? 'body'" :disabled="!playgroundRegion">…</Teleport>
 * ```
 *
 * `to` must fall back to a string: the server renderer drops a teleport whose
 * target is missing instead of rendering it inline, which would leave the client
 * and the prerendered HTML disagreeing.
 */
export interface PlaygroundRegionProps {
  /** Selector of the gallery-owned region, or `undefined` when no gallery hosts the example. */
  playgroundRegion?: string;
}

/**
 * Whether an example opted into the out-of-frame region.
 *
 * The opt-in is read from the component's own props declaration, so the gallery
 * binds the prop only for the examples that declare it. Binding it for every
 * example instead would leak the attribute onto their root element, and a
 * fragment root cannot inherit it at all — Vue warns on every render.
 *
 * A type-only `defineProps` still compiles to a runtime props table when the type
 * is written inline or as a locally declared interface — which is what makes the
 * declaration observable here. A props type imported from another module may not
 * compile to one, so an example that wants the region declares it locally.
 */
export function acceptsPlaygroundRegion(component: Component): boolean {
  const props = (component as { props?: Record<string, unknown> }).props;

  return Boolean(props?.playgroundRegion);
}
