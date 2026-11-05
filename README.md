# KnowKnow

An interactive Grade 8 Mathematics learning app. Students read short guided lessons, step through worked examples, practice with hints and retries, take a topic assessment, and track their progress. Everything runs in the browser and progress is saved on the student's own device.

## Features

- **Guided lessons.** Each lesson has an introduction, concept sections, worked examples that reveal one step at a time (with the reason for each step), and a quick check.
- **Practice mode.** Progressive hints, corrective feedback for common mistakes, and a full solution after repeated misses. Practice can be filtered by lesson and difficulty.
- **Topic assessments.** One attempt per question, no hints, and a configurable passing score.
- **Grade 7 skills check.** An optional prerequisite check for the first topic.
- **Progress tracking.** Dashboard, per-topic progress, best scores, practice history, and "needs more practice" suggestions.
- **Offline-friendly storage.** Progress lives in IndexedDB (via Dexie). Students can export and restore a JSON backup.
- **Math rendering.** KaTeX for inline and display math.
- **Responsive and accessible.** Works on phones and desktops, with keyboard focus styles, ARIA labels, and reduced-motion support.
- **Single-file build.** The production build is one self-contained HTML file, so it can be opened from a USB drive or any static host.

## Curriculum

All ten topics are open from the start (`sequentialUnlock` is `false`). Each topic begins with an introduction lesson.

| # | Topic |
|---|---|
| 1 | Algebraic Expressions |
| 2 | Adding and Subtracting Simple Polynomials |
| 3 | Multiplying and Dividing Simple Polynomials |
| 4 | Special Products |
| 5 | Monomial Factoring and Factoring by Grouping |
| 6 | Factoring Special Forms and Quadratic Trinomials |
| 7 | Simplifying, Multiplying, and Dividing Rational Algebraic Expressions |
| 8 | Adding and Subtracting Rational Algebraic Expressions |
| 9 | Sequences |
| 10 | Measures of Central Tendency |

A placeholder topic, "Later Grade 8 Topics", is shown as coming soon.

## Tech stack

- React 19 and TypeScript
- Vite 7 with `vite-plugin-singlefile`
- Tailwind CSS 4
- React Router 7 (`HashRouter`, so no server-side routing is needed)
- Dexie 4 (IndexedDB)
- KaTeX

## Getting started

Requires Node.js 20.19 or newer (22.12+ recommended).

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build (a single HTML file in dist/)
npm run preview   # preview the production build
```

To type-check without building:

```bash
npx tsc --noEmit
```

There is no automated test suite yet.

## Project structure

```
src/
  main.tsx, App.tsx          entry point and providers
  routes/                    route table
  pages/                     Home, Topics, Topic, Lesson, Practice, Results, Progress
  components/
    common/                  layout, icons, shared UI, rich text (math + bold)
    lessons/                 block renderer, worked example view, lesson rows
    practice/                question card (MCQ and numeric)
    progress/                score chart, score ring, backup panel
  content/                   all curriculum content, authored as typed data
    topics/index.ts          topic list and curriculum settings
    lessons/<topic-id>/      one file per lesson + an index.ts per topic
    questions/               practice, assessment and prerequisite questions
      bank.ts                short helpers for authoring lessons and questions
      builders.ts            mcq() / numeric() question builders
  types/content.ts           content model
  database/                  Dexie schema and migrations
  services/progressService.ts  the only code that reads or writes IndexedDB
  hooks/ProgressContext.tsx  React state around the progress service
  utils/                     answer checking, session building, insights, formatting
```

Student progress is stored separately from content. Curriculum content never touches the database.

## Configuration

Settings live in `src/content/topics/index.ts` under `curriculumConfig`:

| Setting | Meaning |
|---|---|
| `passingScore` | Percentage needed to pass a topic assessment (default 80) |
| `sequentialUnlock` | If `true`, a topic opens only after the previous one is completed |
| `weakAreaThreshold` | Lessons below this accuracy (%) are flagged for review |
| `practiceSessionLength` | Maximum questions in one practice set |
| `attemptsBeforeSolution` | Wrong attempts before "Show the solution" appears in practice |

A topic is complete when every lesson is finished and the assessment score reaches the passing score.

## Adding content

### A new lesson

1. Create `src/content/lessons/<topic-id>/lessonN-<lesson-id>.ts` and export a `Lesson`. The `lesson()` helper from `questions/bank.ts` keeps it short. Copy an existing lesson as a template.
2. Import it in that topic's `index.ts` and add it to the `lessons` array.
3. Add its ID to the topic's `lessonIds` in `src/content/topics/index.ts`, in the order you want.
4. Add practice and assessment questions to `src/content/questions/<topicName>.ts`.

### A new topic

1. Add a topic entry in `src/content/topics/index.ts` with `availability: "active"` and its `lessonIds`.
2. Create `src/content/lessons/<topic-id>/` with lesson files and an `index.ts` exporting `lessons` and `questions`.
3. Register the topic module in `src/content/lessons/index.ts`.

### Writing text and math

Text fields accept a small rich-text syntax:

- `$...$` for inline KaTeX math
- `**...**` for bold
- `*...*` for italics

Display math (`mth()` blocks, worked-step `math`, and a question's `math` field) takes plain TeX without the dollar signs. Table headers, lesson titles, summaries and objectives are plain text, so do not put `$...$` in them.

### Question IDs

Question IDs are stable. Never reuse or renumber them once students have progress, because saved results refer to them. The same applies to lesson IDs.

## Saving and backups

- Progress is saved in the browser's IndexedDB under the database name `grade8-math-learning`.
- It stays on that device and browser. Clearing browser data, private browsing, or switching devices loses it.
- The **My Progress** page can export a JSON backup and restore it later.
- The database name and the backup format identifier (`grade8-math-progress`) are kept unchanged from earlier versions so existing students' saved progress and old backup files keep working.

## Database migrations

Never edit an existing database version in `src/database/migrations.ts`. Add a new version and, if data must be reshaped, provide an `upgrade` function.

## Deployment

`npm run build` creates a single self-contained HTML file in `dist/`. Because the app uses `HashRouter`, it works from any static host, from a local file, or from shared storage, and routes survive a page refresh.

## Curriculum reference

Topic order follows Realistic Math 8 (2nd edition), Unit 1.
