import { safeParseAsync } from 'valibot';
import type { BaseIssue, BaseSchema, BaseSchemaAsync, InferOutput } from 'valibot';
import { toNestError } from '../../core/shared';
import type { FormErrors } from '../../core/types';

export type ValibotResolver = <
  T extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
>(
  schema: T
) => (values: InferOutput<T>) => Promise<FormErrors<InferOutput<T>>>;

export const valibotResolver: ValibotResolver = schema => async values => {
  try {
    const result = await safeParseAsync(schema, values);
    if (!result.success) {
      return toNestError(parseErrorSchema(result.issues));
    }

    return {};
  } catch {
    return {};
  }
};

function parseErrorSchema(valibotIssues: BaseIssue<unknown>[]) {
  const errors: Record<string, string> = {};

  while (valibotIssues.length) {
    const issue = valibotIssues[0];

    if (issue?.path) {
      const path = issue.path.map(pares => pares.key).join('.');

      if (!errors[path]) {
        errors[path] = issue.message;
      }
    }

    valibotIssues.shift();
  }

  return errors;
}
