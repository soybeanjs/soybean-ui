import type { StandardSchemaV1 } from '@standard-schema/spec';

export async function validateStandardSchema(value: unknown, schema: StandardSchemaV1) {
  const result = await schema['~standard'].validate(value);

  if (!result.issues) return {} as Record<string, string | undefined>;

  return transformFormIssues(result.issues);
}

function transformFormIssues(issues: readonly StandardSchemaV1.Issue[]) {
  const errors: Record<string, string | undefined> = {};

  issues.forEach(issue => {
    if (!issue?.path) return;

    const path = issue.path
      .map(p => {
        if (isPathSegment(p)) {
          return p.key;
        }
        return p;
      })
      .join('.');
    errors[path] = issue.message;
  });

  return errors;
}

export function isStandardSchemaValidator(validator: unknown): validator is StandardSchemaV1 {
  return Boolean(validator) && '~standard' in (validator as object);
}

function isPathSegment(value: StandardSchemaV1.PathSegment | PropertyKey): value is StandardSchemaV1.PathSegment {
  return Boolean(value) && typeof value === 'object' && 'key' in value;
}
