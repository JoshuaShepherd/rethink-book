🔧 SUPER PROMPT TO AGENT — Build Steps 3–6 (Front-End & UX, Mock-First)

Global rules (must follow):
• Never delete or rename existing files. If you must change behavior, deprecate in place with comments and keep old code.
• Front-end first with mocks. You may create mock services, fixtures, and local JSON/MDX files to simulate data. Keep contracts stable.
• TypeScript strict, accessible by default (WCAG 2.2 AA), keyboard-first navigation, light/dark support, motion that respects prefers-reduced-motion.
• Use Next.js App Router + Tailwind + shadcn/ui + MDX already in the repo. If a component you need doesn’t exist, create it in /components/\*.
• Every screen must have loading skeletons, empty states, error states, and toasts for user feedback.
• Instrumentation: Fire analytics events via a small lib/analytics.ts helper (stub ok) for all key actions noted below.

⸻

Shared Content & Brand (for realistic filler)

Audience tone: warm, practical, reflective; aimed at pastors, planters, lay leaders.
Brand phrases to use in UI copy: “Rethink,” “incarnational presence,” “missio Dei,” “post-Christendom,” “everyday vocation,” “multiplication,” “teams on mission,” “seek the welfare of your city.”
Principle slugs & titles (seed as fixtures): 1. missionary-nature-of-god — Rethink the Missionary Nature of God 2. missio-dei — Rethink Missio Dei 3. incarnational-mission — Rethink Incarnational Mission 4. vocation — Rethink Vocation (Whole-Life Mission) 5. multiplication — Rethink Multiplication 6. post-christendom — Rethink Life in a Post-Christendom Context 7. discipleship — Rethink Discipleship as Everyday Apprenticeship 8. teams — Rethink Teams on Mission 9. place — Rethink Place, Parish, and Neighborhood 10. contextualization — Rethink Cultural Distance & Contextualization 11. sending — Rethink Sending & Planting Pathways 12. metrics — Rethink Kingdom Metrics (Long Haul, Not Quick Fix)

⸻

STEP 3 — Content System (MDX) & Module Player

Goal: A delightful, accessible module player that renders video + MDX lessons, inline reflections, branching simulations, and a field experiment card—powered by mock content now.

Routes
• /app/principles (grid list of all principles)
• /app/principles/[slug] (module player)
• /app/principles/[slug]/lesson/[lessonId] (deep-link to specific lesson/activity; same player)

Data contracts (front-end only, keep in /types/content.ts)
• Principle { id, slug, title, summary, estMinutes, badgeId }
• Lesson { id, principleId, title, order, muxAssetId?: string, mdxPath: string }
• ActivityType = 'REFLECTION' | 'SIMULATION' | 'FIELD_EXPERIMENT'
• Activity { id, lessonId, type: ActivityType, payload: any, order }
• ReflectionPayload { prompt: string, minWords?: number }
• SimulationPayload { scenario: string, choices: { id; label; rationale; delta: number }[] }
• FieldExperimentPayload { title; instructions; suggestedDuration: string; checklist?: string[] }

Create /content/principles/<slug>/ folders with:
• overview.mdx (short intro)
• lesson-01.mdx, lesson-02.mdx (sample MDX)
• activities.json (ordered list, typed by Zod)
• Provide one fully real demo for incarnational-mission with copy below.

Module Player layout (shadcn + Tailwind)
• Header bar (sticky): principle title, progress ring, Prev / Next buttons; keyboard: J next, K previous, M mark complete, R focus reflection.
• 3-pane responsive:
• Left rail (LessonNav): collapsible; numbered lessons + inline activities. Active item highlighted with aria-current="page".
• Center content: video (if present) using a VideoPlayer wrapper (Mux placeholder), then MDX content.
• Right rail: Progress card + Notes/Journal scratchpad (local draft) + Key Takeaways (from front-matter).

Components to build
• LessonNav.tsx (Accordion/List with active states, checkmarks, skeletons)
• VideoPlayer.tsx (poster, captions toggle, keyboard shortcuts; if no mux, show image placeholder)
• MDXRenderer.tsx with custom shortcodes:
• <Callout variant="note|warning|success">
• <Quote author="">
• <Scripture ref="Jer 29:4-7"> (opens ScriptureExplorer sheet on click)
• ReflectionPrompt.tsx
• Title, prompt text, rich textarea (char/word count, min words validation), “Save reflection” button, Saved toast.
• Optional Audio Note recorder (max 60s), waveform placeholder, playback.
• A11y: label, description, aria-live for save state, error messages.
• SimulationChoice.tsx
• Presents scenario, 2–4 choice cards; click → reveal feedback panel with rationale and “What this forms in you”.
• After selection, Next step button surfaces.
• Record choice; allow Try again (no penalty).
• FieldExperimentCard.tsx
• Title, clear instructions, checklist, estimated time, “I’ll try this” (sets a personal intention), and Submit reflection (textarea + optional photo upload mock).
• Small celebration toast on submit.
• ProgressSummary.tsx
• Circular progress ring + list of completed lessons/activities; “Mark this lesson complete” button; emits analytics.

