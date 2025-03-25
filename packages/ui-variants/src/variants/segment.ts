// @unocss-include
import { tabsVariants } from './tabs';

export const segmentVariants = tabsVariants;

export type SegmentSlots = Exclude<keyof typeof segmentVariants.slots, 'content'>;
