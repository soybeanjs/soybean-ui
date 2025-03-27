import type { Ref } from 'vue';
import type { AcceptableValue, ClassValueProp, Direction, GraceIntent, PrimitiveProps } from '../../types';
import type { TeleportProps } from '../teleport';
import type { DismissableLayerEmits, DismissableLayerProps } from '../dismissable-layer';
import type { FocusScopeProps } from '../focus-scope';
import type { RovingFocusGroupEmits } from '../roving-focus';
import type {
  PopperAnchorProps,
  PopperAnchorPropsWithPrimitive,
  PopperArrowProps,
  PopperArrowPropsWithPrimitive,
  PopperContentProps
} from '../popper';
import type { CheckedState } from '../checkbox';

// MenuRoot
export interface MenuRootProps {
  /** The controlled open state of the menu. Can be used as `v-model:open`. */
  open?: boolean;
  /** The open state of the menu when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /**
   * The reading direction of the combobox when applicable.
   *
   * If omitted, inherits globally from `ConfigProvider` or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /**
   * The modality of the dropdown menu.
   *
   * When set to `true`, interaction with outside elements will be disabled and only menu content will be visible to
   * screen readers.
   */
  modal?: boolean;
}
export type MenuRootEmits = {
  'update:open': [payload: boolean];
};
export interface MenuRootContext {
  onClose: () => void;
  dir: Ref<Direction>;
  isUsingKeyboardRef: Ref<boolean>;
  modal: Ref<boolean>;
}
export interface MenuContext {
  open: Ref<boolean>;
  onOpenChange: (open: boolean) => void;
  content: Ref<HTMLElement | undefined>;
  onContentChange: (content: HTMLElement | undefined) => void;
}

// MenuPortal
export interface MenuPortalProps extends TeleportProps {}

// MenuContentImpl
export type MenuContentImplPrivateProps = Pick<DismissableLayerProps, 'disableOutsidePointerEvents'> & {
  /**
   * Whether scrolling outside the `MenuContent` should be prevented
   *
   * @defaultValue false
   */
  disableOutsideScroll?: boolean;

  /**
   * Whether focus should be trapped within the `MenuContent`
   *
   * @defaultValue false
   */
  trapFocus?: FocusScopeProps['trapped'];
};
export interface MenuContentImplProps
  extends ClassValueProp,
    MenuContentImplPrivateProps,
    Omit<PopperContentProps, 'dir'> {
  /**
   * When `true`, keyboard navigation will loop from last item to first, and vice versa.
   *
   * @defaultValue false
   */
  loop?: boolean;
}
export type MenuContentImplPropsWithPrimitive = MenuContentImplProps & PrimitiveProps;
export type MenuContentImplEmits = DismissableLayerEmits &
  Pick<RovingFocusGroupEmits, 'entryFocus'> & {
    openAutoFocus: [event: Event];
    /** Event handler called when auto-focusing on close. Can be prevented. */
    closeAutoFocus: [event: Event];
  };
export type MenuContentImplPrivateEmits = MenuContentImplEmits & {
  /** Handler called when the `DismissableLayer` should be dismissed */
  dismiss: [];
};

// MenuRootContent
export type MenuRootContentTypeProps = Omit<
  MenuContentImplProps,
  'disableOutsidePointerEvents' | 'disableOutsideScroll' | 'trapFocus'
>;
export type MenuRootContentTypePropsWithPrimitive = MenuRootContentTypeProps & PrimitiveProps;

// MenuContent
export interface MenuContentProps extends ClassValueProp, MenuRootContentTypeProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}
export type MenuContentPropsWithPrimitive = MenuContentProps & PrimitiveProps;
export type MenuContentEmits = Omit<MenuContentImplEmits, 'entryFocus' | 'openAutoFocus'>;
export interface MenuContentContext {
  onItemEnter: (event: PointerEvent) => boolean;
  onItemLeave: (event: PointerEvent) => void;
  onTriggerLeave: (event: PointerEvent) => boolean;
  searchRef: Ref<string>;
  pointerGraceTimerRef: Ref<number>;
  onPointerGraceIntentChange: (intent: GraceIntent | null) => void;
}

// MenuRootContentModal
export interface MenuRootContentModalProps extends MenuRootContentTypeProps {}
export type MenuRootContentModalPropsWithPrimitive = MenuRootContentModalProps & PrimitiveProps;
export type MenuRootContentModalEmits = MenuContentImplEmits;

