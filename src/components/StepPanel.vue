<script setup>
defineProps({
  index: { type: Number, required: true },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
})
</script>

<template>
  <section class="step-panel">
    <header class="head">
      <span class="idx">{{ String(index).padStart(2, '0') }}</span>
      <div class="titles">
        <h2>{{ title }}</h2>
        <p v-if="lead" class="lead">{{ lead }}</p>
      </div>
    </header>
    <div class="body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.step-panel {
  animation: rise 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
.head {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 1.6rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--line-soft);
}
.idx {
  font-family: var(--ff-display);
  font-weight: 800;
  font-size: clamp(1.4rem, 1rem + 1.4vw, 2.1rem);
  color: var(--accent);
  letter-spacing: -0.02em;
  line-height: 1;
}
.titles h2 {
  font-size: clamp(1.35rem, 1rem + 1.4vw, 2rem);
  letter-spacing: -0.01em;
}
.lead {
  margin: 0.55rem 0 0;
  color: var(--fg-dim);
  max-width: 60ch;
  font-size: 1.02rem;
}
@keyframes rise {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
