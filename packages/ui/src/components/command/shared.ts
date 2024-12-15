import type { AcceptableValue } from '@soybean-ui/primitive';
import type { CommandItemGroupOption, CommandItemOption } from './types';

export function isCommandGroupOption<A extends AcceptableValue>(
  option: CommandItemOption<A>
): option is CommandItemGroupOption<A> {
  return Boolean((option as CommandItemGroupOption<A>).items);
}
