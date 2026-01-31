import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertRoot,
  AlertTitle,
  Arrow,
  AspectRatio,
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  BadgeContent,
  BadgeRoot,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbRoot,
  BreadcrumbSeparator,
  Button,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardRoot,
  CardTitle,
  CardTitleRoot,
  CheckboxControl,
  CheckboxGroupRoot,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  ConfigProvider,
  ContextMenuAnchor,
  ContextMenuArrow,
  ContextMenuCheckboxGroup,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DropdownMenuAnchor,
  DropdownMenuArrow,
  DropdownMenuCheckboxGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  FormDescription,
  FormError,
  FormField,
  FormLabel,
  InputControl,
  InputRoot,
  Kbd,
  Label,
  LayoutFooter,
  LayoutHeader,
  LayoutMain,
  LayoutMobile,
  LayoutRail,
  LayoutRoot,
  LayoutSidebar,
  LayoutTab,
  LayoutTrigger,
  Link,
  ListContent,
  ListDescription,
  ListItem,
  ListRoot,
  ListTitle,
  ListboxContent,
  ListboxFilter,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxItem,
  ListboxItemIndicator,
  ListboxRoot,
  ListboxVirtualizer,
  MenuAnchor,
  MenuArrow,
  MenuCheckboxGroup,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemIndicator,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRoot,
  MenuSeparator,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuSubList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NumberInputControl,
  NumberInputDecrement,
  NumberInputIncrement,
  NumberInputRoot,
  PageTabsRoot,
  PageTabsItem,
  PageTabsClose,
  PageTabsPin,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverRoot,
  PopoverTrigger,
  PopperAnchor,
  PopperArrow,
  PopperPopup,
  PopperPositioner,
  PopperRoot,
  Portal,
  Primitive,
  RadioGroupControl,
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupLabel,
  RadioGroupRoot,
  RovingFocusGroup,
  RovingFocusItem,
  SelectArrow,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectTriggerIcon,
  SelectValue,
  SelectViewport,
  SeparatorLabel,
  SeparatorRoot,
  Slot,
  SwitchControl,
  SwitchRoot,
  SwitchThumb,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
  Tag,
  TextareaControl,
  TextareaCounter,
  TextareaRoot,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
  TreeItem,
  TreeMenuButton,
  TreeMenuCollapsible,
  TreeMenuGroup,
  TreeMenuGroupLabel,
  TreeMenuGroupRoot,
  TreeMenuItem,
  TreeMenuRoot,
  TreeMenuSub,
  TreeRoot,
  TreeVirtualizerItem,
  TreeVirtualizerRoot,
  VirtualizerContent,
  VirtualizerItem,
  VirtualizerRoot,
  VisuallyHidden,
  VisuallyHiddenInput
} from '../index';

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Header: AccordionHeader,
  Content: AccordionContent
} as {
  Root: typeof AccordionRoot;
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Header: typeof AccordionHeader;
  Content: typeof AccordionContent;
};

export const Alert = {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription,
  Content: AlertContent,
  Close: AlertClose
} as {
  Root: typeof AlertRoot;
  Title: typeof AlertTitle;
  Description: typeof AlertDescription;
  Content: typeof AlertContent;
  Close: typeof AlertClose;
};

export const AlertDialog = {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Close: AlertDialogClose
} as {
  Root: typeof AlertDialogRoot;
  Trigger: typeof AlertDialogTrigger;
  Portal: typeof AlertDialogPortal;
  Overlay: typeof AlertDialogOverlay;
  Content: typeof AlertDialogContent;
  Header: typeof AlertDialogHeader;
  Title: typeof AlertDialogTitle;
  Description: typeof AlertDialogDescription;
  Footer: typeof AlertDialogFooter;
  Close: typeof AlertDialogClose;
};

export { Arrow };

export { AspectRatio };

export const Avatar = {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback
} as {
  Root: typeof AvatarRoot;
  Image: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
};

export const Badge = {
  Root: BadgeRoot,
  Content: BadgeContent
} as {
  Root: typeof BadgeRoot;
  Content: typeof BadgeContent;
};

