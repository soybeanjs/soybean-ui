import {
  TabsContent as STabsContent,
  TabsIndicator as STabsIndicator,
  TabsList as STabsList,
  TabsRoot as STabsRoot,
  TabsTrigger as STabsTrigger
} from '@headless';
import STabs from './tabs.vue';

export { STabs, STabsRoot, STabsContent, STabsIndicator, STabsList, STabsTrigger };

export type {
  TabsProps,
  TabsEmits,
  TabsRootProps,
  TabsRootEmits,
  TabsContentProps,
  TabsIndicatorProps,
  TabsListProps,
  TabsTriggerProps,
  TabsActivationMode,
  TabsOptionData
} from './types';
