/**
 * Branded type helpers.
 *
 * Branded strings provide compile-time identity safety with zero runtime cost.
 */

declare const brand: unique symbol;

export type Brand<T, B> = T & { readonly [brand]: B };

export function createBrand<T extends string, B extends string>(value: T, _brand: B): Brand<T, B> {
  return value as Brand<T, B>;
}

export function createBrandFromString<B extends string>(
  value: string,
  _brand: B
): Brand<string, B> {
  return value as Brand<string, B>;
}
