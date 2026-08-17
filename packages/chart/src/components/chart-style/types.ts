/**
 * Properties for the SChartStyle component.
 *
 * Internal helper rendered by `SChartContainer`; it injects the scoped
 * `--color-{key}` CSS variables for a single chart via a `<style>` element.
 */
export interface ChartStyleProps {
  /**
   * Chart id used to scope the generated CSS selectors.
   */
  id?: string;
}