Loading/Empty/Error states
• Skeletons for left nav items, center MDX blocks, and right rail cards.
• If MDX missing → show friendly empty with CTA “Return to lessons.”
• Surface toast on errors but keep page usable.

Incarnational Mission demo content (seed now)
• overview.mdx (excerpt):
“Incarnation means proximity and presence. Jesus moved into the neighborhood (John 1:14). Mission is not an event; it’s a way of being with people.”
• lesson-01.mdx title: “Theology of Incarnation (Presence before Proclamation)”
Callout: “People become receptive after they feel received.”
• lesson-02.mdx title: “Practices of Presence”
Bullets: “Eat with neighbors; learn names; walk the block; join existing good; seek city’s welfare (Jer 29:4–7).”
• activities.json examples:
• Reflection: “Where in your weekly rhythm do you need to ‘move closer’?” (min 40 words)
• Simulation scenario: “You arrive in a new neighborhood. What’s your first move?”
• A: Start a weekly program at your house → Feedback: risks importing your preferences before listening; try slower presence. (delta −1)
• B: Join the local running club → Feedback: you’re entering existing community life; posture of learner. (delta +1)
• C: Volunteer at the school once to ‘get visibility’ → Feedback: good start, but depth grows from consistent rhythms. (delta +0)
• Field Experiment:
Title: “Find Your Third Place”
Instructions: “Spend one intentional hour at a café/park/gym this week. Learn one name. Notice one need. Pray a short blessing for the space.”

Analytics events (fire via lib/analytics.ts)
lesson_view, reflection_save, simulation_choice, field_submit, lesson_mark_complete, scripture_open.

A11y specifics
• Focus order: Header → Left Nav → Center → Right Rail.
• All custom components have aria-labels, roving tab index where needed, and escape/Enter handlers for dialogs/sheets.

⸻

STEP 4 — Assessment & Gamification

Goal: A mastery page with immediate feedback and lightweight celebration; badges and streaks surface inside the profile popover and right rail.

Route
• /app/principles/[slug]/quiz

Components
• MasteryCheck.tsx
• Question types: single select (radio), multi-select (checkbox).
• Show hint on first miss; reveal explanation after answer is locked.
• Pass threshold default 80% (configurable).
• CTA: “Review lesson” (deep links back), “Next module.”
• BadgeEarnedModal.tsx
• Confetti (reduced motion safe), big icon, short encouragement aligned to Brad’s tone:
“You moved into the neighborhood—nice. Presence creates possibility.”
• Share buttons (copy link), ‘Keep learning’ CTA.
• StreakPill.tsx
• Shows daily/weekly streak; tooltip explains how it works (mocked counts).

Sample quiz (Incarnational Mission) 1. Best summary of incarnational mission:
☐ Running more church programs
☐ Moving gospel toward people’s real lives (Correct)
☐ Keeping sacred and secular separate 2. First faithful move in a new parish is to:
☐ Announce events
☐ Map places & people, listen, join existing good (Correct)
☐ Avoid public spaces 3. Jeremiah 29:4–7 shapes posture by calling us to:
☐ Withdraw from the city
☐ Seek the city’s welfare through settled presence (Correct)

Gamification
• Create mock badges:
• badge_incarnation: “Moved into the Neighborhood” (home icon)
• badge_vocation: “Everyday Missionary” (briefcase-heart)
• badge_multiplication: “Seed Planter” (sprout)
• Right rail shows earned badges mini-row; click opens BadgeEarnedModal.

Analytics events: quiz_start, quiz_answer, quiz_pass, badge_earned, streak_increment.

⸻

STEP 5 — Journal & Cohorts

Goal: Private reflective Journal for metacognition and a lightweight Cohort feed for peer story-exchange and facilitator highlights.

