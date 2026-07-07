export const messages = {
  ru: {
    brand: { verbs: ['Защитись', 'Договорись', 'Насладись'] },
    tabs: { trainer: 'Тренажёр', journal: 'Дневник' },
    lang: { label: 'Язык', ru: 'RU', en: 'EN' },

    mode: { hooks: 'Крючки', scenarios: 'Сценарии', label: 'Режим', all: 'Все сферы' },

    rail: {
      round: 'Раунд',
      newCombination: 'Новая комбинация',
      pool: '{hooks} крючков · {am} амортизаций · {za} вопросов · {pr} принципов',
      streak: 'Стрик',
      practiced: 'Отработано',
      days: 'дн.',
    },

    nav: { back: '← Назад', next: 'Дальше →' },

    steps: [
      { t: 'Механики', full: 'Шесть механик тренажёра' },
      { t: 'Формула', full: 'Разложи крючок по формуле' },
      { t: 'Ответ', full: 'Собери и проговори ответ' },
      { t: 'Принцип', full: 'Разбери принцип' },
      { t: 'Повтор', full: 'Закрепи и смени крючок' },
      { t: 'Дневник', full: 'Итоги и дневник' },
    ],

    mechanics: [
      { name: 'Крючок', desc: 'Манипуляция, которая летит в тебя.' },
      { name: 'Внутренняя защита', desc: 'Осознать: думать A, чувствовать B, делать C.' },
      { name: 'Амортизация', desc: 'Потушить огонь, снять напор.' },
      { name: 'Речевая стратегия', desc: 'Минимизировать вред, извлечь выгоду.' },
      { name: 'Захват вопросом', desc: 'Перехватить инициативу и вести диалог.' },
      { name: 'Принцип', desc: 'Сместить рамку сотрудничества.' },
    ],

    tech: {
      am: { label: 'Амортизация', hint: 'потуши огонь' },
      za: { label: 'Захват вопросом', hint: 'перехвати инициативу' },
      pr: { label: 'Принцип', hint: 'сместить рамку' },
      rs: { label: 'Речевая стратегия', hint: 'пример собранного ответа' },
      vn: { label: 'Внутренняя защита', hint: 'формула осознания' },
    },

    hook: { tag: 'Крючок', caption: 'входящая манипуляция' },
    original: { show: 'Оригинал карты', hide: 'Скрыть оригинал' },
    card: { refresh: 'Другой вариант' },

    scenario: { who: 'Говорит', you: 'Ты', negative: 'Ловушка', positive: 'Заряд добра' },

    s1: {
      lead: 'Это тренажёр вербального айкидо. Крючок — атака. Остальные пять карт — твой ответ: осознать, погасить, ответить стратегией, перехватить вопросом, опереться на принцип.',
      start: 'Начать с крючком →',
    },
    s2: {
      lead: 'Что этот крючок пытается навязать — и что ты выбираешь вместо этого. Заполни оба ряда.',
      imposed: 'Меня заставляют', chosen: 'Я выбираю',
      think: 'думать', feel: 'чувствовать', act: 'делать',
    },
    s3: {
      lead: 'Амортизация + речевая стратегия + захват вопросом. Составь свой ответ на крючок и проговори его вслух 20 раз.',
      yourAnswer: 'Твой ответ на крючок',
      placeholder: 'Амортизирую → веду стратегию → возвращаю вопросом…',
      spoken: 'Проговорено вслух',
    },
    s4: {
      lead: 'Прими принцип как рамку. Ответь на четыре вопроса — коротко, своими словами.',
      q: [
        'Что этот принцип значит для тебя?',
        'Вред от игнорирования?',
        'Польза от применения?',
        'Как внедришь в жизнь?',
      ],
    },
    s5: {
      lead: 'Новые идеи слабее старых привычек. Возьми новый крючок и повтори цикл — или зафиксируй итоги дня в дневнике.',
      empty: 'Ответ на шаге 3 не записан.',
      toJournal: 'В дневник →',
      newHook: 'Новый крючок ↻',
    },
    s6: {
      lead: 'Внедряй навык в реальную коммуникацию. Ответь на четыре вопроса и сохрани запись.',
      q: [
        'Какие переговорные ситуации были сегодня?',
        'Что получилось хорошо?',
        'Что выбираю улучшить?',
        'Каким будет следующий шаг?',
      ],
      save: 'Сохранить в дневник', saved: 'Сохранено ✓',
    },

    journal: {
      title: 'Дневник тренировок',
      sub: '{n} {word} · хранится в этом браузере',
      words: ['запись', 'записи', 'записей'],
      clear: 'Очистить всё',
      empty: 'Пока пусто. Пройди цикл на вкладке «Тренажёр» и сохрани первую запись — она появится здесь.',
      principle: 'Принцип',
      diary: { situations: 'Ситуации', wins: 'Получилось', improve: 'Улучшить', next: 'Следующий шаг' },
    },

    footer: {
      line1: 'Тренажёр по методу Альберта Сафина «Защитись! Договорись! Насладись!». Материалы карт — проект qcic.ru. Физическую версию игры можно купить на Ozon.',
      line2: 'Неофициальный учебный тренажёр для самостоятельных тренировок.',
    },
  },

  en: {
    brand: { verbs: ['Defend', 'Negotiate', 'Enjoy'] },
    tabs: { trainer: 'Trainer', journal: 'Journal' },
    lang: { label: 'Language', ru: 'RU', en: 'EN' },

    mode: { hooks: 'Hooks', scenarios: 'Scenarios', label: 'Mode', all: 'All areas' },

    rail: {
      round: 'Round',
      newCombination: 'New combination',
      pool: '{hooks} hooks · {am} de-escalations · {za} questions · {pr} principles',
      streak: 'Streak',
      practiced: 'Practiced',
      days: 'd',
    },

    nav: { back: '← Back', next: 'Next →' },

    steps: [
      { t: 'Mechanics', full: 'The six mechanics' },
      { t: 'Formula', full: 'Break the hook down' },
      { t: 'Answer', full: 'Build and rehearse your answer' },
      { t: 'Principle', full: 'Work through a principle' },
      { t: 'Repeat', full: 'Lock it in, swap the hook' },
      { t: 'Journal', full: 'Wrap-up and journal' },
    ],

    mechanics: [
      { name: 'Hook', desc: 'The manipulation thrown at you.' },
      { name: 'Inner defense', desc: 'Notice: think A, feel B, do C.' },
      { name: 'De-escalation', desc: 'Put out the fire, take off the pressure.' },
      { name: 'Speech strategy', desc: 'Minimize harm, extract value.' },
      { name: 'Seize with a question', desc: 'Take the initiative and lead.' },
      { name: 'Principle', desc: 'Shift the frame toward cooperation.' },
    ],

    tech: {
      am: { label: 'De-escalation', hint: 'put out the fire' },
      za: { label: 'Seize with a question', hint: 'take the initiative' },
      pr: { label: 'Principle', hint: 'shift the frame' },
      rs: { label: 'Speech strategy', hint: 'a worked answer' },
      vn: { label: 'Inner defense', hint: 'the awareness formula' },
    },

    hook: { tag: 'Hook', caption: 'incoming manipulation' },
    original: { show: 'Original card', hide: 'Hide original' },
    card: { refresh: 'Another one' },

    scenario: { who: 'Says it', you: 'You are', negative: 'The trap', positive: 'Charitable read' },

    s1: {
      lead: 'This is a trainer for verbal aikido. The hook is the attack. The other five cards are your answer: notice it, defuse it, answer with strategy, seize with a question, lean on a principle.',
      start: 'Start with a hook →',
    },
    s2: {
      lead: 'What this hook tries to impose — and what you choose instead. Fill in both rows.',
      imposed: 'They push me to', chosen: 'I choose to',
      think: 'think', feel: 'feel', act: 'do',
    },
    s3: {
      lead: 'De-escalation + speech strategy + a seizing question. Compose your answer to the hook and say it out loud 20 times.',
      yourAnswer: 'Your answer to the hook',
      placeholder: 'De-escalate → run the strategy → return a question…',
      spoken: 'Said out loud',
    },
    s4: {
      lead: 'Take the principle as a frame. Answer four questions — briefly, in your own words.',
      q: [
        'What does this principle mean to you?',
        'The cost of ignoring it?',
        'The benefit of applying it?',
        'How will you put it into practice?',
      ],
    },
    s5: {
      lead: 'New ideas are weaker than old habits. Take a fresh hook and repeat the cycle — or capture the day in your journal.',
      empty: 'No answer was written in step 3.',
      toJournal: 'To journal →',
      newHook: 'New hook ↻',
    },
    s6: {
      lead: 'Bring the skill into real conversations. Answer four questions and save the entry.',
      q: [
        'What negotiation situations came up today?',
        'What went well?',
        'What do you choose to improve?',
        'What is your next step?',
      ],
      save: 'Save to journal', saved: 'Saved ✓',
    },

    journal: {
      title: 'Training journal',
      sub: '{n} {word} · stored in this browser',
      words: ['entry', 'entries', 'entries'],
      clear: 'Clear all',
      empty: 'Empty for now. Run a cycle on the Trainer tab and save your first entry — it will show up here.',
      principle: 'Principle',
      diary: { situations: 'Situations', wins: 'Went well', improve: 'Improve', next: 'Next step' },
    },

    footer: {
      line1: 'A trainer based on Albert Safin’s method “Defend! Negotiate! Enjoy!”. Card material — the qcic.ru project. The physical game is available on Ozon.',
      line2: 'Unofficial educational trainer for self-study.',
    },
  },
}
