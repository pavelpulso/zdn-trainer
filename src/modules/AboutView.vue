<script setup>
import { computed } from 'vue'
import { useI18n } from '@/i18n'

const { t, tm } = useI18n()
const items = computed(() => tm('about.items'))
const edge = (i) => ['var(--vn)', 'var(--am)', 'var(--rs)', 'var(--za)', 'var(--pr)', 'var(--kr)', 'var(--rs)'][i % 7]
</script>

<template>
  <section class="about">
    <header class="a-head">
      <h2>{{ t('about.title') }}</h2>
      <p class="lead">{{ t('about.lead') }}</p>
    </header>

    <ol class="frames">
      <li v-for="(it, i) in items" :key="i" :style="{ '--edge': edge(i) }">
        <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
        <div class="body">
          <h3>{{ it.name }}</h3>
          <p>{{ it.desc }}</p>
        </div>
      </li>
    </ol>

    <p class="source">{{ t('about.source') }}</p>
  </section>
</template>

<style scoped>
.about { max-width: 820px; display: grid; gap: 1.6rem; }
.a-head h2 { font-size: clamp(1.5rem, 1.1rem + 1.8vw, 2.3rem); }
.a-head .lead { margin: 0.7rem 0 0; color: var(--fg-dim); font-size: 1.05rem; max-width: 62ch; }
.frames { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.8rem; }
.frames li {
  display: flex; gap: 1.1rem; align-items: flex-start;
  padding: 1.1rem 1.3rem; border-radius: var(--radius);
  background: var(--ink-850); border: 1px solid var(--line-soft);
  border-left: 3px solid var(--edge);
}
.idx { font-family: var(--ff-display); font-weight: 800; font-size: 1.1rem; color: var(--edge); line-height: 1.4; flex: none; }
.body { display: grid; gap: 0.3rem; }
.body h3 { font-family: var(--ff-display); font-weight: 600; font-size: 1.1rem; color: var(--fg); }
.body p { margin: 0; color: var(--fg-dim); line-height: 1.55; }
.source { margin: 0; padding-top: 0.5rem; color: var(--fg-mute); font-size: 0.85rem; font-style: italic; max-width: 62ch; }
@media (max-width: 520px) { .frames li { padding: 1rem; gap: 0.8rem; } }
</style>
