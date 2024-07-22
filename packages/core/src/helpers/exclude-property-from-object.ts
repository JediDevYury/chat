type ObjectKey = string | number | symbol;

export const excludePropertyFromObject = (obj: Record<ObjectKey, any>, properties: ObjectKey[]) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (!properties.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};
