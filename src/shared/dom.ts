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
