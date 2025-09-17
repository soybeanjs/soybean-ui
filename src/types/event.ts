export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

export type SelectEvent<T> = CustomEvent<{ originalEvent: MouseEvent; value?: T }>;
