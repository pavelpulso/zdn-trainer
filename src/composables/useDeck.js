import { reactive, readonly, computed, watch } from 'vue'
import { useI18n } from '@/i18n'

import hooksRu from '@/data/hooks.json'
import hooksEn from '@/data/hooks.en.json'
import amRu from '@/data/cards/am.json'
import amEn from '@/data/cards/am.en.json'
import zaRu from '@/data/cards/za.json'
import zaEn from '@/data/cards/za.en.json'
import prRu from '@/data/cards/pr.json'
import prEn from '@/data/cards/pr.en.json'
import rsRu from '@/data/cards/rs.json'
import rsEn from '@/data/cards/rs.en.json'
import vnRu from '@/data/cards/vn.json'
import vnEn from '@/data/cards/vn.en.json'

const flatten = (cards) =>
  cards.flatMap((c) => c.items.map((text) => ({ text, file: c.file })))

const build = (hooks, am, za, pr, rs, vn) => ({
  hooks: hooks.standalone.map((h) => h.text),
  scenarios: hooks.scenarios,
  am: flatten(am.cards),
  za: flatten(za.cards),
  pr: flatten(pr.cards),
  rs: rs.cards,
  vn,
})

const DATA = {
  ru: build(hooksRu, amRu, zaRu, prRu, rsRu, vnRu),
  en: build(hooksEn, amEn, zaEn, prEn, rsEn, vnEn),
}

function pick(pool, prev) {
  if (!pool.length) return null
  if (pool.length === 1) return pool[0]
  let v
  do { v = pool[Math.floor(Math.random() * pool.length)] } while (v === prev)
  return v
}

const state = reactive({
  mode: 'hooks', // 'hooks' | 'scenarios'
  sectionIdx: null, // null = all, else 0..9
  hook: '',
  scenario: null,
  amortization: null,
  question: null,
  strategy: null,
  principle: null,
  formula: null,
  round: 0,
  nonce: { hook: 0, am: 0, za: 0, pr: 0, rs: 0 },
})

export function useDeck() {
  const { locale } = useI18n()
  const data = () => DATA[locale.value]

  const sections = computed(() => {
    const seen = []
    for (const s of data().scenarios) if (!seen.includes(s.section)) seen.push(s.section)
    return seen
  })

  function newCombination() {
    const d = data()
    if (state.mode === 'scenarios') {
      let pool = d.scenarios
      if (state.sectionIdx != null) {
        const name = sections.value[state.sectionIdx]
        pool = d.scenarios.filter((s) => s.section === name)
      }
      const sc = pick(pool, state.scenario)
      state.scenario = sc
      state.hook = sc ? sc.phrase : ''
    } else {
      state.scenario = null
      state.hook = pick(d.hooks, state.hook)
    }
    state.amortization = pick(d.am, state.amortization)
    state.question = pick(d.za, state.question)
    state.principle = pick(d.pr, state.principle)
    state.strategy = pick(d.rs, state.strategy)
    state.formula = d.vn
    state.round += 1
    for (const k in state.nonce) state.nonce[k] += 1
  }

  function rerollHook() {
    const d = data()
    if (state.mode === 'scenarios') {
      let pool = d.scenarios
      if (state.sectionIdx != null) {
        const name = sections.value[state.sectionIdx]
        pool = d.scenarios.filter((s) => s.section === name)
      }
      const sc = pick(pool, state.scenario)
      state.scenario = sc
      state.hook = sc ? sc.phrase : ''
    } else {
      state.hook = pick(d.hooks, state.hook)
    }
    state.nonce.hook += 1
  }

  function rerollOne(key) {
    if (key === 'hook') return rerollHook()
    const d = data()
    const map = { am: 'amortization', za: 'question', pr: 'principle', rs: 'strategy' }
    const poolKey = { am: 'am', za: 'za', pr: 'pr', rs: 'rs' }[key]
    const field = map[key]
    if (!field) return
    state[field] = pick(d[poolKey], state[field])
    state.nonce[key] += 1
  }

  function setMode(m) {
    if (m === state.mode) return
    state.mode = m
    newCombination()
  }
  function setSection(idx) {
    state.sectionIdx = idx
    if (state.mode === 'scenarios') newCombination()
  }

  if (state.round === 0) newCombination()

  const counts = computed(() => ({
    hooks: data().hooks.length,
    am: data().am.length,
    za: data().za.length,
    pr: data().pr.length,
    rs: data().rs.length,
    scenarios: data().scenarios.length,
  }))

  return { deck: readonly(state), newCombination, rerollOne, setMode, setSection, sections, counts }
}

// re-roll into the active language whenever locale changes (module-level, once)
let localeWatcherBound = false
export function bindLocaleReroll() {
  if (localeWatcherBound) return
  localeWatcherBound = true
  const { locale } = useI18n()
  watch(locale, () => {
    // rebuild current combination in the new language
    const d = DATA[locale.value]
    if (state.mode === 'scenarios') {
      const secName = (() => {
        const seen = []
        for (const s of d.scenarios) if (!seen.includes(s.section)) seen.push(s.section)
        return state.sectionIdx != null ? seen[state.sectionIdx] : null
      })()
      let pool = secName ? d.scenarios.filter((s) => s.section === secName) : d.scenarios
      const sameId = state.scenario ? pool.find((s) => s.id === state.scenario.id) : null
      state.scenario = sameId || pool[Math.floor(Math.random() * pool.length)]
      state.hook = state.scenario ? state.scenario.phrase : ''
    } else {
      state.hook = d.hooks[Math.floor(Math.random() * d.hooks.length)]
    }
    state.amortization = d.am[Math.floor(Math.random() * d.am.length)]
    state.question = d.za[Math.floor(Math.random() * d.za.length)]
    state.principle = d.pr[Math.floor(Math.random() * d.pr.length)]
    state.strategy = d.rs[Math.floor(Math.random() * d.rs.length)]
    state.formula = d.vn
  })
}
