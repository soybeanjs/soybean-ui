import { PRECISION } from './constants';

export function fuzzyCompareNumbers(actual: number, expected: number, fractionDigits: number = PRECISION): number {
  const actualNumber = Number.parseFloat(actual.toFixed(fractionDigits));
  const expectedNumber = Number.parseFloat(expected.toFixed(fractionDigits));

  const delta = actualNumber - expectedNumber;
  if (delta === 0) return 0;
  return delta > 0 ? 1 : -1;
}

export function fuzzyNumbersEqual(actual: number, expected: number, fractionDigits?: number): boolean {
  return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}
