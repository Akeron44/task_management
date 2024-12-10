export function getNonMatchingProperties(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
      result[key] = obj2[key];
    }
  }

  return result;
}