export const Breadcrumb = {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis
} as {
  Root: typeof BreadcrumbRoot;
  List: typeof BreadcrumbList;
  Item: typeof BreadcrumbItem;
  Link: typeof BreadcrumbLink;
  Page: typeof BreadcrumbPage;
  Separator: typeof BreadcrumbSeparator;
  Ellipsis: typeof BreadcrumbEllipsis;
};

export { Button };

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  TitleRoot: CardTitleRoot,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter
} as {
  Root: typeof CardRoot;
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  TitleRoot: typeof CardTitleRoot;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};

export const Checkbox = {
  GroupRoot: CheckboxGroupRoot,
  Root: CheckboxRoot,
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel
} as {
  GroupRoot: typeof CheckboxGroupRoot;
  Root: typeof CheckboxRoot;
  Control: typeof CheckboxControl;
  Indicator: typeof CheckboxIndicator;
  Label: typeof CheckboxLabel;
};

export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent
} as {
  Root: typeof CollapsibleRoot;
  Trigger: typeof CollapsibleTrigger;
  Content: typeof CollapsibleContent;
};

export { ConfigProvider };

export const ContextMenu = {
  Root: ContextMenuRoot,
  Trigger: ContextMenuTrigger,
  Portal: ContextMenuPortal,
  Content: ContextMenuContent,
  Anchor: ContextMenuAnchor,
  Arrow: ContextMenuArrow,
  Group: ContextMenuGroup,
  GroupLabel: ContextMenuGroupLabel,
  Item: ContextMenuItem,
  ItemIndicator: ContextMenuItemIndicator,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioItem: ContextMenuRadioItem,
  Sub: ContextMenuSub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
  Separator: ContextMenuSeparator,
  CheckboxGroup: ContextMenuCheckboxGroup,
  RadioGroup: ContextMenuRadioGroup
} as {
  Root: typeof ContextMenuRoot;
  Trigger: typeof ContextMenuTrigger;
  Portal: typeof ContextMenuPortal;
  Content: typeof ContextMenuContent;
  Anchor: typeof ContextMenuAnchor;
  Arrow: typeof ContextMenuArrow;
  Group: typeof ContextMenuGroup;
  GroupLabel: typeof ContextMenuGroupLabel;
  Item: typeof ContextMenuItem;
  ItemIndicator: typeof ContextMenuItemIndicator;
  CheckboxItem: typeof ContextMenuCheckboxItem;
  RadioItem: typeof ContextMenuRadioItem;
  Sub: typeof ContextMenuSub;
  SubTrigger: typeof ContextMenuSubTrigger;
  SubContent: typeof ContextMenuSubContent;
  Separator: typeof ContextMenuSeparator;
  CheckboxGroup: typeof ContextMenuCheckboxGroup;
  RadioGroup: typeof ContextMenuRadioGroup;
};

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose
} as {
  Root: typeof DialogRoot;
  Trigger: typeof DialogTrigger;
  Portal: typeof DialogPortal;
  Overlay: typeof DialogOverlay;
  Content: typeof DialogContent;
  Header: typeof DialogHeader;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
  Footer: typeof DialogFooter;
  Close: typeof DialogClose;
};

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Portal: DropdownMenuPortal,
  Content: DropdownMenuContent,
  Anchor: DropdownMenuAnchor,
  Arrow: DropdownMenuArrow,
  Group: DropdownMenuGroup,
  GroupLabel: DropdownMenuGroupLabel,
  Item: DropdownMenuItem,
  ItemIndicator: DropdownMenuItemIndicator,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioItem: DropdownMenuRadioItem,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  Separator: DropdownMenuSeparator,
  CheckboxGroup: DropdownMenuCheckboxGroup,
  RadioGroup: DropdownMenuRadioGroup
} as {
  Root: typeof DropdownMenuRoot;
  Trigger: typeof DropdownMenuTrigger;
  Portal: typeof DropdownMenuPortal;
  Content: typeof DropdownMenuContent;
  Anchor: typeof DropdownMenuAnchor;
  Arrow: typeof DropdownMenuArrow;
  Group: typeof DropdownMenuGroup;
  GroupLabel: typeof DropdownMenuGroupLabel;
  Item: typeof DropdownMenuItem;
  ItemIndicator: typeof DropdownMenuItemIndicator;
  CheckboxItem: typeof DropdownMenuCheckboxItem;
  RadioItem: typeof DropdownMenuRadioItem;
  Sub: typeof DropdownMenuSub;
  SubTrigger: typeof DropdownMenuSubTrigger;
  SubContent: typeof DropdownMenuSubContent;
  Separator: typeof DropdownMenuSeparator;
  CheckboxGroup: typeof DropdownMenuCheckboxGroup;
  RadioGroup: typeof DropdownMenuRadioGroup;
};

