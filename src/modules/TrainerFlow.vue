<script setup>
import { reactive, ref, computed } from 'vue'
import { useI18n } from '@/i18n'
import { useDeck, bindLocaleReroll } from '@/composables/useDeck'
import { useJournal } from '@/composables/useJournal'
import { useProgress } from '@/composables/useProgress'
import HookCard from '@/components/HookCard.vue'
import TechniqueCard from '@/components/TechniqueCard.vue'
import StepPanel from '@/components/StepPanel.vue'

const { t, tm } = useI18n()
const { deck, newCombination, rerollOne, setMode, setSection, sections, counts } = useDeck()
const { add } = useJournal()
const { progress, touch } = useProgress()
bindLocaleReroll()

const steps = computed(() => tm('steps'))
const mechCats = ['kr', 'vn', 'am', 'rs', 'za', 'pr']
const mechanics = computed(() => tm('mechanics').map((m, i) => ({ ...m, cat: mechCats[i] })))

const step = ref(0)
const saved = ref(false)

const S4 = ['meaning', 'harm', 'benefit', 'apply']
const S6 = ['situations', 'wins', 'improve', 'next']

const blank = () => ({
  A: '', B: '', C: '', X: '', Y: '', Z: '',
  response: '', reps: 0,
  meaning: '', harm: '', benefit: '', apply: '',
  situations: '', wins: '', improve: '', next: '',
})
const form = reactive(blank())

function reset() { Object.assign(form, blank()); saved.value = false }
function reshuffle() { newCombination(); reset(); step.value = 1 }
function go(i) { step.value = Math.max(0, Math.min(steps.value.length - 1, i)) }

const canSave = computed(() => S6.some((k) => form[k].trim()))

function saveEntry() {
  add({
    hook: deck.hook,
    mode: deck.mode,
    section: deck.scenario?.section || '',
    formula: { A: form.A, B: form.B, C: form.C, X: form.X, Y: form.Y, Z: form.Z },
    response: form.response,
    principle: deck.principle?.text || '',
    reflection: { meaning: form.meaning, harm: form.harm, benefit: form.benefit, apply: form.apply },
    diary: { situations: form.situations, wins: form.wins, improve: form.improve, next: form.next },
  })
  touch()
  saved.value = true
}

const sectionVal = computed({
  get: () => (deck.sectionIdx == null ? '' : String(deck.sectionIdx)),
  set: (v) => setSection(v === '' ? null : Number(v)),
})
</script>

