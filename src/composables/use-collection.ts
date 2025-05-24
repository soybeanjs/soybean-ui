import { markRaw, onBeforeUnmount, shallowRef } from 'vue';
import { getCollectionItemElements, getElFromTemplateRef, isDisabledElement, toPascalCase } from '../shared';
import type { VNodeRef } from '../types';
import { useContext } from './use-context';
import { useForwardElement } from './use-forward-element';

type CollectionItemMapData<ItemData> = {
  element: HTMLElement;
  data: ItemData;
};

export function useCollection<ItemData = {}>(name: string) {
  const contextName = toPascalCase(`${name}Collection`);

  const [provideCollectionContext, useCollectionContext] = useContext(contextName, () => {
    const [collectionElement, setCollectionElement] = useForwardElement();

    const collectionItemMap = new Map<HTMLElement, CollectionItemMapData<ItemData>>();

    const getCollectionItemData = (filterDisabled = true) => {
      if (!collectionElement.value) return [];

      const elements = getCollectionItemElements(collectionElement.value);
      const items = Array.from(collectionItemMap.values());

      const orderedItems = items.sort((a, b) => elements.indexOf(a.element) - elements.indexOf(b.element));

      if (!filterDisabled) {
        return orderedItems;
      }

      return orderedItems.filter(item => !isDisabledElement(item.element));
    };

    onBeforeUnmount(() => {
      collectionItemMap.clear();
    });

    return {
      collectionElement,
      setCollectionElement,
      collectionItemMap,
      getCollectionItemData
    };
  });

  const useCollectionItem = (itemData: ItemData) => {
    const consumerName = toPascalCase(`${name}Item`);
    const { collectionItemMap } = useCollectionContext(consumerName);

    const collectionItemElement = shallowRef<HTMLElement>();

    const setCollectionItemElement = (nodeRef: VNodeRef) => {
      const element = getElFromTemplateRef(nodeRef);
      if (!element) return;

      collectionItemElement.value = element;
      collectionItemMap.set(element, { element, data: itemData });
    };

    const cleanup = () => {
      if (!collectionItemElement.value) return;
      const rawElement = markRaw(collectionItemElement.value);
      collectionItemMap.delete(rawElement);
    };

    onBeforeUnmount(() => {
      cleanup();
    });

    return {
      collectionItemElement,
      setCollectionItemElement
    };
  };

  return {
    provideCollectionContext,
    useCollectionContext,
    useCollectionItem
  };
}