export const Form = {
  Field: FormField,
  Label: FormLabel,
  Description: FormDescription,
  Error: FormError
} as {
  Field: typeof FormField;
  Label: typeof FormLabel;
  Description: typeof FormDescription;
  Error: typeof FormError;
};

export const Input = {
  Root: InputRoot,
  Control: InputControl
} as {
  Root: typeof InputRoot;
  Control: typeof InputControl;
};

export { Kbd };

export { Label };

export const Layout = {
  Root: LayoutRoot,
  Header: LayoutHeader,
  Main: LayoutMain,
  Sidebar: LayoutSidebar,
  Footer: LayoutFooter,
  Rail: LayoutRail,
  Mobile: LayoutMobile,
  Tab: LayoutTab,
  Trigger: LayoutTrigger
} as {
  Root: typeof LayoutRoot;
  Header: typeof LayoutHeader;
  Main: typeof LayoutMain;
  Sidebar: typeof LayoutSidebar;
  Footer: typeof LayoutFooter;
  Rail: typeof LayoutRail;
  Mobile: typeof LayoutMobile;
  Tab: typeof LayoutTab;
  Trigger: typeof LayoutTrigger;
};

export { Link };

export const List = {
  Root: ListRoot,
  Item: ListItem,
  Title: ListTitle,
  Description: ListDescription,
  Content: ListContent
} as {
  Root: typeof ListRoot;
  Item: typeof ListItem;
  Title: typeof ListTitle;
  Description: typeof ListDescription;
  Content: typeof ListContent;
};

export const Listbox = {
  Root: ListboxRoot,
  Content: ListboxContent,
  Group: ListboxGroup,
  GroupLabel: ListboxGroupLabel,
  Item: ListboxItem,
  ItemIndicator: ListboxItemIndicator,
  Filter: ListboxFilter,
  Virtualizer: ListboxVirtualizer
} as {
  Root: typeof ListboxRoot;
  Content: typeof ListboxContent;
  Group: typeof ListboxGroup;
  GroupLabel: typeof ListboxGroupLabel;
  Item: typeof ListboxItem;
  ItemIndicator: typeof ListboxItemIndicator;
  Filter: typeof ListboxFilter;
  Virtualizer: typeof ListboxVirtualizer;
};

export const Menu = {
  Root: MenuRoot,
  Portal: MenuPortal,
  Content: MenuContent,
  Anchor: MenuAnchor,
  Arrow: MenuArrow,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  Item: MenuItem,
  ItemIndicator: MenuItemIndicator,
  CheckboxItem: MenuCheckboxItem,
  RadioItem: MenuRadioItem,
  Sub: MenuSub,
  SubTrigger: MenuSubTrigger,
  SubContent: MenuSubContent,
  Separator: MenuSeparator,
  CheckboxGroup: MenuCheckboxGroup,
  RadioGroup: MenuRadioGroup
} as {
  Root: typeof MenuRoot;
  Portal: typeof MenuPortal;
  Content: typeof MenuContent;
  Anchor: typeof MenuAnchor;
  Arrow: typeof MenuArrow;
  Group: typeof MenuGroup;
  GroupLabel: typeof MenuGroupLabel;
  Item: typeof MenuItem;
  ItemIndicator: typeof MenuItemIndicator;
  CheckboxItem: typeof MenuCheckboxItem;
  RadioItem: typeof MenuRadioItem;
  Sub: typeof MenuSub;
  SubTrigger: typeof MenuSubTrigger;
  SubContent: typeof MenuSubContent;
  Separator: typeof MenuSeparator;
  CheckboxGroup: typeof MenuCheckboxGroup;
  RadioGroup: typeof MenuRadioGroup;
};