<template>
  <div class="console">
    <!-- rail -->
    <aside class="rail">
      <div class="stats">
        <div><span class="u-eyebrow">{{ t('rail.round') }}</span><b>{{ String(deck.round).padStart(2, '0') }}</b></div>
        <div><span class="u-eyebrow">{{ t('rail.streak') }}</span><b>{{ progress.streak }}<i>{{ t('rail.days') }}</i></b></div>
        <div><span class="u-eyebrow">{{ t('rail.practiced') }}</span><b>{{ progress.practiced }}</b></div>
      </div>

      <div class="modes">
        <button :class="{ on: deck.mode === 'hooks' }" @click="setMode('hooks')">{{ t('mode.hooks') }}</button>
        <button :class="{ on: deck.mode === 'scenarios' }" @click="setMode('scenarios')">{{ t('mode.scenarios') }}</button>
      </div>
      <select v-if="deck.mode === 'scenarios'" v-model="sectionVal" class="section-sel">
        <option value="">{{ t('mode.all') }}</option>
        <option v-for="(s, i) in sections" :key="i" :value="String(i)">{{ s }}</option>
      </select>

      <nav class="spine" :aria-label="t('mode.label')">
        <button v-for="(s, i) in steps" :key="i" class="spine-item"
          :class="{ active: i === step, done: i < step }" @click="go(i)">
          <span class="dot">{{ i + 1 }}</span>
          <span class="lbl">{{ s.t }}</span>
        </button>
      </nav>

      <button class="reshuffle" @click="reshuffle">
        <span>{{ t('rail.newCombination') }}</span>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M4 8h11V5l5 5-5 5v-3H4zM20 16H9v3l-5-5 5-5v3h11z" fill="currentColor" />
        </svg>
      </button>

      <p class="pool">{{ t('rail.pool', { hooks: counts.hooks, am: counts.am, za: counts.za, pr: counts.pr }) }}</p>
    </aside>

    <!-- main -->
    <main class="stage">
      <div v-if="step >= 1" :key="deck.nonce.hook" class="deal-hook">
        <HookCard :text="deck.hook" @refresh="rerollOne('hook')" />
        <div v-if="deck.scenario" class="scen">
          <div><span>{{ t('scenario.who') }}</span>{{ deck.scenario.who }}</div>
          <div><span>{{ t('scenario.you') }}</span>{{ deck.scenario.you }}</div>
          <div class="neg"><span>{{ t('scenario.negative') }}</span>{{ deck.scenario.negative }}</div>
          <div class="pos"><span>{{ t('scenario.positive') }}</span>{{ deck.scenario.positive }}</div>
        </div>
      </div>

      <Transition name="swap" mode="out-in">
        <!-- 1 -->
        <StepPanel v-if="step === 0" :key="0" :index="1" :title="steps[0].full" :lead="t('s1.lead')">
          <ul class="mechanics">
            <li v-for="m in mechanics" :key="m.cat" :style="{ '--edge': `var(--${m.cat})` }">
              <span class="m-name">{{ m.name }}</span>
              <span class="m-desc">{{ m.desc }}</span>
            </li>
          </ul>
          <div class="actions"><button class="primary" @click="go(1)">{{ t('s1.start') }}</button></div>
        </StepPanel>

        <!-- 2 -->
        <StepPanel v-else-if="step === 1" :key="1" :index="2" :title="steps[1].full" :lead="t('s2.lead')">
          <TechniqueCard cat="vn" file="vn.png" :formula="deck.formula.formula"
            :manipulation="deck.formula.example.manipulation" :response="deck.formula.example.response" class="mb" />
          <div class="formula-grid">
            <div class="frow imposed">
              <span class="frow-tag">{{ t('s2.imposed') }}</span>
              <label>{{ t('s2.think') }}<input v-model="form.A" placeholder="A" /></label>
              <label>{{ t('s2.feel') }}<input v-model="form.B" placeholder="B" /></label>
              <label>{{ t('s2.act') }}<input v-model="form.C" placeholder="C" /></label>
            </div>
            <div class="frow chosen">
              <span class="frow-tag">{{ t('s2.chosen') }}</span>
              <label>{{ t('s2.think') }}<input v-model="form.X" placeholder="X" /></label>
              <label>{{ t('s2.feel') }}<input v-model="form.Y" placeholder="Y" /></label>
              <label>{{ t('s2.act') }}<input v-model="form.Z" placeholder="Z" /></label>
            </div>
          </div>
          <div class="actions">
            <button class="ghost" @click="go(0)">{{ t('nav.back') }}</button>
            <button class="primary" @click="go(2)">{{ t('nav.next') }}</button>
          </div>
        </StepPanel>

        <!-- 3 -->
        <StepPanel v-else-if="step === 2" :key="2" :index="3" :title="steps[2].full" :lead="t('s3.lead')">
          <div class="cards-3 deal">
            <TechniqueCard :key="`am${deck.nonce.am}`" cat="am" :items="[deck.amortization]"
              :file="deck.amortization.file" compact refreshable @refresh="rerollOne('am')" />
            <TechniqueCard :key="`rs${deck.nonce.rs}`" cat="rs" :file="deck.strategy.file"
              :formula="deck.strategy.formula" :manipulation="deck.strategy.manipulation"
              :response="deck.strategy.response" refreshable @refresh="rerollOne('rs')" />
            <TechniqueCard :key="`za${deck.nonce.za}`" cat="za" :items="[deck.question]"
              :file="deck.question.file" compact refreshable @refresh="rerollOne('za')" />
          </div>
          <label class="field">
            <span>{{ t('s3.yourAnswer') }}</span>
            <textarea v-model="form.response" rows="3" :placeholder="t('s3.placeholder')"></textarea>
          </label>
          <div class="reps">
            <span class="reps-lbl">{{ t('s3.spoken') }}</span>
            <div class="reps-ctrl">
              <button @click="form.reps = Math.max(0, form.reps - 1)" aria-label="−">–</button>
              <b :class="{ hit: form.reps >= 20 }">{{ form.reps }} / 20</b>
              <button @click="form.reps++" aria-label="+">+</button>
            </div>
          </div>
          <div class="actions">
            <button class="ghost" @click="go(1)">{{ t('nav.back') }}</button>
            <button class="primary" @click="go(3)">{{ t('nav.next') }}</button>
          </div>
        </StepPanel>

        <!-- 4 -->
        <StepPanel v-else-if="step === 3" :key="3" :index="4" :title="steps[3].full" :lead="t('s4.lead')">
          <TechniqueCard :key="`pr${deck.nonce.pr}`" cat="pr" :items="[deck.principle]"
            :file="deck.principle.file" class="mb" refreshable @refresh="rerollOne('pr')" />
          <div class="qgrid">
            <label v-for="(q, i) in tm('s4.q')" :key="i" class="field">
              <span>{{ q }}</span><textarea v-model="form[S4[i]]" rows="2"></textarea>
            </label>
          </div>
          <div class="actions">
            <button class="ghost" @click="go(2)">{{ t('nav.back') }}</button>
            <button class="primary" @click="go(4)">{{ t('nav.next') }}</button>
          </div>
        </StepPanel>

        <!-- 5 -->
        <StepPanel v-else-if="step === 4" :key="4" :index="5" :title="steps[4].full" :lead="t('s5.lead')">
          <div class="summary">
            <p class="s-hook">«{{ deck.hook }}»</p>
            <p v-if="form.response" class="s-resp">{{ form.response }}</p>
            <p v-else class="s-empty">{{ t('s5.empty') }}</p>
          </div>
          <div class="actions">
            <button class="ghost" @click="go(3)">{{ t('nav.back') }}</button>
            <button class="secondary" @click="go(5)">{{ t('s5.toJournal') }}</button>
            <button class="primary" @click="reshuffle">{{ t('s5.newHook') }}</button>
          </div>
        </StepPanel>

        <!-- 6 -->
        <StepPanel v-else :key="5" :index="6" :title="steps[5].full" :lead="t('s6.lead')">
          <div class="qgrid">
            <label v-for="(q, i) in tm('s6.q')" :key="i" class="field">
              <span>{{ q }}</span><textarea v-model="form[S6[i]]" rows="2"></textarea>
            </label>
          </div>
          <div class="actions">
            <button class="ghost" @click="go(4)">{{ t('nav.back') }}</button>
            <button class="primary" :disabled="!canSave || saved" @click="saveEntry">
              {{ saved ? t('s6.saved') : t('s6.save') }}
            </button>
            <button v-if="saved" class="secondary" @click="reshuffle">{{ t('s5.newHook') }}</button>
          </div>
        </StepPanel>
      </Transition>
    </main>
  </div>
