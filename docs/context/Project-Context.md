
# MOVE — Project Context

> **Lineage note:** This project was originally scoped under the name **HarakAI** (a MoveNet Lightning + Bi-LSTM + SHAP/Grad-CAM stack). That direction has been **superseded** by a new direction called **MOVE**. The HarakAI-era sections are preserved below (marked ⚠️ SUPERSEDED) for historical lineage, but the MOVE direction wins wherever the two conflict. The old HarakAI performance numbers (72.3%→84.1% keypoint detection, 6.2° MAE, <1.2s generation) were HarakAI-era internal estimates and are **not** MOVE results — MOVE has no trial data yet (see §8, Honest Current Status).

---

## 1. Hackathon Overview

| Field | Detail |
|---|---|
| Organizer | King Salman Center for Disability Research (KSCDR) |
| Event Dates | October 11–13, 2026 |
| Location | Riyadh, Saudi Arabia |
| Prize Pool | 220,000 SAR |
| Website | hackathon.kscdr.org |
| Poster Deadline | **8 September 2026, 10:00 PM** |
| Presentation Deadline | **15 September 2026** |
| Poster Email | kscdr.hackathon@gmail.com |

> **Deadline correction:** An earlier draft of this document listed a poster deadline of "5 September 2026." That earlier date is ⚠️ SUPERSEDED by the corrected deadline of **8 September 2026, 10:00 PM**. The event dates of October 11–13, 2026 remain accurate.

### Our Track
**Health & Rehabilitation → Motion Analysis Systems**

### Evaluation Weights
| Criterion | Weight |
|---|---|
| Idea Impact | 30% |
| Innovation & Creativity | 25% |
| Feasibility & Relevance | 20% |
| Sustainability & Scalability | 10% |
| Prototype & Pitch Quality | 10% |
| Safety & Reliability | 5% |

---

## 2. KSCDR — Who They Are and What They Do

### Mission
King Salman Center for Disability Research funds and conducts scientific research to improve quality of life for persons with disabilities (PWD) in Saudi Arabia and globally.

### Two Key Programs Driving the Hackathon
1. **Innovation Valley Program** — converts research into commercializable products via IP protection, prototyping, and incubator transition
2. **Daring for the Future Program** — funds bold, cutting-edge research for unprecedented discoveries

### KSCDR's Current Research Strengths (from verified publications)
- AI/ML diagnostics: ASD, Alzheimer's, Epilepsy, ADHD, Dyslexia
- Arabic Sign Language recognition (multiple papers)
- Brain-Computer Interfaces: EEG/fNIRS for prosthetic control (AlQahtani et al., 2024)
- Fall detection for elderly
- Ambient Assisted Living (AAL) systems
- Rehabilitation robotics: lower-limb, wheelchair, exoskeleton

### KSCDR's Confirmed Gaps (what they DON'T have)
- No pose estimation or markerless motion capture publications
- No computer vision adapted for Arabic cultural attire
- No biomechanical gait analysis for physical disability using cameras
- No telerehabilitation platform with real-time AI movement feedback
- No sports performance analysis for PWD using vision

---

## 3. The Problem Statement

### Gap 1 — Cultural Attire Gap (our primary innovation)
Standard AI computer vision and motion analysis systems are trained on Western datasets where participants wear T-shirts and shorts — exposing all joints. Traditional Saudi attire (thobe for men, abaya for women) occludes the exact joints (hips, knees, elbows, shoulders) that pose estimation models depend on.

**Evidence:** No paper in KSCDR's entire publication corpus mentions validation of any computer vision model on participants wearing thobe or abaya.

**KSCDR's own stated priority** (from hackathon brief): create *"standardized Arab metrics suitable for the Saudi environment"* — this directly frames our solution.

### Gap 2 — Telerehabilitation vs. Expensive Clinical Setups
Clinical motion analysis (e.g., Vicon systems) is prohibitively expensive and requires physical clinic visits — a burden for PWD, especially in rural areas and post-MVA cases.

**Evidence from KSCDR publications:**
- Alhwoaimel et al. (2024): Time restrictions and limited resources are the top barriers preventing Saudi physiotherapists from using standardized outcome measures
- Elsherbini et al. (2024): Upper/lower extremity injuries dominate post-MVA disability in Saudi Arabia — these patients need accessible rehabilitation assessment

### Gap 3 — Manual Clinical Measurement Bottleneck
Saudi physiotherapists currently use:
- Manual goniometry (joint angle measurement by hand)
- GMFM-88 (manual gross motor function scale for CP)
- Modified Ashworth Scale (manual spasticity rating)
- Barthel Index (manual ADL rating)
- Self-reported questionnaires (PASIPD-AR)

None of these are automated. All require trained staff, clinic attendance, and significant time.

**Evidence from KSCDR publications:**
- Hussein et al. (2024): CP children outcomes measured manually 3× per week in clinic
- Alhwoaimel et al. (2024): 38% of Saudi physiotherapists report they cannot consistently use standardized outcome measures due to time constraints
- Alghadier et al. (2024): Saudi CP children's motor profiles diverge from UK/US reference data — meaning Western motion analysis training data is also likely invalid here

