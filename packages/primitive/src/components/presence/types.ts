import type { SlotsType } from 'vue';

export interface PresenceProps {
  /**
   * Conditional to mount or unmount the child element. Similar to `v-if`
   *
   * @required true
   */
  present: boolean;
  /**
   * Force the element to render all the time.
   *
   * Useful for programmatically render grandchild component with the exposed `present`
   *
   * @defaultValue false
   */
  forceMount?: boolean;
}

export type PresenceSlots = SlotsType<{
  default: (opts: { present: boolean }) => any;
}>;
