# MOVE — Gamified, Occlusion-Robust Rehabilitation Coaching for Saudi Patients

> **STATUS: SUPERSEDED — FORMALLY ADOPTED & MERGED.** The ideas captured in this
> file have been formally adopted by the MOVE project. They have been merged into
> **`Project-Context.md`** (the baseline project context) and the new
> **`MOVE-Master-Context.md`** (the unified source of truth). This file is
> retained for history, as the original idea-capture record / "diff" of evolving
> ideas; it is no longer the live working document. For the current, consistent
> project definition, refer to `Project-Context.md` and `MOVE-Master-Context.md`.

**Track:** KSCDR AI Hackathon 2026 — Health & Rehabilitation (Motion Analysis Systems)

## 1. Concept Overview

MOVE is a phone-camera, markerless pose-estimation app that turns home physical therapy into a short daily game session instead of a checklist of unsupervised exercises. It is built for the reality of Saudi households: patients often wear loose traditional clothing (thobe, abaya) during the day, and most rehab tools assume a gym-style setup with exposed limbs and a fixed webcam. MOVE is designed around the opposite assumption — a single handheld or propped-up phone, ordinary daily clothing, and a patient exercising alone at home.

MOVE is not claiming to invent pose estimation, rep counting, or rehab gamification individually — all three exist in prior work. Its contribution is combining them around one deployment problem that prior hackathon submissions leave untested: reliable motion analysis when loose Saudi garments obscure or shift visible joint landmarks.

## 2. Gamification Layer

