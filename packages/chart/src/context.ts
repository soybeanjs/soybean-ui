import { useContext } from '@soybeanjs/headless/composables';
import type { ChartContext } from './types';

/**
 * Chart context bridge.
 *
 * `SChartContainer` provides `{ id, config }`; `SChartLegendContent` and
 * `SChartStyle` consume it to resolve colors and scoped selectors.
 */
export const [provideChartContext, useChartContext] = useContext<ChartContext>('Chart');
