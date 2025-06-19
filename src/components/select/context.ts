import { computed, ref, shallowRef, useId } from 'vue';
import { useCollection, useContext, useDirection } from '../../composables';
import { isValueEqualOrExist, tryFocusFirst } from '../../shared';
import type { AcceptableValue, Point } from '../../types';
import type {
  SelectContentContextParams,
  SelectItemAlignedPositionContextParams,
  SelectItemCollectionItemData,
  SelectItemContextParams,
  SelectOption,
  SelectRootContextParams,
  SelectThemeContextParams
} from './types';

export const [provideSelectRootContext, useSelectRootContext] = useContext(
  'SelectRoot',
  (params: SelectRootContextParams) => {
    const { open } = params;

    const dir = useDirection(params.dir);

    const onOpenChange = (value: boolean) => {
      open.value = value;
    };

    const contentId = shallowRef('');
    const initContentId = () => {
      if (contentId.value) return;
      contentId.value = `soybean-select-content-${useId()}`;
    };

    const triggerElement = shallowRef<HTMLElement>();

    const onTriggerElementChange = (node: HTMLElement) => {
      triggerElement.value = node;
    };

    const valueElement = shallowRef<HTMLElement>();

    const onValueElementChange = (node: HTMLElement) => {
      valueElement.value = node;
    };

    const optionsSet = ref<Set<SelectOption>>(new Set());

    const options = computed(() => Array.from(optionsSet.value));

    // The native `select` only associates the correct default value if the corresponding
    // `option` is rendered as a child **at the same time** as itself.
    // Because it might take a few renders for our items to gather the information to build
    // the native `option`(s), we generate a key on the `select` to make sure Vue re-builds it
    // each time the options change.
    const nativeSelectKey = computed(() => options.value.map(option => option.value).join(';'));

    const onOptionAdd = (option: SelectOption) => {
      optionsSet.value.add(option);
    };
    const onOptionRemove = (option: SelectOption) => {
      optionsSet.value.delete(option);
    };

    const triggerPointerDownPosition = shallowRef<Point | null>({
      x: 0,
      y: 0
    });

    const setTriggerPointerDownPosition = (position: Point) => {
      triggerPointerDownPosition.value = position;
    };

    const resetTriggerPointerDownPosition = () => {
      triggerPointerDownPosition.value = null;
    };

    return {
      ...params,
      dir,
      onOpenChange,
      contentId,
      initContentId,
      triggerElement,
      onTriggerElementChange,
      valueElement,
      onValueElementChange,
      optionsSet,
      onOptionAdd,
      onOptionRemove,
      options,
      nativeSelectKey,
      triggerPointerDownPosition,
      setTriggerPointerDownPosition,
      resetTriggerPointerDownPosition
    };
  }
);

export const { provideCollectionContext, useCollectionContext, useCollectionItem } =
  useCollection<SelectItemCollectionItemData>('Select');

export const [provideSelectContentContext, useSelectContentContext] = useContext(
  'SelectContent',
  (params: SelectContentContextParams) => {
    const { modelValue, isMultiple } = params;

    const isPositioned = shallowRef(false);

    const contentElement = shallowRef<HTMLElement>();
    const onContentElementChange = (node: HTMLElement) => {
      contentElement.value = node;
    };

    const viewportElement = shallowRef<HTMLElement>();
    const onViewportElementChange = (node: HTMLElement) => {
      viewportElement.value = node;
    };

    let firstValidItemFound = false;
    let firstSelectedItemInArrayFound = false;

    const selectedItemTextElement = shallowRef<HTMLElement>();
    const onSelectedItemTextElementChange = (node: HTMLElement, value: AcceptableValue, disabled: boolean) => {
      const isFirstValidItem = !firstValidItemFound && !disabled;
      const isSelectedItem = isValueEqualOrExist(modelValue.value, value);

      if (isSelectedItem || isFirstValidItem) {
        selectedItemTextElement.value = node;
      }
    };

    const selectedItemElement = shallowRef<HTMLElement>();
    const onSelectedItemElementChange = (node: HTMLElement, value: AcceptableValue, disabled: boolean) => {
      const isFirstValidItem = !firstValidItemFound && !disabled;
      const isSelectedItem = isValueEqualOrExist(modelValue.value, value);

      if (isMultiple.value) {
        if (firstSelectedItemInArrayFound) {
          return;
        }
        if (isSelectedItem || isFirstValidItem) {
          selectedItemElement.value = node;

          // make sure to keep the first item highlighted when `multiple`
          if (isSelectedItem) {
            firstSelectedItemInArrayFound = true;
          }
        }
      } else if (isSelectedItem || isFirstValidItem) {
        selectedItemElement.value = node;
      }

      if (isFirstValidItem) {
        firstValidItemFound = true;
      }
    };
    const onItemElementLeave = () => {
      contentElement.value?.focus();
    };

    function focusSelectedItem() {
      if (selectedItemElement.value && contentElement.value) {
        tryFocusFirst([selectedItemElement.value, contentElement.value]);
      }
    }

    return {
      ...params,
      isPositioned,
      contentElement,
      onContentElementChange,
      viewportElement,
      onViewportElementChange,
      selectedItemElement,
      onSelectedItemElementChange,
      onItemElementLeave,
      selectedItemTextElement,
      onSelectedItemTextElementChange,
      focusSelectedItem
    };
  }
);

export const [provideSelectGroupContext, useSelectGroupContext] = useContext('SelectGroup', () => {
  const groupId = shallowRef('');

  const initGroupId = () => {
    if (groupId.value) return;

    groupId.value = `soybean-select-group-${useId()}`;
  };

  return {
    groupId,
    initGroupId
  };
});

export const [provideSelectItemContext, useSelectItemContext] = useContext(
  'SelectItem',
  (params: SelectItemContextParams) => {
    const textValue = shallowRef(params.textValue.value ?? '');

    const itemTextElement = shallowRef<HTMLElement>();
    const onItemTextElementChange = (node: HTMLElement) => {
      itemTextElement.value = node;

      textValue.value = ((textValue.value || node?.textContent) ?? '').trim();
    };

    const textId = shallowRef('');

    const initTextId = () => {
      if (textId.value) return;

      textId.value = `soybean-select-item-text-${useId()}`;
    };

    return {
      ...params,
      textId,
      initTextId,
      textValue,
      itemTextElement,
      onItemTextElementChange
    };
  }
);

export const [provideSelectItemAlignedPositionContext, useSelectItemAlignedPositionContext] = useContext(
  'SelectItemAlignedPosition',
  (params: SelectItemAlignedPositionContextParams) => params
);

export const [provideSelectThemeContext, useSelectThemeContext] = useContext(
  'SelectTheme',
  (params: SelectThemeContextParams) => params
);
