import { useCollection } from '../../../../src/composables';

interface DemoItemData {
  label: string;
  value: string;
}

export const { provideCollectionContext, useCollectionContext, useCollectionItem } =
  useCollection<DemoItemData>('Demo');
