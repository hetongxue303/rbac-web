import cookie from 'js-cookie'

export const getCookie = (name: string): string => cookie.get(name)

export const getCookieAll = (): string => cookie.get()

export const setCookie = (name: string, value: any) => cookie.set(name, value)

export const setCookieDate = (name: string, value: any, day: number) => cookie.set(name, value, {expires: day})

export const removeCookie = (name: string) => cookie.remove(name)
