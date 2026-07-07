import { ref, watch } from 'vue'

const KEY = 'zdn-journal-v1'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const entries = ref(load())

watch(
  entries,
  (val) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(val))
    } catch {
      /* storage full or unavailable — keep session state only */
    }
  },
  { deep: true },
)

export function useJournal() {
  function add(entry) {
    entries.value.unshift({
      id: `${Date.now()}-${entries.value.length}`,
      createdAt: new Date().toISOString(),
      ...entry,
    })
  }

  function remove(id) {
    entries.value = entries.value.filter((e) => e.id !== id)
  }

  function clear() {
    entries.value = []
  }

  return { entries, add, remove, clear }
}
