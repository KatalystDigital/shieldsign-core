declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
  var __shieldsign_util_remember: Map<string, any>;
}

export function remember<T>(name: string, getValue: () => T): T {
  const thusly = globalThis;

  if (!thusly.__shieldsign_util_remember) {
    thusly.__shieldsign_util_remember = new Map();
  }

  if (!thusly.__shieldsign_util_remember.has(name)) {
    thusly.__shieldsign_util_remember.set(name, getValue());
  }

  return thusly.__shieldsign_util_remember.get(name);
}
