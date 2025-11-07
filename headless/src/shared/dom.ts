import { Comment } from 'vue';
import type { VNode } from 'vue';
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

export function isElementHasAttribute(element: HTMLElement, attribute: string) {
  const value = element.getAttribute(attribute);
  const dataValue = element.getAttribute(`data-${attribute}`);

  return [value, dataValue].some(item => item === '' || item === 'true');
}

export function getCollectionItemElements(element: HTMLElement) {
  return Array.from(element.querySelectorAll(`[${COLLECTION_ITEM_ATTRIBUTE}]`)) as HTMLElement[];
}

export function getAriaLabel(element?: HTMLElement | null, id?: string, ariaLabel?: string) {
  if (ariaLabel) {
    return ariaLabel;
  }

  if (!id || !element) {
    return undefined;
  }

  const labelElement = document.querySelector(`[for="${id}"]`) as HTMLLabelElement;

  return labelElement?.textContent ?? undefined;
}

/**
 * Extract text content from VNode for generating aria-label. Use iteration instead of recursion to avoid stack
 * overflow.
 *
 * @param node VNode node
 * @returns Extracted text content
 */
export function getAriaLabelByVNode(node?: VNode | null): string {
  if (!node) return '';

  const textParts: string[] = [];
  const nodesToProcess: VNode[] = [node];

  while (nodesToProcess.length > 0) {
    const currentNode = nodesToProcess.pop()!;

    // Skip comment nodes
    if (currentNode.type === Comment) {
      // eslint-disable-next-line no-continue
      continue;
    }

    // Handle string child nodes
    if (typeof currentNode.children === 'string') {
      const text = currentNode.children.trim();
      if (text) {
        textParts.push(text);
      }
      // eslint-disable-next-line no-continue
      continue;
    }

    // Handle array child nodes
    if (Array.isArray(currentNode.children)) {
      // Add to stack in reverse order to maintain correct traversal order
      for (let i = currentNode.children.length - 1; i >= 0; i--) {
        const child = currentNode.children[i];
        if (child && typeof child === 'object' && 'type' in child) {
          nodesToProcess.push(child as VNode);
        }
      }
    }
  }

  // Normalize whitespace and return result
  return textParts.join(' ').replace(/\s+/g, ' ').trim();
}

export function getAriaLabelByVNodeList(nodes?: VNode[] | null): string {
  if (!nodes?.length) {
    return '';
  }

  return nodes
    .map(item => getAriaLabelByVNode(item))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
