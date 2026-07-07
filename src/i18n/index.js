import { ref, computed } from 'vue'
import { messages } from './messages'

const KEY = 'zdn-lang'

function detect() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'ru' || saved === 'en') return saved
  } catch { /* ignore */ }
  const nav = (navigator.language || 'ru').toLowerCase()
  return nav.startsWith('ru') ? 'ru' : 'en'
}

const locale = ref(detect())

function apply(l) {
  document.documentElement.lang = l
}
apply(locale.value)

function resolve(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
}

function setLocale(l) {
  if (l !== 'ru' && l !== 'en') return
  locale.value = l
  try { localStorage.setItem(KEY, l) } catch { /* ignore */ }
  apply(l)
}

export function useI18n() {
  const t = (key, params) => {
    let val = resolve(messages[locale.value], key)
    if (val === undefined) val = resolve(messages.ru, key)
    if (typeof val === 'string' && params) {
      val = val.replace(/\{(\w+)\}/g, (_, k) => (params[k] ?? `{${k}}`))
    }
    return val
  }
  // pluralization for ru (few/many) and en (one/other)
  const plural = (n, forms) => {
    if (locale.value === 'ru') {
      const mod10 = n % 10
      const mod100 = n % 100
      if (mod10 === 1 && mod100 !== 11) return forms[0]
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
      return forms[2]
    }
    return n === 1 ? forms[0] : forms[1]
  }
  return {
    t,
    plural,
    locale,
    setLocale,
    tm: (key) => resolve(messages[locale.value], key) ?? resolve(messages.ru, key),
    localeTag: computed(() => (locale.value === 'ru' ? 'ru-RU' : 'en-US')),
  }
}
