import type { ZodType, z } from 'zod';
import { toNestError } from '../../core/shared';
import type { FormErrors } from '../../core/types';

export type ZodResolver = <T extends ZodType>(schema: T) => (values: z.infer<T>) => Promise<FormErrors<z.infer<T>>>;

export const zodResolver: ZodResolver = schema => async values => {
  try {
    const result = await schema.safeParseAsync(values);
    if (!result.success) {
      return toNestError(parseErrorSchema(result.error.issues));
    }

    return {};
  } catch {
    return {};
  }
};

function parseErrorSchema(zodErrors: z.core.$ZodIssue[]) {
  const errors: Record<string, string> = {};

  while (zodErrors.length) {
    const issue = zodErrors[0];
    if (!issue) {
      break;
    }

    const { path: _parse, message } = issue;
    const path = _parse.join('.');

    if (!errors[path]) {
      errors[path] = message;
    }

    zodErrors.shift();
  }

  return errors;
}
