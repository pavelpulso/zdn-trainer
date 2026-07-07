<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '@/i18n'
import TechniqueIcon from '@/components/TechniqueIcon.vue'

const props = defineProps({
  cat: { type: String, required: true }, // am | za | pr | rs | vn
  items: { type: Array, default: () => [] },
  formula: { type: String, default: '' },
  manipulation: { type: String, default: '' },
  response: { type: String, default: '' },
  file: { type: String, default: '' },
  compact: { type: Boolean, default: false },
  refreshable: { type: Boolean, default: false },
})

const emit = defineEmits(['refresh'])
const { t } = useI18n()

const edge = computed(() => `var(--${props.cat})`)
const variant = computed(() => (props.cat === 'rs' || props.cat === 'vn' ? 'compose' : 'list'))
const imageSrc = computed(() => (props.file ? `./cards/${props.cat}/${props.file}` : ''))

const showOriginal = ref(false)
</script>

<template>
  <article class="tcard" :class="[cat, { compact }]" :style="{ '--edge': edge }">
    <header>
      <span class="label"><TechniqueIcon :cat="cat" /> {{ t(`tech.${cat}.label`) }}</span>
      <span class="right">
        <span class="hint">{{ t(`tech.${cat}.hint`) }}</span>
        <button v-if="refreshable" class="refresh" :title="t('card.refresh')" :aria-label="t('card.refresh')"
          @click="emit('refresh')">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5" />
          </svg>
        </button>
      </span>
    </header>

    <ol v-if="variant === 'list'" class="items">
      <li v-for="(it, i) in items" :key="i">
        <span class="n">{{ i + 1 }}</span>
        <span class="txt">{{ it.text ?? it }}</span>
      </li>
    </ol>

    <div v-else class="compose">
      <p v-if="formula" class="formula">{{ formula }}</p>
      <div v-if="manipulation" class="ex">
        <p class="ex-manip">«{{ manipulation }}»</p>
        <p class="ex-resp">{{ response }}</p>
      </div>
    </div>

    <button v-if="imageSrc" class="orig-toggle" @click="showOriginal = !showOriginal">
      {{ showOriginal ? t('original.hide') : t('original.show') }}
    </button>
    <Transition name="fade">
      <div v-if="showOriginal && imageSrc" class="orig">
        <img :src="imageSrc" :alt="t(`tech.${cat}.label`)" loading="lazy" />
      </div>
    </Transition>
  </article>
</template>

<style scoped>
.tcard {
  position: relative;
  padding: 1.3rem 1.4rem;
  border-radius: var(--radius);
  background: var(--ink-800);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-card);
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tcard::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  border-radius: var(--radius) var(--radius) 0 0;
  background: var(--edge);
  opacity: 0.9;
}
header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.label {
  display: inline-flex; align-items: center; gap: 0.45rem;
  font-family: var(--ff-display);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--edge);
  letter-spacing: -0.01em;
}
.label svg { flex: none; }
.right { display: inline-flex; align-items: center; gap: 0.5rem; }
.hint { font-size: 0.72rem; letter-spacing: 0.04em; color: var(--fg-mute); text-align: right; }
.refresh { flex: none; width: 1.7rem; height: 1.7rem; display: grid; place-items: center; border-radius: 8px; background: var(--ink-750); border: 1px solid var(--line); color: var(--fg-dim); transition: transform 0.3s, color 0.15s, border-color 0.15s; }
.refresh:hover { color: var(--edge); border-color: var(--edge); }
.refresh:active { transform: rotate(-180deg); }

.items { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.6rem; }
.items li { display: flex; gap: 0.7rem; align-items: baseline; }
.items .n {
  flex: none; width: 1.4rem;
  font-family: var(--ff-display); font-weight: 600; font-size: 0.82rem;
  color: var(--edge); opacity: 0.85;
}
.items .txt { color: var(--fg); font-size: 1rem; line-height: 1.4; }
.compact .items .txt { font-size: 0.94rem; }

.compose { display: grid; gap: 1rem; }
.formula {
  margin: 0; padding: 0.85rem 1rem; border-radius: 10px;
  background: color-mix(in srgb, var(--edge) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--edge) 30%, transparent);
  font-family: var(--ff-display); font-weight: 400; font-size: 0.95rem; line-height: 1.4; color: var(--fg);
}
.ex { display: grid; gap: 0.5rem; }
.ex-manip { margin: 0; color: var(--kr); font-style: italic; font-size: 0.98rem; }
.ex-resp { margin: 0; color: var(--fg-dim); font-size: 1rem; line-height: 1.5; }

.orig-toggle {
  margin-top: auto; align-self: flex-start;
  padding: 0.35rem 0; background: transparent; border: 0;
  color: var(--fg-mute); font-size: 0.78rem; letter-spacing: 0.03em;
  border-bottom: 1px dashed var(--line);
}
.orig-toggle:hover { color: var(--edge); border-color: var(--edge); }
.orig { margin-top: 0.8rem; }
.orig img {
  width: 100%; max-width: 260px; border-radius: 10px;
  border: 1px solid var(--line); display: block;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
