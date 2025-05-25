import { shallowReactive } from 'vue';

// Layer management with better isolation and performance
interface LayerInfo {
  element: HTMLElement;
  hasDisabledOutsidePointerEvents: boolean;
  ownerDocument: Document;
}

export class DismissableLayerManager {
  private activeLayers = shallowReactive(new Set<HTMLElement>());
  private layersWithDisabledPointerEvents = shallowReactive(new Set<HTMLElement>());
  private exemptBranches = shallowReactive(new Set<HTMLElement>());
  private layerInfoCache = new WeakMap<HTMLElement, LayerInfo>();
  private documentPointerEventsState = new WeakMap<Document, string | undefined>();

  // Cached arrays to avoid repeated Array.from() calls
  private cachedActiveLayers: HTMLElement[] = [];
  private cachedDisabledLayers: HTMLElement[] = [];

  private updateCache(): void {
    this.cachedActiveLayers = Array.from(this.activeLayers);
    this.cachedDisabledLayers = Array.from(this.layersWithDisabledPointerEvents);
  }

  registerLayer(element: HTMLElement, hasDisabledPointerEvents: boolean): void {
    const ownerDocument = element.ownerDocument;

    // Cache layer info for faster lookups
    this.layerInfoCache.set(element, {
      element,
      hasDisabledOutsidePointerEvents: hasDisabledPointerEvents,
      ownerDocument
    });

    this.activeLayers.add(element);

    if (hasDisabledPointerEvents) {
      // Only modify body pointer events if this is the first layer with disabled events
      if (this.layersWithDisabledPointerEvents.size === 0) {
        this.documentPointerEventsState.set(ownerDocument, ownerDocument.body.style.pointerEvents);
        ownerDocument.body.style.pointerEvents = 'none';
      }
      this.layersWithDisabledPointerEvents.add(element);
    }

    this.updateCache();
  }

  unregisterLayer(element: HTMLElement): void {
    const layerInfo = this.layerInfoCache.get(element);
    if (!layerInfo) return;

    this.activeLayers.delete(element);

    if (layerInfo.hasDisabledOutsidePointerEvents) {
      this.layersWithDisabledPointerEvents.delete(element);

      // Restore body pointer events if this was the last layer with disabled events
      if (this.layersWithDisabledPointerEvents.size === 0) {
        const savedPointerEvents = this.documentPointerEventsState.get(layerInfo.ownerDocument);
        if (savedPointerEvents === undefined) {
          layerInfo.ownerDocument.body.style.removeProperty('pointer-events');
        } else {
          layerInfo.ownerDocument.body.style.pointerEvents = savedPointerEvents;
        }
        this.documentPointerEventsState.delete(layerInfo.ownerDocument);
      }
    }

    this.layerInfoCache.delete(element);
    this.updateCache();
  }

  getLayerIndex(element: HTMLElement): number {
    return this.cachedActiveLayers.indexOf(element);
  }

  hasLayersWithDisabledPointerEvents(): boolean {
    return this.layersWithDisabledPointerEvents.size > 0;
  }

  isLayerPointerEventsEnabled(element: HTMLElement): boolean {
    if (this.cachedDisabledLayers.length === 0) return true;

    const layerIndex = this.getLayerIndex(element);
    const topMostDisabledLayer = this.cachedDisabledLayers[this.cachedDisabledLayers.length - 1];
    const topMostDisabledLayerIndex = this.cachedActiveLayers.indexOf(topMostDisabledLayer);

    return layerIndex >= topMostDisabledLayerIndex;
  }

  isTopMostLayer(element: HTMLElement): boolean {
    return this.getLayerIndex(element) === this.activeLayers.size - 1;
  }

  addExemptBranch(element: HTMLElement): void {
    this.exemptBranches.add(element);
  }

  removeExemptBranch(element: HTMLElement): void {
    this.exemptBranches.delete(element);
  }

  isTargetInExemptBranch(target: HTMLElement): boolean {
    // Use for...of for better performance with early exit
    for (const exemptBranch of this.exemptBranches) {
      if (exemptBranch.contains(target)) {
        return true;
      }
    }
    return false;
  }

  // Cleanup method for testing or manual cleanup
  clear(): void {
    this.activeLayers.clear();
    this.layersWithDisabledPointerEvents.clear();
    this.exemptBranches.clear();
    this.layerInfoCache = new WeakMap();
    this.documentPointerEventsState = new WeakMap();
    this.cachedActiveLayers = [];
    this.cachedDisabledLayers = [];
  }
}
