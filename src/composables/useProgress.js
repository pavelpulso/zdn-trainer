import { reactive, readonly, watch } from 'vue'

const KEY = 'zdn-progress-v1'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { practiced: 0, streak: 0, lastDay: '' }
}

const state = reactive(load())

watch(state, (v) => {
  try { localStorage.setItem(KEY, JSON.stringify(v)) } catch { /* ignore */ }
})

const dayKey = (d) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function useProgress() {
  function touch() {
    const now = new Date()
    const today = dayKey(now)
    const yesterday = dayKey(new Date(now.getTime() - 86400000))
    if (state.lastDay === today) {
      // same day — count practice, keep streak
    } else if (state.lastDay === yesterday) {
      state.streak += 1
    } else {
      state.streak = 1
    }
    state.lastDay = today
    state.practiced += 1
  }
  return { progress: readonly(state), touch }
}