Journal
• Route: /app/journal
• Components:
• JournalComposer.tsx: title (optional), tags (chips), textarea (rich), Attach Audio (60s recorder), Save button.
• JournalList.tsx: reverse-chrono cards with excerpt, tags, principle chip, audio playback, Edit.
• Filters: by principle, by presence of audio, by date.
• Privacy toggle on entry: Private (default) / Share to cohort (if in cohort).
• Empty state: “Your reflections live here. Start by capturing one insight from today’s practice.”
• Seed example entries with Incarnational Mission tags (e.g., #proximity, #thirdplace).

Analytics: journal_create, journal_edit, journal_filter.

Cohorts
• Route: /app/cohorts/[id]
• Components:
• Feed: PostComposer (text, link preview mock, optional image), PostCard (author, time, content, Reactions, Comments), Pinned section at top.
• Facilitator tools on each post: Pin/Unpin, Highlight (adds “Facilitator Highlight” pill), Nudge User (toast only mock).
• Right rail: Cohort roster (avatars), dates (upcoming calls placeholder), Top stories (posts with most reactions).
• Live updates mocked: when new post is added, show subtle “New posts” toast; clicking brings into view.
• Seed 3 posts:
• “Tried the third-place hour—met the barista, learned about a local food pantry need.”
• “Mapped my block; realized I only know 2 of 10 neighbors by name.”
• Facilitator pin: “This week’s practice: Pray a blessing on your workplace on arrival.”

A11y: Comment fields labeled; roles for list/feed; keyboard for react/expand.
Analytics: post_create, comment_create, post_pin, post_highlight.

⸻

STEP 6 — Admin CMS (Simple & Safe)

Goal: A safe, additive authoring UI to manage modules with MDX binding, activities, and quizzes. No destructive actions. All changes are additive drafts.

Route
• /admin (protected), left nav: Principles, Lessons, Activities, Quizzes, Cohorts.

Principles
• PrinciplesTable: list with title, slug, est minutes, published badge.
• Actions: “New Principle” (creates draft), “Open in Builder.”

Builder (single-page, tabbed)
• Overview Tab: Title, slug (locked if published), summary, estimated minutes, badge select.
• Lessons Tab: Ordered list with Add Lesson. Each lesson row → Edit drawer:
• Title, order, Video (Mux ID or “no video”), MDX path selector (file picker to /content/... with preview), Key Takeaways (3 bullets).
• Preview button opens a live render of MDX using MDXRenderer.
• Activities Tab: For selected lesson, add activity of type:
• Reflection: prompt text, min words, preview.
• Simulation: scenario, 2–4 choices {label, rationale, delta} with reorder; preview shows choice cards.
• Field Experiment: title, instructions (multiline), suggested duration, optional checklist.
• Quiz Tab: Add Qs (single/multi), options, correct indices, hint, explanation; preview in MasteryCheck frame.
• Publish Tab: “Validate & Publish” runs Zod schema checks, shows results; if pass, marks as Published vX and freezes slug.
• Versioning drawer: list prior versions with timestamp; clicking shows diff preview. No delete; can Revert by creating vX+1 copy.

UX rules
• Every form has autosave indicator.
• Disable publish if required fields missing.
• Show “What good looks like” helper text matching Brad’s tone.

Seed examples in Admin
• Create the “Rethink Incarnational Mission” module with the exact lessons/activities/quiz above, visible and fully previewable.

Analytics: admin_principle_create, admin_lesson_add, admin_activity_add, admin_quiz_add, admin_publish_success.

⸻

Visual & Interaction Details (apply everywhere)
• Spacing scale: 4/6/8/12/16/24/32/48. Sections ≥ py-12.
• Cards: rounded-2xl, soft shadows, generous p-6.
• Icons: lucide-react (home, map, sprout, message-square).
• Tooltips for icon-only buttons; focus rings: ring-2 ring-primary.
• Toasts: success/info/error; timeouts 3.5s, aria-live polite.
• Breadcrumbs on all deep routes.
• State indicators: saving dots, loading skeleton shimmer, error banners with retry.

⸻

QA / Acceptance (interactive behaviors to verify)
• Module player keyboard shortcuts (J/K/M/R) work and are announced.
• Reflection saves optimistically; error rolls back with toast.
• Simulation reveals feedback panel after choice; can retry.
• Field experiment submit triggers celebration toast and appears in Journal.
• Quiz pass ≥ 80% triggers badge modal and updates right-rail badges.
• Journal filter by principle works; audio records and plays back.
• Cohort: facilitator pin/highlight obvious and reversible; new post toast appears.
• Admin Builder previews MDX, activities, and quiz exactly as learner would see, before publish.
• All pages usable with keyboard only and high contrast; no motion if reduced motion set.

⸻

Deliverables:
• New routes, components, and content files described above.
• Mock data/fixtures in /content and /mocks.
• Types & Zod schemas.
• No deletions. Everything additive, documented with component READMEs where helpful.

When finished with this phase:
• Output a short summary of added routes/components and where fixtures live, so we can plug in the real e-book later without changing the UI.
