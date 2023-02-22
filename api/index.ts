import { NitroFetchRequest } from 'nitropack'

export const get = <R extends Record<string, any> | void>(
  url: NitroFetchRequest
): Promise<R | void> => $fetch(url)
export const post = <
  S extends Record<string, any>,
  R extends Record<string, any>
>(
  url: NitroFetchRequest,
  data: S
): Promise<R | void> =>
  $fetch(url, {
    method: 'POST',
    body: data,
  })
