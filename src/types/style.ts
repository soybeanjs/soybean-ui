export type ClassValue = string | null | undefined | Record<string, boolean> | ClassValue[];
export type ClassValueProp = {
  /** class name */
  class?: ClassValue;
};
