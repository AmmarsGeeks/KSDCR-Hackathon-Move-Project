# MOVE — Master Context

*The single unified source of truth for the MOVE project. Combine and reconcile everything below when filling the poster and presentation in the next pass. Structure is intentionally header-driven so content can be lifted section by section.*

> **Lineage note.** MOVE supersedes an earlier project direction called "HarakAI" (MoveNet Lightning + Bi-LSTM + SHAP/Grad-CAM stack). The HarakAI name and stack, and any HarakAI-era performance numbers (e.g. 72.3%→84.1% keypoint detection, 6.2° MAE), are **superseded historical claims** and must NOT be presented as MOVE results. MOVE has no trial data yet. Where the two directions conflict, the content in this file wins.

---

## 1. Concept Overview

**MOVE** — *Gamified, Occlusion-Robust Rehabilitation Coaching for Saudi Patients.*

MOVE is a phone-camera, markerless pose-estimation app that turns home physical therapy into a short daily game session instead of a checklist of unsupervised exercises. It is built for the reality of Saudi households: patients often wear loose traditional clothing (thobe, abaya) during the day, and most rehab tools assume a gym-style setup with exposed limbs and a fixed webcam. MOVE is designed around the opposite assumption — a single handheld or propped-up phone, ordinary daily clothing, and a patient exercising alone at home.

MOVE is not claiming to invent pose estimation, rep counting, or rehab gamification individually — all three exist in prior work. Its contribution is combining them around one deployment problem that prior hackathon submissions leave untested: **reliable motion analysis when loose Saudi garments obscure or shift visible joint landmarks.**

**Tagline:** *Culturally-Adapted AI Motion Analysis for Saudi Rehabilitation.*

**One-line description:** A smartphone-based, markerless AI motion analysis system that scores physical therapy exercises in real time — adapted for traditional Saudi attire — enabling remote physiotherapist review with explainable, confidence-aware feedback.

---

## 2. Problem & Gap (evidence-backed, still valid from the HarakAI baseline)

### Gap 1 — Cultural Attire Gap (MOVE's primary innovation)
Standard AI computer vision and motion analysis systems are trained on Western datasets where participants wear T-shirts and shorts, exposing all joints. Traditional Saudi attire (thobe, abaya) occludes the exact joints (hips, knees, elbows, shoulders) that pose estimation models depend on. No paper in KSCDR's publication corpus validates any computer vision model on participants wearing thobe or abaya. KSCDR's own hackathon brief calls for *"standardized Arab metrics suitable for the Saudi environment."*

### Gap 2 — Telerehabilitation vs. Expensive Clinical Setups
Clinical motion analysis (e.g., Vicon) is prohibitively expensive and requires physical clinic visits — a burden for PWD, especially in rural areas and post-MVA cases.

### Gap 3 — Manual Clinical Measurement Bottleneck
Saudi physiotherapists currently use manual goniometry, GMFM-88, Modified Ashworth Scale, Barthel Index, and self-reported questionnaires (PASIPD-AR). All require trained staff, clinic attendance, and significant time. 38% of Saudi physiotherapists report they cannot consistently use standardized outcome measures due to time constraints (Alhwoaimel et al., 2024).

### Gap 4 — Physical vs. Cognitive Tech Deficit
KSCDR's recent AI publications skew toward cognitive/neurological disorders (ASD, Alzheimer's, Epilepsy). Physical/motor disability AI tools are underrepresented.

---

## 3. The Five Features (with inspiration sources — keep attribution; it's part of the novelty argument)

### a) Gamification
**Inspiration:** thera_pixel (Hacklytics 2025, 2nd place; uses MediaPipe 3D Pose) — https://devpost.com/software/rehab-fv6j1l

> **Honest attribution:** thera_pixel proved the gamified-rehab concept with a **single** game (Pizza Pursuit) plus a practice-studio mode. MOVE's "different mini-game per prescribed exercise / growing library" is MOVE's **extension**, not a proven thera_pixel feature. thera_pixel did not address clothing occlusion.

**Content structure** borrowed from the King Salman Global Academy for Arabic Language games platform — https://games.ksaa.gov.sa (a language-learning product, referenced only for its **taxonomy**, not its content):

