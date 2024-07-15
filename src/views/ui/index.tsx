import { defineAsyncComponent, defineComponent } from 'vue';
import type { VNode } from 'vue';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@soybean-unify/shadcn-ui';

interface TabConfig {
  key: string;
  label: string;
  component: () => VNode;
}

function getTabs() {
  const tabs: TabConfig[] = [];

  const files = import.meta.glob('./modules/*.tsx');
  Object.entries(files).forEach(item => {
    const [filePath, value] = item;
    const key = filePath.replace('./modules/', '').replace('.tsx', '');

    tabs.push({
      key,
      label: key,
      component: defineAsyncComponent(value as any)
    });
  });

  return tabs;
}

export default defineComponent(
  () => {
    const tabs = getTabs();

    return () => (
      <div class="p-16px">
        <Card>
          <CardHeader>
            <CardTitle>UI Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="pb-16px text-center text-18px fw-700">SoybeanUnify</div>
            <Tabs defaultValue="button" class="w-full">
              <TabsList class="h-auto flex-wrap justify-start gap-y-8px">
                {tabs.map(tab => (
                  <TabsTrigger key={tab.key} value={tab.key}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map(tab => (
                <TabsContent key={tab.key} value={tab.key}>
                  <div class="pt-18px">
                    <tab.component />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  },
  { name: 'App' }
);