// MenuRootContentNonModal
export interface MenuRootContentNonModalProps extends MenuRootContentTypeProps {}
export type MenuRootContentNonModalPropsWithPrimitive = MenuRootContentNonModalProps & PrimitiveProps;
export type MenuRootContentNonModalEmits = MenuContentImplEmits;

// MenuSub
export interface MenuSubProps {
  /** The controlled open state of the menu. Can be used as `v-model:open`. */
  open?: boolean;
  /** The open state of the menu when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
}
export type MenuSubEmits = MenuRootEmits;
export interface MenuSubContext {
  contentId: string;
  triggerId: string;
  trigger: Ref<HTMLElement | undefined>;
  onTriggerChange: (trigger: HTMLElement | undefined) => void;
  parentMenuContext?: MenuContext;
}

// MenuSubContent
export interface MenuSubContentProps
  extends Omit<
    MenuContentImplProps,
    'disableOutsidePointerEvents' | 'disableOutsideScroll' | 'trapFocus' | 'side' | 'align'
  > {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}
export type MenuSubContentPropsWithPrimitive = MenuSubContentProps & PrimitiveProps;
export type MenuSubContentEmits = MenuContentImplEmits;

// MenuSubTrigger
export interface MenuSubTriggerProps extends MenuItemImplProps {}
export type MenuSubTriggerPropsWithPrimitive = MenuSubTriggerProps & PrimitiveProps;

// MenuItemImpl
export interface MenuItemImplProps extends ClassValueProp {
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
  /**
   * Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the
   * item. <br> Use this when the content is complex, or you have non-textual content inside.
   */
  textValue?: string;
}
export type MenuItemImplPropsWithPrimitive = MenuItemImplProps & PrimitiveProps;

// MenuItem
export interface MenuItemProps extends MenuItemImplProps {}
export type MenuItemPropsWithPrimitive = MenuItemProps & PrimitiveProps;
export type MenuItemEmits = {
  /**
   * Event handler called when the user selects an item (via mouse or keyboard). <br> Calling `event.preventDefault` in
   * this handler will prevent the menu from closing when selecting that item.
   */
  select: [event: Event];
};

// MenuItemIndicator
export interface MenuItemIndicatorProps extends ClassValueProp {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}
export type MenuItemIndicatorPropsWithPrimitive = MenuItemIndicatorProps & PrimitiveProps;
export interface MenuItemIndicatorContext {
  modelValue: Ref<CheckedState>;
}

// MenuGroup
export interface MenuGroupProps extends ClassValueProp {}
export type MenuGroupPropsWithPrimitive = MenuGroupProps & PrimitiveProps;

// MenuLabel
export interface MenuLabelProps extends ClassValueProp {}
export type MenuLabelPropsWithPrimitive = MenuLabelProps & PrimitiveProps;

// MenuArrow
export interface MenuArrowProps extends PopperArrowProps {}
export type MenuArrowPropsWithPrimitive = PopperArrowPropsWithPrimitive;

// MenuAnchor
export interface MenuAnchorProps extends PopperAnchorProps {}
export type MenuAnchorPropsWithPrimitive = PopperAnchorPropsWithPrimitive;

// MenuSeparator
export interface MenuSeparatorProps extends ClassValueProp {}
export type MenuSeparatorPropsWithPrimitive = MenuSeparatorProps & PrimitiveProps;

// MenuCheckboxItem
export interface MenuCheckboxItemProps extends MenuItemProps {
  /** The controlled checked state of the item. Can be used as `v-model`. */
  modelValue?: CheckedState;
}
export type MenuCheckboxItemPropsWithPrimitive = MenuCheckboxItemProps & PrimitiveProps;
export type MenuCheckboxItemEmits = MenuItemEmits & {
  /** Event handler called when the checked state changes. */
  'update:modelValue': [payload: boolean];
};

// MenuRadioItem
export interface MenuRadioItemProps extends MenuItemProps {
  /** The unique value of the item. */
  value: AcceptableValue;
}
export type MenuRadioItemPropsWithPrimitive = MenuRadioItemProps & PrimitiveProps;
export type MenuRadioItemEmits = MenuItemEmits;

// MenuRadioGroup
export interface MenuRadioGroupProps extends MenuGroupProps {
  /** The value of the selected item in the group. */
  modelValue?: AcceptableValue;
}
export type MenuRadioGroupPropsWithPrimitive = MenuRadioGroupProps & PrimitiveProps;
export type MenuRadioGroupEmits = {
  /** Event handler called when the value changes. */
  'update:modelValue': [payload: string];
};
export interface MenuRadioGroupContext {
  modelValue: Ref<AcceptableValue>;
  onValueChange: (payload: AcceptableValue) => void;
}
