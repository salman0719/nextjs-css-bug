export const getSearchQuery = <T>(
  params: Record<string, T>,
  filter?: (key: string, value: T) => boolean
): string => {
  return Object.entries(params)
    .filter(
      ([key, value]) => value !== undefined && (!filter || filter(key, value))
    )
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&');
};