### Gap 4 — Physical vs. Cognitive Tech Deficit
KSCDR's recent AI publications are heavily skewed toward cognitive and neurological disorders (ASD, Alzheimer's, Epilepsy). Physical/motor disability AI tools are significantly underrepresented.

---

## 4. The Solution — MOVE

### Name
**MOVE** — "Gamified, Occlusion-Robust Rehabilitation Coaching for Saudi Patients"

### Tagline
Phone-camera, markerless pose-estimation app for physical rehabilitation, retrained for occlusion from loose Saudi clothing (thobe/abaya).

### One-Line Description
A phone-first, markerless pose-estimation app that scores physical therapy exercises in real time — adapted for occlusion from loose Saudi clothing (thobe/abaya) — with gamified coaching, a care-network support layer, and a rule-based, explainable-by-construction analysis layer.

### Core Value Proposition
- **No wearable sensors** — standard phone camera only
- **No assumed gym setup** — calibration works in whatever the patient is already wearing; no bare-limb calibration step; camera-distance tolerance built for "a phone propped on a household object." This is MOVE's core novelty claim (see §5c).
- **Culturally adapted** — base pose engine fine-tuned/re-weighted for landmark confidence under loose-garment occlusion (thobe/abaya)
- **Explainable-by-construction** — rep-counting/scoring is a rule-based state machine with fixed inspectable thresholds, not a black-box classifier
- **Gamified** — each prescribed exercise maps to its own themed mini-game in a growing library (50+), with therapist-unlocked difficulty tiers
- **Care-network aware** — caregiver alerts on missed sessions carry STATUS only, never raw video or clinical detail
- **Phone-first** — rebuilt as a native/phone-first app, not a webcam/web-app

> ⚠️ **SUPERSEDED:** The earlier solution direction was called **HarakAI** ("Culturally-Adapted AI Motion Analysis for Saudi Rehabilitation"), built on a MoveNet Lightning + Bi-LSTM + SHAP/Grad-CAM stack. That name, tagline, and full technical stack are superseded by MOVE. The HarakAI-era solution, pipeline, models, and pilot-scope sections are preserved in §6 below for lineage. The HarakAI-era performance numbers (72.3%→84.1% keypoint detection, 6.2° MAE, <1.2s generation) were internal estimates from that earlier direction and must NOT be presented as MOVE results.

---

## 5. The Five Features (with Inspiration Attribution)

Each feature is inspired by a specific prior hackathon project. Honest attribution is preserved — it is part of the novelty argument. Where MOVE extends beyond what an inspiration source demonstrated, the extension is clearly labeled as MOVE's own, not an attributed feature of the source.

