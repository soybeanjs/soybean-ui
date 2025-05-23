export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;
