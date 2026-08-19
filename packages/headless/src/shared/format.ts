/**
 * Options for formatting a numeric value for display.
 */
export interface FormatNumberOptions {
  /**
   * Number of decimal places to display.
   */
  precision?: number;
  /**
   * Character used to group thousands.
   *
   * @default ','
   */
  groupSeparator?: string;
  /**
   * Character used as the decimal separator.
   *
   * @default '.'
   */
  decimalSeparator?: string;
}

/**
 * Format a numeric value into a display string with optional precision and separators.
 *
 * This is a pure, SSR-safe helper shared by `Statistic` and other numeric display
 * components. It intentionally does not rely on `Intl.NumberFormat` so callers can
 * fully control the group/decimal separators (matching Ant Design's `Statistic`).
 *
 * @param value - The numeric value to format.
 * @param options - Formatting options.
 * @returns The formatted display string.
 */
export function formatNumber(value: number, options: FormatNumberOptions = {}) {
  const { precision, groupSeparator = ',', decimalSeparator = '.' } = options;

  if (precision == null) {
    return String(value);
  }

  const [integerPart, decimalPart = ''] = value.toFixed(precision).split('.');
  const groupedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);

  return decimalPart ? `${groupedInteger}${decimalSeparator}${decimalPart}` : groupedInteger;
}
