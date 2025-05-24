import { COLLECTION_ITEM_ATTRIBUTE } from '../constants';

export function removeLinks(items: HTMLElement[]) {
  return items.filter(item => item.tagName !== 'A');
}

export function getActiveElement<T extends Element = HTMLElement>() {
  let activeElement = document.activeElement;
  if (activeElement === null) {
    return null;
  }

  while (
    activeElement !== null &&
    activeElement.shadowRoot !== null &&
    activeElement.shadowRoot.activeElement !== null
  ) {
    activeElement = activeElement.shadowRoot.activeElement;
  }

  return activeElement as T;
}

export function isDisabledElement(element: HTMLElement) {
  const disabled = element.getAttribute('disabled');
  const dataDisabled = element.getAttribute('data-disabled');

  const isDisabled = [disabled, dataDisabled].some(item => item === '' || item === 'true');

  return isDisabled;
}

export function getCollectionItemElements(element: HTMLElement) {
  return Array.from(element.querySelectorAll(`[${COLLECTION_ITEM_ATTRIBUTE}]`)) as HTMLElement[];
}
