import { markRaw, onBeforeUnmount, shallowRef } from 'vue';
import { getCollectionItemElements, getElFromTemplateRef, isElementHasAttribute, toPascalCase } from '../shared';
import { COLLECTION_ITEM_ATTRIBUTE } from '../constants';
import type { VNodeRef } from '../types';
import { useContext } from './use-context';
import { useForwardElement } from './use-forward-element';

export type CollectionItemMapData<ItemData> = {
  element: HTMLElement;
  data: ItemData;
};

export function useCollection<ItemData = {}>(name: string) {
  const contextName = toPascalCase(`${name}Collection`);

  const [provideCollectionContext, useCollectionContext] = useContext(contextName, () => {
    const [collectionElement, setCollectionElement] = useForwardElement();

    const collectionItemMap = new Map<HTMLElement, CollectionItemMapData<ItemData>>();

    /**
     * Get the data of the collection items.
     *
     * @param filterDisabled - Whether to filter out disabled items. Default is `true`
     * @returns The data of the collection items.
     */
    const getCollectionItemData = (filterDisabled = true) => {
      if (!collectionElement.value) return [];

      const elements = getCollectionItemElements(collectionElement.value);
      const items = Array.from(collectionItemMap.values());

      const orderedItems = items.sort((a, b) => elements.indexOf(a.element) - elements.indexOf(b.element));

      if (!filterDisabled) {
        return orderedItems;
      }

      return orderedItems.filter(item => !isElementHasAttribute(item.element, 'disabled'));
    };

    /**
     * Get the elements of the collection items.
     *
     * @param filterDisabled - Whether to filter out disabled items. Default is `true`
     * @returns The elements of the collection items.
     */
    const getCollectionElements = (filterDisabled = true) =>
      getCollectionItemData(filterDisabled).map(item => item.element);

    onBeforeUnmount(() => {
      collectionItemMap.clear();
    });

    return {
      collectionElement,
      collectionProps: {
        ref: setCollectionElement
      },
      collectionItemMap,
      getCollectionItemData,
      getCollectionElements
    };
  });

  const useCollectionItem = (itemData: ItemData = {} as ItemData) => {
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
      collectionItemProps: {
        ref: setCollectionItemElement,
        [COLLECTION_ITEM_ATTRIBUTE]: true
      }
    };
  };

  return {
    provideCollectionContext,
    useCollectionContext,
    useCollectionItem
  };
}
