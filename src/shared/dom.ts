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
 * 从VNode中提取文本内容，用于生成aria-label 使用迭代而不是递归，避免调用栈溢出
 *
 * @param node VNode节点
 * @returns 提取的文本内容
 */
export function getAriaLabelByVNode(node?: VNode | null): string {
  if (!node) return '';

  const textParts: string[] = [];
  const nodesToProcess: VNode[] = [node];

  while (nodesToProcess.length > 0) {
    const currentNode = nodesToProcess.pop()!;

    // 跳过注释节点
    if (currentNode.type === Comment) {
      // eslint-disable-next-line no-continue
      continue;
    }

    // 处理字符串子节点
    if (typeof currentNode.children === 'string') {
      const text = currentNode.children.trim();
      if (text) {
        textParts.push(text);
      }
      // eslint-disable-next-line no-continue
      continue;
    }

    // 处理数组子节点
    if (Array.isArray(currentNode.children)) {
      // 反向添加到栈中以保持正确的遍历顺序
      for (let i = currentNode.children.length - 1; i >= 0; i--) {
        const child = currentNode.children[i];
        if (child && typeof child === 'object' && 'type' in child) {
          nodesToProcess.push(child as VNode);
        }
      }
    }
  }

  // 规范化空白字符并返回结果
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
