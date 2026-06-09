import type { AnchorOptionData } from '@soybeanjs/headless/anchor';

const docOutlineItems = shallowRef<AnchorOptionData[]>([]);

export function useDocOutline() {
  return docOutlineItems;
}

export function setDocOutline(items: AnchorOptionData[]) {
  docOutlineItems.value = items;
}

export function resetDocOutline() {
  docOutlineItems.value = [];
}
