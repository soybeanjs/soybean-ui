import { onBeforeUnmount, onWatcherCleanup, shallowRef, toValue, watchPostEffect } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { getCollectionItemElements, getElFromTemplateRef, isElementHasAttribute, toPascalCase } from '../shared';
import { COLLECTION_ITEM_ATTRIBUTE } from '../constants';
import type { VNodeRef } from '../types';
import { useContext } from './use-context';

export interface CollectionItemData<ItemData = Record<string, any>> {
  element: HTMLElement;
  data: ItemData;
}

/**
 * Create a collection composable for managing a group of related elements
 *
 * @param collectionName - The name of the collection (used for context naming)
 * @returns Collection management functions and hooks
 */
export function useCollection<ItemData = Record<string, any>>(collectionName: string) {
  const contextName = toPascalCase(`${collectionName}Collection`);

  const [provideCollectionContext, useCollectionContext] = useContext(contextName, () => {
    const containerElement = shallowRef<HTMLElement>();

    const onContainerElementChange = (element: HTMLElement) => {
      containerElement.value = element;
    };

    const itemRegistry = new Map<HTMLElement, CollectionItemData<ItemData>>();

    /**
     * Get collection items ordered by their DOM position
     *
     * @param excludeDisabled - Whether to exclude disabled items from the result
     * @returns Collection items ordered by DOM position
     */
    const getOrderedItems = (excludeDisabled = true): CollectionItemData<ItemData>[] => {
      if (!containerElement.value) return [];

      const domOrderedElements = getCollectionItemElements(containerElement.value);
      const orderedItems: CollectionItemData<ItemData>[] = [];

      // Iterate through DOM-ordered elements for optimal performance
      for (const element of domOrderedElements) {
        const itemData = itemRegistry.get(element);
        if (itemData) {
          const shouldInclude = !excludeDisabled || !isElementHasAttribute(element, 'disabled');
          if (shouldInclude) {
            orderedItems.push(itemData);
          }
        }
      }

      return orderedItems;
    };

    /**
     * Get collection elements ordered by their DOM position
     *
     * @param excludeDisabled - Whether to exclude disabled elements from the result
     * @returns Elements ordered by DOM position
     */
    const getOrderedElements = (excludeDisabled = true): HTMLElement[] =>
      getOrderedItems(excludeDisabled).map(item => item.element);

    // Clean up registry on component unmount
    onBeforeUnmount(() => {
      itemRegistry.clear();
    });

    return {
      containerElement,
      onContainerElementChange,
      itemRegistry,
      getOrderedItems,
      getOrderedElements
    };
  });

  /**
   * Hook for registering individual collection items
   *
   * @param itemData - Data to associate with this collection item
   * @returns Item element reference and props for registration
   */
  const useCollectionItem = (itemData: MaybeRefOrGetter<ItemData> = {} as ItemData) => {
    const consumerName = toPascalCase(`${collectionName}Item`);
    const { itemRegistry } = useCollectionContext(consumerName);

    const itemElement = shallowRef<HTMLElement>();

    /** Set the item element reference */
    const registerItemElement = (nodeRef: VNodeRef): void => {
      const element = getElFromTemplateRef(nodeRef);
      if (!element) return;

      // Clean up previous registration if element changed
      if (itemElement.value && itemElement.value !== element) {
        itemRegistry.delete(itemElement.value);
      }

      itemElement.value = element;
    };

    /** Handle item registration and data updates */
    watchPostEffect(() => {
      if (itemElement.value) {
        // Register or update the item in the registry
        itemRegistry.set(itemElement.value, {
          element: itemElement.value,
          data: toValue(itemData)
        });
      }

      /** Unregister the item from the collection registry when watcher is cleaned up */
      onWatcherCleanup(() => {
        if (itemElement.value) {
          itemRegistry.delete(itemElement.value);
          itemElement.value = undefined;
        }
      });
    });

    return {
      itemElement,
      setItemElement: registerItemElement,
      itemProps: {
        [COLLECTION_ITEM_ATTRIBUTE]: ''
      }
    };
  };

  return {
    provideCollectionContext,
    useCollectionContext,
    useCollectionItem
  };
}