**Inspiration base:** thera_pixel's single-game gamified-rehab proof, extended by MOVE into a per-exercise mini-game library; re-themed using the level/mode structure of the King Salman Global Academy for Arabic Language's games platform ([games.ksaa.gov.sa](https://games.ksaa.gov.sa)).

thera_pixel proved the gamified-rehab concept with a **single game** — its Pizza Pursuit game for upper-extremity work — plus a calmer "practice studio" mode for older patients. It did **not** build "a different mini-game per exercise"; what it proved is that wrapping physical therapy in a small, purpose-built game keeps patients engaged and reduces the tendency to skip sessions. MOVE **extends** that single-game proof: **each training session opens a different game tied to the prescribed exercise**, and each prescribed exercise maps to its own themed mini-game in a growing library — a generalization thera_pixel never built. MOVE borrows its content structure from the KSAA games platform rather than inventing one from scratch:

- **Difficulty tiers, not just games.** KSAA organizes its 50+ games into three audience levels (easy/kids, medium/adults, hard/specialists). MOVE mirrors this with three rehab-appropriate tiers instead: **Gentle** (early recovery, low range-of-motion targets), **Standard** (maintenance-phase patients), and **Challenge** (late-stage recovery, therapist-unlocked). The therapist — not the patient — decides which tier is active, so difficulty scaling never becomes a compliance risk.
- **Individual and group modes.** KSAA separates single-player and multiplayer games. MOVE reuses this split as **Solo Sessions** (default, private, for the patient's own recovery pace) and **Family/Group Sessions** (a caregiver or sibling does the same movement alongside the patient on a shared screen, mainly for pediatric or elderly patients who respond better to companionship than to a solo screen).
- **A rotating library, not one fixed game.** KSAA frames its offering as a growing catalog ("أحدث الألعاب" / latest games) rather than a single static app. MOVE follows the same pattern: each prescribed exercise (shoulder flexion, knee extension, gait cadence, balance hold, etc.) maps to its own themed mini-game, and new games can be added to the library without changing the underlying pose-tracking engine.
- **Light competitive structure.** KSAA runs "leagues" (المنافسات) to sustain engagement. MOVE's equivalent is a private, opt-in **weekly streak and personal-best tracker** — deliberately not a public leaderboard, since rehab pace is medically sensitive and should not be gamed for social comparison.

This keeps MOVE's gamification familiar (thera_pixel's proof that it improves adherence) while giving it a content taxonomy that is already validated at scale for a Saudi audience (KSAA's platform reports 50+ games, 3,000+ questions, and both a web and mobile app in production).

## 3. Notifications & Care-Network Support

**Inspiration base:** RecoveryLab's caregiver-alert and adherence-tracking model — inspiring the care-network SHAPE only.

RecoveryLab's strongest idea, independent of its pose-tracking approach, is treating rehab as something a care network watches together, not something the patient does in isolation. RecoveryLab **confirms** adherence tracking against a therapist's prescribed schedule and caregiver alerts on missed sessions. MOVE adopts the same care-network shape, then extends it with its own design work:

- **Adherence tracking.** Every completed (or skipped) session is logged against the therapist's prescribed schedule, the same way RecoveryLab tracks adherence over time rather than just logging raw exercise data. *(Confirmed RecoveryLab feature.)*
- **Care-network alerts.** A designated caregiver (parent, adult child, or spouse) can be linked to a patient's account and receives a notification when a session is missed, when form quality drops sharply between sessions, or when a flagged safety event occurs (e.g., a fall-risk movement during a balance exercise). This mirrors RecoveryLab's care-network alert concept rather than sending raw video or clinical detail — the caregiver sees status, not diagnosis. *(Confirmed RecoveryLab feature.)*
- **Consultation flagging.** If a patient's session data shows a consistent regression (not a single bad session, but a trend), MOVE surfaces a "recommend a check-in" prompt to both the patient and the linked therapist, rather than trying to auto-diagnose anything itself. **MOVE extension** — this sustained-regression trend flagging is MOVE's own design; it is **not** a feature RecoveryLab documents.
- **Personalized plan adjustment.** Session history feeds back into which tier/game is unlocked next, keeping rehab plans personalized instead of static. **MOVE extension** — this tier-unlock feedback loop is MOVE's own design; it is **not** a feature RecoveryLab documents.

MOVE deliberately does not copy RecoveryLab's broader "any phone or laptop camera + vision-language model" analysis approach — that choice belongs to the technology section below.

## 4. Design Principle: No Assumed Gym Setup

**Contrast case:** MoveAI (WEHack 2026) and similar generic fitness trackers.

MoveAI's confirmed feature is webcam-based rep-counting for standard exercises (squat, push-up, etc.), with data flowing to clinicians. MOVE's differentiation stance — and this is MOVE's own inference and counter-position, **not** a documented MoveAI claim — is that MoveAI and comparable projects (Reptrics, Tyso, Form AI) appear to be built around a standard webcam or gym-style capture setting: good lighting, a fixed camera distance, and exposed limbs in athletic wear. That inferred assumption quietly excludes a large share of Saudi patients doing rehab at home in a thobe or abaya, in ordinary living-room lighting, with a phone propped on a table or held by a family member.

MOVE treats "no dedicated gym setup" as a hard design constraint, not a stretch goal:

- Calibration only requires the patient to stand in frame for a few seconds in whatever they're already wearing — no bare-limb calibration step, no special outfit prompt.
- The pose engine is retrained/fine-tuned specifically for occlusion from loose, flowing garments (thobe, abaya, hijab) instead of assuming clean joint-landmark visibility, which is the gap identified across every reviewed prior-art project (thera_pixel, KineTrack, PhysioVision, RecoveryLab, MoveAI, and the generic fitness trackers all leave this untested).
- Camera distance and framing tolerance is built for "a phone propped against a household object," not a mounted webcam at a fixed lab distance.

This is the single differentiator called out in MOVE's prior-art review: no verified hackathon submission combines phone-based rehab pose estimation with explicit loose-clothing occlusion handling.

## 5. UI/UX

**Inspiration base:** KineTrack's live-camera, spoken-guidance, session-summary flow (KineTrack has a working live demo, which is why MOVE mirrors its interaction model closely).

- **Straight into the camera.** The app opens directly to a live camera view for the prescribed exercise/game — no menu maze before the patient can start moving, matching KineTrack's "opens to a live camera" pattern.
- **Spoken coaching, not on-screen text walls.** While the patient moves, MOVE gives short spoken prompts ("lift a little higher," "slow down") instead of requiring the patient to read instructions mid-movement — directly adapted from KineTrack's voice-prompt coaching.
- **End-of-session summary.** After each game/exercise, the patient sees a short summary of what they did well and what to focus on next time, the same closing structure KineTrack uses.
- **Session history.** Every session recording/log is saved so the patient (and linked caregiver/therapist, per Section 3) can look back at form trends over time, not just the most recent session.
- **Adjustable capture settings.** Camera resolution and frame rate are user-adjustable to match the patient's specific phone, the same accommodation KineTrack makes for device variability across a wide range of low-to-high-end Android/iOS hardware.

## 6. Technology Stack

**Inspiration base:** PhysioVision's pose-tracking and rep-counting architecture — adapted from PhysioVision's webcam/web-app implementation to a native phone-first build, since PhysioVision itself is explicit that a mobile version is future, unbuilt work.

| Layer | PhysioVision's approach | MOVE's adaptation |
| --- | --- | --- |
| Pose tracking | Google MediaPipe Pose Landmarker, ~30 fps, 33 body landmarks | Same MediaPipe landmarker as the base engine, fine-tuned/re-weighted for landmark confidence under loose-garment occlusion rather than used out of the box |
| Exercise logic | Per-exercise analyzers using relative landmark distances (e.g., knee-to-hip vertical distance for squats) instead of raw joint angles, for robustness across body types and camera distances | Same relative-distance approach, since it already generalizes better than fixed joint-angle thresholds — extended with occlusion-confidence weighting so a partially hidden landmark degrades gracefully instead of producing a false reading |
| Rep counting | Custom state machine: normalized 0–1 movement signal, tuned up/down-phase thresholds, multi-frame stability requirement, minimum inter-rep time to prevent double-counting | Reused as-is; this state-machine approach is hardware-agnostic and doesn't need to change for phone capture |
| Scoring | Percentage-based tempo tolerance (not fixed millisecond thresholds) and range-of-motion scoring | Reused, since percentage-based tolerance already scales naturally to different patient speeds — relevant for a rehab population with a wider speed range than PhysioVision's general fitness users |
| Frontend | React/TypeScript web app (Vite, Tailwind, shadcn/ui) | Rebuilt as a native/phone-first app per Section 5's UI model, since PhysioVision's own roadmap lists "mobile-friendly version" as unbuilt future work |
| Backend/data | Node.js/Express, MongoDB, JWT auth | Reused as a reasonable default for session storage, auth, and the adherence/notification data described in Section 3 |

## 7. What Makes MOVE Different (Summary)

Camera-based exercise coaching, gamified PT, caregiver notification systems, and MediaPipe-based rep counting have all appeared separately in prior hackathon projects. MOVE's novelty is not any one of these components — it is combining a proven adherence mechanic (thera_pixel-style gamification, re-themed on a Saudi-validated content structure), a proven caregiver-support loop (RecoveryLab-style alerts), a proven mobile coaching UX (KineTrack's live-camera/voice-prompt flow), and a proven pose-tracking core (PhysioVision's analyzer/state-machine design) — around the one condition none of them test for: rehabilitation motion analysis under loose Saudi clothing occlusion.

## 8. Open Items / Not Yet Validated

- No MOVE-specific trial data exists yet; the occlusion-robustness claim is a design target supported by literature (see the separate Results & Evaluation evidence report), not a measured result.
- The KSAA games platform is a language-learning product, not a rehab product — it is used here only as a structural/content-taxonomy reference (levels, modes, rotating library), not as a technical or clinical source.
- Exact list of exercise-specific mini-games still needs clinical sign-off per exercise before build.

## 9. Committee Q&A

Prepared answers to anticipated committee questions on AI models, pipeline, and trustworthiness.

### Q1 — General overview of potential AI models

- **Pose/landmark extraction:** Google MediaPipe Pose Landmarker (BlazePose), on-device where possible. This is the only model that touches raw video.
- **Exercise/rep analysis:** **NOT** a neural model — a deterministic rule-based state machine on landmark output (relative distances, phase thresholds). This is a deliberate trustworthiness choice (see Q3).
- **Coaching-text generation:** a language model (e.g. Gemini or Claude) converts quantitative signals (rep count, ROM score, tempo score, occlusion confidence) into short natural-language coaching text — KineTrack's pattern ([https://devpost.com/software/kinetrack](https://devpost.com/software/kinetrack)), reused here.
- **Text-to-speech:** ElevenLabs (or on-device TTS fallback) for spoken prompts.
- **Trend/regression flagging for caregiver alerts:** simple statistical thresholding over session history, not a learned model.

### Q2 — Exact pipeline (4-stage)

1. **Capture (on-device):** phone camera frames → MediaPipe Pose Landmarker locally. Raw video never leaves the phone.
2. **Analysis (on-device or edge):** landmarks + per-landmark confidence → rule-based analyzer/state machine → compact numeric session record (rep count, ROM score, tempo score, per-joint occlusion-confidence, phase timestamps). The numeric record, not video, is transmitted.
3. **Transport:** numeric session record over authenticated WebSocket/HTTPS to backend (mirrors KineTrack's `ws/analyze` pattern).
4. **Backend services:** FastAPI/Node.js stores the record (MongoDB), runs trend-flagging for caregiver alerts, calls the coaching-text LLM + TTS for the session summary/spoken feedback, and sends it back to the app.

**Call-out:** MOVE is a small set of narrow, single-purpose models coordinated by conventional backend logic — **not** one large end-to-end model. This is itself a safety/auditability argument: each stage is inspectable and replaceable independently.

### Q3 — Trustworthiness measures / XAI

- **Data minimization:** raw video stays on-device; only derived numeric signals leave the phone (privacy + cultural sensitivity).
- **Interpretable-by-construction middle layer:** a rule-based state machine with fixed, inspectable thresholds (inherited from PhysioVision), not a black-box classifier.
- **Confidence-aware degradation:** each landmark carries an occlusion-confidence score; low-confidence readings are flagged/suppressed in the UI ("low visibility on this joint") rather than silently guessed.
- **Safe fallback:** if confidence drops below threshold, MOVE pauses scoring/feedback for that segment instead of issuing a possibly-wrong correction that could risk re-injury.
- **Human-in-the-loop:** therapists control tier/difficulty unlocking and review trend-based consultation flags; the system never auto-diagnoses or auto-adjusts a clinical plan.
- **Auditable alerts:** every caregiver/therapist notification is traceable to the specific numeric threshold that triggered it.
- **Fairness/robustness reporting as a design commitment:** the planned evaluation is garment-stratified (accuracy reported separately per clothing condition), not a single pooled accuracy — this is the gap from Viswakumar et al. (loose garments) and Ray et al. (synthetic loose-garment MPJPE) that MOVE closes.

**FLAG:** none of the above is empirically validated yet on MOVE itself — this is an architectural/design answer pending real testing.

## 10. Honest Current Status

MOVE is at the **idea / design stage**. The concept is literature-supported, but there is **no MOVE trial data yet** — the occlusion-robustness claim is a design target supported by prior literature (Viswakumar et al., Ray et al.) and prior-art review, not a measured result. The poster and presentation are **not yet finalized**.

**Deadlines:**
- **Poster:** 8 September 2026, 10:00 PM.
- **Presentation:** 15 September 2026.

This status must not be inflated into a stronger claim than it is. Where MOVE-specific performance numbers would belong, the answer is "not yet measured."

Refernces Link

1. thera_pixel — الرابط
هاكاثون Hacklytics 2025، وفاز بالمركز الثاني. يستخدم MediaPipe لتتبع الحركة ثلاثي الأبعاد للعلاج الطبيعي، مع فيديو مباشر وتوجيه للتمارين. ما تطرقوا أبداً لموضوع الملابس أو الانسداد (occlusion)، وما أكدوا إذا الكاميرا المستخدمة كاميرا جوال أصلاً.
https://devpost.com/software/rehab-fv6j1l


2. KineTrack — الرابط
تطبيق iOS من HackTX 2025. هذا أقرب واحد من ناحية "كاميرا الجوال" لأنه صراحة يستخدم كاميرا الآيفون المباشرة. يعطي تحليل للحركة وتوجيه صوتي. برضو ما فيه أي تعامل مع الملابس الفضفاضة.
https://devpost.com/software/kinetrack


3. PhysioVision — الرابط
من هاكاثون Code for Change 2026. يستخدم MediaPipe لتتبع 33 نقطة على الجسم، وعد التكرارات، وتقييم مدى الحركة. لكن يعتمد على "ويب كام" مو جوال، وقالوا نسخة الجوال بعدين "مستقبلاً".
https://devpost.com/software/physiovision


4. RecoveryLab — الرابط
من TreeHacks 2026. منصة تعافي عن بعد شاملة (مشي، توازن، قوة) وفيها تنبيهات للأهل ومتابعة التزام. يدعم أي كاميرا جوال أو لابتوب، لكن تحليله يعتمد على نماذج لغوية بصرية مو مكتبة pose estimation محددة، وما فيه أي إشارة للملابس.
https://devpost.com/software/recoverylab


5. MoveAI — الرابط
من WEHack 2026. مراقبة تأهيلية بالذكاء الاصطناعي تستخدم ويب كام عادي لعد التمارين (سكوات، ضغط، إلخ) والبيانات تروح للأطباء. أقرب مشروع من ناحية "التأهيل" لكنه يفترض إعداد صالة رياضية عادي.

https://devpost.com/software/echorehab