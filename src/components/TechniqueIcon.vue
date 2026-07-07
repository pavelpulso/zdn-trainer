<script setup>
defineProps({ cat: { type: String, required: true } })

// single-path stroke glyphs, 24x24
const PATHS = {
  kr: 'M7 4v7a5 5 0 0 0 10 0M17 11l-2.5 2.5M17 11l2.5 2.5', // hook
  vn: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6', // eye
  am: 'M2 9c3 0 3 3 6 3s3-3 6-3 3 3 6 3M2 15c3 0 3 3 6 3s3-3 6-3 3 3 6 3', // damping waves
  rs: 'M4 5h16v10H9l-4 4v-4H4zM8 9h8M8 12h5', // speech
  za: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M9.5 9a2.5 2.5 0 1 1 3 2.5c-.8.4-1 .9-1 1.7M12 16.5v.01', // question
  pr: 'M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.1l5.8-.8z', // star/principle
}
</script>

<template>
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
       stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true">
    <path :d="PATHS[cat]" />
  </svg>
</template>
