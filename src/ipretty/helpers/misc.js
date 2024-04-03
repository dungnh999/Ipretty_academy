export function maybe(exp, d = null) {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
}

export function parseBoolean(a, defaultValue) {
  if (a === undefined) {
    return defaultValue;
  }
  return a === "true";
}

export function findValueInEnum( needle, haystack ) {
  const match = Object.entries(haystack).find(([_, value]) => value === needle);

  if (!match) {
    throw new Error(`Value ${needle} not found in enum`);
  }

  return needle ;
}