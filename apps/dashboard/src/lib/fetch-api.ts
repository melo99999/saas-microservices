export async function fetchApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(path, options);
  return response.json() as Promise<T>;
}
