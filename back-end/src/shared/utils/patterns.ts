export type Result<E, T> = [E] | [undefined, T?];

export type PromiseResult<E, T> = Promise<Result<E, T>>;

export const toResultSync = <E extends Error, T>(
  cbOrValue: (() => T) | T
): Result<E, T> => {
  try {
    const result =
      typeof cbOrValue === 'function' ? (cbOrValue as () => T)() : cbOrValue;

    return [, result as T];
  } catch (error) {
    return [error as E];
  }
};

export const toResultAsync = async <E extends Error, T>(
  cbOrPromise: (() => Promise<T>) | Promise<T>
): PromiseResult<E, T> => {
  try {
    const result =
      typeof cbOrPromise === 'function'
        ? await (cbOrPromise as () => Promise<T>)()
        : await cbOrPromise;

    return [, result as T];
  } catch (error) {
    return [error as E];
  }
};