export const NavigationMenu = {
  Root: NavigationMenuRoot,
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent,
  Link: NavigationMenuLink,
  SubList: NavigationMenuSubList,
  Viewport: NavigationMenuViewport,
  Indicator: NavigationMenuIndicator
} as {
  Root: typeof NavigationMenuRoot;
  List: typeof NavigationMenuList;
  Item: typeof NavigationMenuItem;
  Trigger: typeof NavigationMenuTrigger;
  Content: typeof NavigationMenuContent;
  Link: typeof NavigationMenuLink;
  SubList: typeof NavigationMenuSubList;
  Viewport: typeof NavigationMenuViewport;
  Indicator: typeof NavigationMenuIndicator;
};

export const NumberInput = {
  Root: NumberInputRoot,
  Control: NumberInputControl,
  Increment: NumberInputIncrement,
  Decrement: NumberInputDecrement
} as {
  Root: typeof NumberInputRoot;
  Control: typeof NumberInputControl;
  Increment: typeof NumberInputIncrement;
  Decrement: typeof NumberInputDecrement;
};

export const PageTabs = {
  Root: PageTabsRoot,
  Item: PageTabsItem,
  Close: PageTabsClose,
  Pin: PageTabsPin
} as {
  Root: typeof PageTabsRoot;
  Item: typeof PageTabsItem;
  Close: typeof PageTabsClose;
  Pin: typeof PageTabsPin;
};

export const Pagination = {
  Root: PaginationRoot,
  List: PaginationList,
  ListItem: PaginationListItem,
  First: PaginationFirst,
  Prev: PaginationPrev,
  Next: PaginationNext,
  Last: PaginationLast,
  Ellipsis: PaginationEllipsis
} as {
  Root: typeof PaginationRoot;
  List: typeof PaginationList;
  ListItem: typeof PaginationListItem;
  First: typeof PaginationFirst;
  Prev: typeof PaginationPrev;
  Next: typeof PaginationNext;
  Last: typeof PaginationLast;
  Ellipsis: typeof PaginationEllipsis;
};

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Portal: PopoverPortal,
  Positioner: PopoverPositioner,
  Popup: PopoverPopup,
  Arrow: PopoverArrow,
  Close: PopoverClose
} as {
  Root: typeof PopoverRoot;
  Trigger: typeof PopoverTrigger;
  Anchor: typeof PopoverAnchor;
  Portal: typeof PopoverPortal;
  Positioner: typeof PopoverPositioner;
  Popup: typeof PopoverPopup;
  Arrow: typeof PopoverArrow;
  Close: typeof PopoverClose;
};

export const Popper = {
  Root: PopperRoot,
  Anchor: PopperAnchor,
  Popup: PopperPopup,
  Arrow: PopperArrow,
  Positioner: PopperPositioner
} as {
  Root: typeof PopperRoot;
  Anchor: typeof PopperAnchor;
  Popup: typeof PopperPopup;
  Arrow: typeof PopperArrow;
  Positioner: typeof PopperPositioner;
};

export { Portal };

export { Primitive };

export const RadioGroup = {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
  Control: RadioGroupControl,
  Indicator: RadioGroupIndicator,
  Label: RadioGroupLabel
} as {
  Root: typeof RadioGroupRoot;
  Item: typeof RadioGroupItem;
  Control: typeof RadioGroupControl;
  Indicator: typeof RadioGroupIndicator;
  Label: typeof RadioGroupLabel;
};

