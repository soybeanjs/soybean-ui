export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new RangeError('chunk size must be greater than 0');
  }

  const result: T[][] = [];

  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size));
  }

  return result;
}