| KSAA structure element | MOVE mapping |
|---|---|
| Three audience/difficulty tiers (easy/kids, medium/adults, hard/specialists) | MOVE's **Gentle / Standard / Challenge** tiers — therapist-unlocked, not patient-selected (difficulty scaling never becomes a compliance risk) |
| Individual vs group play | MOVE's **Solo Sessions** (default, private) vs **Family/Group Sessions** (caregiver/sibling moves alongside — for pediatric/elderly patients who respond to companionship) |
| Rotating library of 50+ games, not one fixed app | MOVE maps **each prescribed exercise to its own themed mini-game** in a growing library; new games can be added without changing the pose-tracking engine |
| "Leagues" competitive structure | MOVE's private, opt-in **weekly streak / personal-best tracker** — deliberately NOT a public leaderboard (rehab pace is medically sensitive) |

### b) Notifications & Care-Network Support
**Inspiration:** RecoveryLab (TreeHacks 2026) — https://devpost.com/software/recoverylab

> **Honest attribution:** RecoveryLab **confirms** adherence tracking against a therapist's schedule and caregiver alerts on missed sessions. The "recommend a check-in flag on sustained regression trends" and "session history feeds back into which tier/game unlocks next" are **MOVE's own design extensions**, not features RecoveryLab documents. RecoveryLab inspires the care-network **shape** only.

- **Adherence tracking.** Every completed/skipped session logged against the therapist's prescribed schedule.
- **Care-network alerts.** A designated caregiver (parent, adult child, spouse) is linked to the account and notified when a session is missed, form quality drops sharply, or a flagged safety event occurs. Caregiver sees **status only, never raw video or clinical detail.**
- **Consultation flagging.** On a **sustained regression trend** (not a single bad session), MOVE surfaces a "recommend a check-in" prompt to patient and linked therapist — it flags patterns, never auto-diagnoses.
- **Personalized plan adjustment.** Session history feeds back into which tier/game unlocks next.

### c) "No Assumed Gym Setup" Design Constraint (CORE NOVELTY)
**Contrast case:** MoveAI (WEHack 2026) and similar (Reptrics, Tyso, Form AI) — https://devpost.com/software/echorehab

> **Honest attribution:** MoveAI's webcam-based rep-counting is confirmed. The "assumes a gym-style setup with exposed limbs / fixed webcam" framing is **MOVE's inference and counter-position**, not a documented MoveAI claim. It is MOVE's differentiation stance, not an attributed fact.

MOVE treats "no dedicated gym setup" as a hard design constraint, not a stretch goal:

- Calibration requires only that the patient stand in frame for a few seconds in **whatever they're already wearing** — no bare-limb calibration step, no special outfit prompt.
- The pose engine is fine-tuned specifically for occlusion from loose, flowing garments (thobe, abaya, hijab) instead of assuming clean joint-landmark visibility — the gap every reviewed prior-art project (thera_pixel, KineTrack, PhysioVision, RecoveryLab, MoveAI) leaves untested.
- Camera-distance and framing tolerance is built for **"a phone propped on a household object,"** not a mounted webcam at a fixed lab distance.

**This is the single differentiator:** no verified hackathon submission combines phone-based rehab pose estimation with explicit loose-clothing occlusion handling. It is MOVE's core novelty claim, not a side note.

### d) UI/UX
**Inspiration:** KineTrack (HackTX 2025; has a working live demo) — https://devpost.com/software/kinetrack

> All features below confirmed on KineTrack's Devpost page.

- **Straight into the camera.** App opens directly to a live camera view for the prescribed exercise/game — no menu maze.
- **Spoken coaching, not on-screen text walls.** Short spoken prompts ("lift a little higher," "slow down") during movement, instead of requiring the patient to read mid-movement.
- **End-of-session summary.** Short summary of what went well and what to focus on next time.
- **Session history.** Every session recording/log saved so patient/caregiver/therapist can review form trends over time.
- **Adjustable capture settings.** Camera resolution and frame rate user-adjustable to match the patient's device across low-to-high-end hardware.

### e) Technology Stack
**Inspiration:** PhysioVision (Code for Change 2026) — https://devpost.com/software/physiovision