export const RovingFocus = {
  Group: RovingFocusGroup,
  Item: RovingFocusItem
} as {
  Group: typeof RovingFocusGroup;
  Item: typeof RovingFocusItem;
};

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Portal: SelectPortal,
  Content: SelectContent,
  Viewport: SelectViewport,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Item: SelectItem,
  ItemIndicator: SelectItemIndicator,
  ItemText: SelectItemText,
  Value: SelectValue,
  TriggerIcon: SelectTriggerIcon,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
  Separator: SelectSeparator,
  Arrow: SelectArrow
} as {
  Root: typeof SelectRoot;
  Trigger: typeof SelectTrigger;
  Portal: typeof SelectPortal;
  Content: typeof SelectContent;
  Viewport: typeof SelectViewport;
  Group: typeof SelectGroup;
  GroupLabel: typeof SelectGroupLabel;
  Item: typeof SelectItem;
  ItemIndicator: typeof SelectItemIndicator;
  ItemText: typeof SelectItemText;
  Value: typeof SelectValue;
  TriggerIcon: typeof SelectTriggerIcon;
  ScrollUpButton: typeof SelectScrollUpButton;
  ScrollDownButton: typeof SelectScrollDownButton;
  Separator: typeof SelectSeparator;
  Arrow: typeof SelectArrow;
};

export const Separator = {
  Root: SeparatorRoot,
  Label: SeparatorLabel
} as {
  Root: typeof SeparatorRoot;
  Label: typeof SeparatorLabel;
};

export { Slot };

export const Switch = {
  Root: SwitchRoot,
  Control: SwitchControl,
  Thumb: SwitchThumb
} as {
  Root: typeof SwitchRoot;
  Control: typeof SwitchControl;
  Thumb: typeof SwitchThumb;
};

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  Indicator: TabsIndicator
} as {
  Root: typeof TabsRoot;
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Content: typeof TabsContent;
  Indicator: typeof TabsIndicator;
};

export { Tag };

export const Textarea = {
  Root: TextareaRoot,
  Control: TextareaControl,
  Counter: TextareaCounter
} as {
  Root: typeof TextareaRoot;
  Control: typeof TextareaControl;
  Counter: typeof TextareaCounter;
};

export const Toast = {
  Provider: ToastProvider,
  Root: ToastRoot,
  Viewport: ToastViewport,
  Portal: ToastPortal,
  Action: ToastAction,
  Title: ToastTitle,
  Description: ToastDescription,
  Close: ToastClose
} as {
  Provider: typeof ToastProvider;
  Root: typeof ToastRoot;
  Viewport: typeof ToastViewport;
  Portal: typeof ToastPortal;
  Action: typeof ToastAction;
  Title: typeof ToastTitle;
  Description: typeof ToastDescription;
  Close: typeof ToastClose;
};

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Positioner: TooltipPositioner,
  Popup: TooltipPopup,
  Arrow: TooltipArrow
} as {
  Root: typeof TooltipRoot;
  Trigger: typeof TooltipTrigger;
  Portal: typeof TooltipPortal;
  Positioner: typeof TooltipPositioner;
  Popup: typeof TooltipPopup;
  Arrow: typeof TooltipArrow;
};

export const Tree = {
  Root: TreeRoot,
  Item: TreeItem,
  VirtualizerRoot: TreeVirtualizerRoot,
  VirtualizerItem: TreeVirtualizerItem
} as {
  Root: typeof TreeRoot;
  Item: typeof TreeItem;
  VirtualizerRoot: typeof TreeVirtualizerRoot;
  VirtualizerItem: typeof TreeVirtualizerItem;
};

export const TreeMenu = {
  Root: TreeMenuRoot,
  GroupRoot: TreeMenuGroupRoot,
  Group: TreeMenuGroup,
  GroupLabel: TreeMenuGroupLabel,
  Item: TreeMenuItem,
  Button: TreeMenuButton,
  Collapsible: TreeMenuCollapsible,
  Sub: TreeMenuSub
} as {
  Root: typeof TreeMenuRoot;
  GroupRoot: typeof TreeMenuGroupRoot;
  Group: typeof TreeMenuGroup;
  GroupLabel: typeof TreeMenuGroupLabel;
  Item: typeof TreeMenuItem;
  Button: typeof TreeMenuButton;
  Collapsible: typeof TreeMenuCollapsible;
  Sub: typeof TreeMenuSub;
};

export const Virtualizer = {
  Root: VirtualizerRoot,
  Content: VirtualizerContent,
  Item: VirtualizerItem
} as {
  Root: typeof VirtualizerRoot;
  Content: typeof VirtualizerContent;
  Item: typeof VirtualizerItem;
};

export { VisuallyHidden, VisuallyHiddenInput };