### (a) Gamification
**Inspired by:** thera_pixel (Hacklytics 2025, 2nd place; uses MediaPipe 3D Pose; https://devpost.com/software/rehab-fv6j1l)

**Honest attribution:** thera_pixel proved the gamified-rehab concept with a single game (Pizza Pursuit) plus a practice-studio mode. The "different mini-game per exercise" is **MOVE's extension**, not a proven thera_pixel feature.

**Gamification content structure borrowed from:** the King Salman Global Academy for Arabic Language games platform (https://games.ksaa.gov.sa — a language-learning product, referenced only for its taxonomy, not content).

From KSAA's structure MOVE takes:
- **Three audience/difficulty tiers → MOVE's Gentle / Standard / Challenge tiers** — therapist-unlocked, NOT patient-selected
- **Individual vs group play → MOVE's Solo Sessions vs Family/Group Sessions**
- **A rotating library of 50+ games rather than one fixed game → MOVE maps each prescribed exercise to its own themed mini-game** in a growing library
- **KSAA's "leagues" → MOVE's private, opt-in weekly streak / personal-best tracker** — explicitly NOT a public leaderboard (rehab pace is medically sensitive)

### (b) Notifications & Care-Network Support
**Inspired by:** RecoveryLab (TreeHacks 2026; https://devpost.com/software/recoverylab)

**Honest attribution:** RecoveryLab CONFIRMS adherence tracking against a therapist's schedule and caregiver alerts on missed sessions. The "recommend a check-in flag on sustained regression trends" and "session history feeds back into which tier/game unlocks next" are **MOVE's OWN design extensions**, NOT features RecoveryLab documents. Frame RecoveryLab as inspiring the care-network SHAPE only.

Caregiver alerts carry **STATUS only**, never raw video or clinical detail.

### (c) "No Assumed Gym Setup" Design Constraint
**Contrast case:** MoveAI (WEHack 2026, https://devpost.com/software/echorehab) and similar (Reptrics, Tyso, Form AI).

**Honest attribution:** MoveAI's webcam-based rep-counting is confirmed. The "assumes gym-style setup with exposed limbs / fixed webcam" framing is **MOVE's INFERENCE and counter-position**, not a documented MoveAI claim — phrase it as MOVE's differentiation stance, not an attributed fact.

**MOVE's position:** calibration works in whatever the patient is already wearing, no bare-limb calibration step, camera-distance tolerance built for "a phone propped on a household object." This is MOVE's core novelty claim, not a side note.

### (d) UI/UX
**Inspired by:** KineTrack (HackTX 2025; https://devpost.com/software/kinetrack — has a working live demo).

**Confirmed features (from KineTrack):**
- Opens straight to a live camera view (no menu maze)
- Short spoken coaching prompts during movement instead of on-screen text
- End-of-session summary of what went well / what to focus on
- Saved session history/recordings
- User-adjustable camera resolution/frame rate to match the patient's device

### (e) Technology Stack
**Inspired by:** PhysioVision (Code for Change 2026; https://devpost.com/software/physiovision — confirmed details).

**Mapping (PhysioVision's webcam/web-app → MOVE phone-first):**

- **Pose tracking:** Google MediaPipe Pose Landmarker, ~30fps, 33 landmarks — kept as base engine, fine-tuned/re-weighted for landmark confidence under loose-garment occlusion (NOT MoveNet; NOT used out of the box).
- **Exercise logic:** per-exercise analyzers using relative landmark distances (e.g. knee-to-hip vertical distance for squats) rather than raw joint angles — more robust across body types/camera distances. Extended with occlusion-confidence weighting so a partially hidden landmark degrades gracefully.
- **Rep counting:** custom state machine — normalized 0–1 movement signal, tuned up/down-phase thresholds, multi-frame stability requirement, minimum inter-rep time. Reused as-is.
- **Scoring:** percentage-based tempo tolerance (not fixed ms thresholds) and ROM scoring. Reused as-is.
- **Frontend:** rebuilt as a native/phone-first app (PhysioVision's own roadmap lists "mobile-friendly version" as unbuilt future work — so this is genuinely new).
- **Backend/data:** Node.js/Express + MongoDB + JWT auth as a reasonable default for session storage, auth, and notification data.

> ⚠️ **SUPERSEDED:** This new stack REPLACES the old HarakAI MoveNet + Bi-LSTM + SHAP/Grad-CAM stack. The Bi-LSTM temporal-scoring and SHAP/Grad-CAM XAI layers are superseded by the rule-based state machine + confidence-aware degradation approach. The old stack is preserved in §6 for lineage.

---

## 6. ⚠️ SUPERSEDED — HarakAI Solution & Technical Pipeline (Historical Lineage)

> The following sections preserve the original HarakAI direction for historical lineage. They are **SUPERSEDED** by the MOVE direction in §4 and §5 above. Do not treat the claims, numbers, or stack below as current MOVE results. Each subsection below points to its MOVE replacement.

### 6.1 ⚠️ SUPERSEDED — HarakAI Solution (formerly §4)

> **Superseded by:** §4 (The Solution — MOVE) and §5 (Five Features).

<details>
<summary>Original HarakAI solution text (collapsed for lineage)</summary>

**Name:** HarakAI — from the Arabic word حركة (haraka) meaning *movement*

**Tagline:** *Culturally-Adapted AI Motion Analysis for Saudi Rehabilitation*

**One-Line Description:** A smartphone-based, markerless AI motion analysis system that scores physical therapy exercises in real time — adapted for traditional Saudi attire — enabling remote physiotherapist review with explainable AI feedback.

**Core Value Proposition:**
- No wearable sensors — standard smartphone camera only
- Culturally adapted — works under thobe and abaya
- Clinically meaningful — outputs match manual goniometry standards
- Explainable — therapist sees exactly which joints drove the score
- Remote-first — patient exercises at home, therapist reviews remotely

</details>

### 6.2 ⚠️ SUPERSEDED — HarakAI Technical Pipeline (formerly §5)

> **Superseded by:** §5(e) (Technology Stack — MediaPipe + rule-based state machine) and §7 (Committee Q&A — Q1/Q2/Q3).
>
> The HarakAI-era performance numbers below (72.3%→84.1%, 6.2° MAE, <1.2s, "validated by 3 physiotherapists," "working prototype on Android") were internal estimates from that earlier direction. They are **superseded historical claims**, NOT MOVE results. MOVE has no trial data yet.

<details>
<summary>Original HarakAI pipeline text (collapsed for lineage)</summary>

#### Stage 1 — Pose Estimation (⚠️ SUPERSEDED → §5e MediaPipe Pose Landmarker)
- **Model:** MoveNet Lightning (Google, TensorFlow Lite)
- **Why MoveNet:** On-device inference at 30fps on mid-range Android; 17 COCO keypoints; open weights for fine-tuning
- **Problem:** Standard MoveNet drops to ~72.3% keypoint detection accuracy under full-length garment occlusion (our internal test, n=5) — *this number is a superseded HarakAI-era estimate, not a MOVE result*
- **Solution:** Fine-tune with occlusion augmentation — synthetically mask the lower-body keypoints (hips, knees, ankles) and upper-body keypoints (shoulders, elbows, wrists) during training to simulate thobe/abaya coverage
- **Result after fine-tuning:** 84.1% keypoint detection (+11.8 percentage points) — *this number is a superseded HarakAI-era estimate, not a MOVE result*
- **Alternatives considered:** MediaPipe Pose (less adaptable), BlazePose (mobile-optimized but harder to fine-tune), OpenPose (too heavy for on-device)

#### Stage 2 — Temporal Exercise Scoring (⚠️ SUPERSEDED → §5e rule-based state machine)
- **Model:** Bidirectional LSTM (Bi-LSTM)
- **Why Bi-LSTM:** Captures temporal dependencies in both directions — important for detecting movement initiation, peak, and return phases in rehabilitation exercises
- **Training data:** KiMoRe dataset (Kinematic Motor Rehabilitation dataset — used by Jleli et al., 2024 in KSCDR's own journal)
- **Output:** Joint angle time-series per frame + deviation score from reference template
- **Reference templates:** Recorded from 5 healthy Saudi participants performing each target exercise correctly
- **Target exercises (pilot):** Shoulder abduction (post-stroke upper limb rehab), Elbow flexion/extension (post-stroke upper limb rehab), Sit-to-stand (CP gait readiness assessment)
- **Current accuracy:** MAE vs. manual goniometry = 6.2° on unoccluded test set; target <8° under cultural attire — *this number is a superseded HarakAI-era estimate, not a MOVE result*

#### Stage 3 — Explainable AI (XAI) Layer (⚠️ SUPERSEDED → §7 Q3 trustworthiness measures)
- **Method 1 — SHAP (SHapley Additive exPlanations):** Per-joint, per-frame contribution scores showing which joints most influenced the overall exercise score
- **Method 2 — Grad-CAM:** Gradient-weighted Class Activation Mapping overlaid on the video frame — highlights spatial regions driving model decisions
- **Output to clinician:** Color-coded joint overlay on video + written explanation (e.g., "Left elbow flexion showed 23° deficit at peak — primary cause of score reduction")
- **Generation speed:** <1.2 seconds per session on-device — *this number is a superseded HarakAI-era estimate, not a MOVE result*
- **Validation:** Reviewed as interpretable by 3 physiotherapist reviewers — *superseded HarakAI-era claim*
- **Why XAI matters here:** Saudi physiotherapists retain clinical authority. The system assists, not replaces. XAI ensures no black-box scoring and supports regulatory trust.

#### Stage 4 — Clinical Report Generation (⚠️ SUPERSEDED → §7 Q2 stage 4 backend services)
- **Format:** Automated PDF + dashboard view
- **Contents:** ROM estimates per joint; symmetry index (left vs. right); session trend over time; Barthel ADL domain mapping; flagged movement phases needing clinical attention
- **Delivery:** Push notification to physiotherapist dashboard when report is ready

#### Communication Infrastructure (⚠️ SUPERSEDED → §7 Q2 4-stage pipeline)
- **On-device processing:** Pose estimation (Stage 1) runs fully on-device — no internet needed for this stage
- **Cloud inference:** Bi-LSTM scoring and report generation run on cloud API
- **Encryption:** AES-256 for video upload; TLS 1.3 for API communication
- **Offline mode:** If no connection, video and keypoint data stored locally and synced when connection available
- **Therapist dashboard:** Web-based; accessible from any browser; Arabic-language interface
- **Data minimization:** Raw video deleted from server after keypoint extraction; only anonymized keypoint sequences stored

#### Trustworthiness Measures — HarakAI-era (⚠️ SUPERSEDED → §7 Q3)

| Measure | Implementation |
|---|---|
| Explainability | SHAP per joint + Grad-CAM spatial overlay |
| Uncertainty quantification | Confidence score per keypoint detection; low-confidence frames flagged for manual review |
| Human-in-the-loop | Physiotherapist must review and sign off on report before it affects care plan |
| Adversarial robustness | Occlusion augmentation during training reduces sensitivity to partial visibility |
| Clinical correlation | Validated against manual goniometry (ground truth); target Pearson r > 0.85 |
| Audit trail | All model versions timestamped and logged; predictions traceable to model version |
| Fail-safe | If confidence below threshold, system outputs "manual assessment recommended" rather than a score |

</details>

### 6.3 ⚠️ SUPERSEDED — HarakAI AI Models Summary (formerly §6)

> **Superseded by:** §7 Q1 (general overview of AI models) and §5(e) (technology stack).

<details>
<summary>Original HarakAI models table (collapsed for lineage)</summary>

| Model | Role | Why Chosen |
|---|---|---|
| MoveNet Lightning | Pose estimation (17 keypoints) | On-device 30fps, fine-tunable, TFLite |
| Occlusion Augmentation | Training technique for cultural attire | No existing dataset with thobe/abaya |
| Bi-LSTM | Temporal exercise scoring | Bidirectional temporal dependencies in movement |
| SHAP | XAI — feature attribution | Per-joint interpretability for clinicians |
| Grad-CAM | XAI — spatial attention | Visual overlay on video for intuitive review |

</details>

### 6.4 ⚠️ SUPERSEDED — HarakAI Pilot Scope (formerly §8)

> **Superseded by:** §8 (Honest Current Status). The "what exists now" claims below are HarakAI-era and must not be presented as MOVE results.

<details>
<summary>Original HarakAI pilot scope (collapsed for lineage)</summary>

**What exists now (HarakAI-era claims — SUPERSEDED):**
- Pose estimation pipeline running on Android (tested on Pixel 6 and Samsung S23)
- Occlusion augmentation applied to MoveNet base model
- Bi-LSTM scoring module trained on KiMoRe dataset
- SHAP explanation generation (<1.2 sec per session)
- Basic therapist report output (JSON → PDF)

**What was planned post-hackathon (HarakAI-era):**
- Clinical validation study: n=20 Saudi participants (10 post-stroke, 10 CP)
- Correlation analysis vs. manual goniometry; target r > 0.85
- Arabic-language patient-facing UI
- Full therapist dashboard with session history
- Integration with Saudi MOH digital health infrastructure (Vision 2030 alignment)

</details>

---

## 7. Answers to the Review Committee's Questions

> This section replaces the earlier HarakAI-era "Meeting Preparation Answers" (formerly §13), which is marked superseded in §6 above.

### Q1 — General overview of potential AI models

| Component | Model/Approach | Notes |
|---|---|---|
| Pose/landmark extraction | Google MediaPipe Pose Landmarker (BlazePose) | On-device where possible. The only model that touches raw video. ~30fps, 33 landmarks. |
| Exercise/rep analysis | NOT a neural model — deterministic rule-based state machine | Operates on landmark output (relative distances, phase thresholds). Called out explicitly as a trustworthiness choice (see Q3). |
| Coaching-text generation | A language model (e.g. Gemini or Claude) | Converts quantitative signals (rep count, ROM score, tempo score, occlusion confidence) into short natural-language coaching text. Pattern reused from KineTrack (https://devpost.com/software/kinetrack). |
| Text-to-speech | ElevenLabs (or on-device TTS fallback) | For spoken prompts during/after sessions. |
| Trend/regression flagging | Simple statistical thresholding over session history | Not a learned model — same interpretability rationale as the rep analyzer. Used for caregiver alerts. |

### Q2 — Exact pipeline (multiple models, communication infrastructure)

MOVE is a 4-stage pipeline with a small set of narrow, single-purpose models coordinated by conventional backend logic — not one large end-to-end model. This is itself a safety/auditability argument (see Q3).

```
[Stage 1: CAPTURE — on-device]
  Phone camera frames
    → MediaPipe Pose Landmarker running locally on-device
  Raw video NEVER leaves the phone.
       ↓
[Stage 2: ANALYSIS — on-device or edge]
  Landmark coordinates + per-landmark confidence
    → Rule-based exercise analyzer / state machine
    → Compact NUMERIC session record:
        rep count, ROM score, tempo score,
        per-joint occlusion-confidence, phase timestamps
  This numeric record (NOT video) is what gets transmitted.
       ↓
[Stage 3: TRANSPORT]
  Numeric session record sent over authenticated
  WebSocket/HTTPS to backend
  (mirrors KineTrack's ws/analyze pattern)
  → storage + downstream processing
       ↓
[Stage 4: BACKEND SERVICES]
  FastAPI/Node.js backend:
    - stores the record (MongoDB)
    - runs trend-flagging for caregiver alerts
    - calls coaching-text LLM + TTS service
      → generates session summary / spoken feedback
    - sends summary back to the app
```

**Communication flow summary:**
- Stage 1 (capture + pose extraction) runs fully on-device — no internet needed for this step.
- Only the derived numeric session record (not raw video) is transmitted to the backend.
- Backend stores the record, runs trend-flagging, and calls the LLM + TTS service to generate coaching text/spoken feedback, which is sent back to the app.
- Caregiver alerts are derived from the stored numeric records, never from video.

### Q3 — Trustworthiness measures / XAI

> **FLAG:** None of the following has been empirically validated yet on MOVE itself. This is the architectural/design answer pending real testing.

1. **Data minimization:** Raw video stays on-device; only derived numeric signals leave the phone (privacy + cultural sensitivity around home video).
2. **Interpretable-by-construction middle layer:** Rep-counting/scoring is a rule-based state machine with fixed inspectable thresholds (inherited from PhysioVision), not a black-box classifier — a therapist can audit exactly why a rep was/wasn't counted.
3. **Confidence-aware degradation:** Each landmark carries an occlusion-confidence score; low-confidence readings are flagged/suppressed in the UI ("low visibility on this joint") rather than silently guessed — directly addresses the clothing-occlusion risk.
4. **Safe fallback:** If confidence drops below threshold, MOVE pauses scoring/feedback for that segment instead of issuing a possibly-wrong correction that could risk re-injury.
5. **Human-in-the-loop:** Therapists control tier/difficulty unlocking and review trend-based consultation flags; the system flags patterns, never auto-diagnoses or auto-adjusts a clinical plan.
6. **Auditable alerts:** Every caregiver/therapist notification is traceable to the specific numeric threshold that triggered it — no alert from an unexplainable generative step.
7. **Fairness/robustness reporting as a design commitment:** Planned evaluation is garment-stratified (accuracy reported separately per clothing condition), not a single pooled accuracy number that could mask degraded performance for covered patients — the explicit gap from the literature review (Viswakumar et al. on loose garments; Ray et al. on synthetic loose-garment MPJPE) that MOVE is designed to close.

> ⚠️ **SUPERSEDED (HarakAI-era Q&A, formerly §13):** The earlier "Meeting Preparation Answers" section described a MoveNet + Bi-LSTM + SHAP/Grad-CAM pipeline with AES-256 encrypted video upload to cloud. It is superseded by the MOVE answers above (MediaPipe on-device, rule-based state machine, numeric-record-only transport, confidence-aware degradation). The old Q&A text is preserved in the version history of this document.

---

## 8. Honest Current Status

> This section is deliberately honest. Do not inflate it — the committee will check the poster/presentation against the questions above.

**MOVE is at the idea/design stage.** The direction is literature-supported and architecturally designed, but there is **NO MOVE trial data yet.**

- The old HarakAI performance numbers (72.3%→84.1% keypoint detection, 6.2° MAE, <1.2s generation, "validated by 3 physiotherapists," "working prototype on Android") were HarakAI-era internal estimates from the earlier direction. They are **superseded historical claims** and must NOT be presented as MOVE results.
- MOVE has not yet been empirically validated. The trustworthiness/trustworthiness measures in §7 Q3 are the architectural/design answer pending real testing.
- Poster and presentation are not yet finalized.

### Deadlines
| Item | Deadline |
|---|---|
| Poster submission | **8 September 2026, 10:00 PM** (corrected; the earlier "5 September 2026" draft date is superseded) |
| Presentation | **15 September 2026** |
| Event dates | October 11–13, 2026 (still accurate) |

---

## 9. Target Users

### Primary — Patients
- Post-stroke adults undergoing upper limb rehabilitation
- Children with Cerebral Palsy (CP) in gait readiness programs
- Post-MVA patients with musculoskeletal upper/lower extremity injuries

### Secondary — Clinicians
- Saudi physiotherapists who currently measure outcomes manually 2–3× per week in clinic
- Telerehabilitation service providers

### Tertiary — Caregivers
- Family members supervising home rehabilitation sessions (especially relevant for CP children)

---

## 10. Evidence Base — Key Citations

All citations are from verified KSCDR journal publications (Journal of Disability Research, 2024).

| Citation | What it proves |
|---|---|
| Jleli et al. (2024) — "AI-Driven Remote Monitoring Model for Physical Rehabilitation" | Closest existing work; uses YOLOv5+ShuffleNet+Bi-LSTM for rehab exercise scoring on KiMoRe dataset; explicitly acknowledges lack of cultural/demographic diversity as a gap |
| Alhwoaimel et al. (2024) — "Barriers and Facilitators of Using Standardized Outcome Measures in Stroke Rehabilitation in Saudi Arabia" | Time and resource constraints are the top barriers for Saudi physiotherapists; directly justifies automated assessment |
| Hussein et al. (2024) — "Photo Bio-stimulation in Spastic CP Children" | Manual goniometry used to measure outcomes; perfect automation use case |
| Hussein et al. (2024) — "Whole-body Vibration meta-analysis for Spastic CP" | GMFM-88 manual scale used throughout; same gap |
| Alghadier et al. (2024) — "Regional Disparities in Growth Patterns of Children with CP: Saudi Arabia vs UK and US" | Saudi CP population has distinct characteristics; Western-trained models underperform; authors explicitly call for "region-specific tools" |
| AlQahtani et al. (2024) — "Hybrid fNIRS and EMG for Prosthetic Knee Control" | Most advanced physical motor paper from KSCDR; entirely sensor-based; no camera alternative explored |
| AlQahtani et al. (2024) — "Recent progress on smart lower prosthetic limbs: EEG and fNIRS review" | Confirms neurotech direction for prosthetics; camera-based pose estimation absent |
| Rao et al. (2024) — "Sensor Fusion and ML for Seated Movement Detection with Trunk Orthosis" | Wearable EMG/IMU approach; vision-based alternative unexplored |
| Bakouri et al. (2024) — "Evaluation of Conventional and Smart Wheelchair Technologies in Saudi Arabia" | 590 participants; confirms smart tech adoption readiness; identified major gaps |
| Alkathiry et al. (2024) — "Translation of Postural Assessment Scale for Stroke into Arabic" | Even basic clinical tools are just now being translated; tech-based assessment infrastructure is nascent |
| Elsherbini et al. (2024) — "Epidemiology of Musculoskeletal Disabilities Following Motor Vehicle Accidents in Aljouf" | Upper/lower extremity injuries dominate post-MVA disability; these patients need accessible rehab assessment |
| Alhumaid et al. (2024) — "Cross-Cultural Adaptation of PASIPD-AR for Saudi Arabia" | Physical activity in Saudi PWD measured by questionnaire; no objective motion tool |
| Alotaibi & Alsubaie (2024) — "Kriging-based MPC for Lower-limb Rehabilitation Robots" | Active rehab robotics work; no vision-based motion feedback loop |

### Additional literature (clothing-occlusion gap — the core of MOVE)
| Citation | What it proves |
|---|---|
| Viswakumar et al. — loose-garment pose estimation | Loose garments degrade pose-estimation accuracy; the explicit gap MOVE is designed to close |
| Ray et al. — synthetic loose-garment MPJPE | Quantifies the loose-garment error; supports garment-stratified evaluation as a design commitment (§7 Q3) |

---

## 11. Evaluation Score Mapping (MOVE)

### Impact (30%)
- Directly serves 2.5M+ Saudi PWD
- Removes clinic visits for routine motion assessment
- Addresses confirmed clinical bottleneck (Alhwoaimel et al., 2024)
- Aligns with Vision 2030 health transformation and digital infrastructure goals
- Telerehabilitation access for rural and mobility-impaired patients

### Innovation (25%)
- First motion analysis system designed for occlusion from traditional Saudi attire (thobe/abaya) — core novelty claim (§5c)
- "No assumed gym setup" — calibration in whatever the patient is already wearing, phone propped on a household object (§5c)
- Gamified rehabilitation coaching with per-exercise mini-games, therapist-unlocked tiers (§5a)
- Rule-based, explainable-by-construction analysis layer rather than a black-box classifier (§5e, §7 Q3)
- Answers KSCDR's own stated priority for "standardized Arab metrics suitable for the Saudi environment"
- Jleli et al. (2024) — KSCDR's own journal — explicitly flags the cultural-diversity gap

### Feasibility (20%)
- Base pose engine (MediaPipe Pose Landmarker) is proven and well-documented
- Rule-based state machine for rep counting/scoring is inherited from PhysioVision's confirmed design
- No exotic hardware — standard phone camera
- Backend stack (Node.js/Express + MongoDB + JWT) is a reasonable, well-understood default
- NOTE (honest): MOVE is at the design stage — no working prototype yet (see §8)

### Sustainability (10%)
- Marginal cost per patient ≈ 0 after development (phone-based)
- Integrates into existing physiotherapy workflows — assists, not replaces
- Arabic-language interface for local adoption
- Gamification library grows over time (50+ games mapped to exercises)
- Care-network support reduces reliance on in-clinic supervision

### Safety (5%)
- No invasive sensors
- Raw video never leaves the phone — data minimization (§7 Q3)
- Confidence-aware degradation: low-confidence readings flagged/suppressed, not silently guessed
- Safe fallback: scoring pauses when confidence drops below threshold rather than issuing a possibly-wrong correction
- Physiotherapist retains clinical authority at all times — tier/difficulty unlocking is therapist-controlled
- Auditable alerts: every notification traceable to a specific numeric threshold
- Compliant with Saudi PDPL (Personal Data Protection Law)

---

## 12. Poster Structure (Per KSCDR Guidelines — updated for MOVE)

### Section 1 — Introduction and Problem Statement
- ~6.7% of Saudi population live with a disability (2.5M+ people)
- Physical rehabilitation relies on manual clinical scales — subjective, time-intensive, clinic-bound
- Saudi physiotherapists report time/resource constraints as top barriers to standardized outcome measurement (Alhwoaimel et al., 2024)
- Existing AI motion analysis trained on Western datasets (T-shirts and shorts — all joints visible)
- Traditional Saudi attire (thobe, abaya) occludes the joints pose estimation models depend on
- No validated markerless motion analysis system exists for Saudi cultural context
- Existing rehab-tech tools (MoveAI, Reptrics, Tyso, Form AI) assume gym-style setups with exposed limbs / fixed webcams — MOVE's counter-position (§5c)

### Section 2 — Objectives and Target Users
- **Primary:** Gamified, occlusion-robust rehabilitation coaching via phone camera — no wearables, no assumed gym setup
- **Secondary:** Rule-based, explainable-by-construction analysis; remote therapist review; care-network alerts (status only)
- **Patients:** Post-stroke adults and children with CP doing home exercise programs
- **Clinicians:** Saudi physiotherapists currently measuring outcomes manually
- **Caregivers:** Family members supervising home rehab

### Section 3 — Proposed Solution — MOVE
- MOVE — phone-first app for markerless, gamified rehabilitation coaching adapted for Saudi attire occlusion
- Base engine: MediaPipe Pose Landmarker (~30fps, 33 landmarks), fine-tuned/re-weighted for loose-garment occlusion confidence
- Analysis: rule-based state machine (relative landmark distances, phase thresholds, confidence-aware degradation) — not a black-box classifier
- Gamification: each prescribed exercise maps to its own themed mini-game in a growing 50+ library; therapist-unlocked Gentle/Standard/Challenge tiers
- Care network: caregiver alerts on missed sessions (status only, never raw video)
- Five features with inspiration attribution (§5): thera_pixel (gamification), RecoveryLab (care network), MoveAI (contrast case), KineTrack (UI/UX), PhysioVision (tech stack)

### Section 4 — Methodology and System Design
- **Stage 1 (Capture, on-device):** phone camera → MediaPipe Pose Landmarker; raw video never leaves phone
- **Stage 2 (Analysis, on-device/edge):** landmark coords + confidence → rule-based analyzer/state machine → compact numeric session record
- **Stage 3 (Transport):** numeric record over authenticated WebSocket/HTTPS to backend
- **Stage 4 (Backend):** FastAPI/Node.js + MongoDB stores record; trend-flagging; coaching-text LLM + TTS; summary sent back to app
- **Trustworthiness:** data minimization; interpretable-by-construction; confidence-aware degradation; safe fallback; human-in-the-loop; auditable alerts; garment-stratified evaluation (§7 Q3)

### Section 5 — Results and Evaluation
- **Honest status:** MOVE is at the idea/design stage — NO trial data yet (§8)
- The earlier HarakAI numbers (72.3%→84.1% keypoint detection, 6.2° MAE, <1.2s) are superseded historical claims from a prior direction and must NOT appear here as MOVE results
- Planned evaluation: garment-stratified accuracy (per clothing condition), not a single pooled number
- Planned: correlation vs. manual goniometry; per-joint occlusion-confidence reporting

### Section 6 — Discussion, Impact and Ethics
- Removes clinic visits for routine assessment; critical for rural and post-MVA patients
- Directly addresses Alhwoaimei et al. (2024) confirmed clinical bottleneck
- First motion analysis system designed for occlusion from traditional Saudi attire
- Rule-based interpretability ensures clinical trust and transparency — a therapist can audit why a rep was/wasn't counted
- Raw video never leaves the phone — privacy + cultural sensitivity around home video
- Caregiver alerts carry status only, never raw video or clinical detail
- Marginal cost ≈ 0 per patient; integrates into Vision 2030 digital health infrastructure

---

## 13. Poster Submission Requirements

- **File format:** .pptx only (named KSCDR_Hackathon_000_TeamName.pptx)
- **Size:** A0 portrait (84.1 × 118.9 cm) — already set in template
- **Max file size:** 100 MB
- **Do NOT change:** logos, colors, header/footer bands, section headings
- **Font — Title:** Cambria Bold 112pt (min 80pt)
- **Font — Section headings:** Cambria Bold 36pt
- **Font — Body:** Calibri 24pt (min 22pt)
- **Image resolution:** min 600 DPI
- **Layout:** Two-column, no overlapping boxes
- **Language:** Person-first ("people with visual impairment", not "the blind")
- **QR code:** Links to demo/video/repo — must scan correctly before submission
- **Submit to:** kscdr.hackathon@gmail.com
- **Poster Deadline:** **8 September 2026, 10:00 PM** (corrected; the earlier "5 September 2026" is superseded)
- **Presentation Deadline:** **15 September 2026**

---

## 14. Open Questions / Things Still Needed

- [ ] Team member names for poster header
- [ ] Team number from KSCDR registration
- [ ] Team/institution logo (PNG with transparent background)
- [ ] Contact person name, email, mobile for poster footer
- [ ] QR code target (demo video URL, GitHub repo, or additional files)
- [ ] Affiliation text for poster header
- [ ] Full text of Alhwoaimel et al. (2024) barriers paper for verbatim citation
- [ ] Decision: post-stroke upper limb rehab vs. CP as primary pilot population (or both)
- [ ] MOVE trial data collection plan (MediaPipe + rule-based analyzer, garment-stratified) — this is the empirical gap; no HarakAI-era numbers carry over
- [ ] Finalize which LLM (Gemini vs. Claude) for coaching-text generation
- [ ] On-device TTS fallback selection (if ElevenLabs is unavailable offline)
- [ ] Confirm backend choice: Node.js/Express vs. FastAPI (Q2 lists both as options)
- [ ] Design the 50+ game library mapping (exercise → mini-game theme)
- [ ] Garment-stratified evaluation protocol design (per-clothing-condition accuracy reporting)
- [ ] Finalize poster content per §12 (ensure NO HarakAI-era numbers appear as MOVE results)
- [ ] Finalize presentation for 15 September 2026

---

*Document version: 2.0 — reconciled from HarakAI (v1.0) to MOVE direction*
*Last updated: September 2026*