> All details below confirmed on PhysioVision's Devpost page. Mapping from PhysioVision's webcam/web-app to a phone-first build.

| Layer | PhysioVision's approach | MOVE's adaptation |
|---|---|---|
| Pose tracking | Google MediaPipe Pose Landmarker, ~30 fps, 33 body landmarks | Same MediaPipe landmarker as base engine, **fine-tuned/re-weighted for landmark confidence under loose-garment occlusion** rather than used out of the box |
| Exercise logic | Per-exercise analyzers using **relative landmark distances** (e.g. knee-to-hip vertical distance for squats) instead of raw joint angles — more robust across body types/camera distances | Same relative-distance approach, extended with **occlusion-confidence weighting** so a partially hidden landmark degrades gracefully instead of producing a false reading |
| Rep counting | Custom state machine: normalized 0–1 movement signal, tuned up/down-phase thresholds, multi-frame stability requirement, minimum inter-rep time to prevent double-counting | Reused as-is (hardware-agnostic) |
| Scoring | Percentage-based tempo tolerance (not fixed ms thresholds) and range-of-motion scoring | Reused as-is (scales naturally to a rehab population's wider speed range) |
| Frontend | React/TypeScript web app (Vite, Tailwind, shadcn/ui) | **Rebuilt as a native/phone-first app** per Section 3d — PhysioVision's own roadmap lists "mobile-friendly version" as unbuilt future work, so this is genuinely new |
| Backend/data | Node.js/Express, MongoDB, JWT auth | Reused as a reasonable default for session storage, auth, and notification data (Section 3b) |

> **Supersedes:** the old HarakAI stack (MoveNet Lightning + Bi-LSTM temporal scoring + SHAP/Grad-CAM XAI). The Bi-LSTM scoring layer is replaced by the deterministic rule-based state machine; SHAP/Grad-CAM is replaced by confidence-aware degradation + interpretable-by-construction thresholds (see Section 5).

---

## 4. Committee Q&A — AI Models & Pipeline (Q1 + Q2)

### Q1 — General overview of potential AI models

| Model | Role | Notes |
|---|---|---|
| Google MediaPipe Pose Landmarker (BlazePose) | Pose/landmark extraction | Runs on-device where possible. **The only model that touches raw video.** |
| Deterministic rule-based state machine | Exercise/rep analysis | **NOT a neural model.** Operates on landmark output (relative distances, phase thresholds). Called out explicitly as a **trustworthiness choice** (see Section 5). |
| Language model (e.g. Gemini or Claude) | Coaching-text generation | Converts quantitative signals (rep count, ROM score, tempo score, occlusion confidence) into short natural-language coaching text — KineTrack's pattern (https://devpost.com/software/kinetrack), reused here. |
| ElevenLabs (or on-device TTS fallback) | Text-to-speech | Spoken prompts (Section 3d). |
| Statistical thresholding (not learned) | Trend/regression flagging for caregiver alerts | Same interpretability rationale as the rep-analysis layer. |

### Q2 — Exact pipeline: multiple models, communication infrastructure

A 4-stage pipeline:

1. **Capture (on-device):** phone camera frames → MediaPipe Pose Landmarker running locally on-device. **Raw video never leaves the phone.**
2. **Analysis (on-device or edge):** landmark coordinates + per-landmark confidence → rule-based exercise analyzer/state machine → produces a **compact numeric session record** (rep count, ROM score, tempo score, per-joint occlusion-confidence, phase timestamps). This numeric record, not video, is what gets transmitted.
3. **Transport:** numeric session record sent over authenticated WebSocket/HTTPS to the backend (mirrors KineTrack's `ws/analyze` pattern) for storage and downstream processing.
4. **Backend services:** FastAPI/Node.js backend stores the record (MongoDB), runs the trend-flagging logic for caregiver alerts, and calls the coaching-text LLM + TTS service to generate the session summary/spoken feedback, which is sent back to the app.

> **Call-out:** this is a small set of narrow, single-purpose models coordinated by conventional backend logic — **not one large end-to-end model** — which is itself a safety/auditability argument (see Section 5).

---

## 5. Trustworthiness Measures / XAI (Q3)

> **FLAG:** none of this has been empirically validated yet on MOVE itself. It is the **architectural/design** answer to "what trustworthiness measures exist," pending real testing.

1. **Data minimization as a trust measure.** Raw video stays on-device; only derived numeric signals leave the phone. Relevant both for privacy and for cultural sensitivity around home video capture.
2. **Interpretable-by-construction middle layer.** The rep-counting/scoring logic is a rule-based state machine with fixed, inspectable thresholds (inherited from PhysioVision's design), not a black-box classifier — a therapist can audit exactly why a rep was or wasn't counted.
3. **Confidence-aware degradation.** Each landmark carries an occlusion-confidence score; low-confidence readings are flagged/suppressed in the UI ("low visibility on this joint") rather than silently guessed — directly addresses the clothing-occlusion risk this project is built around.
4. **Safe fallback behavior.** If confidence drops below a threshold, MOVE pauses scoring/feedback for that segment instead of issuing a possibly-wrong correction that could risk re-injury.
5. **Human-in-the-loop control.** Therapists control tier/difficulty unlocking and review trend-based consultation flags; the system flags patterns, it never auto-diagnoses or auto-adjusts a clinical plan.
6. **Auditable alerts.** Every caregiver/therapist notification is traceable to the specific numeric threshold that triggered it — no alert originates from an unexplainable generative step.
7. **Fairness/robustness reporting as a design commitment.** Planned evaluation is **garment-stratified** (accuracy reported separately per clothing condition), not a single pooled accuracy number that could mask degraded performance specifically for covered patients — this is the explicit gap identified in the literature review (Viswakumar et al. on loose garments; Ray et al. on synthetic loose-garment MPJPE) that MOVE is designed to close.

---

## 6. Honest Current Project Status & Deadlines

- **Stage:** idea / design stage.
- **Evidence:** literature-supported, but **no MOVE trial data exists yet.** The occlusion-robustness claim is a design target supported by literature, not a measured result. Do not present any MOVE-specific performance numbers.
- **Deliverables:** poster and presentation **not yet finalized.**
- **Deadlines:**
  - Poster: **8 September 2026, 10:00 PM** (supersedes an earlier 5 September draft date).
  - Presentation: **15 September 2026.**
- **Event dates:** October 11–13, 2026 (Riyadh, Saudi Arabia) — KSCDR AI Hackathon, Health & Rehabilitation / Motion Analysis Systems track.

> The committee will check the poster/presentation against the Q&A above. Do not inflate the status into a stronger claim than it is.

---

## 7. Reference List (Devpost prior-art + academic literature)

> Verification key: **DIRECTLY VERIFIED** (link resolves + all claims confirmed on-page) · **PARTIALLY VERIFIED** (link resolves but some claims are MOVE inferences/extensions — noted) · **VERIFICATION PENDING** (academic; not re-verifiable this pass — Google Scholar returned server errors).

### 7a. Prior-art hackathon projects (Devpost)

| # | Project | Link | Inspires MOVE feature | Verification |
|---|---|---|---|---|
| 1 | thera_pixel (Hacklytics 2025, 2nd place; MediaPipe 3D Pose) | https://devpost.com/software/rehab-fv6j1l | Gamification (a). Proved gamified-rehab with a single game; MOVE's per-exercise mini-game library is an extension. No occlusion handling. | PARTIALLY VERIFIED |
| 2 | RecoveryLab (TreeHacks 2026) | https://devpost.com/software/recoverylab | Notifications & care-network support (b). Confirms adherence tracking + caregiver alerts on missed sessions; regression-flag and tier-unlock feedback are MOVE's extensions (shape only). | PARTIALLY VERIFIED |
| 3 | MoveAI / echorehab (WEHack 2026) | https://devpost.com/software/echorehab | Contrast case for "no assumed gym setup" (c). Webcam rep-counting confirmed; gym-setup assumption is MOVE's inference/counter-position, not a documented claim. | PARTIALLY VERIFIED |
| 4 | KineTrack (HackTX 2025; iOS, working live demo) | https://devpost.com/software/kinetrack | UI/UX (d). All features confirmed: live camera, spoken coaching, session summary, saved history, adjustable capture. | DIRECTLY VERIFIED |
| 5 | PhysioVision (Code for Change 2026) | https://devpost.com/software/physiovision | Technology stack (e). All details confirmed: MediaPipe 33 landmarks, relative-distance analyzers, rep state machine, percentage scoring, React/Vite/Tailwind/shadcn frontend, Node/Express/MongoDB/JWT backend, mobile version listed as unbuilt. | DIRECTLY VERIFIED |

### 7b. KSAA games platform (taxonomy reference)

| # | Resource | Link | Used for | Verification |
|---|---|---|---|---|
| 6 | King Salman Global Academy for Arabic Language — games platform | https://games.ksaa.gov.sa | Gamification content **structure/taxonomy only** (language-learning product, not rehab content). Confirmed: 50+ games, three tiers, individual vs group modes, leagues, web + mobile apps, ~3,000+ questions. | DIRECTLY VERIFIED |

### 7c. Academic literature

> All academic entries are **VERIFICATION PENDING** this pass. Findings were originally sourced from paper excerpts during idea development; they could not be re-verified (search returned server errors). Confirm full citations (year, volume, DOI/URL) against original KSCDR Journal of Disability Research entries before final submission.

| # | Citation | What it supports | Verification |
|---|---|---|---|
| 7 | Jleli et al. (2024) — AI-based rehab exercise scoring (YOLOv5 + ShuffleNet V2 + Bi-LSTM on KiMoRe) | Closest prior work; KSCDR's own journal flags inadequate validation across age/culture/condition — the gap MOVE closes. | PENDING |
| 8 | Alghadier et al. (2024) — Saudi CP growth & motor profiles vs UK/US; calls for region-specific tools | Cultural/population gap (clinical, not just clothing) — supports MOVE's regional adaptation. | PENDING |
| 9 | AlQahtani et al. (2024) — hybrid fNIRS + EMG for prosthetic knee control | Confirms KSCDR portfolio is sensor-based, not camera-based — MOVE's accessibility differentiator. | PENDING |
| 10 | Rao et al. (2024) — EMG + IMU sensor fusion for trunk movement (~87% cascaded accuracy) | Second confirmation that KSCDR portfolio hasn't explored camera-based alternatives. | PENDING |
| 11 | Albasheer et al. (2025) — telemedicine use/usability for PWD in Saudi Arabia | Access gap: ~46.84% provider usage; barriers (connectivity, training, infrastructure). Vision 2030 alignment. | PENDING |
| 12 | Alhwoaimel et al. (2024) — functional mobility & balance confidence + disability in older Saudi adults | Measurement gap: 30s-CST/ABC scale; time constraints; 33.6% mobility disability prevalence; 18% older adults by 2050. | PENDING |
| 13 | Alabdulkreem et al. (2023) — CV + deep stacked autoencoder for fall activity recognition (IoT) | Precedent that KSCDR funds/publishes computer-vision systems for PWD — MOVE extends this direction into rehab. | PENDING |
| 14 | Viswakumar et al. (2022) — loose/robe-like garment effect on pose estimation | Clothing-occlusion gap: hip error ~11.36° vs baseline; depth sensor failed entirely. Supports MOVE's garment-stratified evaluation (Q3). | PENDING (magnitude carried from project direction) |
| 15 | Ray et al. — synthetic loose-garment MPJPE evaluation for pose estimation | Clothing-occlusion gap; supports MOVE's garment-stratified evaluation commitment (Q3). | PENDING |
| 16 | Arrowsmith et al. (2023) — accuracy drop with unseen camera angle | Camera-angle robustness failure mode (claim: up to ~50% accuracy drop). Supports MOVE's camera-distance tolerance design. | PENDING (magnitude carried from project direction) |
| 17 | Simmich et al. (2024) — real-time video telerehab | Adherence evidence: +8–9 pts attendance/adherence vs in-person. | PENDING (magnitude carried from project direction) |
| 18 | Hsu et al. | Referenced in the project literature set — locate full citation and finding. | PENDING (not yet sourced) |
| 19 | Yang & Park | Referenced in the project literature set — locate full citation and finding. | PENDING (not yet sourced) |

---

## 8. Evidence-to-Pitch-Section Mapping (quick reference)

| Pitch / poster section | Primary evidence |
|---|---|
| Problem — Access Gap | Albasheer et al. (2025) |
| Problem — Measurement Gap | Alhwoaimel et al. (2024) |
| Problem — Cultural Data Gap | Alghadier et al. (2024); Jleli et al. (2024) limitation statement |
| Closest prior work / core opportunity | Jleli et al. (2024) |
| Confirming vision-based gap in KSCDR portfolio | AlQahtani et al. (2024); Rao et al. (2024) |
| Precedent for CV research at KSCDR | Alabdulkreem et al. (2023) |
| Clothing-occlusion gap (core novelty) | Viswakumar et al. (2022); Ray et al.; Arrowsmith et al. (2023) |
| Adherence improvement (gamification + telerehab rationale) | thera_pixel; Simmich et al. (2024) |
| Gamification concept + taxonomy | thera_pixel; KSAA games platform |
| Notifications / care-network shape | RecoveryLab |
| No-gym-setup constraint (contrast) | MoveAI/echorehab |
| UI/UX pattern | KineTrack |
| Technology stack | PhysioVision |
| Garment-stratified fairness (Q3) | Viswakumar et al. (2022); Ray et al. |

---

## 9. Evaluation Criteria Scorecard (MOVE framing)

| Criterion | Weight | MOVE's case |
|---|---|---|
| Idea Impact | 30% | Serves Saudi PWD; removes clinic visits for routine assessment; addresses documented clinical bottleneck (Alhwoaimel et al.); Vision 2030 alignment |
| Innovation & Creativity | 25% | First motion analysis system explicitly designed for loose Saudi clothing occlusion; no verified hackathon submission combines phone-based rehab pose estimation with occlusion handling |
| Feasibility & Relevance | 20% | Proven component stack (MediaPipe + PhysioVision's analyzer/state-machine design); smartphone-only; **but** currently at design stage with no prototype — state this honestly |
| Sustainability & Scalability | 10% | Near-zero marginal cost; integrates into existing physiotherapy workflows; therapist-in-the-loop; Arabic-language interface |
| Prototype & Pitch Quality | 10% | Live demo conceptually compelling (before/after occlusion contrast) — pending actual build |
| Safety & Reliability | 5% | No invasive sensors; confidence-aware safe fallback; therapist retains clinical authority; auditable alerts; PDPL-aligned data minimization |

---

## 10. Open Questions / TODO

- [ ] Team member names for poster header
- [ ] Team number from KSCDR registration
- [ ] Team/institution logo (PNG with transparent background)
- [ ] Contact person name, email, mobile for poster footer
- [ ] QR code target (demo video URL / GitHub repo)
- [ ] **Verify all academic citations** (entries 7–19 above) against original sources before final submission — magnitudes marked "carried from project direction" (Viswakumar ~11.36°, Arrowsmith ~50%, Simmich +8–9 pts) must be confirmed before pitching
- [ ] Source full citations for Hsu et al. and Yang & Park
- [ ] LLM selection for coaching-text generation (Gemini vs Claude) — cost/latency/on-device trade-off
- [ ] TTS fallback decision: ElevenLabs cloud vs on-device TTS (offline/cost sensitivity)
- [ ] Backend choice: FastAPI vs Node.js/Express — reconcile the Q2 ("FastAPI/Node.js") phrasing into one concrete choice before the presentation
- [ ] Exact list of exercise-specific mini-games needs clinical sign-off per exercise before build
- [ ] Garment-stratified evaluation protocol design (per-clothing-condition accuracy reporting) — write this up before claiming the Q3 fairness commitment
- [ ] Decision: post-stroke upper limb rehab vs. CP vs. older-adult mobility as primary pilot population
- [ ] Build the actual phone-first prototype (currently design stage only)

---

*This is the unified source of truth for the next pass (poster + presentation fill-in). It combines: concept overview, the five features with inspiration sources, the technical pipeline & AI-model overview (Q1/Q2), the trustworthiness/XAI section (Q3), the reference list, the honest status & deadlines, and the open-questions list. Last updated: September 2026.*