</template>

<style scoped>
.console { display: grid; grid-template-columns: 260px 1fr; gap: clamp(1.2rem, 0.5rem + 2vw, 2.6rem); align-items: start; }

.rail { position: sticky; top: 1.5rem; align-self: start; display: grid; gap: 1.1rem; padding: 1.3rem; border-radius: var(--radius-lg); background: var(--ink-850); border: 1px solid var(--line-soft); }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }
.stats > div { display: grid; gap: 0.2rem; }
.stats b { font-family: var(--ff-display); font-weight: 800; font-size: 1.35rem; line-height: 1; }
.stats b i { font-style: normal; font-size: 0.7rem; color: var(--fg-mute); margin-left: 1px; }

.modes { display: flex; gap: 0.3rem; padding: 0.25rem; background: var(--ink-800); border: 1px solid var(--line-soft); border-radius: 10px; }
.modes button { flex: 1; padding: 0.45rem; border: 0; border-radius: 7px; background: transparent; color: var(--fg-mute); font-weight: 600; font-size: 0.85rem; }
.modes button.on { background: var(--ink-700); color: var(--fg); }
.section-sel { width: 100%; padding: 0.5rem 0.6rem; border-radius: 9px; background: var(--ink-800); border: 1px solid var(--line); color: var(--fg); font-size: 0.85rem; }

