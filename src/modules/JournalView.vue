<script setup>
import { useJournal } from '@/composables/useJournal'
import { useI18n } from '@/i18n'

const { entries, remove, clear } = useJournal()
const { t, tm, plural, localeTag } = useI18n()

const fmt = (iso) =>
  new Date(iso).toLocaleString(localeTag.value, {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  })

function hasDiary(e) {
  return e.diary && Object.values(e.diary).some((v) => v && v.trim())
}
function diaryRows(e) {
  const labels = tm('journal.diary')
  return [
    [labels.situations, e.diary?.situations],
    [labels.wins, e.diary?.wins],
    [labels.improve, e.diary?.improve],
    [labels.next, e.diary?.next],
  ]
}
</script>

<template>
  <section class="journal">
    <header class="j-head">
      <div>
        <h2>{{ t('journal.title') }}</h2>
        <p class="j-sub">{{ t('journal.sub', { n: entries.length, word: plural(entries.length, tm('journal.words')) }) }}</p>
      </div>
      <button v-if="entries.length" class="clear" @click="clear">{{ t('journal.clear') }}</button>
    </header>

    <p v-if="!entries.length" class="empty">{{ t('journal.empty') }}</p>

    <ul v-else class="list">
      <li v-for="e in entries" :key="e.id" class="entry">
        <div class="e-top">
          <time>{{ fmt(e.createdAt) }}</time>
          <button class="del" @click="remove(e.id)" :aria-label="t('journal.clear')">✕</button>
        </div>
        <p class="e-hook">«{{ e.hook }}»</p>
        <p v-if="e.response" class="e-resp">{{ e.response }}</p>
        <p v-if="e.principle" class="e-pr">{{ t('journal.principle') }}: {{ e.principle }}</p>
        <dl v-if="hasDiary(e)" class="e-diary">
          <template v-for="([label, v]) in diaryRows(e)" :key="label">
            <div v-if="v"><dt>{{ label }}</dt><dd>{{ v }}</dd></div>
          </template>
        </dl>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.journal { display: grid; gap: 1.4rem; }
.j-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
.j-head h2 { font-size: clamp(1.4rem, 1rem + 1.6vw, 2rem); }
.j-sub { margin: 0.4rem 0 0; color: var(--fg-mute); font-size: 0.9rem; }
.clear {
  padding: 0.5rem 0.9rem; border-radius: 9px; background: transparent;
  border: 1px solid var(--line); color: var(--fg-mute); font-weight: 500;
}
.clear:hover { border-color: var(--kr); color: var(--kr); }
.empty {
  padding: 2.5rem 1.5rem; text-align: center; color: var(--fg-dim);
  border: 1px dashed var(--line); border-radius: var(--radius-lg); max-width: 52ch; margin-inline: auto;
}
.list { list-style: none; margin: 0; padding: 0; display: grid; gap: 1rem; }
.entry {
  padding: 1.2rem 1.35rem; border-radius: var(--radius);
  background: var(--ink-850); border: 1px solid var(--line-soft);
  border-left: 3px solid var(--kr);
}
.e-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; }
.e-top time { font-size: 0.8rem; color: var(--fg-mute); letter-spacing: 0.03em; }
.del { background: transparent; border: 0; color: var(--fg-mute); font-size: 0.9rem; }
.del:hover { color: var(--kr); }
.e-hook { margin: 0 0 0.5rem; font-family: var(--ff-display); font-weight: 600; color: #fff; font-size: 1.05rem; }
.e-resp { margin: 0 0 0.5rem; color: var(--fg); line-height: 1.5; }
.e-pr { margin: 0 0 0.5rem; color: var(--pr); font-size: 0.92rem; }
.e-diary { margin: 0.6rem 0 0; display: grid; gap: 0.4rem; }
.e-diary > div { display: grid; grid-template-columns: 130px 1fr; gap: 0.6rem; }
.e-diary dt { color: var(--fg-mute); font-size: 0.82rem; }
.e-diary dd { margin: 0; color: var(--fg-dim); font-size: 0.92rem; }
@media (max-width: 620px) { .e-diary > div { grid-template-columns: 1fr; gap: 0.1rem; } }
</style>
