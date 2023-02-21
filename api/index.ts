import { NitroFetchRequest } from 'nitropack'

export const get = (url: NitroFetchRequest) => $fetch(url)
export const post = <T extends Record<string, any>>(url: NitroFetchRequest, data: T) =>
  $fetch(url, {
    method: 'POST',
    body: data,
  })