.spine { display: grid; gap: 0.1rem; }
.spine-item { display: flex; align-items: center; gap: 0.7rem; padding: 0.5rem 0.6rem; background: transparent; border: 0; border-radius: 10px; color: var(--fg-mute); text-align: left; width: 100%; transition: background 0.18s, color 0.18s; }
.spine-item:hover { color: var(--fg-dim); background: var(--ink-800); }
.spine-item .dot { flex: none; width: 1.5rem; height: 1.5rem; border-radius: 50%; display: grid; place-items: center; font-family: var(--ff-display); font-size: 0.78rem; border: 1px solid var(--line); }
.spine-item.active { color: var(--fg); background: var(--ink-750); }
.spine-item.active .dot { background: var(--rs); border-color: var(--rs); color: #06120f; font-weight: 600; }
.spine-item.done .dot { border-color: var(--rs); color: var(--rs); }
.spine-item .lbl { font-family: var(--ff-body); font-weight: 500; font-size: 0.92rem; }

.reshuffle { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.8rem 1rem; border-radius: 12px; background: var(--kr); color: #fff; border: 0; font-weight: 600; box-shadow: 0 10px 24px -12px var(--kr); transition: transform 0.15s, filter 0.15s; }
.reshuffle:hover { filter: brightness(1.06); transform: translateY(-1px); }
.pool { margin: 0; font-size: 0.76rem; color: var(--fg-mute); line-height: 1.5; }

.stage { display: grid; gap: 1.5rem; min-width: 0; }
.mb { margin-bottom: 1.3rem; }

.scen { margin-top: 0.9rem; display: grid; gap: 0.5rem; padding: 1rem 1.1rem; border-radius: 12px; background: var(--ink-850); border: 1px solid var(--line-soft); }
.scen > div { display: grid; grid-template-columns: 120px 1fr; gap: 0.7rem; font-size: 0.9rem; color: var(--fg-dim); }
.scen span { color: var(--fg-mute); font-size: 0.78rem; letter-spacing: 0.03em; padding-top: 0.05rem; }
.scen .neg span { color: var(--kr); }
.scen .pos span { color: var(--rs); }
@media (max-width: 620px) { .scen > div { grid-template-columns: 1fr; gap: 0.15rem; } }

.mechanics { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.6rem; }
.mechanics li { display: grid; gap: 0.15rem; padding: 0.85rem 1rem 0.9rem 1.1rem; border-radius: 12px; background: var(--ink-800); border: 1px solid var(--line-soft); border-left: 3px solid var(--edge); }
.m-name { font-family: var(--ff-display); font-weight: 600; font-size: 1rem; color: var(--edge); }
.m-desc { color: var(--fg-dim); font-size: 0.95rem; }

.cards-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.3rem; }

.formula-grid { display: grid; gap: 0.9rem; }
.frow { display: grid; grid-template-columns: auto repeat(3, 1fr); gap: 0.7rem; align-items: center; padding: 1rem 1.1rem; border-radius: 12px; background: var(--ink-800); border: 1px solid var(--line-soft); }
.frow.imposed { border-left: 3px solid var(--kr); }
.frow.chosen { border-left: 3px solid var(--rs); }
.frow-tag { font-family: var(--ff-display); font-size: 0.82rem; color: var(--fg-dim); }
.frow.imposed .frow-tag { color: var(--kr); }
.frow.chosen .frow-tag { color: var(--rs); }
.frow label { display: grid; gap: 0.3rem; font-size: 0.72rem; color: var(--fg-mute); letter-spacing: 0.03em; }
.frow input { background: var(--ink-900); border: 1px solid var(--line); color: var(--fg); border-radius: 8px; padding: 0.5rem 0.6rem; font-size: 0.95rem; }
.frow input:focus-visible { border-color: var(--rs); outline: none; }

.field { display: grid; gap: 0.4rem; }
.field > span { font-size: 0.85rem; color: var(--fg-dim); }
.field textarea { width: 100%; resize: vertical; background: var(--ink-800); border: 1px solid var(--line); color: var(--fg); border-radius: 10px; padding: 0.7rem 0.85rem; font-size: 0.98rem; line-height: 1.5; }
textarea:focus-visible { border-color: var(--rs); outline: none; }
.qgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }

