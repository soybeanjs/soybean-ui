import { computed } from 'vue';
import type { LinkProps, LinkExtraProps } from '../link/types';
import type { MenuOptionData } from '../menu';
import type { TreeNavOptionData, TreeNavRootContextParams } from './types';

export const hasChildren = (item: TreeNavOptionData): boolean => Boolean(item.children?.length);

export const isLinkItem = (item: TreeNavOptionData): boolean => Boolean(item.to || item.href);

/**
 * Stable roving tab-stop id of the trailing "more" trigger.
 */
export const TREE_NAV_MORE_VALUE = '__soybean-tree-nav-more__';

/**
 * Recursively remove options flagged as `hidden`, aligned with TreeMenu.
 */
export function filterHiddenTreeNavOptions(items?: TreeNavOptionData[]): TreeNavOptionData[] {
  if (!items) return [];

  return items
    .filter(item => !item.hidden)
    .map(item => {
      if (!item.children?.length) return item;

      return { ...item, children: filterHiddenTreeNavOptions(item.children) };
    });
}

/**
 * Build the props forwarded to the link element of a top-level link entry.
 *
 * Shared `linkProps` overrides are applied first; the entry fields and the
 * effective disabled state always win over them.
 */
export function buildTreeNavLinkProps(
  item: TreeNavOptionData,
  linkProps?: LinkExtraProps,
  disabled?: boolean
): LinkProps {
  return {
    ...linkProps,
    disabled: disabled || linkProps?.disabled,
    to: item.to,
    href: item.href,
    target: item.target,
    external: item.external
  };
}

/**
 * Adapter for popup select events.
 *
 * Popup internals only see the shared menu-item protocol (`MenuOptionData`),
 * while every runtime item originates from this component's string-valued
 * `TreeNavOptionData` tree, so narrowing at this boundary is safe.
 */
export function createTreeNavPopupSelectHandler(onSelect: (item: TreeNavOptionData, event: Event) => void) {
  return (item: MenuOptionData, event: Event) => onSelect(item as TreeNavOptionData, event);
}

/**
 * Assemble all props of a branch popup (popup config + options config) from
 * flattened root-context entries.
 */
export function createTreeNavBranchPopupBind(ctx: TreeNavRootContextParams) {
  const {
    selected,
    dir,
    trigger,
    delayDuration,
    skipDelayDuration,
    placement,
    showArrow,
    portalProps,
    popupProps,
    arrowProps,
    itemProps,
    linkProps,
    groupLabelProps,
    shortcutProps,
    separatorProps,
    subTriggerProps,
    subContentProps
  } = ctx;

  return computed(() => ({
    dir: dir.value,
    trigger: trigger.value,
    delayDuration: delayDuration.value,
    skipDelayDuration: skipDelayDuration.value,
    placement: placement.value,
    showArrow: showArrow.value,
    portalProps: portalProps.value,
    popupProps: popupProps.value,
    arrowProps: arrowProps.value,
    selectedValue: selected.value,
    itemProps: itemProps.value,
    linkProps: linkProps.value,
    groupLabelProps: groupLabelProps.value,
    shortcutProps: shortcutProps.value,
    separatorProps: separatorProps.value,
    subTriggerProps: subTriggerProps.value,
    subContentProps: subContentProps.value
  }));
}
