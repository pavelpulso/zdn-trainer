<script setup>
import { useI18n } from '@/i18n'
defineProps({
  text: { type: String, required: true },
})
const emit = defineEmits(['refresh'])
const { t } = useI18n()
</script>

<template>
  <figure class="hook">
    <div class="top">
      <span class="tag">{{ t('hook.tag') }}</span>
      <button class="refresh" :title="t('card.refresh')" :aria-label="t('card.refresh')" @click="emit('refresh')">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5" />
        </svg>
      </button>
    </div>
    <blockquote>«{{ text }}»</blockquote>
    <figcaption>{{ t('hook.caption') }}</figcaption>
  </figure>
</template>

<style scoped>
.hook {
  --edge: var(--kr);
  position: relative;
  margin: 0;
  padding: 1.5rem 1.7rem 1.35rem;
  border-radius: var(--radius-lg);
  background:
    linear-gradient(155deg, rgba(232, 80, 63, 0.16), rgba(125, 36, 28, 0.05)),
    var(--ink-800);
  border: 1px solid rgba(232, 80, 63, 0.4);
  box-shadow: var(--shadow-card), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  overflow: hidden;
}
.hook::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: linear-gradient(var(--kr), var(--kr-deep));
}
.top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
.tag {
  display: inline-block;
  font-family: var(--ff-body);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--kr);
}
.refresh {
  flex: none; width: 1.9rem; height: 1.9rem; display: grid; place-items: center;
  border-radius: 9px; background: rgba(232, 80, 63, 0.12); border: 1px solid rgba(232, 80, 63, 0.35);
  color: var(--kr); transition: transform 0.35s, background 0.15s;
}
.refresh:hover { background: rgba(232, 80, 63, 0.22); }
.refresh:active { transform: rotate(-180deg); }
blockquote {
  margin: 0;
  font-family: var(--ff-display);
  font-weight: 600;
  font-size: clamp(1.25rem, 0.95rem + 1.5vw, 1.95rem);
  line-height: 1.18;
  letter-spacing: -0.01em;
  color: #fff;
  text-wrap: balance;
}
figcaption {
  margin-top: 0.85rem;
  font-size: 0.82rem;
  color: var(--fg-mute);
  letter-spacing: 0.04em;
}
</style>