.reps { display: flex; align-items: center; justify-content: space-between; margin-top: 1.1rem; padding: 0.7rem 1rem; border-radius: 12px; background: var(--ink-800); border: 1px solid var(--line-soft); }
.reps-lbl { color: var(--fg-dim); font-size: 0.9rem; }
.reps-ctrl { display: flex; align-items: center; gap: 0.9rem; }
.reps-ctrl button { width: 2rem; height: 2rem; border-radius: 8px; border: 1px solid var(--line); background: var(--ink-750); color: var(--fg); font-size: 1.1rem; line-height: 1; }
.reps-ctrl button:hover { border-color: var(--rs); }
.reps-ctrl b { font-family: var(--ff-display); font-weight: 600; min-width: 4.5rem; text-align: center; }
.reps-ctrl b.hit { color: var(--rs); }

.summary { display: grid; gap: 0.8rem; padding: 1.2rem 1.3rem; border-radius: 14px; background: var(--ink-800); border: 1px solid var(--line-soft); }
.s-hook { margin: 0; font-family: var(--ff-display); font-weight: 600; color: var(--kr); font-size: 1.1rem; }
.s-resp { margin: 0; color: var(--fg); line-height: 1.55; }
.s-empty { margin: 0; color: var(--fg-mute); font-style: italic; }

.actions { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 1.6rem; }
.primary, .secondary, .ghost { padding: 0.75rem 1.35rem; border-radius: 11px; font-weight: 600; font-size: 0.98rem; border: 1px solid transparent; transition: transform 0.15s, filter 0.15s, background 0.15s; }
.primary { background: var(--rs); color: #06120f; }
.primary:hover:not(:disabled) { filter: brightness(1.07); transform: translateY(-1px); }
.primary:disabled { opacity: 0.4; cursor: not-allowed; }
.secondary { background: transparent; color: var(--fg); border-color: var(--line); }
.secondary:hover { border-color: var(--rs); color: var(--rs); }
.ghost { background: transparent; color: var(--fg-mute); }
.ghost:hover { color: var(--fg); }

.swap-enter-active, .swap-leave-active { transition: opacity 0.28s, transform 0.28s; }
.swap-enter-from { opacity: 0; transform: translateY(12px); }
.swap-leave-to { opacity: 0; transform: translateY(-10px); }

/* deal animation on reshuffle */
.deal-hook { animation: deal 0.5s cubic-bezier(0.2, 0.75, 0.2, 1) both; }
.cards-3.deal > * { animation: deal 0.5s cubic-bezier(0.2, 0.75, 0.2, 1) both; }
.cards-3.deal > *:nth-child(1) { animation-delay: 0.04s; }
.cards-3.deal > *:nth-child(2) { animation-delay: 0.12s; }
.cards-3.deal > *:nth-child(3) { animation-delay: 0.2s; }
@keyframes deal {
  from { opacity: 0; transform: translateY(18px) rotate(-1.5deg) scale(0.97); }
  to { opacity: 1; transform: translateY(0) rotate(0) scale(1); }
}

@media (max-width: 860px) {
  .console { grid-template-columns: 1fr; }
  .rail { position: static; }
  .spine { grid-auto-flow: column; grid-auto-columns: 1fr; overflow-x: auto; }
  .spine-item { flex-direction: column; gap: 0.35rem; text-align: center; padding: 0.5rem 0.3rem; }
  .spine-item .lbl { font-size: 0.72rem; }
  .frow { grid-template-columns: 1fr 1fr; }
  .frow-tag { grid-column: 1 / -1; }
}
</style>
