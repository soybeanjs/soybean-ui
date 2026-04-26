import type { AnchorItemData } from '@soybeanjs/headless/anchor';

const docOutlineItems = shallowRef<AnchorItemData[]>([]);

export function useDocOutline() {
  return docOutlineItems;
}

export function setDocOutline(items: AnchorItemData[]) {
  docOutlineItems.value = items;
}

export function resetDocOutline() {
  docOutlineItems.value = [];
}
