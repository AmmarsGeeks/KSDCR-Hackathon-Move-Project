1. Introduction & Problem Statement

33.6% of older Saudi adults live with a disability requiring intervention (Alhwoaimel et al., 2024/2025)
<47% of Saudi caregivers use remote care with PWD — access gap (Al-Bashir et al., 2025)
Current assessment relies on manual scales, costly EMG/EEG sensors, or self-report surveys
No published system validated for pose estimation under thobe/abaya

2. Objectives & Target Users

Automate rep-counting and movement scoring via phone camera only
Robust to loose traditional Saudi clothing
Target users: physiotherapists (time-constrained), home-based rehab patients, caregivers

3. Proposed Solution

MOVE — "Gamified, Occlusion-Robust Rehabilitation Coaching for Saudi Patients."
Markerless pose estimation, single phone camera, retrained on regional data for occlusion robustness under loose Saudi clothing (thobe/abaya).
Extends closest published system (Jleli et al., 2024, KSCDR — lab-only, no clothing test) to real-world, home-use conditions.

Five features:

a) Gamification — Inspired by thera_pixel (Hacklytics 2025; https://devpost.com/software/rehab-fv6j1l).
   HONEST ATTRIBUTION: thera_pixel proved gamified-rehab with a single game (Pizza Pursuit); MOVE's "different mini-game per prescribed exercise / growing library" is MOVE's own extension.
   Content structure borrowed from the KSAA games platform (https://games.ksaa.gov.sa — a language-learning product; taxonomy only, not rehab): three tiers → Gentle / Standard / Challenge (therapist-unlocked); Solo vs. Family/Group Sessions; each exercise maps to its own themed mini-game; private opt-in weekly streak / personal-best tracker (NOT a public leaderboard).

b) Notifications & care-network support — Inspired by RecoveryLab (TreeHacks 2026; https://devpost.com/software/recoverylab).
   HONEST ATTRIBUTION: RecoveryLab confirms adherence tracking + caregiver alerts on missed sessions; the regression-trend check-in flag and tier/game-unlock feedback are MOVE's own extensions (RecoveryLab inspires the care-network SHAPE only).
   Caregiver alerts carry STATUS only, never raw video or clinical detail.

c) "No assumed gym setup" design constraint (CORE NOVELTY) — Contrast with MoveAI (WEHack 2026; https://devpost.com/software/echorehab) and similar.
   HONEST ATTRIBUTION: MoveAI webcam rep-counting is documented; "assumes gym-style setup / exposed limbs" is MOVE's INFERENCE and counter-position, NOT a documented MoveAI claim.
   MOVE design: calibration works in whatever the patient is wearing, no bare-limb calibration, camera-distance tolerance for "a phone propped on a household object."

d) UI/UX — Inspired by KineTrack (HackTX 2025; https://devpost.com/software/kinetrack).
   Opens straight to live camera, spoken coaching prompts, end-of-session summary, saved session history, user-adjustable camera resolution/frame rate.

e) Technology stack — Inspired by PhysioVision (Code for Change 2026; https://devpost.com/software/physiovision).
   Google MediaPipe Pose Landmarker (~30 fps, 33 landmarks) fine-tuned for loose-garment occlusion; per-exercise analyzers using relative landmark distances + occlusion-confidence weighting; custom rep-counting state machine; percentage-based tempo + ROM scoring; phone-first frontend; Node.js/Express + MongoDB + JWT backend.

[Insert screenshot/mockup of app capture + score screen]

4. Methodology & System Design

AI-model overview (Q1):
- Pose / landmark extraction = MediaPipe Pose Landmarker (BlazePose), on-device; the ONLY component that touches raw video.
- Exercise / rep analysis = deterministic rule-based state machine (NOT neural) — a trustworthiness choice.
- Coaching-text generation = LLM (Gemini/Claude) on numeric signals only (KineTrack pattern).
- TTS = ElevenLabs or on-device fallback.
- Trend / regression flagging = statistical thresholding, not learned.

4-stage pipeline (Q2):
1) Capture on-device — phone → MediaPipe locally; raw video never leaves the phone.
2) Analysis — landmarks + confidence → rule-based analyzer / state machine → compact numeric session record (rep count, ROM score, tempo score, per-joint occlusion-confidence, phase timestamps); the numeric record is transmitted, not video.
3) Transport — numeric record over authenticated WebSocket/HTTPS to backend (KineTrack ws/analyze pattern).
4) Backend — FastAPI/Node.js stores (MongoDB), runs trend-flagging for caregiver alerts, calls coaching-text LLM + TTS, returns summary/spoken feedback.

A small set of narrow, single-purpose models coordinated by backend logic — NOT one large end-to-end model — a safety / auditability argument.

Designed against known failure modes: unseen camera angle (up to 50% accuracy drop, Arrowsmith et al. 2023), garment drape mistaken for joint position (Yamaguchi et al. 2022); confidence check flags low-visibility frames instead of guessing.

[Insert system architecture diagram]

5. Results & Evaluation

Published RGB pose systems: 87–99.5% accuracy under controlled, lab conditions (literature)
Accuracy degrades sharply with camera-angle change and loose clothing (literature):
- Robe-like garments: hip error 11.36° vs normative baseline; depth sensor failed entirely (Viswakumar et al., 2022)
- KSCDR's own CV work: 97.6% on binary fall detection, small single-subject dataset (Alabdulkreem et al., 2023)
- Real-time video telerehab: +8–9 pts attendance/adherence vs in-person (Simmich et al., 2024)
No published system validated on hijab, abaya, or burqa — this is the gap MOVE targets.
Prototype validation planned for Phase 2.

> STATUS (honest): MOVE is at the idea/design stage. The approach is literature-supported but NO MOVE trial data exists yet — no MOVE-specific performance numbers are claimed on this poster. The poster and presentation are not yet finalized. Deadlines: poster 8 September 2026 10:00 PM; presentation 15 September 2026.

[Insert chart: accuracy vs. condition — lab / angle-shift / clothing-occlusion]

6. Discussion, Impact & Ethics

Clinical validation pending — literature shows the problem is real and unsolved, not that MOVE is proven.
Garment/coverage testing to be participant-defined, never visually inferred.
Safety-first design: system defers or prompts repositioning rather than output a false-confidence score.
Impact: saves therapist time, scales home monitoring, addresses documented remote-care adoption gap.
Physical therapist remains final clinical decision-maker.

Trustworthiness / XAI measures (Q3):
- Data minimization: raw video stays on-device; only numeric signals leave (privacy + cultural sensitivity).
- Interpretable-by-construction middle layer: rule-based state machine, fixed inspectable thresholds — therapist can audit why a rep was / wasn't counted.
- Confidence-aware degradation: low-confidence readings flagged/suppressed in UI ("low visibility on this joint").
- Safe fallback: pause scoring/feedback on low confidence rather than risk a wrong correction.
- Human-in-the-loop: therapists control tier/difficulty unlocking + review consultation flags; the system never auto-diagnoses.
- Auditable alerts: every notification is traceable to a numeric threshold.
- Fairness/robustness reporting as design commitment: garment-stratified evaluation (accuracy per clothing condition), not pooled accuracy — closing the gap from Viswakumar et al. and Ray et al.

FLAG: none of the above is empirically validated yet on MOVE itself — this is an architectural / design answer pending real testing.
