<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '@/i18n'
import TrainerFlow from '@/modules/TrainerFlow.vue'
import JournalView from '@/modules/JournalView.vue'

const { t, tm, locale, setLocale } = useI18n()
const tab = ref('trainer')
const verbs = computed(() => tm('brand.verbs'))
</script>

<template>
  <div class="shell">
    <header class="topbar">
      <a class="brand" href="./" :aria-label="verbs.join(' ')">
        <span v-for="(v, i) in verbs" :key="i" class="verb" :style="{ '--i': i }">
          {{ v }}<i>!</i>
        </span>
      </a>

      <div class="controls">
        <nav class="tabs" aria-label="sections">
          <button :class="{ on: tab === 'trainer' }" @click="tab = 'trainer'">{{ t('tabs.trainer') }}</button>
          <button :class="{ on: tab === 'journal' }" @click="tab = 'journal'">{{ t('tabs.journal') }}</button>
        </nav>
        <div class="lang" role="group" :aria-label="t('lang.label')">
          <button :class="{ on: locale === 'ru' }" @click="setLocale('ru')">{{ t('lang.ru') }}</button>
          <button :class="{ on: locale === 'en' }" @click="setLocale('en')">{{ t('lang.en') }}</button>
        </div>
      </div>
    </header>

    <main class="content">
      <TrainerFlow v-show="tab === 'trainer'" />
      <JournalView v-if="tab === 'journal'" />
    </main>

    <footer class="foot">
      <p>{{ t('footer.line1') }}</p>
      <p class="muted">{{ t('footer.line2') }}</p>
    </footer>
  </div>
</template>

<style scoped>
.shell {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: clamp(1rem, 0.4rem + 2vw, 2rem) var(--gutter) 3rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.topbar {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem 1.5rem; flex-wrap: wrap;
  padding-bottom: 1.4rem; margin-bottom: 1.8rem;
  border-bottom: 1px solid var(--line-soft);
}
.brand { display: flex; flex-wrap: wrap; gap: 0.1rem 0.7rem; text-decoration: none; }
.verb {
  font-family: var(--ff-display); font-weight: 800;
  font-size: clamp(1.05rem, 0.8rem + 1.1vw, 1.7rem);
  letter-spacing: -0.02em; line-height: 1; color: var(--fg);
  animation: drop 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--i) * 0.08s);
}
.verb i { font-style: normal; color: var(--kr); }
.verb:nth-child(2) i { color: var(--rs); }
.verb:nth-child(3) i { color: var(--pr); }

.controls { display: flex; align-items: center; gap: 0.6rem; }
.tabs, .lang { display: flex; gap: 0.3rem; padding: 0.25rem; border-radius: 12px; background: var(--ink-850); border: 1px solid var(--line-soft); }
.tabs button, .lang button {
  padding: 0.5rem 1.1rem; border-radius: 9px; border: 0; background: transparent;
  color: var(--fg-mute); font-weight: 600; font-size: 0.95rem; transition: all 0.16s;
}
.lang button { padding: 0.5rem 0.7rem; font-size: 0.82rem; letter-spacing: 0.04em; }
.tabs button:hover, .lang button:hover { color: var(--fg-dim); }
.tabs button.on, .lang button.on { background: var(--ink-750); color: var(--fg); }

.content { flex: 1; }

.foot {
  margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--line-soft);
  color: var(--fg-mute); font-size: 0.86rem; line-height: 1.6;
}
.foot p { margin: 0 0 0.4rem; max-width: 75ch; }
.foot .muted { color: color-mix(in srgb, var(--fg-mute) 70%, transparent); }

@keyframes drop { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 600px) {
  .controls { width: 100%; justify-content: space-between; }
}
</style>
